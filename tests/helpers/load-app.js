// Loads the game logic out of the single-file app, so the tests exercise
// exactly what ships in uboot-zone.html.
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const APP_PATH = path.join(__dirname, '..', '..', 'uboot-zone.html');
const UI_MARKER = '/* =========================================================\n   UI WIRING';

function readHtml() {
  return fs.readFileSync(APP_PATH, 'utf8');
}

// Everything in the <script> block that comes before the UI wiring (no DOM needed).
function loadLogic() {
  const html = readHtml();
  const script = html.slice(html.indexOf('<script>') + '<script>'.length, html.indexOf('</script>'));
  const cut = script.indexOf(UI_MARKER);
  if (cut === -1) throw new Error('UI WIRING marker not found in uboot-zone.html');
  const logic = script.slice(0, cut);
  const exported = [
    'VERSION', 'TIME_SCALE', 'KN', 'DEG', 'TELEGRAPH', 'TELEGRAPH_STOP', 'PERISCOPE_DEPTH', 'TUBE_MAX_DEPTH',
    'THERMOCLINE', 'SAFE_DEPTH', 'CRUSH_DEPTH', 'SUB', 'TORPEDO', 'CHARGE', 'SONAR_RANGE', 'DIFFICULTY',
    'SHIP_CLASSES', 'MODELS', 'ENEMY_TORPEDO', 'SUB_HIT_DEPTH', 'MINE', 'HUNT_TIME', 'HUNT_BONUS', 'MISSION_ORDER',
    'PLANE_CLASSES', 'PERISCOPE_MAX', 'SURFACED_DEPTH',
    'clamp', 'wrap360', 'angleDiff', 'bearingTo', 'dist2d', 'makeRng', 'interceptCourse',
    'createGame', 'startPatrol', 'makeShip', 'command', 'step', 'scopeAvailable', 'viewHeading',
    'firingSolution', 'fireTorpedo', 'escortDetect', 'sinkShip', 'damagePlayer',
    'makeConditions', 'visualRange', 'missionStatus', 'subDetect', 'fireEnemySalvo', 'spawnPlane', 'score',
  ];
  return new Function(logic + '\nreturn { ' + exported.join(', ') + ' };')();
}

module.exports = { readHtml, loadLogic, APP_PATH };
