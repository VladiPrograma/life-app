import { ActionLink } from '@/features/home/components/action-link';
import cvUrl from '@/assets/documents/vlad-dumitru-dinca-cv.pdf';
import logoUrl from '@/assets/logo.webp';
import { ArrowRightIcon, DownloadIcon } from '@/features/home/components/icons';
import { navigationItems, profile } from '@/features/home/home-content';
import { useShowOnScrollUp } from '@/features/home/hooks/use-show-on-scroll-up';

export function SiteHeader() {
  const isVisible = useShowOnScrollUp();

  return (
    // Keyboard focus inside a hidden header brings it back into view.
    <header
      data-visible={isVisible}
      className={`sticky top-0 z-40 border-b-3 border-ink bg-paper transition-transform duration-200 ease-out motion-reduce:transition-none ${
        isVisible ? '' : '-translate-y-full has-focus-visible:translate-y-0'
      }`}
    >
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 md:px-10">
        <a
          href="#home"
          className="flex items-center gap-3 rounded-md focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          {/* Decorative: the name beside it labels the link. */}
          <img
            src={logoUrl}
            alt=""
            width={31}
            height={36}
            className="h-9 w-auto"
          />
          <span className="flex flex-col">
            <span className="font-display text-xl leading-none font-black tracking-tight">
              {profile.shortName}
            </span>
            <span className="text-xs leading-[1.4] font-medium">
              {profile.role}
            </span>
          </span>
        </a>

        <nav
          aria-label="Main"
          className="order-last w-full overflow-x-auto lg:order-none lg:mr-auto lg:ml-6 lg:w-auto"
        >
          <ul className="flex gap-7 py-1 text-base font-bold">
            {navigationItems.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={index === 0 ? 'page' : undefined}
                  className="border-b-3 border-transparent pb-1 whitespace-nowrap hover:border-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink aria-[current=page]:border-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ActionLink
            href={cvUrl}
            download="Vlad-Dumitru-Dinca-CV.pdf"
            className="bg-pink py-2.5"
          >
            <DownloadIcon className="size-5" />
            Download CV
          </ActionLink>
          <ActionLink href="#contact" className="bg-yellow py-2.5">
            Let’s Build
            <ArrowRightIcon className="size-5" />
          </ActionLink>
        </div>
      </div>
    </header>
  );
}
