'use strict';

// Game logic: boat dynamics, torpedoes, depth charges, detection and sonar.
const test = require('node:test');
const assert = require('node:assert/strict');
const L = require('./helpers/load-app').loadLogic();

// Runs the game for `seconds` of real time at 60 frames per second.
function run(g, seconds, input) {
  for (let i = 0; i < Math.round(seconds * 60); i++) L.step(g, 1 / 60, input);
}

// An empty sea: no convoy, so nothing interferes with the test.
function emptySea(opts) {
  const g = L.createGame(Object.assign({ seed: 7, noPatrol: true }, opts));
  g.patrolState = 'idle';
  g.player.heading = 0;
  return g;
}

test('angle helpers wrap and measure the short way round', () => {
  assert.equal(L.wrap360(-10), 350);
  assert.equal(L.wrap360(370), 10);
  assert.equal(L.angleDiff(10, 350), 20);
  assert.equal(L.angleDiff(350, 10), -20);
  assert.equal(L.bearingTo(0, 0, 100, 0), 90);
  assert.equal(L.bearingTo(0, 0, 0, -100), 180);
});

test('interceptCourse: a stationary target is aimed at directly', () => {
  const sol = L.interceptCourse(0, 0, 0, 1000, 0, 0, 20);
  assert.ok(Math.abs(L.angleDiff(sol.course, 0)) < 1e-9);
  assert.ok(Math.abs(sol.time - 50) < 1e-9);
});

test('interceptCourse: a crossing target needs a lead, and the torpedo meets it', () => {
  const v = 5, vt = 20;
  const sol = L.interceptCourse(0, 0, 0, 1000, v, 0, vt);   // target 1 km north, moving east
  assert.ok(sol.course > 0 && sol.course < 45, `lead course ${sol.course}`);
  const tx = v * sol.time, ty = 1000;
  const mx = Math.sin(sol.course * L.DEG) * vt * sol.time, my = Math.cos(sol.course * L.DEG) * vt * sol.time;
  assert.ok(Math.hypot(tx - mx, ty - my) < 1e-6);
});

test('interceptCourse: no solution against a faster receding target', () => {
  assert.equal(L.interceptCourse(0, 0, 0, 1000, 0, 30, 20), null);
});

test('a new game starts at periscope depth with a convoy reported', () => {
  const g = L.createGame({ seed: 1 });
  const p = g.player;
  assert.equal(p.depth, L.PERISCOPE_DEPTH);
  assert.equal(p.reserve, L.TORPEDO.maxReserve);
  assert.equal(p.tubes.filter(t => t.state === 'ready').length, 5);
  const merchants = g.ships.filter(s => s.role === 'merchant');
  const escorts = g.ships.filter(s => s.role === 'escort');
  assert.equal(merchants.length, 4);
  assert.equal(escorts.length, 1);
  for (const s of merchants) {
    const d = L.dist2d(p.x, p.y, s.x, s.y);
    assert.ok(d > 6000 && d < 14000, `merchant at ${d} m`);
  }
  assert.match(g.messages[0].text, /PATROL 1: CONVOY REPORTED BEARING \d{3}/);
});

test('later patrols bring bigger convoys and more escorts', () => {
  const g = L.createGame({ seed: 2 });
  for (let i = 0; i < 5; i++) L.startPatrol(g);
  assert.equal(g.patrol, 6);
  assert.equal(g.ships.filter(s => s.role === 'merchant').length, 9);
  assert.equal(g.ships.filter(s => s.role === 'escort').length, 4);
});

test('every ship model is a list of whole 3D segments', () => {
  for (const [kind, m] of Object.entries(L.MODELS)) {
    assert.ok(m.length > 100 * 6, kind);
    assert.equal(m.length % 6, 0, kind);
    assert.ok(m.every(Number.isFinite), kind);
  }
});

test('engine: the boat accelerates towards the telegraph order, slowly', () => {
  const g = emptySea();
  const p = g.player;
  p.speed = 0;
  p.telegraph = L.TELEGRAPH_STOP;
  L.command(g, 'engineUp');
  L.command(g, 'engineUp');                                 // HALF
  run(g, 2);
  assert.ok(p.speed > 0.5 && p.speed < 3.8, `after 2 s: ${p.speed}`);
  run(g, 60);
  assert.ok(Math.abs(p.speed - 0.5 * L.SUB.maxSubmerged) < 0.1, `after 1 min: ${p.speed}`);
});

test('engine: surfaced, the diesels are faster than the electric motors', () => {
  const g = emptySea();
  const p = g.player;
  p.depth = 0;
  p.orderedDepth = 0;
  p.telegraph = 6;
  run(g, 90);
  assert.ok(p.speed > 16, `surfaced flank ${p.speed}`);
});

test('rudder: the boat turns only while moving, and keeps turning a little after centring', () => {
  const g = emptySea();
  const p = g.player;
  p.speed = 0;
  p.telegraph = L.TELEGRAPH_STOP;
  run(g, 3, { rudderRight: true });
  assert.ok(Math.abs(L.angleDiff(p.heading, 0)) < 1, 'no way on, no turn');
  p.telegraph = 6;
  run(g, 15);
  run(g, 5, { rudderRight: true });
  const h1 = p.heading;
  assert.ok(L.angleDiff(h1, 0) > 10, `turned to ${h1}`);
  run(g, 0.3);
  assert.ok(L.angleDiff(p.heading, h1) > 0, 'still swinging after the key is released');
});

test('depth: ordering deeper dives to the ordered depth and stops there', () => {
  const g = emptySea();
  const p = g.player;
  for (let i = 0; i < 4; i++) L.command(g, 'depthDown');   // 20, 30, 40, 60
  assert.equal(p.orderedDepth, 60);
  run(g, 60);
  assert.ok(Math.abs(p.depth - 60) < 1.5, `depth ${p.depth}`);
  L.command(g, 'depthUp');
  L.command(g, 'depthUp');
  L.command(g, 'depthUp');
  L.command(g, 'depthUp');
  L.command(g, 'depthUp');
  assert.equal(p.orderedDepth, 0);
  run(g, 90);
  assert.equal(p.depth, 0);
});

test('crash dive: fast, noisy, and the periscope comes down', () => {
  const g = emptySea();
  const p = g.player;
  L.command(g, 'crashDive');
  assert.equal(p.crashDive, true);
  assert.equal(p.periscopeUp, false);
  assert.ok(g.events.some(e => e.type === 'klaxon'));
  run(g, 0.5);
  assert.ok(p.noise > 0.3, `noise ${p.noise}`);
  run(g, 12);
  assert.ok(p.depth > 50, `depth ${p.depth}`);
});

test('the periscope works only near periscope depth or surfaced', () => {
  const g = emptySea();
  const p = g.player;
  assert.equal(L.scopeAvailable(g), true);
  p.depth = 30;
  assert.equal(L.scopeAvailable(g), false);
  p.depth = 0;
  assert.equal(L.scopeAvailable(g), true);
  L.command(g, 'periscope');
  run(g, 1);
  assert.equal(L.scopeAvailable(g), false);
});

test('battery drains submerged and recharges surfaced; air refills on the surface', () => {
  const g = emptySea();
  const p = g.player;
  p.telegraph = 6;
  run(g, 120);
  assert.ok(p.battery < 95, `battery ${p.battery}`);
  assert.ok(p.air < 95, `air ${p.air}`);
  const b = p.battery;
  p.depth = 0;
  p.orderedDepth = 0;
  p.telegraph = 4;
  run(g, 60);
  assert.ok(p.battery > b, 'recharging');
  assert.equal(p.air, 100);
});

test('below crush depth the boat is lost', () => {
  const g = emptySea();
  g.player.depth = L.CRUSH_DEPTH + 1;
  g.player.orderedDepth = 260;
  run(g, 0.2);
  assert.equal(g.player.alive, false);
  assert.equal(g.state, 'lost');
  assert.equal(g.lostReason, 'CRUSHED BY THE DEEP');
});

test('firing: the tube empties, then reloads from the reserve', () => {
  const g = emptySea();
  const p = g.player;
  L.command(g, 'fire');
  assert.equal(g.torpedoes.length, 1);
  assert.equal(g.stats.fired, 1);
  assert.equal(p.selectedTube, 1, 'next loaded bow tube selected');
  run(g, 0.1);
  assert.equal(p.tubes[0].state, 'loading');
  assert.equal(p.reserve, L.TORPEDO.maxReserve - 1);
  run(g, L.TORPEDO.reload / L.TIME_SCALE + 0.5);
  assert.equal(p.tubes[0].state, 'ready');
});

test('firing is refused too deep or outside the gyro arc', () => {
  const g = emptySea();
  const p = g.player;
  p.depth = L.TUBE_MAX_DEPTH + 5;
  L.command(g, 'fire');
  assert.equal(g.torpedoes.length, 0);
  assert.match(g.messages.at(-1).text, /TOO DEEP TO FIRE/);
  p.depth = 13;
  p.scopeBearing = 150;
  L.command(g, 'fire');
  assert.equal(g.torpedoes.length, 0);
  assert.match(g.messages.at(-1).text, /USE STERN TUBE 5/);
  L.command(g, 'tube', 4);
  L.command(g, 'fire');
  assert.equal(g.torpedoes.length, 1);
  assert.ok(Math.abs(L.angleDiff(g.torpedoes[0].heading, 180)) < 1e-9, 'leaves the stern');
});

test('a torpedo keeps the gyro course and sinks the ship it hits', () => {
  const g = emptySea({ diffOverrides: { dudChance: 0 } });
  const s = L.makeShip(g, 'freighter', 1443, 1557, 135, 0);   // broadside, on the track after the gyro turn
  s.hp = s.maxHp = 1;
  g.player.scopeBearing = 45;
  L.command(g, 'fire');
  const t = g.torpedoes[0];
  run(g, 3);
  assert.ok(Math.abs(L.angleDiff(t.heading, 45)) < 1, `gyro turned to ${t.heading}`);
  run(g, 30);
  assert.equal(g.stats.hits, 1);
  assert.ok(s.sinking, 'ship is sinking');
  assert.equal(g.stats.sunk.freighter, 1);
  assert.equal(g.stats.tonnage, s.grt);
  assert.ok(g.events.some(e => e.type === 'explosion'));
});

test('a torpedo that has not run 250 m does not explode', () => {
  const g = emptySea({ diffOverrides: { dudChance: 0 } });
  const s = L.makeShip(g, 'freighter', 0, 150, 90, 0);
  L.command(g, 'fire');
  run(g, 3);
  assert.equal(g.stats.hits, 0);
  assert.equal(g.stats.duds, 1);
  assert.equal(s.sinking, null);
});

test('a torpedo that misses runs out and is counted', () => {
  const g = emptySea();
  L.command(g, 'fire');
  run(g, (L.TORPEDO.range / (L.TORPEDO.speedKn * L.KN)) / L.TIME_SCALE + 1);
  assert.equal(g.torpedoes.length, 0);
  assert.equal(g.stats.misses, 1);
});

test('locking a target in the crosshair gives a firing solution that hits', () => {
  const g = emptySea({ difficulty: 'easy', diffOverrides: { dudChance: 0 } });
  const s = L.makeShip(g, 'tanker', -1500, 2000, 90, 9);     // crossing from port to starboard
  s.hp = s.maxHp = 1;
  g.player.scopeBearing = L.angleDiff(L.bearingTo(0, 0, s.x, s.y), 0);
  L.command(g, 'lock');
  assert.equal(g.player.lock.id, s.id);
  const sol = L.firingSolution(g);
  assert.ok(sol && sol.course > L.bearingTo(0, 0, s.x, s.y), 'leads the target');
  L.command(g, 'fire');                                        // EASY: auto gyro from the solution
  assert.ok(Math.abs(L.angleDiff(g.torpedoes[0].course, sol.course)) < 0.5);
  run(g, 30);
  assert.equal(g.stats.hits, 1);
});

test('lock needs the periscope', () => {
  const g = emptySea();
  g.player.depth = 40;
  L.command(g, 'lock');
  assert.equal(g.player.lock, null);
  assert.match(g.messages.at(-1).text, /RAISE THE PERISCOPE/);
});

test('detection: a surfaced boat is seen far away, a quiet deep one is not', () => {
  const g = emptySea();
  const s = L.makeShip(g, 'destroyer', 0, 3000, 180, 12);
  const p = g.player;
  p.depth = 0;
  p.noise = 0.4;
  assert.ok(L.escortDetect(g, s, 3000) > 0.5);
  p.depth = 120;
  p.periscopeRaise = 0;
  p.noise = 0.05;
  assert.equal(L.escortDetect(g, s, 3000), 0);
  assert.ok(L.escortDetect(g, s, 400) > 0, 'but not right underneath');
});

test('detection: going below the thermocline makes ASDIC much weaker', () => {
  const g = emptySea();
  const s = L.makeShip(g, 'destroyer', 0, 1200, 180, 12);
  const p = g.player;
  p.periscopeRaise = 0;
  p.noise = 0.05;
  p.depth = L.THERMOCLINE - 10;
  const above = L.escortDetect(g, s, 1200);
  p.depth = L.THERMOCLINE + 10;
  const below = L.escortDetect(g, s, 1200);
  assert.ok(above > 0 && below < above * 0.5, `above ${above}, below ${below}`);
});

test('an escort with contact runs over the boat and drops a depth-charge pattern', () => {
  const g = emptySea();
  const p = g.player;
  p.depth = 60;
  p.orderedDepth = 60;
  p.periscopeUp = false;
  p.speed = 0;
  p.telegraph = L.TELEGRAPH_STOP;
  const s = L.makeShip(g, 'destroyer', 800, 0, 270, 20);
  Object.assign(s.ai, { contact: 1.2, hasContact: true, state: 'attack', lastKnown: { x: 0, y: 0 }, depthEst: 60, lastKnownT: 0 });
  run(g, 20);
  assert.ok(g.events.some(e => e.type === 'charge') || g.charges.length > 0, 'charges dropped');
  run(g, 15);
  assert.ok(g.stats.chargesNear >= 3, `near misses ${g.stats.chargesNear}`);
});

test('depth-charge damage falls off with distance', () => {
  const g = emptySea();
  const p = g.player;
  p.depth = 50;
  g.charges.push({ id: 1, x: 10, y: 0, depth: 49, target: 50 });
  run(g, 0.1);
  const close = 100 - p.hull;
  assert.ok(close > 20, `close damage ${close}`);
  const h = p.hull;
  g.charges.push({ id: 2, x: 200, y: 0, depth: 49, target: 50 });
  run(g, 0.1);
  assert.equal(p.hull, h, 'no damage at 200 m');
});

test('sonar: a ping paints exact contacts and alerts the escorts', () => {
  const g = emptySea();
  const s = L.makeShip(g, 'destroyer', 3000, 0, 0, 10);
  L.command(g, 'ping');
  assert.ok(g.events.some(e => e.type === 'ping'));
  run(g, 1.5);
  const blip = g.sonar.blips.find(b => b.id === s.id && b.active);
  assert.ok(blip, 'active blip');
  assert.ok(Math.hypot(blip.x - s.x, blip.y - s.y) < 60);
  assert.notEqual(s.ai.state, 'escort');
  L.command(g, 'ping');
  assert.match(g.messages.at(-1).text, /RECHARGING/);
});

test('sonar: the passive sweep picks up a loud ship with some error', () => {
  const g = emptySea();
  const s = L.makeShip(g, 'freighter', 0, 2500, 90, 9);
  run(g, 3.2);
  const blip = g.sonar.blips.find(b => b.id === s.id);
  assert.ok(blip && !blip.active);
  const err = Math.hypot(blip.x - s.x, blip.y - s.y);
  assert.ok(err < 800, `error ${err}`);
});

test('destroying the convoy completes the patrol and resupplies the boat', () => {
  const g = L.createGame({ seed: 3 });
  const p = g.player;
  p.reserve = 0;
  p.hull = 50;
  for (const s of g.ships) if (s.role === 'merchant') L.sinkShip(g, s);
  run(g, 0.1);
  assert.equal(g.patrolState, 'ending');
  run(g, 10);
  assert.equal(g.patrol, 2);
  assert.equal(g.stats.convoysDestroyed, 1);
  assert.equal(p.reserve, 7);
  assert.equal(p.hull, 75);
});

test('the same seed plays the same game', () => {
  const a = L.createGame({ seed: 99 }), b = L.createGame({ seed: 99 });
  run(a, 20);
  run(b, 20);
  assert.deepEqual(a.ships.map(s => [s.name, Math.round(s.x), Math.round(s.y)]), b.ships.map(s => [s.name, Math.round(s.x), Math.round(s.y)]));
});
