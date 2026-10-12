import { ArrowUpRightIcon } from '@/features/home/components/icons';
import { ProjectStickers } from '@/features/home/components/project-stickers';
import { SunburstRays } from '@/features/home/components/sunburst-rays';
import type { Project } from '@/features/home/home-content';
import { localized, useLocale } from '@/lib/i18n/locale';

const copy = localized({
  en: { seeLive: 'See on Live!', newTab: ' (opens in a new tab)' },
  es: {
    seeLive: '¡Míralo en vivo!',
    newTab: ' (se abre en una pestaña nueva)',
  },
});

/** Readable link text: "https://www.motogp.com/en/apps" → "motogp.com/en/apps". */
function formatLiveUrl(url: string) {
  const { hostname, pathname } = new URL(url);
  return hostname.replace(/^www\./, '') + pathname.replace(/\/$/, '');
}

/** Framed preview of the selected project with its screenshot. */
export function ProjectPreview({ project }: { project: Project }) {
  const locale = useLocale();
  const text = copy[locale];

  return (
    <div className="relative w-full max-w-[464px]">
      <SunburstRays />
      <ProjectStickers />

      <figure className="relative rounded-[28px] border-3 border-paper bg-night p-[13px]">
        <div className="relative flex flex-col gap-5 overflow-hidden rounded-[20px] bg-ink bg-[linear-gradient(to_right,rgb(255_255_255/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.07)_1px,transparent_1px)] bg-size-[22px_22px] p-6 text-paper">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full border-2 border-paper/60 px-3 py-1 font-mono text-sm leading-none font-bold">
              {project.number}
            </span>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border-3 border-ink bg-yellow px-3.5 py-2 font-mono text-sm leading-none font-black text-ink uppercase shadow-brutal shadow-paper transition-[translate,box-shadow] duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-yellow"
              >
                {text.seeLive}
                <ArrowUpRightIcon className="size-4" />
                <span className="sr-only">{text.newTab}</span>
              </a>
            ) : null}
          </div>

          {/* The user prefers the whole screenshot over an exact aspect ratio,
              so 16:9 to 3:2 captures are stretched slightly to fill 16:10. */}
          <img
            key={project.number}
            src={project.image.src}
            alt={project.image.alt[locale]}
            width={960}
            height={600}
            decoding="async"
            className="aspect-[16/10] w-full rounded-lg border-2 border-paper/40 object-fill"
          />
          <figcaption>
            <p className="font-display text-lead leading-tight font-black tracking-tight">
              {project.title}
            </p>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-block rounded-sm font-mono text-sm font-bold text-yellow underline decoration-2 underline-offset-3 hover:text-paper focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-yellow"
              >
                {formatLiveUrl(project.liveUrl)}
                <span className="sr-only">{text.newTab}</span>
              </a>
            ) : null}
            <p className="mt-2 text-sm leading-relaxed text-paper/80">
              {project.context[locale]}
            </p>
          </figcaption>
        </div>
      </figure>
    </div>
  );
}
