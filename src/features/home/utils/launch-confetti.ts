// Palette from src/styles/tokens.css (yellow, pink, green, sky, blue, paper).
const colors = [
  '#ffe23a',
  '#ff8fd6',
  '#7ee35f',
  '#5b9cff',
  '#1f5cff',
  '#ffffff',
];
const outline = '#111111';
const pieceCount = 220;
const durationMs = 4500;
const gravity = 0.32;
const drag = 0.985;

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  spin: number;
  color: string;
  round: boolean;
};

function createPiece(width: number, height: number, fromLeft: boolean): Piece {
  // Two cannons in the bottom corners, aimed up and towards the center.
  const angle =
    ((fromLeft ? -60 : -120) + (Math.random() - 0.5) * 40) * (Math.PI / 180);
  const speed = (0.022 + Math.random() * 0.016) * height + 6;
  return {
    x: fromLeft ? 0 : width,
    y: height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size: 9 + Math.random() * 9,
    rotation: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.3,
    color: colors[Math.floor(Math.random() * colors.length)] ?? outline,
    round: Math.random() < 0.3,
  };
}

function drawPiece(context: CanvasRenderingContext2D, piece: Piece) {
  context.save();
  context.translate(piece.x, piece.y);
  context.rotate(piece.rotation);
  context.fillStyle = piece.color;
  context.beginPath();
  if (piece.round) {
    context.arc(0, 0, piece.size / 2, 0, Math.PI * 2);
  } else {
    // Flatten rectangles as they spin so they read as tumbling paper.
    const squash = Math.abs(Math.cos(piece.rotation * 2)) * 0.6 + 0.4;
    context.rect(
      -piece.size / 2,
      (-piece.size * squash) / 2,
      piece.size,
      piece.size * squash,
    );
  }
  context.fill();
  context.stroke();
  context.restore();
}

/**
 * Fires a one-off full-page confetti burst on a temporary canvas.
 * Does nothing for visitors who prefer reduced motion.
 */
export function launchConfetti() {
  // Without matchMedia (e.g. jsdom) motion is treated as reduced.
  const prefersReducedMotion =
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? true;
  if (prefersReducedMotion) return;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return;

  const ratio = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText =
    'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:100';
  document.body.append(canvas);
  context.scale(ratio, ratio);
  context.strokeStyle = outline;
  context.lineWidth = 2;

  const pieces = Array.from({ length: pieceCount }, (_, index) =>
    createPiece(width, height, index % 2 === 0),
  );
  const start = performance.now();

  function frame(now: number) {
    context?.clearRect(0, 0, width, height);
    let visible = 0;
    for (const piece of pieces) {
      piece.vx *= drag;
      piece.vy = piece.vy * drag + gravity;
      piece.x += piece.vx;
      piece.y += piece.vy;
      piece.rotation += piece.spin;
      if (piece.y < height + piece.size) {
        visible += 1;
        if (context) drawPiece(context, piece);
      }
    }
    if (visible > 0 && now - start < durationMs) {
      requestAnimationFrame(frame);
    } else {
      canvas.remove();
    }
  }

  requestAnimationFrame(frame);
}
