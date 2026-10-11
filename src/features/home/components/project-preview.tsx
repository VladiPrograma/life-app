import { ArrowUpRightIcon } from '@/features/home/components/icons';
import { ProjectStickers } from '@/features/home/components/project-stickers';
import type { Project } from '@/features/home/home-content';

// Rays behind the card, as in the supplied design. Angles are spread
// unevenly so the burst does not read as a mechanical pattern.
const rayAngles = [
  -84, -71, -60, -47, -33, -22, -9, 6, 17, 31, 44, 57, 69, 82, 97, 109, 122,
  136, 148, 161, 174, 189, 203, 214, 228, 241, 253,
];

/** Readable link text: "https://www.motogp.com/en/apps" → "motogp.com/en/apps". */
function formatLiveUrl(url: string) {
  const { hostname, pathname } = new URL(url);
  return hostname.replace(/^www\./, '') + pathname.replace(/\/$/, '');
}

/** Framed preview of the selected project with its screenshot. */
export function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className="relative w-full max-w-[464px]">
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

      <ProjectStickers />

      <figure className="relative rounded-[28px] border-[3px] border-paper bg-night p-[13px]">
        <div className="relative flex flex-col gap-5 overflow-hidden rounded-[20px] bg-[#0d0d0d] bg-[linear-gradient(to_right,rgb(255_255_255/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.07)_1px,transparent_1px)] bg-size-[22px_22px] p-6 text-paper">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full border-[1.5px] border-paper/60 px-3 py-1 font-display text-[14px] leading-none font-bold tracking-[0.02em]">
              {project.number}
            </span>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border-[2.5px] border-ink bg-yellow px-3.5 py-2 font-display text-[14px] leading-none font-black text-ink uppercase shadow-[3px_3px_0_var(--color-paper)] transition-[translate,box-shadow] duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_var(--color-paper)] focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-gold"
              >
                See on Live!
                <ArrowUpRightIcon className="size-4" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
          </div>

          {/* The user prefers the whole screenshot over an exact aspect ratio,
              so 16:9 to 3:2 captures are stretched slightly to fill 16:10. */}
          <img
            key={project.number}
            src={project.image.src}
            alt={project.image.alt}
            width={960}
            height={600}
            decoding="async"
            className="aspect-[16/10] w-full rounded-[12px] border-2 border-paper/40 object-fill"
          />
          <figcaption>
            <p className="font-display text-[clamp(24px,2.2vw,32px)] leading-[1.05] font-black tracking-[-0.02em]">
              {project.title}
            </p>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-block rounded-[3px] font-mono text-[13px] leading-[1.3] font-bold text-yellow underline decoration-2 underline-offset-[3px] hover:text-paper focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                {formatLiveUrl(project.liveUrl)}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
            <p className="mt-2 text-[14px] leading-[1.4] text-paper/70">
              {project.context}
            </p>
          </figcaption>
        </div>
      </figure>
    </div>
  );
}
