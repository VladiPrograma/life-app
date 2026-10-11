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
  aboutQuests,
  aboutPersonal,
  aboutReading,
  aboutTabs as tabs,
  careerJobs,
  profile,
  techExperience,
  type AboutTabId as TabId,
  type BioSegment,
  type HighlightColor,
} from '@/features/home/home-content';

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
        aria-label="About me"
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
              className={`-mb-[3px] rounded-t-[8px] border-[3px] border-ink px-4 pt-2.5 pb-2 font-mono text-[15px] leading-none font-bold whitespace-nowrap uppercase transition-colors duration-150 focus-visible:outline-[3px] focus-visible:-outline-offset-[7px] focus-visible:outline-ink md:px-6 md:text-[17px] ${
                isActive ? tabColors[tab.id].active : tabColors[tab.id].idle
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* All panels share one grid cell so switching tabs never changes the
          card height. Inactive panels stay hidden and inert. */}
      <div className="grid grow rounded-tr-[8px] rounded-b-[8px] border-[3px] border-ink bg-cream px-4 pt-6 pb-6 text-ink shadow-[6px_6px_0_var(--color-ink)] md:px-7">
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
      className={`inline-block -rotate-1 self-start border-[3px] border-ink px-3 py-1 font-display text-[clamp(26px,2.8vw,38px)] leading-[1.05] font-black tracking-[-0.02em] uppercase shadow-[5px_5px_0_var(--color-ink)] ${className}`}
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
        className={`rounded-[3px] box-decoration-clone px-1 font-bold text-ink ${highlightClassNames[segment.highlight]}`}
      >
        {segment.text}
      </mark>
    ),
  );
}

function BioPanel() {
  return (
    <>
      <PanelTitle className="bg-yellow">Player bio</PanelTitle>
      <div className="mt-5">
        {aboutBio.map((paragraph, index) => (
          <p
            key={index}
            className={
              index === 0
                ? 'font-display text-[clamp(26px,2.6vw,34px)] leading-[1.2] font-black tracking-[-0.02em]'
                : 'mt-3 text-[16px] leading-[1.6]'
            }
          >
            <HighlightedText segments={paragraph} />
          </p>
        ))}
        <p className="mt-3 text-[16px] leading-[1.6]">
          <HighlightedText segments={aboutBioInvite} />
        </p>
        <div className="mt-5">
          <SocialLinks />
        </div>
      </div>
    </>
  );
}

function TechPanel() {
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
        <PanelTitle className="bg-sky">Skill tree</PanelTitle>
        <p className="font-mono text-[14px] leading-none font-bold uppercase">
          {profile.role}
        </p>
      </div>

      {/* Legend: one square per half-year, coloured by employer. */}
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[13px] leading-none font-bold uppercase">
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
          = 6 months
        </span>
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {techs.map((tech) => (
          <li
            key={tech.name}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5 rounded-[4px] border-[1.5px] border-ink/40 px-3 py-1.5 md:grid-cols-[minmax(0,9em)_minmax(0,1fr)_4.5em]"
          >
            <span className="font-mono text-[15px] leading-none font-bold uppercase md:text-[16px]">
              {tech.name}
            </span>
            <span className="text-right font-mono text-[13px] leading-none font-bold md:order-last">
              <span className="sr-only">: </span>
              {formatHalfYears(tech.total)}
            </span>
            {/* Used periods fill from the left in career order; the
                    remaining squares stay empty up to the full career. */}
            <span
              aria-hidden="true"
              className="col-span-2 flex h-6 border-[3px] border-ink bg-paper md:col-span-1"
            >
              {tech.usedJobs.flatMap(({ job, halfYears }) =>
                Array.from({ length: halfYears }, (_, index) => (
                  <span
                    key={`${job.id}-${index}`}
                    className={`grow border-r-[2px] border-ink last:border-r-0 ${job.className}`}
                  />
                )),
              )}
              {Array.from(
                { length: careerHalfYears - tech.total },
                (_, index) => (
                  <span
                    key={`empty-${index}`}
                    className="grow border-r-[2px] border-ink last:border-r-0"
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
  return (
    <>
      <PanelTitle className="bg-pink">Off the clock</PanelTitle>

      <div className="mt-5">
        {aboutPersonal.map((paragraph, index) => (
          <p
            key={index}
            className="mt-3 text-[16px] leading-[1.6] first:mt-0 md:text-[17px]"
          >
            <HighlightedText segments={paragraph} />
          </p>
        ))}
      </div>

      <div className="mt-7 flex -rotate-[0.6deg] items-center gap-4 self-start border-[3px] border-ink bg-yellow px-4 py-3 shadow-[5px_5px_0_var(--color-ink)]">
        <BookIcon className="size-10 shrink-0" />
        <p className="leading-none">
          <span className="block font-mono text-[13px] font-bold uppercase">
            Now reading
          </span>
          <span className="mt-1.5 block font-display text-[clamp(20px,2vw,26px)] font-black tracking-[-0.02em]">
            {aboutReading.title}
          </span>
          <span className="mt-1 block text-[15px]">{aboutReading.author}</span>
        </p>
      </div>

      <PanelAction link={aboutPanelLinks.personal} className="bg-sky" />
    </>
  );
}

function AdventuresPanel() {
  return (
    <>
      <PanelTitle className="bg-green">Side quests</PanelTitle>

      <div className="mt-5">
        {aboutAdventuresText.map((paragraph, index) => (
          <p
            key={index}
            className="mt-3 text-[16px] leading-[1.6] first:mt-0 md:text-[17px]"
          >
            <HighlightedText segments={paragraph} />
          </p>
        ))}
      </div>

      <ul aria-label="Quest log" className="mt-6 flex flex-wrap gap-2.5">
        {aboutQuests.map((quest) => (
          <li
            key={quest.title}
            className="flex items-center gap-2 rounded-[6px] border-[2.5px] border-ink bg-paper py-1 pr-1 pl-1 shadow-brutal-sm"
          >
            <span
              className={`rounded-[3px] border-2 border-ink px-2 py-1 font-display text-[15px] leading-none font-black uppercase ${quest.className}`}
            >
              {quest.title}
            </span>
            <span className="pr-1.5 font-mono text-[11px] leading-none font-bold uppercase">
              {quest.status}
            </span>
          </li>
        ))}
      </ul>

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
  link: { label: string; href: string };
  className: string;
}) {
  return (
    <div className="mt-auto pt-7">
      {link.href ? (
        <ActionLink href={link.href} className={`text-ink ${className}`}>
          {link.label}
          <ArrowUpRightIcon className="size-4" />
        </ActionLink>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex cursor-not-allowed items-center gap-2.5 rounded-brutal border-[2.5px] border-dashed border-ink/60 bg-paper/60 px-5 py-3 text-[16px] leading-none font-bold whitespace-nowrap text-ink/60"
        >
          {link.label}
          <span className="rounded-full border-2 border-ink/60 px-2 py-0.5 font-mono text-[11px] uppercase">
            Soon
          </span>
        </span>
      )}
    </div>
  );
}
