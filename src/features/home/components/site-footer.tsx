import {
  emailHref,
  navigationItems,
  profile,
  projects,
  socialLinks,
} from '@/features/home/home-content';
import { localized, useLocale } from '@/lib/i18n/locale';

const copy = localized({
  en: {
    thanks: 'Thank you for your curiosity.',
    basedIn: 'Based in',
    explore: 'Explore',
    projects: 'My projects',
    contact: 'Contact',
  },
  es: {
    thanks: 'Gracias por tu curiosidad.',
    basedIn: 'Ubicación',
    explore: 'Explora',
    projects: 'Mis proyectos',
    contact: 'Contacto',
  },
});

// After the supplied footer design: the pink thank-you band stands on its
// own, followed by a dark, deliberately quiet site map, as the user asked.

const columnTitleClassName =
  'font-mono text-xs leading-none font-bold tracking-wide text-paper/45 uppercase';
const listClassName = 'mt-4 grid gap-1.5 text-sm leading-relaxed';
const linkClassName =
  'rounded-sm text-paper/60 transition-colors duration-150 hover:text-paper focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-yellow';

export function SiteFooter() {
  const locale = useLocale();
  const text = copy[locale];

  return (
    <footer className="overflow-clip">
      <div className="border-t-3 border-ink bg-pink text-ink">
        <div className="mx-auto max-w-page px-4 py-16 text-center md:px-10 lg:py-24">
          <h2 className="font-display text-h2 leading-tight font-black text-balance text-yellow [-webkit-text-stroke:2px_var(--color-ink)] [paint-order:stroke_fill] [text-shadow:4px_4px_0_var(--color-ink)]">
            {text.thanks}
          </h2>
        </div>
      </div>

      <div className="border-t-3 border-ink bg-night text-paper/60">
        <div className="mx-auto grid max-w-[1080px] grid-cols-2 gap-x-6 gap-y-9 px-4 py-12 md:grid-cols-4 md:px-10 lg:gap-x-10 lg:py-14">
          <div>
            <h3 className={columnTitleClassName}>{text.basedIn}</h3>
            <p className="mt-4 text-sm leading-relaxed">
              {profile.location[locale]}
            </p>
          </div>

          <nav aria-labelledby="footer-explore">
            <h3 id="footer-explore" className={columnTitleClassName}>
              {text.explore}
            </h3>
            <ul className={listClassName}>
              {navigationItems
                .filter((item) => item.href !== '#home')
                .map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className={linkClassName}>
                      {item.label[locale]}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-projects">
            <h3 id="footer-projects" className={columnTitleClassName}>
              {text.projects}
            </h3>
            <ul className={listClassName}>
              {projects.map((project) => (
                <li key={project.number}>
                  <a href="#projects" className={linkClassName}>
                    {project.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-contact">
            <h3 id="footer-contact" className={columnTitleClassName}>
              {text.contact}
            </h3>
            <ul className={listClassName}>
              <li>
                <a href={emailHref} className={linkClassName}>
                  Email
                </a>
              </li>
              {socialLinks
                .filter((link) => link.href !== '')
                .map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={linkClassName}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
