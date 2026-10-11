// Flat stickers around the project preview, echoing the ones in the hero
// avatar: one fill colour, ink outline and a
// hard ink shadow.
const outline = {
  stroke: 'var(--color-ink)',
  strokeWidth: 3,
  strokeLinejoin: 'round',
} as const;

const codeBubblePath =
  'M8 4h56a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H28L17 50V40H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Z';
const smileBubblePath =
  'M8 4h44a4 4 0 0 1 4 4v32a4 4 0 0 1-4 4H24l-9 9v-9H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Z';

function CodeBubble({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 76 58" className={className}>
      <path
        d={codeBubblePath}
        transform="translate(4 4)"
        fill="var(--color-ink)"
        {...outline}
      />
      <path d={codeBubblePath} fill="var(--color-yellow)" {...outline} />
      <path
        d="M27 15l-7 7 7 7M45 15l7 7-7 7M39 12l-6 20"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SmileBubble({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 64 61" className={className}>
      <path
        d={smileBubblePath}
        transform="translate(4 4)"
        fill="var(--color-ink)"
        {...outline}
      />
      <path d={smileBubblePath} fill="var(--color-pink)" {...outline} />
      <circle cx="24" cy="18" r="2.6" fill="var(--color-ink)" />
      <circle cx="36" cy="18" r="2.6" fill="var(--color-ink)" />
      <path
        d="M20 26q10 9 20 0"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AsteriskTile({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 52 52" className={className}>
      <rect
        x="8"
        y="8"
        width="40"
        height="40"
        rx="5"
        fill="var(--color-ink)"
        {...outline}
      />
      <rect
        x="3"
        y="3"
        width="40"
        height="40"
        rx="5"
        fill="var(--color-green)"
        {...outline}
      />
      <path
        d="M23 11v24M12.6 17l20.8 12M33.4 17 12.6 29"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Sparks({ className }: { className: string }) {
  const lines = 'M6 20 26 6M10 34l24-10';
  return (
    <svg viewBox="0 0 40 40" className={className}>
      <path
        d={lines}
        stroke="var(--color-ink)"
        strokeWidth="9"
        strokeLinecap="square"
      />
      <path
        d={lines}
        stroke="var(--color-yellow)"
        strokeWidth="4"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function ProjectStickers() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10"
    >
      <CodeBubble className="absolute -top-9 -left-3 w-[76px] -rotate-6" />
      <Sparks className="absolute top-[24%] -left-5 w-[38px] -scale-x-100" />
      <SmileBubble className="absolute -top-10 right-8 w-[64px] rotate-6" />
      <AsteriskTile className="absolute top-[40%] -right-5 w-[52px] rotate-[8deg]" />
      <Sparks className="absolute -right-4 bottom-[18%] w-[38px] rotate-12" />
    </div>
  );
}
