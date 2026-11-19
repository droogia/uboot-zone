# U-Boot Zone

A single-file, no-dependency HTML5 arcade game in the green-on-black vector style of
Atari's 1980 *Battlezone*. You command a 1940 U-boat: you see the sea through the
periscope, find the enemy with the sonar, and read the state of the boat from dials,
gauges and lamps.

**[▶ Play it online](https://droogia.github.io/uboot-zone/)**, or open `uboot-zone.html`
in a browser and play. Everything runs locally; nothing is downloaded and nothing is
uploaded.

The **[Commander's Manual](MANUAL.md)** explains every instrument, the game dynamics and the
tactics, with screenshots and diagrams.

![The control room](docs/manual/overview.png)

It is an arcade game, not a simulation. Time runs four times faster than real time,
and the physics is simplified, but the boat still behaves like a big vessel: it
accelerates, turns and dives slowly.

## Screen

| Area | What it shows |
|---|---|
| Periscope (about three quarters of the screen) | The sea with a bearing tape, a reticle with degree ticks, the locked target and the yellow LEAD marker. Below periscope depth it shows the water, the thermocline and any depth charge sinking towards you |
| Bottom row | Depth gauge (yellow = ordered depth, blue = thermocline, red = danger), speed, engine telegraph, compass (yellow = periscope bearing), helm (rudder and dive planes), battery, air and hull |
| Sonar | Round scope with the rotating beam, north up. White = own heading, dotted yellow = periscope bearing |
| Tubes | Five lamps: green ready, yellow reloading, red empty. Gyro course, arc and depth checks |
| Lamps | Surfaced, periscope, silent, detected, enemy ASDIC, diesel, below layer, crash dive, air, battery, hull and depth warnings, incoming torpedo, aircraft, mines, night |
| Torpedo data computer | Locked target: name, tonnage, range, speed, course, angle on the bow, lead and run time |
| Mission panel | Mission, progress (ships left, time to survive), conditions and score |
| Bottom line | Summary of the commands |

When the hull drops below 30% the whole panel switches to red emergency lighting.

## Commands

| Key | Command |
|---|---|
| W / S | Engine telegraph one step ahead / astern (Full astern ... Flank) |
| A / D | Rudder to port / starboard while held |
| R / F | Order a shallower / deeper depth (surface, 13 m periscope depth, 20, 30 ... 260 m) |
| C | Crash dive to 60 m: fast, but noisy |
| P | Raise / lower the periscope |
| ← / → | Train the periscope; hold SHIFT to turn it faster |
| ↑ / ↓ | Periscope high power (6×) / low power (1.5×) |
| B | Periscope back to the bow |
| T | Lock / release the ship in the crosshair |
| SPACE | Fire the selected tube |
| 1 - 5 | Select a tube: 1-4 in the bow, 5 in the stern |
| TAB | Active sonar ping |
| X | Silent running |
| H | Help |
| I | Patrol statistics |
| M | Sound on / off |
| G | CRT effects (glow, phosphor persistence, scanlines) on / off |
| ENTER | Accept the orders at the start of a patrol |
| ESC | Pause (Q in the pause screen abandons the patrol) |

## How to play

1. Each patrol starts with orders: the mission, where the enemy was last reported and the
   conditions (day, dusk or night; calm, moderate or stormy sea; fog). Press ENTER.
2. Find the convoy with the sonar, close in at periscope depth and keep the periscope
   on the target.
3. Press **T** to lock a ship. The torpedo data computer works out where the ship will
   be when the torpedo gets there.
4. Train the periscope on the yellow **LEAD** marker and press **SPACE**. On EASY the
   gyro takes the solution automatically.
5. Get away from the escorts: go deep, slow down, run silent, hide below the
   thermocline.

When a mission ends, the boat is resupplied (torpedoes, a hull patch) and the next orders
arrive.

### Missions

| Mission | Goal |
|---|---|
| Convoy attack | Sink the merchants of an escorted convoy |
| Submarine duel | Sink an enemy submarine that is hunting you |
| Escape the hunters | Survive 6 minutes against a hunter-killer group (3,000 point bonus), or sink them all |
| Anchorage raid | Sink the ships at anchor behind a minefield |

The first five patrols are convoy, duel, convoy, hunters, anchorage; then they are drawn
at random, and convoys and escorts grow with every patrol.

### Rules worth knowing

- The periscope only works at periscope depth (13-16 m) or surfaced. Waves can wash
  over it.
- Torpedoes run at 40 knots for 6 km, keep the gyro course, arm after 250 m and are
  not all reliable. They can be fired only shallower than 25 m; bow tubes cover ±90°
  from the bow, the stern tube ±90° from the stern.
- Surfaced, the diesels give 17 knots and recharge the battery and the air, but the
  escorts see you from 5 km and open fire.
- Submerged, the electric motors give 7.6 knots and drain the battery; the air runs out
  too.
- Escorts find you by sight (surfaced or periscope up), by hydrophone (your noise:
  speed, diesels, crash dives, launches, pings) and by ASDIC. Below the thermocline
  (90 m) ASDIC is much weaker. An escort that has you is drawn in red.
- Depth charges sink at about 3 m/s and explode at the depth the escort guessed.
- Below 220 m the hull starts to give; at 280 m it collapses.
- Sonar colours: green = ship, blue = submarine, red = torpedo, yellow = depth charge,
  orange × = mine. Passive blips are approximate. A ping is exact, but every enemy hears it.
- Enemy submarine torpedoes run shallow: deeper than 18 m they pass over you. Ours hit a
  submarine only at periscope depth or surfaced.
- Aircraft (by day and at dusk, not in storms or fog) spot a surfaced boat from 6 km and
  drop shallow depth charges: crash dive to 60 m.
- Mines are moored 4 to 35 m deep; a ping shows them.
- Night, fog and storms shorten the view both ways; storms also make the periscope dip
  under the waves.

### Difficulty

| | EASY | NORMAL | HARD |
|---|---|---|---|
| LEAD marker | yes | yes | no |
| Gyro from the solution | automatic | aim by hand | aim by hand |
| Error in observed speed / range | none | ±15% / ±6% | ±25% / ±10% |
| Depth-charge damage | 60% | 100% | 130% |
| Escort senses | 70% | 100% | 130% |
| Duds | 8% | 12% | 15% |

### Enemies

| Ship | Notes |
|---|---|
| Cargo steamer | 4,000-7,500 GRT; the big ones take two torpedoes |
| Tanker | 8,000-11,000 GRT, two torpedoes, burns and explodes |
| Flower-class corvette | Slow (16 kn) but persistent escort |
| V&W-class destroyer | Fast (34 kn) escort, attacks at speed |
| T-class submarine | Hunts you at periscope depth (surfaced at night), fires salvos of three torpedoes |
| Sunderland and Hudson aircraft | Patrol by day, attack a surfaced or shallow boat with depth charges |

The score is the tonnage sunk plus mission bonuses. The best five scores are kept in the
browser's local storage.

## Code layout

`uboot-zone.html` holds everything. The `<script>` block has two parts:

1. **Logic** (no DOM): constants, wireframe models, game state, missions and conditions,
   commands, the simulation (boat, convoy, escort and submarine AI, aircraft, torpedoes,
   depth charges, mines, sonar). `step(game, realDt, input)` advances the game.
2. **UI WIRING**: canvas rendering (periscope projection, instruments, overlays), the
   glow/scanline effects, WebAudio sounds (all synthesized), keyboard input and the
   main loop.

Ship models are lists of 3D segments built from a hull generator plus boxes, funnels
and masts, so adding a ship class means adding a `build...()` function, an entry in
`SHIP_CLASSES` and a list of names.

## Tests

Requires Node 22.2 or newer.

```
npm install
npm test
```

The tests load the logic straight from `uboot-zone.html` and check the boat dynamics,
torpedoes and firing solutions, depth charges, detection, sonar, missions, conditions,
enemy submarines, aircraft and mines; they also
drive the real page in jsdom (with a stub canvas) through the title screen, orders, keys,
overlays, game over and high scores.

The manual's screenshots in `docs/manual/` were taken from the game itself.

## License

MIT, see [LICENSE](LICENSE).
