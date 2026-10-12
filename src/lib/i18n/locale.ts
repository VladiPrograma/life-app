import { createContext, useContext } from 'react';

export const locales = ['en', 'es'] as const;

export type Locale = (typeof locales)[number];

/** English is served at the site root; other locales get a path prefix. */
export const defaultLocale: Locale = 'en';

export const localePaths: Record<Locale, string> = { en: '/', es: '/es' };

/** A value written once per locale. */
export type Localized<T> = Record<Locale, T>;

/**
 * Groups the copy of every locale. The type comes from the English entry, so
 * a Spanish entry with a missing or extra key fails type checking.
 */
export function localized<T>(copy: { en: T; es: NoInfer<T> }): Localized<T> {
  return copy;
}

export const LocaleContext = createContext<Locale>(defaultLocale);

export function useLocale() {
  return useContext(LocaleContext);
}
