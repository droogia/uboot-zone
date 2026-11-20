'use strict';

// Drives the real page in jsdom: title screen, keys, overlays, game over, high scores.
// jsdom has no canvas, so the 2D context is a recording stub.
const test = require('node:test');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');
const { readHtml } = require('./helpers/load-app');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function stubContext(log) {
  const target = {
    measureText: s => ({ width: String(s).length * 8 }),
    createPattern: () => ({}),
    fillText: s => log.push(String(s)),
  };
  return new Proxy(target, {
    get(t, k) {
      if (k in t) return t[k];
      return () => {};
    },
    set() { return true; },
  });
}

const openWindows = new Set();
test.afterEach(() => {
  for (const w of openWindows) w.close();
  openWindows.clear();
});

function openApp() {
  const texts = [];
  const errors = [];
  const dom = new JSDOM(readHtml(), {
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    url: 'http://localhost/',
    beforeParse(window) {
      window.HTMLCanvasElement.prototype.getContext = () => stubContext(texts);
      window.addEventListener('error', e => errors.push(e.message));
    },
  });
  const { window } = dom;
  openWindows.add(window);
  const key = (code, type = 'keydown') => window.dispatchEvent(new window.KeyboardEvent(type, { code, bubbles: true }));
  const press = code => { key(code); key(code, 'keyup'); };
  const frames = async n => { await sleep(n * 17 + 20); };
  // Top-level let/const of a classic script are not window properties; read them with eval.
  const peek = expr => window.eval(expr);
  return { window, texts, errors, press, key, frames, peek, close: () => window.close() };
}

test('title screen shows the name, version and difficulty choice', async () => {
  const app = openApp();
  await app.frames(3);
  assert.deepEqual(app.errors, []);
  assert.ok(app.texts.includes('U-BOOT ZONE'));
  assert.ok(app.texts.some(t => /^v\d{3}\.\d$/.test(t)));
  assert.ok(app.texts.includes('PRESS ENTER TO SAIL'));
  app.press('Digit3');
  assert.equal(app.peek('titleDifficulty'), 'hard');
  app.close();
});

test('ENTER starts a patrol and the instruments are drawn', async () => {
  const app = openApp();
  await app.frames(2);
  app.press('Enter');
  await app.frames(4);
  assert.equal(app.peek('mode'), 'play');
  assert.equal(app.peek('overlay'), 'briefing', 'orders are shown first');
  assert.ok(app.texts.includes('ORDERS FROM U-BOAT COMMAND'));
  app.press('Enter');
  await app.frames(3);
  assert.equal(app.peek('overlay'), null);
  assert.ok(app.peek('game').ships.length > 0);
  for (const label of ['DEPTH M', 'SPEED KN', 'ENGINE TELEGRAPH', 'HEADING', 'HELM', 'TORPEDO DATA COMPUTER']) {
    assert.ok(app.texts.includes(label), label);
  }
  assert.ok(app.texts.some(t => t.startsWith('W/S ENGINE')), 'command line');
  assert.deepEqual(app.errors, []);
  app.close();
});

test('keys drive the boat', async () => {
  const app = openApp();
  await app.frames(2);
  app.press('Enter');
  await app.frames(2);
  app.press('Enter');
  const g = app.peek('game');
  const t0 = g.player.telegraph;
  app.press('KeyW');
  assert.equal(g.player.telegraph, t0 + 1);
  app.press('KeyF');
  assert.equal(g.player.orderedDepth, 20);
  app.press('KeyP');
  assert.equal(g.player.periscopeUp, false);
  app.press('Digit5');
  assert.equal(g.player.selectedTube, 4);
  app.press('KeyX');
  assert.equal(g.player.silent, true);
  app.key('KeyD');
  await app.frames(10);
  assert.ok(g.player.rudder > 0, 'rudder to starboard while D is held');
  app.key('KeyD', 'keyup');
  app.press('Tab');
  assert.equal(g.stats.pings, 1);
  assert.deepEqual(app.errors, []);
  app.close();
});

test('H, I and ESC open overlays that pause the game', async () => {
  const app = openApp();
  await app.frames(2);
  app.press('Enter');
  await app.frames(2);
  app.press('Enter');
  app.press('KeyH');
  await app.frames(2);
  assert.equal(app.peek('overlay'), 'help');
  assert.ok(app.texts.some(t => t.includes("COMMANDER'S HANDBOOK")));
  const t = app.peek('game').time;
  await app.frames(5);
  assert.equal(app.peek('game').time, t, 'paused');
  app.press('KeyH');
  app.press('KeyI');
  await app.frames(2);
  assert.equal(app.peek('overlay'), 'stats');
  assert.ok(app.texts.includes('SCORE'));
  app.press('Escape');
  assert.equal(app.peek('overlay'), null);
  app.press('Escape');
  assert.equal(app.peek('overlay'), 'pause');
  app.press('Escape');
  assert.equal(app.peek('overlay'), null);
  assert.deepEqual(app.errors, []);
  app.close();
});

test('losing the boat shows the report and stores the score', async () => {
  const app = openApp();
  await app.frames(2);
  app.press('Enter');
  await app.frames(2);
  app.press('Enter');
  const g = app.peek('game');
  g.stats.tonnage = 12345;
  g.player.depth = 300;
  await app.frames(4);
  assert.equal(g.player.alive, false);
  g.lostAt -= 10;                                  // skip the 4-second death scene
  await app.frames(3);
  assert.equal(app.peek('mode'), 'over');
  assert.ok(app.texts.some(t => t.includes('U-BOOT LOST')));
  const scores = JSON.parse(app.window.localStorage.getItem('uboot-zone.scores'));
  assert.equal(scores[0].score, 12345);
  app.press('Enter');
  await app.frames(2);
  assert.equal(app.peek('mode'), 'play');
  assert.notEqual(app.peek('game'), g);
  assert.deepEqual(app.errors, []);
  app.close();
});

test('K on the title starts a demo: the AI captain has the conn and the score is not recorded', async () => {
  const app = openApp();
  await app.frames(2);
  app.press('KeyK');
  await app.frames(2);
  const g = app.peek('game');
  assert.equal(g.ai.mode, 'demo');
  assert.equal(app.peek('overlay'), 'briefing');
  app.press('Enter');                                      // ENTER on the orders takes command
  assert.equal(g.ai.mode, 'off');
  app.press('KeyK');
  assert.equal(g.ai.mode, 'demo');
  const t0 = g.player.telegraph;
  app.press('KeyW');
  assert.equal(g.player.telegraph, t0, 'boat keys are ignored while the AI captain commands');
  await app.frames(6);
  assert.ok(app.texts.some(t => t.startsWith('AI CAPTAIN')), 'caption drawn');
  g.player.depth = 300;
  await app.frames(4);
  g.lostAt -= 10;
  await app.frames(3);
  assert.equal(app.peek('mode'), 'over');
  assert.equal(app.window.localStorage.getItem('uboot-zone.scores'), null);
  assert.deepEqual(app.errors, []);
});

test('O gives the first officer\'s guidance; V, B and +/- work', async () => {
  const app = openApp();
  await app.frames(2);
  app.press('Enter');
  await app.frames(2);
  app.press('KeyO');
  const g = app.peek('game');
  assert.equal(g.ai.mode, 'guide');
  assert.equal(app.peek('overlay'), null);
  await app.frames(10);
  assert.ok(app.texts.includes('FIRST OFFICER'));
  g.player.scopeBearing = 30;
  app.press('KeyV');
  assert.ok(g.player.helmOrder !== null);
  app.press('KeyB');
  assert.equal(g.player.scopeBearing, 0);
  const fs = app.peek('FS');
  app.press('Equal');
  assert.ok(app.peek('FS') >= fs);
  assert.equal(app.peek('uiScale'), 1.05);
  for (let i = 0; i < 10; i++) app.press('Equal');
  assert.equal(app.peek('uiScale'), 1.25, 'at most 125%');
  for (let i = 0; i < 20; i++) app.press('Minus');
  assert.equal(app.peek('uiScale'), 0.75, 'at least 75%');
  for (let i = 0; i < 5; i++) app.press('Equal');
  assert.equal(app.peek('uiScale'), 1);
  assert.deepEqual(app.errors, []);
});

test('N opens the blueprints: every vessel and aircraft, cycled with the arrows', async () => {
  const app = openApp();
  await app.frames(2);
  app.press('KeyN');
  await app.frames(2);
  assert.equal(app.peek('overlay'), 'blueprints');
  assert.ok(app.texts.includes('U-BOOT TYPE VIIC'));
  const n = app.peek('BLUEPRINTS.length');
  const seen = new Set();
  for (let i = 0; i < n; i++) {
    seen.add(app.peek('BLUEPRINTS[bpIndex].kind'));
    app.press('ArrowRight');
    await app.frames(1);
  }
  assert.equal(seen.size, n);
  assert.equal(app.peek('bpIndex'), 0, 'wraps round');
  app.press('Escape');
  assert.equal(app.peek('overlay'), null);
  app.press('Enter');
  await app.frames(2);
  app.press('Enter');
  const t = app.peek('game').time;
  app.press('KeyN');
  await app.frames(4);
  assert.equal(app.peek('overlay'), 'blueprints');
  assert.equal(app.peek('game').time, t, 'paused while reading');
  assert.deepEqual(app.errors, []);
});
