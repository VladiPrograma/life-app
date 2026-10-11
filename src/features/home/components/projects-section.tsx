import { useState } from 'react';
import { ArrowUpRightIcon } from '@/features/home/components/icons';
import { ProjectPreview } from '@/features/home/components/project-preview';
import { projects } from '@/features/home/home-content';

// Tag chips reuse the hero sticker palette, cycling per position.
const tagColors = ['bg-yellow', 'bg-pink', 'bg-green', 'bg-paper'];

// Layout follows the supplied design. Assumption: the reference uses
// a condensed display face that was not supplied; Red Hat Display stands in.
export function ProjectsSection() {
  const [activeNumber, setActiveNumber] = useState(projects[0]?.number);
  const activeProject =
    projects.find((project) => project.number === activeNumber) ?? projects[0];

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="scroll-mt-4 overflow-clip border-b-3 border-ink bg-night text-paper"
    >
      <div className="mx-auto grid max-w-[1707px] lg:grid-cols-[minmax(0,41fr)_minmax(0,59fr)]">
        <div className="px-4 pt-16 md:px-10 lg:col-start-2 lg:row-start-1 lg:border-l-2 lg:border-line lg:px-8 lg:pt-24">
          <h2
            id="projects-title"
            className="font-display text-h2 leading-none font-black uppercase"
          >
            <span className="text-yellow">Damn!</span>{' '}
            <span className="italic">I built this?</span>
          </h2>
        </div>

        {activeProject ? (
          <div className="relative flex flex-col items-center gap-10 overflow-clip px-6 py-16 md:px-10 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:items-start lg:justify-center lg:py-24 lg:pl-[10%]">
            <ProjectPreview project={activeProject} />
          </div>
        ) : null}

        <ul className="px-4 pb-16 md:px-10 lg:col-start-2 lg:row-start-2 lg:border-l-2 lg:border-line lg:px-8 lg:pb-24">
          {projects.map((project) => {
            const isActive = project.number === activeProject?.number;

            return (
              <li
                key={project.number}
                onMouseEnter={() => setActiveNumber(project.number)}
                className="grid max-w-[940px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-4 border-b-2 border-line py-8 md:grid-cols-[minmax(0,1.25fr)_auto_minmax(0,1fr)] lg:py-10"
              >
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveNumber(project.number)}
                  onFocus={() => setActiveNumber(project.number)}
                  className={`group col-span-2 grid grid-cols-subgrid items-center text-left transition-colors duration-150 hover:text-paper focus-visible:outline-3 focus-visible:outline-offset-[6px] focus-visible:outline-yellow ${
                    isActive ? 'text-paper' : 'text-paper/60'
                  }`}
                >
                  <span className="font-display text-h3 leading-none font-black tracking-tight uppercase [overflow-wrap:anywhere]">
                    {project.title}
                  </span>
                  <ArrowUpRightIcon
                    className={`size-10 transition-transform duration-150 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                      isActive ? 'translate-x-1 -translate-y-1' : ''
                    }`}
                  />
                </button>

                <ul
                  aria-label={`${project.title} technologies`}
                  className="col-span-2 flex flex-wrap gap-2.5 md:col-span-1 md:justify-end"
                >
                  {project.tags.map((tag, index) => (
                    <li
                      key={tag}
                      className={`rounded-md border-3 border-ink px-2.5 py-1.5 font-mono text-xs leading-none font-black text-ink uppercase transition-[translate,box-shadow] duration-150 ${
                        tagColors[index % tagColors.length]
                      } ${isActive ? '-translate-y-1 shadow-brutal' : ''}`}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
