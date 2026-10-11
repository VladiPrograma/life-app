// Angles are spread unevenly so the burst does not read as a mechanical
// pattern.
const rayAngles = [
  -85, -71, -60, -48, -34, -22, -9, 5, 17, 30, 44, 56, 69, 82, 96, 109, 122,
  135, 148, 161, 174, 188, 202, 215, 228, 241, 254,
];

/** Decorative line burst from the supplied design, centred in its parent. */
export function SunburstRays() {
  return (
    <svg
      aria-hidden="true"
      viewBox="-1000 -1000 2000 2000"
      className="pointer-events-none absolute top-1/2 left-1/2 size-[2000px] -translate-1/2"
    >
      {rayAngles.map((angle) => (
        <line
          key={angle}
          x1="0"
          y1="0"
          x2={Math.cos((angle * Math.PI) / 180) * 1000}
          y2={Math.sin((angle * Math.PI) / 180) * 1000}
          stroke="var(--color-line)"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}
