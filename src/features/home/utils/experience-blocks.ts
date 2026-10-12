import type { CareerJob } from '@/features/home/home-content';
import type { Locale } from '@/lib/i18n/locale';

function toMonthIndex(yearMonth: string) {
  return Number(yearMonth.slice(0, 4)) * 12 + Number(yearMonth.slice(5, 7)) - 1;
}

/** Half-years spent in a job, rounded to the nearest one and at least one. */
export function halfYearsIn(job: CareerJob, now: Date) {
  const end = job.end
    ? toMonthIndex(job.end)
    : now.getFullYear() * 12 + now.getMonth();
  return Math.max(1, Math.round((end - toMonthIndex(job.start)) / 6));
}

const durationUnits = {
  en: { halfYear: '6 months', year: 'year', years: 'years' },
  es: { halfYear: '6 meses', year: 'año', years: 'años' },
} satisfies Record<Locale, Record<string, string>>;

/** "6 months", "1 year", "3.5 years"; in Spanish "6 meses", "3,5 años". */
export function formatHalfYears(halfYears: number, locale: Locale) {
  const units = durationUnits[locale];
  if (halfYears === 1) return units.halfYear;
  const years = halfYears / 2;
  const amount = new Intl.NumberFormat(locale).format(years);
  return `${amount} ${years === 1 ? units.year : units.years}`;
}
