import { Link, useLocation } from 'react-router';
import {
  localePaths,
  locales,
  useLocale,
  type Locale,
  type Localized,
} from '@/lib/i18n/locale';

const languageNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
};

const groupLabel: Localized<string> = { en: 'Language', es: 'Idioma' };

/**
 * EN/ES segmented control. Assumption: no design was supplied for it, so it
 * borrows the header's bordered, hard-shadow buttons. Switching keeps the
 * current section anchor.
 */
export function LanguageSwitch({ className }: { className: string }) {
  const locale = useLocale();
  const { hash, search } = useLocation();

  return (
    <nav aria-label={groupLabel[locale]} className={className}>
      <ul className="flex h-full w-max overflow-hidden rounded-md border-3 border-ink font-mono text-sm leading-none font-black uppercase shadow-brutal">
        {locales.map((option) => (
          <li key={option} className="border-ink not-first:border-l-3">
            <Link
              to={{ pathname: localePaths[option], search, hash }}
              lang={option}
              hrefLang={option}
              aria-label={languageNames[option]}
              aria-current={option === locale ? 'true' : undefined}
              className="flex h-full min-w-11 items-center justify-center bg-paper px-3 transition-colors duration-150 hover:bg-yellow focus-visible:outline-3 focus-visible:-outline-offset-[6px] focus-visible:outline-ink aria-[current=true]:bg-ink aria-[current=true]:text-paper aria-[current=true]:focus-visible:outline-yellow"
            >
              {option}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
