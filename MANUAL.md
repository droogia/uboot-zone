# U-Boot Zone · Commander's Manual

For game version v1.1. This manual explains every part of the control room, how the boat
and its enemies behave, and how to fight a patrol. The [README](README.md) has the short
version; the in-game help (**H**) has the keys and a few reminders.

![Title screen](docs/manual/title.png)

## Contents

1. [Your boat](#1-your-boat)
2. [The control room at a glance](#2-the-control-room-at-a-glance)
3. [The periscope](#3-the-periscope)
4. [Gauges and dials](#4-gauges-and-dials)
5. [Sonar](#5-sonar)
6. [Torpedo tubes and the torpedo data computer](#6-torpedo-tubes-and-the-torpedo-data-computer)
7. [Status lamps](#7-status-lamps)
8. [How the boat moves](#8-how-the-boat-moves)
9. [How the enemy finds you](#9-how-the-enemy-finds-you)
10. [The torpedo attack](#10-the-torpedo-attack)
11. [The enemy](#11-the-enemy)
12. [Dangers](#12-dangers)
13. [Missions](#13-missions)
14. [Time of day, sea and fog](#14-time-of-day-sea-and-fog)
15. [Patrols, score and difficulty](#15-patrols-score-and-difficulty)
16. [Tactics](#16-tactics)
17. [Quick reference](#17-quick-reference)

A note on time: the game runs **four times faster than real time** so that an attack
takes minutes, not hours. Speeds are given in real knots and the boat behaves in proportion,
but every duration in this manual is given in **real seconds**, as you will experience it.

---

## 1. Your boat

You command a Type VIIC U-boat: 67 m long, with four bow torpedo tubes, one stern tube and
nine reserve torpedoes.

| | |
|---|---|
| Surfaced speed (diesels) | 17 knots |
| Submerged speed (electric motors) | 7.6 knots |
| Silent running | 2.5 knots at most |
| Periscope depth | 13 m |
| Safe depth | 220 m |
| Crush depth | 280 m |
| Torpedoes | 5 in the tubes + 9 in reserve |

On the surface the diesels drive the boat, recharge the battery and refresh the air. Under
water the boat runs on its battery and breathes the air it took down with it.

---

## 2. The control room at a glance

![The control room, numbered](docs/manual/overview.png)

| # | Part | Section |
|---|---|---|
| 1 | Periscope view, about three quarters of the screen | [3](#3-the-periscope) |
| 2 | Bearing tape and periscope readout | [3](#3-the-periscope) |
| 3 | Locked target and yellow LEAD marker | [3](#3-the-periscope), [10](#10-the-torpedo-attack) |
| 4 | Messages from the crew | [3](#3-the-periscope) |
| 5 | Depth gauge | [4](#4-gauges-and-dials) |
| 6 | Speed dial | [4](#4-gauges-and-dials) |
| 7 | Engine telegraph | [4](#4-gauges-and-dials) |
| 8 | Compass | [4](#4-gauges-and-dials) |
| 9 | Helm: rudder and dive planes | [4](#4-gauges-and-dials) |
| 10 | Battery, air and hull | [4](#4-gauges-and-dials) |
| 11 | Sonar scope | [5](#5-sonar) |
| 12 | Torpedo tubes | [6](#6-torpedo-tubes-and-the-torpedo-data-computer) |
| 13 | Status lamps | [7](#7-status-lamps) |
| 14 | Torpedo data computer | [6](#6-torpedo-tubes-and-the-torpedo-data-computer) |
| 15 | Mission, orders status, conditions and score | [13](#13-missions), [15](#15-patrols-score-and-difficulty) |
| 16 | Command summary | [17](#17-quick-reference) |

Everything you need to know about the boat is on these instruments: there is no separate
status screen. **I** opens the patrol statistics, **H** the help, **ESC** pauses.

When the hull drops below 30%, the control room switches to **red emergency lighting**: all
the green instruments turn red and the screen pulses. Get the boat out of trouble.

---

## 3. The periscope

![Periscope at high power, with a locked tanker and the LEAD marker](docs/manual/periscope-high.png)

The periscope is your eye on the surface. It is drawn in the green vector style of the
1980 arcade game *Battlezone*: ships, waves, coastline and moon are all line drawings.

**When it works.** The periscope works only when it is raised (**P**) and the boat is at
**periscope depth (13 m) or shallower**. Surfaced, you look from the bridge, higher above
the waves. Below 16.5 m the periscope is under water and the view shows the sea around you
instead (see below). Raising takes about a second, lowering a little less.

**Training it.** **←** and **→** turn the periscope; hold **SHIFT** to turn it three times
faster. It turns independently of the boat, so you can sail one way and look another.
**B** brings it back to the bow.

**Magnification.** **↓** is low power (1.5×, 48° field of view), good for searching. **↑**
is high power (6×, 12° field of view), good for identifying and aiming.

**What is on the glass:**

| Item | Meaning |
|---|---|
| Bearing tape (top) | True bearing of what you are looking at. The triangle marks the centre |
| TRUE / REL | True bearing of the periscope, and its bearing relative to the bow (+ = starboard) |
| Horizon line with ticks | Degree marks: every 5° at low power, every 1° at high power |
| Vertical line | The aiming line. Torpedoes run along the bearing under this line |
| Ticks below the centre | Stadimeter marks (2° apart at low power, 0.5° at high power) |
| Yellow brackets | The locked target and its name |
| Yellow diamond **LEAD** | Where to aim to hit the locked target (EASY and NORMAL only) |
| Red ship | An escort that has detected you |
| White dotted line on the water | The track of one of your torpedoes |
| Red dotted line on the water | The track of an enemy torpedo |
| Yellow beam at night | An escort's searchlight sweeping for you |
| Cracks | Damage to the periscope glass from close explosions |

**Waves.** At periscope depth the sea moves the boat: now and then a wave washes over the
periscope and the view turns blue for a moment. In a storm this happens often.

**Speed.** Above about 4.5 knots submerged the periscope vibrates and the image shakes. It
also leaves a bigger wake on the surface, which escorts and aircraft can see.

**Messages.** The crew's reports appear in the lower part of the view and fade after a few
seconds: torpedo launches, hits, misses, alarms. The colour tells how urgent they are:
green is routine, yellow needs attention, red is danger, blue is good news about the boat.

### The underwater view

![The underwater view: thermocline and depth charges sinking ahead](docs/manual/underwater.png)

When the periscope cannot see, the view shows the water around the boat. It is not decoration:

- the **surface** shimmers overhead when you are shallower than about 50 m, with shafts of light;
- the **thermocline** appears as a dashed blue line when you are near 90 m;
- **depth charges** sinking near you appear as yellow barrels;
- **moored mines** appear as orange spheres with horns on a cable;
- **enemy torpedoes** passing overhead appear as red shapes;
- drifting particles stream past and show how fast you are moving.

---

## 4. Gauges and dials

![The instrument row](docs/manual/instruments.png)

From left to right:

**Depth gauge (DEPTH M).** 0 to 300 m. The green needle is the actual depth, the thin yellow
needle the **ordered depth**. The blue mark is the thermocline (90 m), the red zone the
danger area below 220 m. The readout shows *actual / ordered*. Order depths with **R**
(shallower) and **F** (deeper): surface, 13 (periscope depth), 20, 30, 40, 60, 80, 100,
120, 150, 180, 220, 260 m. The boat levels off at the ordered depth by itself.

**Speed dial (SPEED KN).** −8 to +20 knots. The yellow zone is going astern.

**Engine telegraph.** Seven positions, changed one at a time with **W** (ahead) and **S**
(astern): FULL ASTERN, HALF ASTERN, STOP, SLOW, HALF, FULL, FLANK. The lit sector is the
order; the white pointer shows how fast you actually go, because a big boat takes time to
respond. The readout also tells which engines are running: DIESEL on the surface, E-MOTOR
under water.

| Telegraph | Share of the maximum speed | Surfaced | Submerged |
|---|---|---|---|
| FULL ASTERN | −50% | −8.5 kn | −3.8 kn |
| HALF ASTERN | −25% | −4.3 kn | −1.9 kn |
| STOP | 0 | 0 | 0 |
| SLOW | 25% | 4.3 kn | 1.9 kn |
| HALF | 50% | 8.5 kn | 3.8 kn |
| FULL | 80% | 13.6 kn | 6.1 kn |
| FLANK | 100% | 17 kn | 7.6 kn |

**Compass (HEADING).** North-up. The white arrow is the boat's heading, the dotted yellow
line the direction the periscope is looking. The readout is the heading in degrees.

**Helm.** The upper bar shows the **rudder** (port to the left, starboard to the right, up to
30°). Hold **A** or **D** to put the rudder over; let go and it returns to midships. The
lower bar shows the **dive planes**: blue to the right when diving, green to the left when
rising, with the vertical speed. The readout is the rate of turn in degrees per second.

**Battery, air and hull bars (BATT, AIR, HULL).** Each bar turns yellow below 40% and red
below 20%.

- **BATT** drains while submerged, faster the faster you go, and recharges on the surface.
- **AIR** drains while submerged and refills quickly on the surface. At zero the crew
  suffocates slowly: the hull bar falls.
- **HULL** is the boat's strength. At zero the boat is lost.

---

## 5. Sonar

![The sonar scope after an active ping: ships, a torpedo, depth charges, a submarine and mines](docs/manual/sonar.png)

The round scope shows a 6 km circle around the boat, **north up**. The rings are 1 km apart.
The white line from the centre is your heading; the dotted yellow line is the periscope
bearing, so you can turn the periscope onto a sonar contact.

**Passive listening** is always on. The bright beam sweeps round once every three seconds;
when it passes a sound source, a blip lights up and fades before the next sweep. Passive
blips are **approximate**: the further and quieter the source, the more the blip wanders.
How far you can hear something depends on how loud it is:

| Source | Heard up to about |
|---|---|
| Merchant ship at convoy speed | 7 km |
| Escort at attack speed | 7 km |
| Torpedo running | 6 km |
| Depth charge sinking | 5 km |
| Submarine at periscope depth, slow | 3 km |
| Moored mine | 0.4 km |

Your own noise deafens you: above 6 knots, or surfaced, you hear only 60% as far; in a
storm, 70%. A contact beyond 6 km shows as a short mark on the rim at its bearing.

**Active ping (TAB).** A white ring expands to 6 km in a second and a half. Every contact it
reaches is painted as an **exact square blip** that stays for ten seconds, and moored mines
within 3 km show up as well. The price: **every enemy within 9 km hears it** and learns
roughly where you are. The sonar needs four seconds between pings.

**Colours:**

| Blip | Meaning |
|---|---|
| Green | Surface ship |
| Blue | Submerged submarine |
| Red | Torpedo |
| Yellow | Depth charge |
| Orange × | Mine |
| Yellow ring | The locked target |

---

## 6. Torpedo tubes and the torpedo data computer

![Tubes, status lamps, torpedo data computer and mission status](docs/manual/right-panel.png)

### Tubes

Five lamps, one per tube: **1-4** in the bow, **5 AFT** in the stern. Select a tube with the
number keys; the white frame shows the selected one.

| Lamp | Meaning |
|---|---|
| Green, filled | Loaded and ready |
| Yellow ring with a growing arc | Reloading (about 11 seconds) |
| Red | Empty, nothing left in reserve |

**RESERVE** counts the spare torpedoes. An empty tube reloads by itself while the reserve
lasts. After you fire a bow tube, the next loaded bow tube is selected automatically.

Under the lamps:

- **GYRO**: the course the next torpedo will take (normally the periscope bearing);
- **IN ARC / OUT OF ARC**: bow tubes can fire up to 90° either side of the bow, the stern
  tube up to 90° either side of the stern;
- **DEPTH OK / TOO DEEP**: torpedoes can be fired only at 25 m or shallower.

### Torpedoes

| | |
|---|---|
| Speed | 40 knots (about 2 km in 24 seconds) |
| Range | 6 km |
| Arming distance | 250 m: closer than that, they bounce off |
| Guidance | Gyroscope: they turn onto the gyro course after launch, then run straight |
| Running depth | Shallow: they pass over a submarine deeper than 15 m |
| Reliability | Some are duds (8% on EASY, 12% NORMAL, 15% HARD) |
| Warhead | One hit sinks most ships; big cargo steamers (over 6,200 GRT) and tankers need two |

### Torpedo data computer (TDC)

Aim at a ship through the periscope and press **T** to lock it: it must be near the centre
of the view (within about 10° at low power, 2.5° at high power). Press **T** again to release
it. The TDC then shows:

| Line | Meaning |
|---|---|
| Name and tonnage | The target and what it is worth |
| RANGE | Distance (estimated, see difficulty) |
| SPEED / COURSE | The target's speed and course (estimated) |
| AOB | Angle on the bow: how the target shows its side to you, with S or P for starboard or port |
| LEAD | Course to fire on, and the lead angle relative to the target's bearing |
| RUN | How long the torpedo will take to get there, in seconds |
| SOLUTION OK / STALE | STALE means the target has not been observed for a while: look at it again |

The TDC only learns from what the periscope sees. When the periscope is down or the target
out of sight, it keeps working on the last observation and the solution goes stale.

---

## 7. Status lamps

Sixteen lamps under the tubes. A lit lamp is filled with its colour; blinking lamps need
action.

| Lamp | Colour | Lit when |
|---|---|---|
| SURFACED | green | The boat is on the surface |
| PERISCOPE | green | The periscope is up and can see |
| SILENT | blue | Silent running is on (**X**) |
| DETECTED | red, blinking | At least one enemy has contact with you |
| ASDIC | yellow, blinking | An escort's sonar ping has just been heard within 2.5 km |
| DIESEL | yellow | Running on the diesels (surfaced) |
| BELOW LAYER | blue | Deeper than the thermocline (90 m) |
| CRASH DIVE | red, blinking | A crash dive is in progress |
| AIR LOW | yellow, then red | Air below 25% (red and blinking below 10%) |
| BATT LOW | yellow, then red | Battery below 25% (red and blinking below 10%) |
| HULL CRIT | red, blinking | Hull below 30% |
| DEPTH CRIT | red, blinking | Deeper than 220 m: the hull is giving |
| TORPEDO | red, blinking | An enemy torpedo within 3 km is heading your way |
| AIRCRAFT | red, blinking | An aircraft within 6 km while you are at periscope depth or on the surface |
| MINES | orange, blinking | A mine within about 600 m |
| NIGHT | blue | It is night |

---

## 8. How the boat moves

The boat is big and heavy; every order takes time.

![Depths that matter](docs/manual/depth-layers.svg)

**Speed.** The boat gets most of the way to a new speed in about 8 seconds and settles in
about 20. Stopping takes as long as accelerating.

**Turning.** The rudder moves at 30° per second while **A** or **D** is held and returns to
midships when you let go. The boat turns on a circle of about 190 m at full rudder, so the
faster it goes, the faster it turns: about 5° per second at full submerged speed, 11° per
second at full surfaced speed. It does not turn at all when stopped. The swing builds up and
dies away gradually, so start a turn early and centre the rudder before the bow reaches the
new heading.

**Diving and surfacing.** The dive planes need water flowing past them: the faster you go,
the faster you change depth (up to about 6 m/s at full submerged speed, under 2 m/s when
stopped). Blowing the tanks to rise always works, even when stopped. **C** is a crash dive:
the periscope comes down, the engines go to FULL, the boat dives at about 10 m/s and levels
off at 60 m (or at the ordered depth if it is deeper). It is fast, but very noisy.

**Battery.** Submerged, the battery lasts:

| Speed | Battery lasts |
|---|---|
| FLANK (7.6 kn) | about 6 minutes |
| FULL (6.1 kn) | about 9 minutes |
| HALF (3.8 kn) | about 20 minutes |
| Silent (2.5 kn) | about 40 minutes |

With a flat battery the boat cannot move under water, but it can still blow its tanks and
surface. On the surface the diesels recharge a flat battery in about 3.5 minutes (much more
slowly at FLANK).

**Air.** A full charge of air lasts about 12 minutes submerged; it refills in about 13
seconds on the surface.

**Noise.** Everything you do makes noise, and the escorts listen:

| Source | Noise |
|---|---|
| Speed | Grows quickly with speed |
| Diesels (surfaced) | A lot |
| Crash dive | A lot, while it lasts |
| Torpedo launch | A burst |
| Active ping | A big burst |
| Silent running | Cuts the noise of the engines by more than half |

Bursts die away over a few seconds.

---

## 9. How the enemy finds you

Each enemy builds up **contact** over a few seconds from what it sees and hears, and loses
it when the signals stop. When an escort has contact it turns **red** in the periscope and
the **DETECTED** lamp blinks.

### Escorts (corvettes and destroyers)

| Sense | Range (day, moderate sea) | Notes |
|---|---|---|
| Lookouts, boat surfaced | 5 km | Shorter at dusk, at night, in fog and in a storm |
| Lookouts, periscope up | 0.9 km + 0.12 km per knot | Halved in a storm (spray hides the periscope) |
| Hydrophones | 0.3 km + up to 3.2 km with your noise | Mostly deaf while the escort runs above 20 knots; 45% less below the thermocline |
| ASDIC (active sonar) | 1.8 km, submerged boat only | 45% as far below the thermocline; much weaker while the escort runs above 22 knots |

You can hear their ASDIC: a lower, duller ping than yours. The **ASDIC** lamp blinks when one
comes from within 2.5 km.

When an escort gains contact, the escorts near it join the hunt. An escort that has lost you
goes to your last known position and circles it; after a while it gives up and returns to
its station.

### Enemy submarines

A submarine has good hydrophones: 0.6 km plus up to 6 km with your noise (less while it is
itself on the surface). At periscope depth or surfaced it can also see you: a surfaced
U-boat at 4.5 km, a periscope at about a kilometre. Deep, it can only listen.

### Aircraft

| Your boat | Spotted from |
|---|---|
| Surfaced | 6 km |
| Periscope up | 0.3 km + 0.15 km per knot (the wake) |
| Under 25 m deep, by day, in calm or moderate sea | 0.25 km (a shadow in the water) |
| Deeper | Not at all |

All these ranges shrink with the conditions (see [section 14](#14-time-of-day-sea-and-fog)).

---

## 10. The torpedo attack

![Attack geometry](docs/manual/attack-geometry.svg)

A torpedo does not chase its target: it runs straight on its gyro course. Fired straight at
a moving ship, it arrives where the ship *was*. You must aim where the ship *will be*.

**The procedure:**

1. **Find the target.** Listen on the sonar, then turn the periscope onto the bearing (the
   dotted yellow line on the sonar shows where the periscope points).
2. **Get into position.** The best position is ahead of the target and off to one side, so
   that it will cross in front of you at 1 to 2 km. Approach at periscope depth, slowly,
   raising the periscope only to look.
3. **Identify and lock.** Switch to high power (**↑**), put the ship under the vertical line
   and press **T**. Check the TDC: range, speed, course and angle on the bow.
4. **Aim.** Train the periscope onto the yellow **LEAD** diamond. The GYRO readout under the
   tubes must say IN ARC and DEPTH OK.
5. **Fire.** **SPACE** fires the selected tube. For a better chance, fire a spread: fire,
   train the periscope a degree or two, fire again.
6. **Watch and leave.** The RUN time tells you when to expect the hit. Then lower the
   periscope and go deep before the escorts arrive.

**Good shots and bad shots:**

- The best **track angle** is near 90°: the torpedo meets the ship's whole side. A shot at
  the bow or stern has only the ship's narrow beam to hit.
- Long shots give the target time to zigzag: a convoy changes course every minute or two,
  and an alerted one zigzags more often and speeds up. Under 2 km is a good range.
- Closer than 250 m, the torpedo has not armed yet and bounces off.
- The TDC's numbers are estimates (except on EASY): a stale or rough solution misses.

**Difficulty and aiming:**

| | EASY | NORMAL | HARD |
|---|---|---|---|
| LEAD marker | yes | yes | no |
| Firing with a lock | uses the solution by itself, wherever the periscope points | fires along the periscope | fires along the periscope |
| Error in observed speed | none | up to ±15% | up to ±25% |
| Error in observed range | none | up to ±6% | up to ±10% |

On HARD you aim by hand: the TDC still gives range, speed, course, AOB and run time.

---

## 11. The enemy

![The enemy ships and aircraft](docs/manual/ships.png)

| Type | Length | Worth | Speed | Torpedoes to sink | Behaviour |
|---|---|---|---|---|---|
| Cargo steamer | 125 m | 4,000-7,500 GRT | 11 kn | 1 (2 over 6,200 GRT) | Keeps station in the convoy; slows to a crawl when damaged |
| Tanker | 145 m | 8,000-11,000 GRT | 11 kn | 2 | Burns when hit and explodes as it sinks |
| Flower-class corvette | 62 m | 925 t | 16 kn | 1 | Slow but persistent escort, 40 depth charges |
| V&W-class destroyer | 95 m | 1,300 t | 34 kn | 1 | Fast escort, attacks at 26 knots, 30 depth charges |
| T-class submarine | 84 m | 1,090 t | 15 kn surfaced, 9 kn submerged | 1, only at periscope depth or surfaced | Hunts you, fires salvos of three torpedoes |
| Sunderland flying boat | | | 150 kn | cannot be hit | Patrol aircraft, 6 depth charges |
| Hudson patrol bomber | | | 190 kn | cannot be hit | Patrol aircraft, 4 depth charges |

Merchants are counted in gross register tons (GRT), warships and submarines by
displacement (tons). Both count towards the score.

### Escorts

Escorts weave around their station on the convoy, pinging every few seconds. With
contact they run at the position where they think you are and roll a pattern of **five
depth charges** as they pass over: three from the stern rails and two thrown 45 m to the
sides. The charges are set to the depth they believe you are at. Then they run on, turn
and come back for another run about 20 seconds later.

If you are **surfaced** and an escort has you in sight within 6 km, it opens fire with its
guns. After dark, escorts that have you sweep the sea with **searchlights**.

### Enemy submarines

![Night: a surfaced enemy submarine fires a salvo; red torpedo tracks and an escort's searchlight](docs/manual/night-duel.png)

By day an enemy submarine patrols at periscope depth, where only its periscope and a thin
feather of wake show. At night it runs on the surface to charge its batteries. When it has
contact it closes to about 2.6 km, turns its bow onto a firing solution and fires **three
torpedoes** in a narrow spread. Then it dives to 50 m and turns away; it can fire again
about 40 seconds later.

It can hear your torpedoes coming within about 1.2 km and sometimes (almost half the time)
it goes deep a moment later, and your torpedoes then pass over it.

Its torpedoes run at 45 knots for 5 km, **shallow**: deeper than 18 m they pass over you.
When one is fired within 5 km of you, the crew reports *TORPEDOES IN THE WATER* with the
bearing, the alarm sounds, the **TORPEDO** lamp blinks and you can hear the propellers
whining as they come.

### Aircraft

![A Sunderland flying boat passing over the periscope](docs/manual/aircraft.png)

Aircraft patrol by day and at dusk, never at night, in a storm or in fog. One appears every
minute and a half or two. When it spots you it dives to 40 m above the sea and drops its
depth charges, set **shallow (9-16 m)** and smaller than an escort's, across your position. While it can still see you it
corrects its run; once you are deep it aims at the swirl where you dived. Surfaced, your
lookouts report aircraft within 7 km: *AIRCRAFT BEARING ... DIVE!* You will also hear the
engines.

---

## 12. Dangers

| Danger | Damage | How to avoid it |
|---|---|---|
| Depth charge | Up to 55% at point-blank range, nothing beyond 85 m | Change depth and turn hard when they splash; go below the thermocline |
| Aircraft depth charges | Up to 50% at point-blank range, nothing beyond 45 m; set at 9-16 m | Be at 60 m or deeper when they arrive: a crash dive takes you there |
| Gunfire | 10% per hit | Dive |
| Enemy torpedo | 75% | Go deeper than 18 m, or turn to present your narrow end |
| Mine | 80% | Pass deeper than 45 m, or find the swept channel |
| Below 220 m | Continuous, faster the deeper | Come up |
| 280 m | The boat is crushed | Never go there |
| No air | Slow, continuous | Surface before the air runs out |

These figures are for NORMAL. EASY takes 60% of the damage, HARD 130%.

A depth charge within 85 m in three dimensions does damage: one exploding 40 m directly
above or below you is as dangerous as one 40 m to the side. That is why changing depth
works as well as turning away.

Damage is permanent until the end of the patrol: each completed patrol patches the hull by
25%.

---

## 13. Missions

![Orders at the start of a patrol](docs/manual/briefing.png)

Every patrol starts with **orders** on screen: the mission, the intelligence (bearing and
range of the enemy) and the conditions. Press **ENTER** to accept and start. The bottom of
the right panel always shows the mission, its progress and the conditions.

The first five patrols follow a fixed order; after that the mission is drawn at random
(convoys twice as often as the others).

| Patrol | Mission | Goal | Ends badly when |
|---|---|---|---|
| 1, 3 | **Convoy attack** | Sink all the merchants | The convoy gets 15 km away from you |
| 2 | **Submarine duel** | Sink the enemy submarine (two from patrol 7) | It gets 20 km away |
| 4 | **Escape the hunters** | Survive 6 minutes, or sink every hunter | |
| 5 | **Anchorage raid** | Sink the ships at anchor behind a minefield | You go 16 km away from the anchorage |

**Convoy attack.** 4 merchants and 1 escort on patrol 1; each patrol adds a merchant (up to
10) and every second patrol another escort (up to 5). The convoy starts 9 to 11 km away,
heading roughly your way, at 7 to 9.4 knots, and zigzags. Air cover from patrol 2, if the
weather allows.

**Submarine duel.** An enemy submarine is 6 to 8 km away and has been told roughly where
you are, too. It keeps getting new rough fixes on you, so hiding forever does not work. Who
hears whom first decides the fight.

**Escape the hunters.** A hunter-killer group of three escorts (more in later patrols)
starts 3 to 5 km away and closes in on your rough position. Survive 6 minutes for a
**3,000 point bonus**, or sink them all. Air cover if the weather allows.

**Anchorage raid.** Four to seven merchants lie at anchor 8 to 9 km away, guarded by two
corvettes (a destroyer joins from patrol 8) circling 1.5 km out. Two rings of moored mines
surround the anchorage about 3 km out, with one swept channel through them. Mines are
moored between 4 and 35 m. Ping to see them, or go under them. Air cover if the weather
allows.

When a mission ends, the boat sails for 7 seconds, then it is resupplied (up to 7 torpedoes
back into the reserve, hull patched by 25%) and the next patrol's orders arrive.

---

## 14. Time of day, sea and fog

The first patrol is always by day in a moderate sea. After that, each patrol rolls its own
conditions.

![Dusk in a storm](docs/manual/storm.png)

![Fog](docs/manual/fog.png)

| Condition | Chance | Effect on sight (both ways) | Other effects |
|---|---|---|---|
| Day | 45% | 100% | Aircraft fly |
| Dusk | 25% | 70% | Aircraft fly; escorts use searchlights |
| Night | 30% | 40% | No aircraft; escorts use searchlights; enemy submarines surface |
| Calm sea | 30% | | Small waves |
| Moderate sea | 50% | | |
| Storm | 20% | 80% | Big waves wash over the periscope often; a periscope is hard to spot; everyone hears 30% less; no aircraft |
| Fog | 15% (never in a storm) | 35% | No aircraft |

"Sight both ways" means the range at which you can see ships through the periscope *and*
the range at which escorts, submarines and aircraft can see you. Night and fog favour the
attacker: a surfaced attack at night, at speed, was how the real U-boats fought convoys.

---

## 15. Patrols, score and difficulty

**Score** = tonnage sunk (GRT and tons) + mission bonuses. It is shown in yellow at the
bottom right. The five best scores are kept in the browser, with the patrol reached, the
difficulty and the date. **I** shows the statistics of the current game: ships sunk by
type, torpedoes fired, hits, duds and misses, depth charges and air attacks survived,
torpedoes and mines that hit you, the deepest dive, time submerged and missions
accomplished.

**Difficulty** is chosen on the title screen (**1**, **2**, **3**):

| | EASY | NORMAL | HARD |
|---|---|---|---|
| LEAD marker | yes | yes | no |
| Gyro from the solution | automatic | by hand | by hand |
| TDC errors | none | small | larger |
| Damage taken | 60% | 100% | 130% |
| Enemy senses | 70% | 100% | 130% |
| Duds | 8% | 12% | 15% |

The game ends when the hull reaches zero, or when you abandon the patrol (**ESC**, then
**Q**). **ENTER** starts a new game, **ESC** goes back to the title screen.

**Screen effects.** **G** switches the CRT look (phosphor glow, persistence, scanlines) on
and off. If the computer cannot keep a smooth frame rate, the game turns the effects off by
itself and tells you. **M** switches the sound on and off. All sounds are generated by the
browser; they start after the first key press.

---

## 16. Tactics

- **Run on the surface, fight submerged.** The diesels are more than twice as fast and fill
  the battery. Close in on the surface while you are far away (more than 6 km by day), then
  dive to periscope depth for the attack.
- **Use the periscope sparingly** when escorts are near: raise it, look, lower it.
- **Slow is quiet.** At SLOW or in silent running the escorts' hydrophones have to be right
  on top of you.
- **When you hear DEPTH CHARGES IN THE WATER:** change depth by 30 m or more and turn hard.
  The pattern is set to where they think you are.
- **Below the thermocline** (90 m) the escorts' sonar is much weaker. Get there, slow down,
  and wait for them to lose you.
- **Don't ping near escorts.** A ping tells every escort within 9 km where you are. Use it
  to find a quiet target, a submarine or a minefield.
- **Night attacks.** At night you can approach on the surface, fast, almost unseen. Watch
  for searchlights: an escort that has you will light you up.
- **Aircraft:** when the lookouts shout, crash dive (**C**) at once. Aircraft charges are
  set shallow; at 60 m, where a crash dive levels off, they cannot reach you.
- **Enemy submarines:** stay deeper than 18 m when you are not attacking. Approach slowly
  and fire before it hears you. If you hear *TORPEDOES IN THE WATER*, dive.
- **Minefields:** ping from outside the field to see the mines and the gap in them, or
  cross deeper than 45 m.
- **Mind the battery and the air** after a long chase: you need both to get home.

---

## 17. Quick reference

| Key | Command |
|---|---|
| W / S | Engine telegraph ahead / astern |
| A / D | Rudder to port / starboard (hold) |
| R / F | Order a shallower / deeper depth |
| C | Crash dive |
| P | Raise / lower the periscope |
| ← / → | Train the periscope (SHIFT = faster) |
| ↑ / ↓ | Periscope high / low power |
| B | Periscope to the bow |
| T | Lock / release the target in the crosshair |
| SPACE | Fire the selected tube |
| 1 - 5 | Select a tube (5 = stern) |
| TAB | Active sonar ping |
| X | Silent running |
| H | Help |
| I | Patrol statistics |
| M | Sound on / off |
| G | CRT effects on / off |
| ENTER | Accept the orders / start a new game |
| ESC | Pause (then Q to abandon the patrol) |
