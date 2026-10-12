import { useEffect, useId, useRef, useState } from 'react';
import { ActionLink } from '@/features/home/components/action-link';
import cvEnUrl from '@/assets/documents/vlad-dumitru-dinca-cv-en.pdf';
import cvEsUrl from '@/assets/documents/vlad-dumitru-dinca-cv-es.pdf';
import logoUrl from '@/assets/logo.webp';
import { ArrowRightIcon, DownloadIcon } from '@/features/home/components/icons';
import { LanguageSwitch } from '@/features/home/components/language-switch';
import { navigationItems, profile } from '@/features/home/home-content';
import { useShowOnScrollUp } from '@/features/home/hooks/use-show-on-scroll-up';
import { localized, useLocale } from '@/lib/i18n/locale';

const cvFileName = 'Vlad-Dumitru-Dinca-CV.pdf';

const copy = localized({
  en: {
    cvUrl: cvEnUrl,
    navigation: 'Main',
    downloadCv: 'Download CV',
    letsBuild: 'Let’s Build',
    menu: 'Menu',
  },
  es: {
    cvUrl: cvEsUrl,
    navigation: 'Principal',
    downloadCv: 'Descargar CV',
    letsBuild: 'Hablemos',
    menu: 'Menú',
  },
});

export function SiteHeader() {
  const locale = useLocale();
  const text = copy[locale];
  const isVisible = useShowOnScrollUp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  // An open menu closes on Escape (returning focus to its button) and on any
  // press outside the header.
  useEffect(() => {
    if (!isMenuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      setIsMenuOpen(false);
      toggleRef.current?.focus();
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isMenuOpen]);

  const isShown = isVisible || isMenuOpen;

  return (
    // Keyboard focus inside a hidden header brings it back into view.
    <header
      ref={headerRef}
      data-visible={isShown}
      className={`sticky top-0 z-40 border-b-3 border-ink bg-paper transition-transform duration-200 ease-out motion-reduce:transition-none ${
        isShown ? '' : '-translate-y-full has-focus-visible:translate-y-0'
      }`}
    >
      <div className="mx-auto flex max-w-page items-center justify-between gap-x-6 px-4 py-3 md:px-10">
        <a
          href="#home"
          onClick={() => setIsMenuOpen(false)}
          className="flex min-w-0 items-center gap-3 rounded-md focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          {/* Decorative: the name beside it labels the link. */}
          <img
            src={logoUrl}
            alt=""
            width={31}
            height={36}
            className="h-9 w-auto"
          />
          <span className="flex min-w-0 flex-col">
            <span className="font-display text-xl leading-none font-black tracking-tight">
              {profile.shortName}
            </span>
            <span className="text-xs leading-[1.4] font-medium">
              {profile.role}
            </span>
          </span>
        </a>

        <nav
          aria-label={text.navigation}
          className="mr-auto ml-6 hidden xl:block"
        >
          <ul className="flex gap-7 py-1 text-base font-bold">
            {navigationItems.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={index === 0 ? 'page' : undefined}
                  className="border-b-3 border-transparent pb-1 whitespace-nowrap hover:border-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink aria-[current=page]:border-ink"
                >
                  {item.label[locale]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <ActionLink
            href={text.cvUrl}
            download={cvFileName}
            className="bg-pink py-2.5"
          >
            <DownloadIcon className="size-5" />
            {text.downloadCv}
          </ActionLink>
          <ActionLink href="#contact" className="bg-yellow py-2.5">
            {text.letsBuild}
            <ArrowRightIcon className="size-5" />
          </ActionLink>
          <LanguageSwitch className="self-stretch" />
        </div>

        {/* Below wide laptop widths the navigation and calls to action move into
            a dropdown behind this corner button. */}
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
          onClick={() => setIsMenuOpen((open) => !open)}
          className={`relative size-11 shrink-0 rounded-md border-3 border-ink shadow-brutal transition-[translate,box-shadow,background-color] duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ink xl:hidden ${
            isMenuOpen ? 'bg-pink' : 'bg-yellow'
          }`}
        >
          <span className="sr-only">{text.menu}</span>
          {/* Three bars that fold into a cross while the menu is open. */}
          <span
            aria-hidden="true"
            className={`absolute top-1/2 left-1/2 h-[3px] w-5 -translate-x-1/2 bg-ink transition-transform duration-150 motion-reduce:transition-none ${
              isMenuOpen
                ? '-translate-y-1/2 rotate-45'
                : '-translate-y-[calc(50%+7px)]'
            }`}
          />
          <span
            aria-hidden="true"
            className={`absolute top-1/2 left-1/2 h-[3px] w-5 -translate-x-1/2 -translate-y-1/2 bg-ink ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            aria-hidden="true"
            className={`absolute top-1/2 left-1/2 h-[3px] w-5 -translate-x-1/2 bg-ink transition-transform duration-150 motion-reduce:transition-none ${
              isMenuOpen
                ? '-translate-y-1/2 -rotate-45'
                : 'translate-y-[calc(-50%+7px)]'
            }`}
          />
        </button>
      </div>

      {isMenuOpen ? (
        // Following any link inside, including the calls to action, closes
        // the menu.
        <div
          id={menuId}
          onClick={(event) => {
            if (event.target instanceof Element && event.target.closest('a')) {
              setIsMenuOpen(false);
            }
          }}
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-100%)] overflow-y-auto border-b-3 border-ink bg-yellow xl:hidden"
        >
          <div className="mx-auto max-w-page px-4 pt-2 pb-6 md:px-10">
            <nav aria-label={text.navigation}>
              <ul>
                {navigationItems.map((item, index) => (
                  <li key={item.href} className="border-b-3 border-ink">
                    <a
                      href={item.href}
                      aria-current={index === 0 ? 'page' : undefined}
                      className="group flex items-center justify-between py-4 font-display text-h3 leading-none font-black uppercase focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-ink"
                    >
                      <span className="group-aria-[current=page]:bg-paper group-aria-[current=page]:px-2 group-aria-[current=page]:shadow-brutal-sm">
                        {item.label[locale]}
                      </span>
                      <ArrowRightIcon className="size-7 transition-transform duration-150 group-hover:translate-x-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-6 flex flex-col gap-3 md:flex-row">
              <ActionLink
                href={text.cvUrl}
                download={cvFileName}
                className="justify-center bg-pink"
              >
                <DownloadIcon className="size-5" />
                {text.downloadCv}
              </ActionLink>
              <ActionLink href="#contact" className="justify-center bg-paper">
                {text.letsBuild}
                <ArrowRightIcon className="size-5" />
              </ActionLink>
            </div>

            <LanguageSwitch className="mt-6 h-11" />
          </div>
        </div>
      ) : null}
    </header>
  );
}
