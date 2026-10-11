import { useState } from 'react';
import { AboutPlayerCard } from '@/features/home/components/about-player-card';
import { AboutShowcase } from '@/features/home/components/about-showcase';
import { CodeMarkIcon, GearIcon } from '@/features/home/components/icons';
import { SunburstRays } from '@/features/home/components/sunburst-rays';
import {
  defaultAboutTab,
  techLoadout,
  type AboutTabId,
} from '@/features/home/home-content';

// Layout follows the supplied design on the hero's blue. On desktop
// the backdrop mirrors the projects section, as the user asked: rays behind
// the card on the left, the hero grid behind the artwork on the right and a
// divider between them, so the two patterns never overlap. Narrower layouts
// stack the columns and keep the grid only.
export function AboutSection() {
  const [activeTab, setActiveTab] = useState<AboutTabId>(defaultAboutTab);

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative scroll-mt-4 overflow-clip border-b-3 border-ink bg-blue text-ink"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid lg:left-1/2"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-1/2 left-0 hidden overflow-hidden border-r-2 border-line lg:block"
      >
        <SunburstRays />
      </div>

      <div className="relative mx-auto max-w-page px-4 py-16 md:px-10 lg:py-24">
        <div className="flex items-center gap-4 rounded-md border-3 border-ink bg-yellow px-4 py-3 shadow-brutal-lg md:gap-6 md:px-6">
          <CodeMarkIcon className="size-8 shrink-0 md:size-10" />
          <h2
            id="about-title"
            className="font-display text-h3 leading-none font-black whitespace-nowrap uppercase"
          >
            About me
          </h2>
          <p className="hidden border-l-3 border-ink pl-6 font-mono text-lg leading-none font-bold tracking-[0.3em] uppercase md:block">
            Meet the player
          </p>
          {/* Decorative window controls; the section cannot be closed. */}
          <div aria-hidden="true" className="ml-auto flex gap-2">
            <span className="flex size-8 items-center justify-center rounded-sm border-3 border-ink bg-paper md:size-10">
              <span className="h-[3px] w-1/2 bg-ink" />
            </span>
            <span className="flex size-8 items-center justify-center rounded-sm border-3 border-ink bg-paper md:size-10">
              <span className="size-1/2 border-3 border-ink" />
            </span>
            <span className="flex size-8 items-center justify-center rounded-sm border-3 border-ink bg-pink font-mono text-lg leading-none font-black md:size-10 md:text-xl">
              ✕
            </span>
          </div>
        </div>

        {/* Equal columns keep the backdrop divider in the middle of the gap. */}
        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-6">
          <AboutPlayerCard activeTab={activeTab} onTabChange={setActiveTab} />
          <AboutShowcase tab={activeTab} />
        </div>

        <div className="mt-10 flex flex-col gap-5 rounded-md border-3 border-ink bg-cream p-4 shadow-brutal-lg lg:mt-6 lg:flex-row lg:items-center lg:gap-6 lg:py-3">
          <h3 className="flex shrink-0 -rotate-2 items-center gap-3 self-start border-3 border-ink bg-pink px-4 py-2 font-display text-lead leading-none font-black uppercase shadow-brutal lg:self-center">
            <GearIcon className="size-[1.1em]" />
            Tech loadout
          </h3>
          <ul className="grid grow grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4 lg:flex lg:justify-between lg:gap-0">
            {techLoadout.map((group) => (
              <li
                key={group.category}
                className="lg:border-l-2 lg:border-ink/40 lg:px-3.5"
              >
                <p className="font-mono text-xs leading-none font-bold uppercase underline underline-offset-4">
                  {group.category}
                </p>
                <ul
                  aria-label={group.category}
                  className="mt-2.5 flex flex-wrap gap-2.5 lg:flex-nowrap"
                >
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <img
                        src={item.image}
                        alt={item.name}
                        title={item.name}
                        width={36}
                        height={36}
                        loading="lazy"
                        className="size-9 object-contain"
                      />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
