// Coverage mirrors the CV result (0% → 80%), drawn as 10 chunky cells.
const coverageCells = 10;
const coverageFilled = 8;

const prompt = 'text-pink';

/** Decorative neo-brutalist terminal session overlapping the hero portrait. */
export function HeroTerminal() {
  return (
    <div
      aria-hidden="true"
      className="absolute bottom-0 left-0 w-[clamp(210px,48%,290px)] -rotate-3 overflow-hidden rounded-[10px] border-[3px] border-ink bg-night font-mono text-[clamp(10.5px,1vw,13px)] leading-[1.55] font-bold shadow-[7px_7px_0_var(--color-ink)]"
    >
      <div className="flex items-center gap-1.5 border-b-[3px] border-ink bg-yellow px-2.5 py-2">
        <span className="size-3 rounded-full border-2 border-ink bg-pink" />
        <span className="size-3 rounded-full border-2 border-ink bg-paper" />
        <span className="size-3 rounded-full border-2 border-ink bg-green" />
        <span className="ml-auto rounded-[4px] border-2 border-ink bg-paper px-1.5 py-0.5 text-[0.85em] leading-none text-ink">
          vlad@backend:~
        </span>
      </div>

      <div className="space-y-0.5 px-3 pt-2.5 pb-3 text-paper">
        <p>
          <span className={prompt}>$</span> mvn clean verify
        </p>
        <p className="flex items-center gap-2 text-terminal-green">
          ✓ tests
          <span className="flex gap-[2px]">
            {Array.from({ length: coverageCells }, (_, index) => (
              <span
                key={index}
                className={`h-[0.9em] w-[0.55em] border-[1.5px] border-ink ${
                  index < coverageFilled ? 'bg-terminal-green' : 'bg-paper/20'
                }`}
              />
            ))}
          </span>
          <span className="text-yellow">80%</span>
        </p>
        <p>
          <span className={prompt}>$</span> deploy --env prod
        </p>
        <p className="text-terminal-green">✓ rollout complete</p>
        <p>
          <span className={prompt}>$</span> curl /health
        </p>
        <p className="flex items-center gap-2">
          <span className="rounded-[3px] border-2 border-ink bg-yellow px-1 leading-[1.2] text-ink">
            200 OK
          </span>
          <span className="text-sky">{'{ "status": "UP" }'}</span>
        </p>
        <p>
          <span className={prompt}>$</span>{' '}
          <span className="inline-block h-[1.05em] w-[0.6em] translate-y-[0.18em] bg-terminal-green motion-safe:animate-blink" />
        </p>
      </div>

      <div className="flex items-center justify-between border-t-[3px] border-ink bg-green px-2.5 py-1 text-[0.8em] leading-none text-ink uppercase">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full border-[1.5px] border-ink bg-paper" />
          main
        </span>
        <span>Java 17 · Spring</span>
      </div>
    </div>
  );
}
