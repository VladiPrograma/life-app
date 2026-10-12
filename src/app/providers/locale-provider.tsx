import { useEffect, type ReactNode } from 'react';
import { LocaleContext, type Locale } from '@/lib/i18n/locale';

/** Provides the route's locale and keeps the document language in sync. */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <LocaleContext value={locale}>{children}</LocaleContext>;
}
