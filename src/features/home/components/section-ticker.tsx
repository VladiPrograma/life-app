type SectionTickerProps = {
  items: readonly string[];
  /** Borders, background and text colour of the strip. */
  className: string;
  /** Colour of the ✦ separators. */
  separatorClassName: string;
  /** Scroll right instead of left, so stacked strips alternate direction. */
  reverse?: boolean;
};

// Each run must be wider than the widest screen, or the strip shows an empty
// gap until the second run scrolls in. Characters stand in for width: at
// 17px mono, ~280 characters (padding and separators counted as 5 each)
// spans more than 2560px.
const minRunCharacters = 280;
const characterPerItemOverhead = 5;
// Matches the original hero strip: ~150 characters per 40s loop.
const charactersPerSecond = 3.75;

function TickerRun({
  items,
  separatorClassName,
}: Pick<SectionTickerProps, 'items' | 'separatorClassName'>) {
  return (
    <ul className="flex shrink-0 items-center">
      {items.map((item, index) => (
        <li key={`${index}-${item}`} className="flex items-center">
          <span className="px-6">{item}</span>
          <span className={separatorClassName}>✦</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Decorative scrolling strip from the hero, reused between sections. Its
 * words repeat content shown elsewhere, so it is hidden from assistive tech.
 */
export function SectionTicker({
  items,
  className,
  separatorClassName,
  reverse = false,
}: SectionTickerProps) {
  const passCharacters = items.reduce(
    (total, item) => total + item.length + characterPerItemOverhead,
    0,
  );
  const repeats = Math.max(1, Math.ceil(minRunCharacters / passCharacters));
  const run = Array.from({ length: repeats }, () => items).flat();
  // Longer runs get a longer loop so every strip scrolls at the same speed.
  const duration = (passCharacters * repeats) / charactersPerSecond;

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden py-3.5 font-mono text-[15px] leading-none font-black whitespace-nowrap uppercase md:text-[17px] ${className}`}
    >
      {/* Two identical runs so a -50% translation loops seamlessly. */}
      <div
        // Inline so the `animation` shorthand from the utility cannot reset them.
        style={{
          animationDuration: `${duration.toFixed(1)}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
        className="flex w-max motion-safe:animate-marquee"
      >
        <TickerRun items={run} separatorClassName={separatorClassName} />
        <TickerRun items={run} separatorClassName={separatorClassName} />
      </div>
    </div>
  );
}
