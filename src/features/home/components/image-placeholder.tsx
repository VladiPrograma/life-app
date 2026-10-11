type ImagePlaceholderProps = {
  /** What the missing artwork will show; announced to assistive tech. */
  label: string;
  /** Size, placement and colour utilities. */
  className: string;
  /** Visible caption; hidden on small slots such as logos. */
  caption?: string;
};

/**
 * Stand-in for artwork that has not been supplied yet. Swap it for an `<img>`
 * with the same box once the asset exists.
 */
export function ImagePlaceholder({
  label,
  className,
  caption,
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`${label} (image coming soon)`}
      className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed border-ink/50 text-ink/60 ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-[min(40%,56px)]"
      >
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <circle cx="9" cy="10" r="2" />
        <path d="m21 16-5-5-9 9" />
      </svg>
      {caption ? (
        <span className="px-2 text-center font-mono text-[12px] leading-[1.3] font-bold tracking-[0.08em] uppercase">
          {caption}
        </span>
      ) : null}
    </div>
  );
}
