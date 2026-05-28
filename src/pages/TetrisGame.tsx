import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './TetrisGame.css';

// ═══════════════════════════════════════════════════════════════════
//  TETRIS — React-wrapped canvas game
//  All imperative game logic lives inside a single useEffect.
// ═══════════════════════════════════════════════════════════════════

const COLS = 10, ROWS = 20, SZ = 30;

const PIECES: Record<string, { c: string; r: number[][][] }> = {
  I: { c:'#06b6d4', r:[ [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]], [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]], [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]], [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]] ]},
  O: { c:'#eab308', r:[ [[1,1],[1,1]] ]},
  T: { c:'#a855f7', r:[ [[0,1,0],[1,1,1],[0,0,0]], [[0,1,0],[0,1,1],[0,1,0]], [[0,0,0],[1,1,1],[0,1,0]], [[0,1,0],[1,1,0],[0,1,0]] ]},
  S: { c:'#22c55e', r:[ [[0,1,1],[1,1,0],[0,0,0]], [[0,1,0],[0,1,1],[0,0,1]], [[0,0,0],[0,1,1],[1,1,0]], [[1,0,0],[1,1,0],[0,1,0]] ]},
  Z: { c:'#ef4444', r:[ [[1,1,0],[0,1,1],[0,0,0]], [[0,0,1],[0,1,1],[0,1,0]], [[0,0,0],[1,1,0],[0,1,1]], [[0,1,0],[1,1,0],[1,0,0]] ]},
  J: { c:'#3b82f6', r:[ [[1,0,0],[1,1,1],[0,0,0]], [[0,1,1],[0,1,0],[0,1,0]], [[0,0,0],[1,1,1],[0,0,1]], [[0,1,0],[0,1,0],[1,1,0]] ]},
  L: { c:'#f97316', r:[ [[0,0,1],[1,1,1],[0,0,0]], [[0,1,0],[0,1,0],[0,1,1]], [[0,0,0],[1,1,1],[1,0,0]], [[1,1,0],[0,1,0],[0,1,0]] ]}
};

const PKEYS = Object.keys(PIECES);
const SCORE_TABLE = [0, 40, 100, 300, 1200];
const LINE_LABELS = ['', 'Single', 'Double', 'Triple', 'Tetris'];
const SPEEDS = [800,717,633,550,467,383,300,217,133,100,83,83,83,67,67,67,50,50,50,33];
const KICKS: [number, number][] = [[0,0],[-1,0],[1,0],[0,-1],[-1,-1],[1,-1],[2,0],[-2,0]];

export default function TetrisGame() {
  const gcRef = useRef<HTMLCanvasElement>(null);
  const ncRef = useRef<HTMLCanvasElement>(null);
  const hcRef = useRef<HTMLCanvasElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const hiRef = useRef<HTMLDivElement>(null);
  const levelRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const ovStartRef = useRef<HTMLDivElement>(null);
  const ovOverRef = useRef<HTMLDivElement>(null);
  const ovPauseRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const goScoreRef = useRef<HTMLSpanElement>(null);
  const goLinesRef = useRef<HTMLSpanElement>(null);
  const goLevelRef = useRef<HTMLSpanElement>(null);

  // Stable callback refs so JSX buttons can call into the effect closure
  const startGameRef = useRef<() => void>(() => {});
  const togglePauseRef = useRef<() => void>(() => {});

  useEffect(() => {
    const gc = gcRef.current!;
    const gx = gc.getContext('2d')!;
    const nc = ncRef.current!;
    const nx = nc.getContext('2d')!;
    const hc = hcRef.current!;
    const hx = hc.getContext('2d')!;

    // ── Game state ───────────────────────────────────
    let board: (string | null)[][];
    let bag: string[], curKey: string, curX: number, curY: number, curR: number;
    let nxtKey: string, holdKey: string | null, holdUsed: boolean;
    let score: number, hiScore: number, level: number, lines: number;
    let running: boolean, paused: boolean, dead: boolean;
    let dropAcc: number, lastTs: number;
    let flashRows: number[], flashMs: number, afterFlash: (() => void) | null;
    let raf: number;
    let dasDir = 0, dasDelay: ReturnType<typeof setTimeout> | null = null;
    let dasFire: ReturnType<typeof setInterval> | null = null;
    let sdFire: ReturnType<typeof setInterval> | null = null;
    let flashMsgTimer: ReturnType<typeof setTimeout> | null = null;
    const heldKeys: Record<string, boolean> = {};

    // ── Helpers ──────────────────────────────────────
    function shuffledBag() {
      const b = [...PKEYS];
      for (let i = b.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        [b[i], b[j]] = [b[j], b[i]];
      }
      return b;
    }
    function dequeue() { if (!bag.length) bag = shuffledBag(); return bag.pop()!; }
    function getShape(key: string, rot: number) {
      const rots = PIECES[key].r;
      return rots[((rot % rots.length) + rots.length) % rots.length];
    }
    function collides(key: string, rot: number, x: number, y: number) {
      const s = getShape(key, rot);
      for (let r = 0; r < s.length; r++) {
        for (let c = 0; c < s[r].length; c++) {
          if (!s[r][c]) continue;
          const cx = x + c, cy = y + r;
          if (cx < 0 || cx >= COLS || cy >= ROWS) return true;
          if (cy >= 0 && board[cy][cx]) return true;
        }
      }
      return false;
    }
    function tryRotate(dir: number) {
      const rots = PIECES[curKey].r.length;
      const newR = ((curR + dir) % rots + rots) % rots;
      for (const [dx, dy] of KICKS) {
        if (!collides(curKey, newR, curX + dx, curY + dy)) {
          curX += dx; curY += dy; curR = newR; return;
        }
      }
    }
    function ghostY() { let gy = curY; while (!collides(curKey, curR, curX, gy + 1)) gy++; return gy; }

    // ── Core logic ───────────────────────────────────
    function show(el: HTMLDivElement | null) { el?.classList.remove('tetris-overlay-off'); }
    function hide(el: HTMLDivElement | null) { el?.classList.add('tetris-overlay-off'); }

    function updateHUD() {
      if (scoreRef.current) scoreRef.current.textContent = String(score);
      if (hiRef.current) hiRef.current.textContent = String(hiScore);
      if (levelRef.current) levelRef.current.textContent = String(level);
      if (linesRef.current) linesRef.current.textContent = String(lines);
    }

    function showFlash(text: string, color: string) {
      const el = flashRef.current;
      if (!el) return;
      el.textContent = text;
      el.style.color = color;
      el.style.top = '45%';
      el.style.opacity = '1';
      if (flashMsgTimer) clearTimeout(flashMsgTimer);
      flashMsgTimer = setTimeout(() => { el.style.opacity = '0'; }, 800);
    }

    function spawnPiece() {
      curKey = nxtKey; nxtKey = dequeue(); curR = 0; holdUsed = false;
      const s = getShape(curKey, 0);
      curX = ((COLS - s[0].length) / 2) | 0; curY = -1;
      if (collides(curKey, 0, curX, curY + 1) && collides(curKey, 0, curX, curY)) triggerGameOver();
    }

    function lockPiece() {
      const s = getShape(curKey, curR);
      let blocked = false;
      for (let r = 0; r < s.length; r++) {
        for (let c = 0; c < s[r].length; c++) {
          if (!s[r][c]) continue;
          const cy = curY + r, cx = curX + c;
          if (cy < 0) { blocked = true; continue; }
          board[cy][cx] = PIECES[curKey].c;
        }
      }
      if (blocked) { triggerGameOver(); return; }
      processLines();
    }

    function processLines() {
      const full: number[] = [];
      for (let r = 0; r < ROWS; r++) {
        if (board[r].every(c => c !== null)) full.push(r);
      }
      if (full.length > 0) {
        score += SCORE_TABLE[full.length] * level;
        lines += full.length;
        const newLevel = Math.floor(lines / 10) + 1;
        if (newLevel > level) level = newLevel;
        if (score > hiScore) { hiScore = score; try { localStorage.setItem('thi_min', String(hiScore)); } catch(e) {} }
        updateHUD();
        if (full.length === 4) showFlash('Tetris', '#2563eb');
        else if (full.length > 1) showFlash(LINE_LABELS[full.length], '#111111');
        flashRows = full; flashMs = 150;
        afterFlash = () => {
          for (const fr of full) { board.splice(fr, 1); board.unshift(Array(COLS).fill(null)); }
          flashRows = []; spawnPiece();
        };
      } else { spawnPiece(); }
    }

    function doHold() {
      if (holdUsed) return;
      holdUsed = true;
      if (holdKey === null) { holdKey = curKey; spawnPiece(); }
      else {
        const tmp = holdKey; holdKey = curKey; curKey = tmp; curR = 0;
        const s = getShape(curKey, 0);
        curX = ((COLS - s[0].length) / 2) | 0; curY = -1;
      }
    }

    function doSoftDrop() {
      if (flashRows.length) return;
      if (!collides(curKey, curR, curX, curY + 1)) { curY++; score += 1; updateHUD(); }
      else { lockPiece(); }
    }

    function doHardDrop() {
      if (flashRows.length) return;
      const gy = ghostY();
      score += (gy - curY) * 2; curY = gy; updateHUD(); lockPiece();
    }

    // ── Drawing ──────────────────────────────────────
    function drawBlock(ctx: CanvasRenderingContext2D, bx: number, by: number, color: string, sz: number, alpha: number) {
      const p = 1;
      ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = color;
      ctx.fillRect(bx * sz + p, by * sz + p, sz - p * 2, sz - p * 2);
      ctx.restore();
    }

    function drawBoard() {
      gx.fillStyle = '#fafafa'; gx.fillRect(0, 0, gc.width, gc.height);
      gx.strokeStyle = '#e5e7eb'; gx.lineWidth = 1;
      for (let c = 0; c <= COLS; c++) { gx.beginPath(); gx.moveTo(c * SZ, 0); gx.lineTo(c * SZ, gc.height); gx.stroke(); }
      for (let r = 0; r <= ROWS; r++) { gx.beginPath(); gx.moveTo(0, r * SZ); gx.lineTo(gc.width, r * SZ); gx.stroke(); }
      const fset = new Set(flashRows);
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (!board[r][c]) continue;
          if (fset.has(r)) drawBlock(gx, c, r, '#111111', SZ, 1);
          else drawBlock(gx, c, r, board[r][c]!, SZ, 1);
        }
      }
    }

    function drawGhost() {
      const gy = ghostY();
      if (gy === curY) return;
      const s = getShape(curKey, curR);
      for (let r = 0; r < s.length; r++) {
        for (let c = 0; c < s[r].length; c++) {
          if (!s[r][c]) continue;
          const dx = curX + c, dy = gy + r;
          if (dy < 0 || dy >= ROWS) continue;
          gx.fillStyle = '#e5e7eb';
          gx.fillRect(dx * SZ + 1, dy * SZ + 1, SZ - 2, SZ - 2);
        }
      }
    }

    function drawCurrent() {
      const s = getShape(curKey, curR);
      const col = PIECES[curKey].c;
      for (let r = 0; r < s.length; r++) {
        for (let c = 0; c < s[r].length; c++) {
          if (!s[r][c]) continue;
          const dx = curX + c, dy = curY + r;
          if (dy >= 0 && dy < ROWS) drawBlock(gx, dx, dy, col, SZ, 1);
        }
      }
    }

    function drawMini(ctx: CanvasRenderingContext2D, can: HTMLCanvasElement, key: string | null) {
      ctx.clearRect(0, 0, can.width, can.height);
      if (!key) return;
      const s = PIECES[key].r[0];
      const col = PIECES[key].c;
      const bs = 16;
      const W = s[0].length, H = s.length;
      const ox = ((can.width - W * bs) / 2) | 0;
      const oy = ((can.height - H * bs) / 2) | 0;
      for (let r = 0; r < H; r++) {
        for (let c = 0; c < W; c++) {
          if (!s[r][c]) continue;
          const px = ox + c * bs, py = oy + r * bs, p = 1;
          ctx.fillStyle = col;
          ctx.fillRect(px + p, py + p, bs - p * 2, bs - p * 2);
        }
      }
    }

    // ── Game loop ────────────────────────────────────
    function loop(ts: number) {
      if (!running || paused) return;
      const dt = Math.min(ts - lastTs, 100); lastTs = ts;
      if (flashRows.length > 0) {
        flashMs -= dt;
        if (flashMs <= 0) { afterFlash && afterFlash(); afterFlash = null; }
      } else {
        dropAcc += dt;
        const spd = SPEEDS[Math.min(level - 1, SPEEDS.length - 1)];
        if (dropAcc >= spd) {
          dropAcc -= spd;
          if (!collides(curKey, curR, curX, curY + 1)) curY++;
          else lockPiece();
        }
      }
      drawBoard();
      if (!flashRows.length) { drawGhost(); drawCurrent(); }
      drawMini(nx, nc, nxtKey); drawMini(hx, hc, holdKey);
      raf = requestAnimationFrame(loop);
    }

    // ── DAS / Soft drop ──────────────────────────────
    function startDAS(dir: number) {
      stopDAS(); dasDir = dir;
      dasDelay = setTimeout(() => {
        dasFire = setInterval(() => {
          if (!running || paused || flashRows.length) return;
          if (!collides(curKey, curR, curX + dasDir, curY)) curX += dasDir;
        }, 48);
      }, 175);
    }
    function stopDAS() { if (dasDelay) clearTimeout(dasDelay); if (dasFire) clearInterval(dasFire); dasDelay = dasFire = null; }
    function startSD() { stopSD(); sdFire = setInterval(() => { if (!running || paused || flashRows.length) return; doSoftDrop(); }, 50); }
    function stopSD() { if (sdFire) clearInterval(sdFire); sdFire = null; }

    // ── Lifecycle ────────────────────────────────────
    function initGame() {
      board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
      bag = []; flashRows = []; flashMs = 0; afterFlash = null;
      score = 0; level = 1; lines = 0; holdKey = null; holdUsed = false; dropAcc = 0;
      try { hiScore = parseInt(localStorage.getItem('thi_min') || '0') || 0; } catch(e) { hiScore = 0; }
      nxtKey = dequeue(); spawnPiece(); updateHUD();
    }

    function startGame() {
      cancelAnimationFrame(raf); stopDAS(); stopSD(); initGame();
      running = true; paused = false; dead = false;
      hide(ovStartRef.current); hide(ovOverRef.current); hide(ovPauseRef.current);
      lastTs = performance.now(); raf = requestAnimationFrame(loop);
    }
    startGameRef.current = startGame;

    function triggerGameOver() {
      running = false; dead = true;
      if (score > hiScore) { hiScore = score; try { localStorage.setItem('thi_min', String(hiScore)); } catch(e) {} updateHUD(); }
      if (goScoreRef.current) goScoreRef.current.textContent = String(score);
      if (goLinesRef.current) goLinesRef.current.textContent = String(lines);
      if (goLevelRef.current) goLevelRef.current.textContent = String(level);
      show(ovOverRef.current);
    }

    function togglePause() {
      if (!running || dead) return;
      paused = !paused;
      if (paused) { show(ovPauseRef.current); stopDAS(); stopSD(); }
      else { hide(ovPauseRef.current); lastTs = performance.now(); raf = requestAnimationFrame(loop); }
    }
    togglePauseRef.current = togglePause;

    // ── Keyboard ─────────────────────────────────────
    function onKeyDown(e: KeyboardEvent) {
      if (heldKeys[e.code]) return;
      heldKeys[e.code] = true;
      if (e.code === 'KeyP') { togglePause(); e.preventDefault(); return; }
      if (!running || paused || dead || flashRows.length > 0) return;
      switch (e.code) {
        case 'ArrowLeft': if (!collides(curKey, curR, curX - 1, curY)) curX--; startDAS(-1); e.preventDefault(); break;
        case 'ArrowRight': if (!collides(curKey, curR, curX + 1, curY)) curX++; startDAS(1); e.preventDefault(); break;
        case 'ArrowUp': tryRotate(1); e.preventDefault(); break;
        case 'KeyZ': tryRotate(-1); e.preventDefault(); break;
        case 'ArrowDown': doSoftDrop(); startSD(); e.preventDefault(); break;
        case 'Space': doHardDrop(); e.preventDefault(); break;
        case 'KeyC': case 'ShiftLeft': case 'ShiftRight': doHold(); e.preventDefault(); break;
      }
    }

    function onKeyUp(e: KeyboardEvent) {
      heldKeys[e.code] = false;
      if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') stopDAS();
      if (e.code === 'ArrowDown') stopSD();
    }

    // ── Wire up ──────────────────────────────────────
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    // Load high score on mount
    try { const saved = parseInt(localStorage.getItem('thi_min') || '0') || 0; if (hiRef.current) hiRef.current.textContent = String(saved); } catch(e) {}

    // ── Cleanup ──────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      stopDAS(); stopSD();
      if (flashMsgTimer) clearTimeout(flashMsgTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return (
    <div className="tetris-page">
      {/* Back link — mirrors ProjectDetails.tsx pattern */}
      <div className="w-full max-w-[900px]">
        <Link
          to="/arcade"
          className="text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-2 text-sm font-semibold mb-8"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Archive
        </Link>
      </div>

      <div className="tetris-game-area">
        {/* Header */}
        <div className="tetris-header">
          <p className="tetris-eyebrow">Interactive Archive 01</p>
          <h1 className="tetris-title">
            Classic{' '}
            <span className="font-editorial italic tetris-title-accent">Tetris</span>
          </h1>
        </div>

        {/* Game layout */}
        <div className="tetris-wrap">
          {/* Left panel — stats */}
          <div className="tetris-col">
            <div className="tetris-card tetris-card-primary">
              <div className="tetris-lbl">Score</div>
              <div className="tetris-val" ref={scoreRef}>0</div>
            </div>
            <div className="tetris-card">
              <div className="tetris-lbl">Best</div>
              <div className="tetris-val tetris-val-sm" ref={hiRef}>0</div>
            </div>
            <div className="tetris-card">
              <div className="tetris-lbl">Level</div>
              <div className="tetris-val tetris-val-sm" ref={levelRef}>1</div>
            </div>
            <div className="tetris-card">
              <div className="tetris-lbl">Lines</div>
              <div className="tetris-val tetris-val-sm" ref={linesRef}>0</div>
            </div>
          </div>

          {/* Board */}
          <div className="tetris-board-wrap">
            <canvas ref={gcRef} width={300} height={600} className="tetris-canvas" />
            <div ref={flashRef} className="tetris-flash font-editorial italic" />

            {/* Start overlay */}
            <div ref={ovStartRef} className="tetris-overlay">
              <div className="tetris-ov-title">Ready.</div>
              <div className="tetris-ov-sub font-editorial italic">Classic · Endless</div>
              <button className="tetris-btn" onClick={() => startGameRef.current()}>Start Game</button>
            </div>

            {/* Game over overlay */}
            <div ref={ovOverRef} className="tetris-overlay tetris-overlay-off">
              <div className="tetris-ov-title" style={{ color: 'white' }}>Game Over.</div>
              <div className="tetris-ov-stat">
                Score &nbsp;<em ref={goScoreRef}>—</em><br />
                Lines &nbsp;<em ref={goLinesRef}>—</em><br />
                Level &nbsp;<em ref={goLevelRef}>—</em>
              </div>
              <button className="tetris-btn" onClick={() => startGameRef.current()}>Play Again</button>
            </div>

            {/* Pause overlay */}
            <div ref={ovPauseRef} className="tetris-overlay tetris-overlay-off">
              <div className="tetris-ov-title font-editorial italic">Paused.</div>
              <button className="tetris-btn tetris-btn-outline" onClick={() => togglePauseRef.current()}>Resume</button>
            </div>
          </div>

          {/* Right panel */}
          <div className="tetris-col">
            <div className="tetris-card">
              <div className="tetris-lbl">Next</div>
              <canvas ref={ncRef} className="tetris-mini-canvas" width={108} height={72} />
            </div>
            <div className="tetris-card">
              <div className="tetris-lbl">Hold <span style={{ textTransform: 'none', fontWeight: 400 }}>[C]</span></div>
              <canvas ref={hcRef} className="tetris-mini-canvas" width={108} height={72} />
            </div>
            <div className="tetris-card">
              <div className="tetris-lbl">Controls</div>
              <div className="tetris-ctrl">
                <b>← →</b> Move<br />
                <b>↑ / Z</b> Rotate<br />
                <b>↓</b> Soft Drop<br />
                <b>Space</b> Hard Drop<br />
                <b>Shift</b> Hold<br />
                <b>P</b> Pause
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
