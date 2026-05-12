// ════════════════════════════════════════════════════════════════════════════
//  CUBE WARS — game.js
//  Sections: Config → State → Init → Setup → Loop → Player → Enemies →
//            Bullets → Collision → Pickup → Particles → HUD → Camera →
//            Render → End
// ════════════════════════════════════════════════════════════════════════════


// ── CONFIG ────────────────────────────────────────────────────────────────

// prefDist = preferred combat distance from player
const GUNS = {
  pistol:  { name: 'PISTOL',  dmg: 25,  rpm: 0.5,    max: 20, pellets: 1, spread: 0,    burst: 1, reload: 1, prefDist: 180 },
  shotgun: { name: 'SHOTGUN', dmg: 15,  rpm: 0.5,    max: 4,  pellets: 8, spread: 0.4, burst: 1, reload: 1.5,   prefDist: 85  },
  rifle:   { name: 'RIFLE',   dmg: 15,  rpm: 1,      max: 20, pellets: 5, spread: 0.07, burst: 3, reload: 1, prefDist: 200 },
  rocket:  { name: 'ROCKET',  dmg: 75,  rpm: 0.133,  max: 1,  pellets: 1, spread: 0,    burst: 1, reload: 5,   prefDist: 220, explosive: true },
  sniper:  { name: 'SNIPER',  dmg: 100, rpm: 0.133,  max: 1,  pellets: 1, spread: 0,    burst: 1, reload: 5, prefDist: 340 },
};

const GUNKEYS    = ['pistol', 'shotgun', 'rifle', 'rocket', 'sniper'];
const CRATE_GUNS = ['pistol','shotgun', 'rifle', 'rocket', 'sniper'];

const TILE        = 48;
const COLS        = 30;
const ROWS        = 22;
const W           = COLS * TILE;
const H           = ROWS * TILE;
const DETECT_RANGE = 440;
const PLAYER_SIZE  = 18;
const BULLET_SPD   = 520;
const ENEMY_SPD    = 380;
const SNIPER_SPD   = 820;


// ── STATE ─────────────────────────────────────────────────────────────────

let canvas, ctx, last = 0, kills = 0, gameActive = true;
let keys = {}, mouse = { x: 0, y: 0 }, mouseDown = false;
let player, bullets, eBullets, enemies, walls, crates, particles;
let camX = 0, camY = 0;


// ── INIT ──────────────────────────────────────────────────────────────────

function init() {
  canvas = document.getElementById('c');
  ctx    = canvas.getContext('2d');
  resize();

  window.addEventListener('resize', resize);

  window.addEventListener('keydown', e => {
    keys[e.key.toLowerCase()] = true;
    if (e.key.toLowerCase() === 'e') tryPickup();
  });
  window.addEventListener('keyup', e => {
    keys[e.key.toLowerCase()] = false;
  });

  canvas.addEventListener('mousemove', e => {
    const r  = canvas.getBoundingClientRect();
    mouse.x  = e.clientX - r.left;
    mouse.y  = e.clientY - r.top;
  });
  canvas.addEventListener('mousedown', e => { if (e.button === 0) mouseDown = true;  });
  canvas.addEventListener('mouseup',   e => { if (e.button === 0) mouseDown = false; });

  setupGame();
  requestAnimationFrame(loop);
}

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}


// ── SETUP ─────────────────────────────────────────────────────────────────

function setupGame() {
  kills      = 0;
  gameActive = true;
  document.getElementById('game-over').style.display    = 'none';
  document.getElementById('kill-counter').textContent   = 'ELIMINATED: 0';
  walls     = [];
  crates    = [];
  bullets   = [];
  eBullets  = [];
  particles = [];

  // Border walls
  for (let x = 0; x < COLS; x++) {
    walls.push({ x: x * TILE,          y: 0,              w: TILE, h: TILE });
    walls.push({ x: x * TILE,          y: (ROWS - 1) * TILE, w: TILE, h: TILE });
  }
  for (let y = 1; y < ROWS - 1; y++) {
    walls.push({ x: 0,                 y: y * TILE, w: TILE, h: TILE });
    walls.push({ x: (COLS - 1) * TILE, y: y * TILE, w: TILE, h: TILE });
  }

  // Interior walls (flood-fill validated)
  let grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  for (let y = 0; y < ROWS; y++)
    for (let x = 0; x < COLS; x++)
      if (x === 0 || y === 0 || x === COLS - 1 || y === ROWS - 1)
        grid[y][x] = 1;

  const safe = new Set([
    '1,1', '2,1', '1,2', '2,2',
    `${COLS - 2},${ROWS - 2}`, `${COLS - 3},${ROWS - 2}`, `${COLS - 2},${ROWS - 3}`,
  ]);

  for (let i = 0; i < 55; i++) {
    let tx = 2 + Math.floor(Math.random() * (COLS - 4));
    let ty = 2 + Math.floor(Math.random() * (ROWS - 4));
    if (safe.has(`${tx},${ty}`)) continue;
    grid[ty][tx] = 1;
    if (!isConnected(grid)) {
      grid[ty][tx] = 0;
    } else {
      walls.push({ x: tx * TILE, y: ty * TILE, w: TILE, h: TILE });
    }
  }

  // Weapon crates
  for (let placed = 0; placed < 6;) {
    let tx = 2 + Math.floor(Math.random() * (COLS - 4));
    let ty = 2 + Math.floor(Math.random() * (ROWS - 4));
    if (grid[ty][tx] !== 0) continue;
    grid[ty][tx] = 2;
    crates.push({
      x: tx * TILE + TILE / 2,
      y: ty * TILE + TILE / 2,
      gun: CRATE_GUNS[placed % CRATE_GUNS.length],
      available: true,
    });
    placed++;
  }

  // Player
  player = {
    x: 2.5 * TILE, y: 2.5 * TILE,
    vx: 0, vy: 0,
    angle: 0,
    hp: 200, maxHp: 200,
    size: PLAYER_SIZE,
    gun: 'pistol',
    ammo: Object.fromEntries(GUNKEYS.map(k => [k, GUNS[k].max])),
    fireTimer: 0, burstLeft: 0, burstTimer: 0,
    reloading: false, reloadTimer: 0,
  };

  // Enemies
  enemies = [];
  for (let i = 0; i < 3; i++) spawnEnemy(grid, 'red');
  for (let i = 0; i < 2; i++) spawnEnemy(grid, 'purple');
  for (let i = 0; i < 3; i++) spawnEnemy(grid, 'yellow');

  updateHUD();
}

// BFS flood-fill to ensure the map stays fully connected
function isConnected(grid) {
  let start = null;
  outer:
  for (let y = 1; y < ROWS - 1; y++)
    for (let x = 1; x < COLS - 1; x++)
      if (grid[y][x] === 0) { start = { x, y }; break outer; }

  if (!start) return false;

  let visited = new Set(), queue = [start];
  visited.add(`${start.x},${start.y}`);

  while (queue.length) {
    let { x, y } = queue.shift();
    for (let [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      let nx = x + dx, ny = y + dy, k = `${nx},${ny}`;
      if (nx >= 0 && ny >= 0 && nx < COLS && ny < ROWS && grid[ny][nx] === 0 && !visited.has(k)) {
        visited.add(k);
        queue.push({ x: nx, y: ny });
      }
    }
  }

  for (let y = 1; y < ROWS - 1; y++)
    for (let x = 1; x < COLS - 1; x++)
      if (grid[y][x] === 0 && !visited.has(`${x},${y}`)) return false;

  return true;
}

// BFS from enemy tile to player tile — returns array of world-space waypoints
function findPath(ex, ey, tx, ty) {
  const startCol = Math.floor(ex / TILE), startRow = Math.floor(ey / TILE);
  const endCol   = Math.floor(tx / TILE), endRow   = Math.floor(ty / TILE);
  if (startCol === endCol && startRow === endRow) return [];

  // Build a fast wall-lookup grid
  const blocked = new Set(walls.map(w => `${Math.floor(w.x/TILE)},${Math.floor(w.y/TILE)}`));

  const queue   = [{ col: startCol, row: startRow, path: [] }];
  const visited = new Set([`${startCol},${startRow}`]);

  while (queue.length) {
    const { col, row, path } = queue.shift();
    for (const [dc, dr] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nc = col + dc, nr = row + dr;
      const key = `${nc},${nr}`;
      if (nc < 0 || nr < 0 || nc >= COLS || nr >= ROWS) continue;
      if (blocked.has(key) || visited.has(key)) continue;
      visited.add(key);
      const newPath = [...path, { x: nc * TILE + TILE / 2, y: nr * TILE + TILE / 2 }];
      if (nc === endCol && nr === endRow) return newPath;
      queue.push({ col: nc, row: nr, path: newPath });
    }
  }
  return []; // unreachable
}

function spawnEnemy(grid, type) {
  let gk;
  if      (type === 'yellow') gk = Math.random() < 0.5 ? 'pistol' : 'shotgun';
  else if (type === 'purple') gk = GUNKEYS[Math.floor(Math.random() * GUNKEYS.length)];
  else                        gk = GUNKEYS[Math.floor(Math.random() * GUNKEYS.length)];

  const cfg = {
    red:    { hp: 75,  baseSpd: 75,  wanderSpd: 55, dmgMult: 1.0, size: 16 },
    purple: { hp: 200, baseSpd: 35,  wanderSpd: 30, dmgMult: 1.0, size: 20 },
    yellow: { hp: 30,  baseSpd: 120, wanderSpd: 80, dmgMult: 0.5, size: 13 },
  }[type];

  let tries = 0;
  while (tries++ < 400) {
    let tx = 2 + Math.floor(Math.random() * (COLS - 4));
    let ty = 2 + Math.floor(Math.random() * (ROWS - 4));
    if (grid && grid[ty] && grid[ty][tx] !== 0) continue;

    let ex = tx * TILE + TILE / 2;
    let ey = ty * TILE + TILE / 2;
    if (Math.hypot(ex - player.x, ey - player.y) < 200) continue;

    enemies.push({
      x: ex, y: ey,
      angle: Math.random() * Math.PI * 2,
      hp: cfg.hp, maxHp: cfg.hp,
      type,
      size: cfg.size,
      baseSpd: cfg.baseSpd, wanderSpd: cfg.wanderSpd, dmgMult: cfg.dmgMult,
      state: 'wander', alertTimer: 0,
      gun: gk, ammo: GUNS[gk].max,
      fireTimer: Math.random() * 2, burstLeft: 0, burstTimer: 0,
      wanderAngle: Math.random() * Math.PI * 2, wanderTimer: 1 + Math.random() * 2,
      dodgeVx: 0, dodgeVy: 0, dodgeTimer: 0,
      stuckTimer: 0.5, lastX: ex, lastY: ey,
      // pathfinding
      path: [], pathTimer: 0,
    });
    return;
  }
}


// ── LOOP ──────────────────────────────────────────────────────────────────

function loop(ts) {
  let dt = Math.min((ts - last) / 1000, 0.05);
  last = ts;
  if (gameActive) { update(dt); render(); }
  requestAnimationFrame(loop);
}


// ── UPDATE ────────────────────────────────────────────────────────────────

function update(dt) {
  updatePlayer(dt);
  updateEnemies(dt);
  updateBullets(dt);
  updateParticles(dt);
  updateCamera();
  updateHUD();
  checkPickupHint();

  // Keep enemy count up
  if (enemies.length < 6) {
    const t = ['red', 'red', 'yellow', 'purple'];
    spawnEnemy(null, t[Math.floor(Math.random() * t.length)]);
  }
}


// ── PLAYER ────────────────────────────────────────────────────────────────

function updatePlayer(dt) {
  // Movement
  let dx = 0, dy = 0;
  if (keys['w'] || keys['arrowup'])    dy -= 1;
  if (keys['s'] || keys['arrowdown'])  dy += 1;
  if (keys['a'] || keys['arrowleft'])  dx -= 1;
  if (keys['d'] || keys['arrowright']) dx += 1;
  if (dx && dy) { dx *= 0.707; dy *= 0.707; }
  player.vx = dx * 160;
  player.vy = dy * 160;
  moveEntity(player, PLAYER_SIZE, dt);

  // Aim
  let wx = mouse.x + camX, wy = mouse.y + camY;
  player.angle = Math.atan2(wy - player.y, wx - player.x);

  // Reload timer
  if (player.reloading) {
    player.reloadTimer -= dt;
    if (player.reloadTimer <= 0) {
      player.ammo[player.gun] = GUNS[player.gun].max;
      player.reloading = false;
    }
  }

  // Burst continuation
  if (player.burstLeft > 0) {
    player.burstTimer -= dt;
    if (player.burstTimer <= 0) {
      shootBullet(player, false);
      player.burstLeft--;
      player.burstTimer = 0.12;
    }
  }

  // Fire
  if (mouseDown && !player.reloading && player.fireTimer <= 0 && player.burstLeft === 0) {
    const g = GUNS[player.gun];
    if (player.ammo[player.gun] > 0) {
      shootBullet(player, false);
      player.ammo[player.gun]--;
      player.burstLeft  = g.burst - 1;
      player.burstTimer = 0.12;
      player.fireTimer  = 1 / g.rpm;
      if (player.ammo[player.gun] <= 0) startReload(player);
    }
  }

  if (player.fireTimer > 0) player.fireTimer -= dt;

  // Manual reload (R)
  if (keys['r'] && !player.reloading && player.ammo[player.gun] < GUNS[player.gun].max)
    startReload(player);
}

function startReload(ent) {
  ent.reloading   = true;
  ent.reloadTimer = GUNS[ent.gun].reload;
}

function shootBullet(owner, isEnemy) {
  const g       = GUNS[owner.gun];
  const dmgMult = isEnemy ? (owner.dmgMult || 1) : 1;
  let   spd     = isEnemy ? ENEMY_SPD : BULLET_SPD;
  if (owner.gun === 'sniper') spd = SNIPER_SPD;

  for (let p = 0; p < g.pellets; p++) {
    const a = owner.angle + (Math.random() - 0.5) * g.spread;
    const b = {
      x: owner.x + Math.cos(owner.angle) * owner.size * 1.3,
      y: owner.y + Math.sin(owner.angle) * owner.size * 1.3,
      vx: Math.cos(a) * spd,
      vy: Math.sin(a) * spd,
      dmg: g.dmg * dmgMult,
      isEnemy,
      explosive: g.explosive || false,
      isSniper: owner.gun === 'sniper',
      life: 2.2,
      trail: [],
    };
    if (isEnemy) eBullets.push(b);
    else         bullets.push(b);
  }

  spawnMuzzleFlash(
    owner.x + Math.cos(owner.angle) * owner.size,
    owner.y + Math.sin(owner.angle) * owner.size
  );
}


// ── ENEMIES ───────────────────────────────────────────────────────────────

function updateEnemies(dt) {
  for (const e of enemies) {
    if (e.hp <= 0) continue;

    const dp     = Math.hypot(player.x - e.x, player.y - e.y);
    const canSee = lineOfSight(e.x, e.y, player.x, player.y);

    // Stuck detection
    e.stuckTimer -= dt;
    if (e.stuckTimer <= 0) {
      const moved = Math.hypot(e.x - e.lastX, e.y - e.lastY);
      if (moved < 6 && e.state !== 'alert') {
        e.wanderAngle = Math.random() * Math.PI * 2;
        e.wanderTimer = 0.4;
        e.dodgeVx = 0;
        e.dodgeVy = 0;
      }
      e.lastX = e.x; e.lastY = e.y; e.stuckTimer = 0.45;
    }

    // State machine
    if (e.state === 'wander') {
      if (canSee && dp < DETECT_RANGE) {
        e.state = 'alert';
        e.alertTimer = 1.0;
      } else {
        e.wanderTimer -= dt;
        if (e.wanderTimer <= 0) {
          e.wanderAngle = Math.random() * Math.PI * 2;
          e.wanderTimer = 1 + Math.random() * 2.5;
        }
        const ma = wallSteer(e, e.wanderAngle);
        e.vx    = Math.cos(ma) * e.wanderSpd;
        e.vy    = Math.sin(ma) * e.wanderSpd;
        moveEntity(e, e.size, dt);
        e.angle = ma;
      }

    } else if (e.state === 'alert') {
      e.alertTimer -= dt;
      e.vx    = 0;
      e.vy    = 0;
      e.angle = Math.atan2(player.y - e.y, player.x - e.x);
      if (e.alertTimer <= 0) e.state = 'chase';

    } else { // chase
      if (!canSee && dp > DETECT_RANGE + 120) e.state = 'wander';

      e.angle = Math.atan2(player.y - e.y, player.x - e.x);
      const pref = GUNS[e.gun].prefDist;

      // Dodge incoming bullets
      e.dodgeTimer -= dt;
      if (e.dodgeTimer <= 0) {
        e.dodgeTimer = 0.3 + Math.random() * 0.5;
        let threat   = null;
        for (const b of bullets) {
          const bx = b.x - e.x, by = b.y - e.y, d = Math.hypot(bx, by);
          if (d < 140 && (b.vx * bx + b.vy * by) / (d || 1) > 0) { threat = b; break; }
        }
        if (threat) {
          const perp = Math.atan2(threat.vy, threat.vx) + Math.PI / 2 * (Math.random() > 0.5 ? 1 : -1);
          e.dodgeVx  = Math.cos(perp) * e.baseSpd * 1.6;
          e.dodgeVy  = Math.sin(perp) * e.baseSpd * 1.6;
        } else {
          e.dodgeVx = 0;
          e.dodgeVy = 0;
        }
      }

      // ── PATHFINDING ────────────────────────────────────────────────────
      // When LOS is blocked, use BFS to navigate around walls.
      // Recompute path every 0.6s or when the current path is exhausted.
      if (!canSee) {
        e.pathTimer -= dt;
        // Advance along existing path waypoints
        if (e.path && e.path.length > 0) {
          const wp = e.path[0];
          if (Math.hypot(wp.x - e.x, wp.y - e.y) < TILE * 0.6) e.path.shift();
        }
        // Recompute if stale or empty
        if (!e.path || e.path.length === 0 || e.pathTimer <= 0) {
          e.path      = findPath(e.x, e.y, player.x, player.y);
          e.pathTimer = 0.6;
        }
      } else {
        // Clear stale path once we have LOS again
        e.path = [];
      }

      // Desired direction: follow path waypoint if available, else direct
      let desired;
      if (!canSee && e.path && e.path.length > 0) {
        const wp = e.path[0];
        desired  = Math.atan2(wp.y - e.y, wp.x - e.x);
      } else {
        if      (dp > pref + 35) desired = e.angle;
        else if (dp < pref - 35) desired = e.angle + Math.PI;
        else                     desired = e.angle + Math.PI / 2 * (Math.sin(Date.now() / 550 + e.x) > 0 ? 1 : -1);
      }
      if (e.dodgeVx || e.dodgeVy) desired = Math.atan2(e.dodgeVy, e.dodgeVx);

      const steered = wallSteer(e, desired);
      e.vx = Math.cos(steered) * e.baseSpd;
      e.vy = Math.sin(steered) * e.baseSpd;
      moveEntity(e, e.size, dt);

      // Shoot player if visible
      if (canSee) {
        e.fireTimer -= dt;
        if (e.burstLeft > 0) {
          e.burstTimer -= dt;
          if (e.burstTimer <= 0) {
            shootBullet(e, true);
            e.burstLeft--;
            e.burstTimer = 0.12;
          }
        }
        const g = GUNS[e.gun];
        if (e.fireTimer <= 0 && e.ammo > 0 && e.burstLeft === 0) {
          shootBullet(e, true);
          e.ammo--;
          e.burstLeft  = g.burst - 1;
          e.burstTimer = 0.12;
          e.fireTimer  = 1 / g.rpm;
          if (e.ammo <= 0) { e.ammo = g.max; e.fireTimer += g.reload; }
        }
      }
    }

    // Contact damage (continuous)
    if (dp < PLAYER_SIZE + e.size) {
      player.hp -= 6 * (e.dmgMult) * dt * 60;
      spawnBlood(player.x, player.y, 1);
      if (player.hp <= 0) endGame();
    }
  }

  // Remove dead enemies, award kills
  enemies = enemies.filter(e => {
    if (e.hp <= 0) {
      kills++;
      const col = e.type === 'purple' ? '#cc44ff' : e.type === 'yellow' ? '#ffee44' : '#ff4444';
      spawnDeathParticles(e.x, e.y, col);
      document.getElementById('kill-counter').textContent = `ELIMINATED: ${kills}`;
      return false;
    }
    return true;
  });
}

// Wall-avoidance steering: probe ahead and deflect if blocked
function wallSteer(e, desired) {
  const probeLen = e.size * 3.8;
  if (!probeHit(e.x, e.y, desired, probeLen, e.size)) return desired;
  const offsets = [0.45, -0.45, 0.9, -0.9, 1.3, -1.3, Math.PI * 0.65, -Math.PI * 0.65, Math.PI];
  for (const o of offsets) {
    const a = desired + o;
    if (!probeHit(e.x, e.y, a, probeLen, e.size)) return a;
  }
  return desired + Math.PI;
}

function probeHit(x, y, a, len, r) {
  for (let i = 1; i <= 5; i++) {
    const t = i / 5;
    if (collidesWalls(x + Math.cos(a) * len * t, y + Math.sin(a) * len * t, r)) return true;
  }
  return false;
}


// ── BULLETS ───────────────────────────────────────────────────────────────

function updateBullets(dt) {
  for (const b of [...bullets, ...eBullets]) {
    b.trail.push({ x: b.x, y: b.y });
    if (b.trail.length > 8) b.trail.shift();

    b.x    += b.vx * dt;
    b.y    += b.vy * dt;
    b.life -= dt;

    if (b.life <= 0) { b.dead = true; continue; }

    if (collidesWalls(b.x, b.y, 4)) {
      if (b.explosive) explode(b.x, b.y, b.isEnemy);
      b.dead = true;
      spawnSpark(b.x, b.y);
      continue;
    }

    if (!b.isEnemy) {
      for (const e of enemies) {
        if (e.hp <= 0) continue;
        if (Math.hypot(b.x - e.x, b.y - e.y) < e.size + 4) {
          if (b.explosive) explode(b.x, b.y, false);
          else             { e.hp -= b.dmg; spawnBlood(e.x, e.y, 3); }
          b.dead = true;
          break;
        }
      }
    } else {
      if (Math.hypot(b.x - player.x, b.y - player.y) < PLAYER_SIZE + 4) {
        if (b.explosive) explode(b.x, b.y, true);
        else             { player.hp -= b.dmg; spawnBlood(player.x, player.y, 3); }
        b.dead = true;
        if (player.hp <= 0) endGame();
      }
    }
  }

  bullets  = bullets.filter(b => !b.dead);
  eBullets = eBullets.filter(b => !b.dead);
}

function explode(x, y, _hurtPlayer) {
  // Inner fireball
  for (let i = 0; i < 40; i++) {
    particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 480,
      vy: (Math.random() - 0.5) * 480,
      life: 0.9, maxLife: 0.9,
      r: 4 + Math.random() * 8,
      color: `hsl(${10 + Math.random() * 40}, 100%, ${50 + Math.random() * 30}%)`,
    });
  }
  // Smoke ring
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    particles.push({
      x, y,
      vx: Math.cos(a) * (60 + Math.random() * 80),
      vy: Math.sin(a) * (60 + Math.random() * 80),
      life: 1.1, maxLife: 1.1,
      r: 6 + Math.random() * 6,
      color: `rgba(80,80,80,0.7)`,
    });
  }
  // Shockwave ring — expands to exactly match blast radius (140px)
  particles.push({
    x, y,
    vx: 0, vy: 0,
    life: 0.35, maxLife: 0.35,
    r: 0,         // radius grows in drawParticles via special ring flag
    color: '#ff8833',
    isShockwave: true,
    shockwaveMaxR: 140,
  });

  const R = 140;

  for (const e of enemies) {
    const dist = Math.hypot(e.x - x, e.y - y);
    if (dist < R) {
      const falloff = 1 - (dist / R) * 0.7;
      e.hp -= 75 * falloff;
      spawnBlood(e.x, e.y, 4);
    }
  }

  const playerDist = Math.hypot(player.x - x, player.y - y);
  if (playerDist < R) {
    const falloff = 1 - (playerDist / R) * 0.7;
    player.hp -= 75 * falloff;
    spawnBlood(player.x, player.y, 4);
    if (player.hp <= 0) endGame();
  }
}


// ── COLLISION ─────────────────────────────────────────────────────────────

function moveEntity(e, r, dt) {
  const nx = e.x + e.vx * dt;
  const ny = e.y + e.vy * dt;
  if (!collidesWalls(nx, e.y, r)) e.x = nx;
  if (!collidesWalls(e.x, ny, r)) e.y = ny;
  e.x = Math.max(r, Math.min(W - r, e.x));
  e.y = Math.max(r, Math.min(H - r, e.y));
}

function collidesWalls(x, y, r) {
  for (const w of walls)
    if (x + r > w.x && x - r < w.x + w.w && y + r > w.y && y - r < w.y + w.h) return true;
  return false;
}

function lineOfSight(x1, y1, x2, y2) {
  for (let i = 1; i < 32; i++) {
    const t = i / 32, x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t;
    for (const w of walls)
      if (x > w.x && x < w.x + w.w && y > w.y && y < w.y + w.h) return false;
  }
  return true;
}


// ── PICKUP ────────────────────────────────────────────────────────────────

function tryPickup() {
  if (!gameActive) return;
  for (const c of crates) {
    if (!c.available) continue;
    if (Math.hypot(player.x - c.x, player.y - c.y) < TILE) {
      player.gun       = c.gun;
      player.reloading = false;
      player.fireTimer = 0;
      player.burstLeft = 0;
      player.ammo[c.gun] = GUNS[c.gun].max;
      c.available = false;
      setTimeout(() => c.available = true, 15000);
      updateHUD();
      break;
    }
  }
}

function checkPickupHint() {
  const near = crates.some(c => c.available && Math.hypot(player.x - c.x, player.y - c.y) < TILE);
  document.getElementById('pick-hint').style.display = near ? 'block' : 'none';
}


// ── PARTICLES ─────────────────────────────────────────────────────────────

function spawnBlood(x, y, n = 6) {
  for (let i = 0; i < n; i++)
    particles.push({ x, y, vx: (Math.random() - 0.5) * 180, vy: (Math.random() - 0.5) * 180, life: 0.35, maxLife: 0.35, r: 2 + Math.random() * 3, color: '#cc2222' });
}

function spawnDeathParticles(x, y, col) {
  for (let i = 0; i < 18; i++)
    particles.push({ x, y, vx: (Math.random() - 0.5) * 270, vy: (Math.random() - 0.5) * 270, life: 0.8, maxLife: 0.8, r: 2 + Math.random() * 5, color: col });
}

function spawnSpark(x, y) {
  for (let i = 0; i < 5; i++)
    particles.push({ x, y, vx: (Math.random() - 0.5) * 230, vy: (Math.random() - 0.5) * 230, life: 0.2, maxLife: 0.2, r: 1.5, color: '#ffcc44' });
}

function spawnMuzzleFlash(x, y) {
  for (let i = 0; i < 4; i++)
    particles.push({ x, y, vx: (Math.random() - 0.5) * 130, vy: (Math.random() - 0.5) * 130, life: 0.08, maxLife: 0.08, r: 2 + Math.random() * 3, color: '#ffee88' });
}

function updateParticles(dt) {
  for (const p of particles) {
    p.x    += p.vx * dt;
    p.y    += p.vy * dt;
    p.life -= dt;
    p.vx   *= 0.83;
    p.vy   *= 0.83;
  }
  particles = particles.filter(p => p.life > 0);
}


// ── HUD ───────────────────────────────────────────────────────────────────

function updateHUD() {
  document.getElementById('health-bar').style.width =
    Math.max(0, player.hp / player.maxHp * 100) + '%';

  const g = GUNS[player.gun];
  document.getElementById('weapon-name').textContent  = g.name;
  document.getElementById('ammo-display').textContent = `${player.ammo[player.gun]} / ${g.max}`;
  document.getElementById('reload-msg').style.display = player.reloading ? 'block' : 'none';
}


// ── CAMERA ────────────────────────────────────────────────────────────────

function updateCamera() {
  let tx = player.x - canvas.width  / 2;
  let ty = player.y - canvas.height / 2;
  tx = Math.max(0, Math.min(W - canvas.width,  tx));
  ty = Math.max(0, Math.min(H - canvas.height, ty));
  camX += (tx - camX) * 0.12;
  camY += (ty - camY) * 0.12;
}


// ── RENDER ────────────────────────────────────────────────────────────────

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(-camX, -camY);

  drawFloor();
  drawWalls();
  drawCrates();
  drawParticles();
  drawBullets();
  drawEnemies();
  drawPlayer();
  drawCrosshair();

  ctx.restore();
}

function drawFloor() {
  ctx.fillStyle = '#0d0d18';
  ctx.fillRect(TILE, TILE, (COLS - 2) * TILE, (ROWS - 2) * TILE);

  ctx.strokeStyle = '#161628';
  ctx.lineWidth   = 1;
  for (let x = TILE; x <= (COLS - 1) * TILE; x += TILE) {
    ctx.beginPath(); ctx.moveTo(x, TILE); ctx.lineTo(x, (ROWS - 1) * TILE); ctx.stroke();
  }
  for (let y = TILE; y <= (ROWS - 1) * TILE; y += TILE) {
    ctx.beginPath(); ctx.moveTo(TILE, y); ctx.lineTo((COLS - 1) * TILE, y); ctx.stroke();
  }
}

function drawWalls() {
  for (const w of walls) {
    ctx.fillStyle   = '#1a1a30';
    ctx.fillRect(w.x, w.y, w.w, w.h);
    ctx.strokeStyle = '#3344aa';
    ctx.lineWidth   = 1.5;
    ctx.strokeRect(w.x + 1, w.y + 1, w.w - 2, w.h - 2);
    ctx.fillStyle   = '#2233aa44';
    ctx.fillRect(w.x, w.y, w.w, 4);
  }
}

function drawCrates() {
  for (const c of crates) {
    if (!c.available) {
      ctx.strokeStyle = '#332211';
      ctx.lineWidth   = 1.5;
      ctx.strokeRect(c.x - 14, c.y - 14, 28, 28);
      continue;
    }
    const glow = 0.5 + 0.5 * Math.sin(Date.now() / 500);
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.fillStyle   = '#2a1a06';
    ctx.fillRect(-15, -15, 30, 30);
    ctx.strokeStyle = `rgba(255, 180, 60, ${0.6 + 0.4 * glow})`;
    ctx.lineWidth   = 2;
    ctx.strokeRect(-15, -15, 30, 30);
    ctx.strokeStyle = `rgba(200, 120, 30, ${0.4 + 0.3 * glow})`;
    ctx.lineWidth   = 1;
    ctx.beginPath(); ctx.moveTo(-15, 0); ctx.lineTo(15, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, -15); ctx.lineTo(0, 15); ctx.stroke();
    ctx.fillStyle      = `rgba(255, 200, 80, ${0.8 + 0.2 * glow})`;
    ctx.font           = 'bold 7px Courier New';
    ctx.textAlign      = 'center';
    ctx.textBaseline   = 'middle';
    ctx.fillText(GUNS[c.gun].name.slice(0, 3), 0, 0);
    ctx.restore();
  }
}

function drawBullets() {
  for (const b of [...bullets, ...eBullets]) {
    const col = b.isSniper
      ? (b.isEnemy ? '#ff44ff' : '#44ffff')
      : (b.isEnemy ? '#ff6622' : '#44eeff');

    if (b.trail.length > 1) {
      const gc = ctx.createLinearGradient(b.trail[0].x, b.trail[0].y, b.x, b.y);
      gc.addColorStop(0, 'transparent');
      gc.addColorStop(1, col);
      ctx.strokeStyle = gc;
      ctx.lineWidth   = b.explosive ? 4 : b.isSniper ? 3 : 2;
      ctx.beginPath();
      ctx.moveTo(b.trail[0].x, b.trail[0].y);
      for (const t of b.trail) ctx.lineTo(t.x, t.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    ctx.fillStyle   = col;
    ctx.shadowColor = col;
    ctx.shadowBlur  = b.isSniper ? 14 : 6;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.explosive ? 5 : b.isSniper ? 3.5 : 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

function drawEnemies() {
  for (const e of enemies) {
    if (e.hp <= 0) continue;

    ctx.save();
    ctx.translate(e.x, e.y);

    // Glow when alerted / chasing
    const alertGlow = e.state === 'chase' ? 1 : e.state === 'alert' ? 0.5 : 0;
    if (alertGlow > 0) {
      ctx.shadowColor = e.type === 'purple'
        ? `rgba(180, 60, 255, ${alertGlow})`
        : e.type === 'yellow'
          ? `rgba(255, 220, 0, ${alertGlow})`
          : `rgba(255, 60, 0, ${alertGlow})`;
      ctx.shadowBlur = 18;
    }

    ctx.rotate(e.angle);

    if (e.type === 'purple') {
      // Circle body
      const col = e.state === 'chase' ? '#aa22ff' : e.state === 'alert' ? '#cc66ff' : '#771acc';
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.arc(0, 0, e.size, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#dd88ff'; ctx.lineWidth = 2; ctx.stroke();
      // Eye
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(e.size * 0.4, 0, e.size * 0.28, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#220033'; ctx.beginPath(); ctx.arc(e.size * 0.52, 0, e.size * 0.13, 0, Math.PI * 2); ctx.fill();
      // Barrel
      ctx.fillStyle = '#cc88ff'; ctx.fillRect(e.size - 2, -2, 12, 4);
    } else {
      // Triangle body (red / yellow)
      const col = e.type === 'yellow'
        ? (e.state === 'chase' ? '#ffee00' : e.state === 'alert' ? '#ffcc44' : '#ccaa00')
        : (e.state === 'chase' ? '#ff2200' : e.state === 'alert' ? '#ff6600' : '#cc2200');
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.moveTo(e.size, 0);
      ctx.lineTo(-e.size, -e.size * 0.75);
      ctx.lineTo(-e.size,  e.size * 0.75);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = e.type === 'yellow' ? '#ffee88' : '#ff8866';
      ctx.lineWidth   = 1.5;
      ctx.stroke();
      // Barrel
      ctx.fillStyle = e.type === 'yellow' ? '#ffee88' : '#ff9944';
      ctx.fillRect(e.size - 2, -2, 10, 4);
    }

    ctx.shadowBlur = 0;
    ctx.restore();

    // HP bar (only when damaged)
    if (e.hp < e.maxHp) {
      const bw = e.size * 2.4, bh = 4;
      ctx.fillStyle = '#220000';
      ctx.fillRect(e.x - bw / 2, e.y - e.size - 13, bw, bh);
      const hcol = e.type === 'purple' ? '#aa44ff' : e.type === 'yellow' ? '#ffee00' : '#ff3300';
      ctx.fillStyle = hcol;
      ctx.fillRect(e.x - bw / 2, e.y - e.size - 13, bw * (e.hp / e.maxHp), bh);
    }
  }
}

function drawPlayer() {
  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.rotate(player.angle);

  const s = PLAYER_SIZE;
  ctx.shadowColor = '#4466ff';
  ctx.shadowBlur  = 20;

  // Body
  ctx.fillStyle   = '#1133cc';
  ctx.fillRect(-s, -s, s * 2, s * 2);
  ctx.strokeStyle = '#88aaff';
  ctx.lineWidth   = 2;
  ctx.strokeRect(-s, -s, s * 2, s * 2);
  ctx.fillStyle   = '#2244ee';
  ctx.fillRect(-s * 0.4, -s * 0.4, s * 0.8, s * 0.8);

  ctx.shadowBlur = 0;

  // ── Gun barrel — distinct per weapon ──
  drawGunBarrel(player.gun, s);

  ctx.restore();
}

// Draws the gun barrel at origin (already translated + rotated to owner's frame)
// bodyEdge = distance from centre to the front face of the body
function drawGunBarrel(gun, bodyEdge) {
  const bx = bodyEdge - 2; // start just at body front

  switch (gun) {

    case 'pistol':
      // Short stubby rectangle
      ctx.fillStyle = '#aabbff';
      ctx.fillRect(bx, -3, 14, 6);
      break;

    case 'rifle':
      // 1.5× pistol length, darker blue-grey, thin
      ctx.fillStyle = '#556688';
      ctx.fillRect(bx, -2.5, 21, 5);
      // Dark sight rail on top
      ctx.fillStyle = '#334455';
      ctx.fillRect(bx + 4, -4, 12, 2);
      break;

    case 'sniper':
      // 2× pistol length, light silver, very thin
      ctx.fillStyle = '#ccddee';
      ctx.fillRect(bx, -2, 28, 4);
      // Scope block
      ctx.fillStyle = '#aabbcc';
      ctx.fillRect(bx + 6, -5, 10, 3);
      // Suppressor tip
      ctx.fillStyle = '#ddeeff';
      ctx.fillRect(bx + 24, -3, 5, 6);
      break;

    case 'shotgun': {
      // Wide cone — two diverging barrels
      ctx.fillStyle = '#cc8833';
      // Left barrel
      ctx.save();
      ctx.rotate(-0.12);
      ctx.fillRect(bx, -4, 16, 4);
      ctx.restore();
      // Right barrel
      ctx.save();
      ctx.rotate(0.12);
      ctx.fillRect(bx, 0, 16, 4);
      ctx.restore();
      // Receiver block between them
      ctx.fillStyle = '#aa6622';
      ctx.fillRect(bx, -3, 7, 6);
      break;
    }

    case 'rocket': {
      // 2× pistol width and height — big chunky tube
      ctx.fillStyle = '#886600';
      ctx.fillRect(bx, -6, 28, 12);
      // Darker housing band
      ctx.fillStyle = '#554400';
      ctx.fillRect(bx + 8, -7, 6, 14);
      // Exhaust nozzle at back
      ctx.fillStyle = '#cc4400';
      ctx.fillRect(bx - 5, -5, 5, 10);
      // Nose tip
      ctx.fillStyle = '#ffaa00';
      ctx.beginPath();
      ctx.moveTo(bx + 28, 0);
      ctx.lineTo(bx + 22, -6);
      ctx.lineTo(bx + 22, 6);
      ctx.closePath();
      ctx.fill();
      break;
    }
  }
}

function drawCrosshair() {
  const wx = mouse.x + camX, wy = mouse.y + camY;
  ctx.strokeStyle = 'rgba(255,255,255,0.85)';
  ctx.lineWidth   = 1.5;
  ctx.beginPath(); ctx.moveTo(wx - 10, wy); ctx.lineTo(wx + 10, wy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(wx, wy - 10); ctx.lineTo(wx, wy + 10); ctx.stroke();
  ctx.beginPath(); ctx.arc(wx, wy, 5, 0, Math.PI * 2); ctx.stroke();
}

function drawParticles() {
  for (const p of particles) {
    const t = p.life / p.maxLife;
    ctx.globalAlpha = t;

    if (p.isShockwave) {
      // Expanding ring that matches the blast radius exactly
      const radius = p.shockwaveMaxR * (1 - t);
      ctx.strokeStyle = p.color;
      ctx.lineWidth   = 3 * t;
      ctx.shadowColor = p.color;
      ctx.shadowBlur  = 12 * t;
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
    } else {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * t, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}


// ── END ───────────────────────────────────────────────────────────────────

function endGame() {
  gameActive = false;
  player.hp  = 0;
  document.getElementById('final-score').textContent    = `ELIMINATED: ${kills}`;
  document.getElementById('game-over').style.display    = 'flex';
}

function restartGame() {
  setupGame();
}

// Expose to inline onclick in HTML
window.restartGame = restartGame;

// Kick everything off
window.onload = init;