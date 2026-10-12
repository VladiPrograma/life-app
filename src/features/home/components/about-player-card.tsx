import { useId, useRef, type KeyboardEvent, type ReactNode } from 'react';
import { ActionLink } from '@/features/home/components/action-link';
import { ArrowUpRightIcon, BookIcon } from '@/features/home/components/icons';
import { SocialLinks } from '@/features/home/components/social-links';
import {
  formatHalfYears,
  halfYearsIn,
} from '@/features/home/utils/experience-blocks';
import {
  aboutAdventuresText,
  aboutBio,
  aboutBioInvite,
  aboutPanelLinks,
  aboutPersonal,
  aboutReading,
  aboutTabs as tabs,
  careerJobs,
  techExperience,
  type AboutTabId as TabId,
  type BioSegment,
  type HighlightColor,
} from '@/features/home/home-content';
import { localized, useLocale, type Localized } from '@/lib/i18n/locale';

const copy = localized({
  en: {
    tabs: 'About me',
    bioTitle: 'Player bio',
    techTitle: 'Skill tree',
    halfYearLegend: '= 6 months',
    personalTitle: 'Off the clock',
    nowReading: 'Now reading',
    adventuresTitle: 'Side quests',
    soon: 'Soon',
  },
  es: {
    tabs: 'Sobre mí',
    bioTitle: 'Bio del jugador',
    techTitle: 'Árbol de habilidades',
    halfYearLegend: '= 6 meses',
    personalTitle: 'Tiempo libre',
    nowReading: 'Leyendo ahora',
    adventuresTitle: 'Misiones secundarias',
    soon: 'Pronto',
  },
});

// Each tab shares its colour with its panel title. The active tab's bottom
// border takes the fill so the tab merges into the panel below.
const tabColors: Record<TabId, { active: string; idle: string }> = {
  bio: {
    active: 'border-b-yellow bg-yellow',
    idle: 'bg-cream hover:bg-yellow/60',
  },
  tech: { active: 'border-b-sky bg-sky', idle: 'bg-cream hover:bg-sky/60' },
  personal: {
    active: 'border-b-pink bg-pink',
    idle: 'bg-cream hover:bg-pink/60',
  },
  adventures: {
    active: 'border-b-green bg-green',
    idle: 'bg-cream hover:bg-green/60',
  },
};

type AboutPlayerCardProps = {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
};

/**
 * Tabbed player card from the supplied design. Each tab has its own
 * layout; the section owns the selection because the showcase beside the
 * card follows it too.
 */
export function AboutPlayerCard({
  activeTab,
  onTabChange: setActiveTab,
}: AboutPlayerCardProps) {
  const locale = useLocale();
  const tabRefs = useRef(new Map<TabId, HTMLButtonElement>());
  const baseId = useId();

  function selectTab(index: number) {
    const tab = tabs[(index + tabs.length) % tabs.length];
    if (!tab) return;
    setActiveTab(tab.id);
    tabRefs.current.get(tab.id)?.focus();
  }

  // WAI-ARIA tabs pattern: arrows move between tabs, Home/End jump to edges.
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = tabs.findIndex((tab) => tab.id === activeTab);
    const keyTargets: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    const target = keyTargets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    selectTab(target);
  }

  return (
    <div className="flex flex-col">
      <div
        role="tablist"
        aria-label={copy[locale].tabs}
        onKeyDown={handleKeyDown}
        className="relative z-10 grid grid-cols-2 gap-1.5 md:flex md:gap-2"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              ref={(element) => {
                if (element) tabRefs.current.set(tab.id, element);
                else tabRefs.current.delete(tab.id);
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              className={`-mb-[3px] rounded-t-lg border-3 border-ink px-4 pt-2.5 pb-2 font-mono text-sm leading-none font-bold whitespace-nowrap uppercase transition-colors duration-150 focus-visible:outline-3 focus-visible:-outline-offset-[7px] focus-visible:outline-ink md:px-6 md:text-base ${
                isActive ? tabColors[tab.id].active : tabColors[tab.id].idle
              }`}
            >
              {tab.label[locale]}
            </button>
          );
        })}
      </div>

      {/* All panels share one grid cell so switching tabs never changes the
          card height. Inactive panels stay hidden and inert. */}
      <div className="grid grow rounded-tr-lg rounded-b-lg border-3 border-ink bg-cream px-4 py-6 text-ink shadow-brutal-lg md:px-7">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={`${baseId}-panel-${tab.id}`}
              aria-labelledby={`${baseId}-tab-${tab.id}`}
              aria-hidden={!isActive}
              inert={!isActive}
              className={`col-start-1 row-start-1 flex flex-col ${isActive ? '' : 'invisible'}`}
            >
              <TabContent tab={tab.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TabContent({ tab }: { tab: TabId }) {
  switch (tab) {
    case 'bio':
      return <BioPanel />;
    case 'tech':
      return <TechPanel />;
    case 'personal':
      return <PersonalPanel />;
    case 'adventures':
      return <AdventuresPanel />;
  }
}

/** Tilted label that opens each panel, coloured per tab. */
function PanelTitle({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <h3
      className={`inline-block -rotate-1 self-start border-3 border-ink px-3 py-1 font-display text-h3 leading-tight font-black uppercase shadow-brutal ${className}`}
    >
      {children}
    </h3>
  );
}

// Full-height marker behind highlighted phrases; the user found a half-line
// stroke hard to read. Kept literal for Tailwind's class scanner.
const highlightClassNames: Record<HighlightColor, string> = {
  yellow: 'bg-yellow',
  pink: 'bg-pink',
  green: 'bg-green',
  sky: 'bg-sky',
};

function HighlightedText({ segments }: { segments: readonly BioSegment[] }) {
  return segments.map((segment) =>
    typeof segment === 'string' ? (
      segment
    ) : (
      <mark
        key={segment.text}
        className={`rounded-sm box-decoration-clone px-1 font-bold text-ink ${highlightClassNames[segment.highlight]}`}
      >
        {segment.text}
      </mark>
    ),
  );
}

function BioPanel() {
  const locale = useLocale();

  return (
    <>
      <PanelTitle className="bg-yellow">{copy[locale].bioTitle}</PanelTitle>
      <div className="mt-5">
        {aboutBio[locale].map((paragraph, index) => (
          <p
            key={index}
            className={
              index === 0
                ? 'font-display text-lead leading-[1.2] font-black tracking-tight'
                : 'mt-3 text-base leading-relaxed'
            }
          >
            <HighlightedText segments={paragraph} />
          </p>
        ))}
        <p className="mt-3 text-base leading-relaxed">
          <HighlightedText segments={aboutBioInvite[locale]} />
        </p>
        <div className="mt-5">
          <SocialLinks />
        </div>
      </div>
    </>
  );
}

function TechPanel() {
  const locale = useLocale();
  const text = copy[locale];
  const now = new Date();
  const jobs = careerJobs.map((job) => ({
    job,
    halfYears: halfYearsIn(job, now),
  }));
  const careerHalfYears = jobs.reduce(
    (sum, { halfYears }) => sum + halfYears,
    0,
  );
  const techs = techExperience.map((tech) => {
    const usedJobs = jobs.filter(({ job }) => tech.jobs.includes(job.id));
    return {
      ...tech,
      usedJobs,
      total: usedJobs.reduce((sum, { halfYears }) => sum + halfYears, 0),
    };
  });

  return (
    <>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <PanelTitle className="bg-sky">{text.techTitle}</PanelTitle>
      </div>

      {/* Legend: one square per half-year, coloured by employer. */}
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs leading-none font-bold uppercase">
        {jobs.map(({ job }) => (
          <span key={job.id} className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className={`size-3.5 border-2 border-ink ${job.className}`}
            />
            {job.company}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5 text-ink/70">
          <span
            aria-hidden="true"
            className="size-3.5 border-2 border-ink bg-paper"
          />
          {text.halfYearLegend}
        </span>
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {techs.map((tech) => (
          <li
            key={tech.name}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5 rounded-sm border-2 border-ink/40 px-3 py-1.5 md:grid-cols-[minmax(0,9em)_minmax(0,1fr)_4.5em]"
          >
            <span className="font-mono text-sm leading-none font-bold uppercase md:text-base">
              {tech.name}
            </span>
            <span className="text-right font-mono text-xs leading-none font-bold md:order-last">
              <span className="sr-only">: </span>
              {formatHalfYears(tech.total, locale)}
            </span>
            {/* Used periods fill from the left in career order; the
                    remaining squares stay empty up to the full career. */}
            <span
              aria-hidden="true"
              className="col-span-2 flex h-6 border-3 border-ink bg-paper md:col-span-1"
            >
              {tech.usedJobs.flatMap(({ job, halfYears }) =>
                Array.from({ length: halfYears }, (_, index) => (
                  <span
                    key={`${job.id}-${index}`}
                    className={`grow border-r-2 border-ink last:border-r-0 ${job.className}`}
                  />
                )),
              )}
              {Array.from(
                { length: careerHalfYears - tech.total },
                (_, index) => (
                  <span
                    key={`empty-${index}`}
                    className="grow border-r-2 border-ink last:border-r-0"
                  />
                ),
              )}
            </span>
          </li>
        ))}
      </ul>

      <PanelAction link={aboutPanelLinks.tech} className="bg-pink" />
    </>
  );
}

function PersonalPanel() {
  const locale = useLocale();
  const text = copy[locale];

  return (
    <>
      <PanelTitle className="bg-pink">{text.personalTitle}</PanelTitle>

      <div className="mt-5">
        {aboutPersonal[locale].map((paragraph, index) => (
          <p key={index} className="mt-3 text-base leading-relaxed first:mt-0">
            <HighlightedText segments={paragraph} />
          </p>
        ))}
      </div>

      <div className="mt-7 flex -rotate-[0.6deg] items-center gap-4 self-start border-3 border-ink bg-yellow px-4 py-3 shadow-brutal">
        <BookIcon className="size-10 shrink-0" />
        <p className="leading-none">
          <span className="block font-mono text-xs font-bold uppercase">
            {text.nowReading}
          </span>
          <span className="mt-1.5 block font-display text-lead font-black tracking-tight">
            {aboutReading.title}
          </span>
          <span className="mt-1 block text-sm">{aboutReading.author}</span>
        </p>
      </div>

      <PanelAction link={aboutPanelLinks.personal} className="bg-sky" />
    </>
  );
}

function AdventuresPanel() {
  const locale = useLocale();

  return (
    <>
      <PanelTitle className="bg-green">
        {copy[locale].adventuresTitle}
      </PanelTitle>

      <div className="mt-5">
        {aboutAdventuresText[locale].map((paragraph, index) => (
          <p key={index} className="mt-3 text-base leading-relaxed first:mt-0">
            <HighlightedText segments={paragraph} />
          </p>
        ))}
      </div>

      <PanelAction link={aboutPanelLinks.adventures} className="bg-green" />
    </>
  );
}

/**
 * Button at the foot of a panel. Destinations that do not exist yet render
 * as a disabled "soon" button instead of a dead link.
 */
function PanelAction({
  link,
  className,
}: {
  link: { label: Localized<string>; href: string };
  className: string;
}) {
  const locale = useLocale();
  const label = link.label[locale];

  return (
    <div className="mt-auto pt-7">
      {link.href ? (
        <ActionLink href={link.href} className={className}>
          {label}
          <ArrowUpRightIcon className="size-4" />
        </ActionLink>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex cursor-not-allowed items-center gap-2.5 rounded-lg border-3 border-dashed border-ink/60 bg-paper/60 px-5 py-3 text-base leading-none font-bold whitespace-nowrap text-ink/60"
        >
          {label}
          <span className="rounded-full border-2 border-ink/60 px-2 py-0.5 font-mono text-xs uppercase">
            {copy[locale].soon}
          </span>
        </span>
      )}
    </div>
  );
}
