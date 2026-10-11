import { useState } from 'react';
import { AboutPlayerCard } from '@/features/home/components/about-player-card';
import { AboutShowcase } from '@/features/home/components/about-showcase';
import { CodeMarkIcon, GearIcon } from '@/features/home/components/icons';
import {
  defaultAboutTab,
  techLoadout,
  type AboutTabId,
} from '@/features/home/home-content';

// Same burst as the project preview, with
// angles spread unevenly so it does not read as a mechanical pattern.
const rayAngles = [
  -86, -72, -61, -49, -35, -23, -10, 4, 16, 29, 43, 55, 68, 81, 95, 108, 121,
  134, 147, 160, 173, 187, 201, 215, 227, 240, 254,
];

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
      className="relative scroll-mt-4 overflow-clip border-b-[3px] border-ink bg-blue text-ink"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-line)_2px,transparent_2px),linear-gradient(to_bottom,var(--color-line)_2px,transparent_2px)] bg-size-[48px_48px] lg:left-1/2"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-1/2 left-0 hidden overflow-hidden border-r-2 border-line lg:block"
      >
        <svg
          viewBox="-1000 -1000 2000 2000"
          className="absolute top-1/2 left-1/2 size-[2000px] -translate-1/2"
        >
          {rayAngles.map((angle) => (
            <line
              key={angle}
              x1="0"
              y1="0"
              x2={Math.cos((angle * Math.PI) / 180) * 1000}
              y2={Math.sin((angle * Math.PI) / 180) * 1000}
              stroke="var(--color-line)"
              strokeWidth="2"
            />
          ))}
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1360px] px-4 py-12 md:px-10 md:py-16 lg:py-10">
        <div className="flex items-center gap-4 rounded-[6px] border-[3px] border-ink bg-yellow px-4 py-3 shadow-[6px_6px_0_var(--color-ink)] md:gap-6 md:px-6">
          <CodeMarkIcon className="size-8 shrink-0 md:size-10" />
          <h2
            id="about-title"
            className="font-display text-[clamp(26px,3.4vw,46px)] leading-none font-black tracking-[-0.01em] whitespace-nowrap uppercase"
          >
            About me
          </h2>
          <p className="hidden border-l-[3px] border-ink pl-6 font-mono text-[clamp(14px,1.5vw,20px)] leading-none font-bold tracking-[0.3em] uppercase md:block">
            Meet the player
          </p>
          {/* Decorative window controls; the section cannot be closed. */}
          <div aria-hidden="true" className="ml-auto flex gap-2">
            <span className="flex size-8 items-center justify-center rounded-[4px] border-[3px] border-ink bg-paper md:size-10">
              <span className="h-[3px] w-1/2 bg-ink" />
            </span>
            <span className="flex size-8 items-center justify-center rounded-[4px] border-[3px] border-ink bg-paper md:size-10">
              <span className="size-1/2 border-[3px] border-ink" />
            </span>
            <span className="flex size-8 items-center justify-center rounded-[4px] border-[3px] border-ink bg-pink font-mono text-[18px] leading-none font-black md:size-10 md:text-[22px]">
              ✕
            </span>
          </div>
        </div>

        {/* Equal columns keep the backdrop divider in the middle of the gap. */}
        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-6">
          <AboutPlayerCard activeTab={activeTab} onTabChange={setActiveTab} />
          <AboutShowcase tab={activeTab} />
        </div>

        <div className="mt-10 flex flex-col gap-5 rounded-[6px] lg:mt-6 border-[3px] border-ink bg-cream px-4 py-4 shadow-[6px_6px_0_var(--color-ink)] lg:flex-row lg:items-center lg:gap-6 lg:py-3">
          <h3 className="flex shrink-0 -rotate-2 items-center gap-3 self-start border-[3px] border-ink bg-pink px-4 py-2 font-display text-[clamp(22px,2.2vw,30px)] leading-none font-black tracking-[-0.02em] uppercase shadow-[4px_4px_0_var(--color-ink)] lg:self-center">
            <GearIcon className="size-[1.1em]" />
            Tech loadout
          </h3>
          <ul className="grid grow grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4 lg:flex lg:justify-between lg:gap-0">
            {techLoadout.map((group) => (
              <li
                key={group.category}
                className="lg:border-l-2 lg:border-ink/40 lg:px-3.5"
              >
                <p className="font-mono text-[13px] leading-none font-bold uppercase underline underline-offset-4">
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
