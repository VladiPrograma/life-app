import type { CareerJob } from '@/features/home/home-content';

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

/** "6 months", "1 year", "3.5 years". */
export function formatHalfYears(halfYears: number) {
  if (halfYears === 1) return '6 months';
  const years = halfYears / 2;
  return `${years} ${years === 1 ? 'year' : 'years'}`;
}
