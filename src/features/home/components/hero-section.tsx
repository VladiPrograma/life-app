import { ActionLink } from '@/features/home/components/action-link';
import { HeroShowcase } from '@/features/home/components/hero-showcase';
import { SectionTicker } from '@/features/home/components/section-ticker';
import {
  MailIcon,
  PlayIcon,
  RocketIcon,
} from '@/features/home/components/icons';
import { emailHref, heroTicker, profile } from '@/features/home/home-content';

// Each title word is a separate taped-on block with its own tilt.
const titleBlockClassName =
  'inline-block border-[3px] border-ink px-[0.14em] pt-[0.06em] pb-[0.02em] shadow-[6px_6px_0_var(--color-ink)] md:border-4 md:shadow-[9px_9px_0_var(--color-ink)]';

export function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative scroll-mt-4 overflow-clip border-b-[3px] border-ink bg-blue text-paper"
    >
      {/* Blueprint grid behind the content. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-line)_2px,transparent_2px),linear-gradient(to_bottom,var(--color-line)_2px,transparent_2px)] bg-size-[48px_48px]"
      />

      <div className="relative mx-auto grid max-w-[1360px] gap-14 px-4 pt-10 pb-14 md:px-10 md:pt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-12 lg:pt-12 lg:pb-14">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="-rotate-2 rounded-[6px] border-[3px] border-ink bg-paper px-3 py-1.5 font-mono text-[14px] leading-none font-black text-ink uppercase shadow-brutal-sm md:text-[15px]">
              Hello, I’m Vlad
            </p>
            <p className="inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-green px-3 py-1.5 font-mono text-[13px] leading-none font-black text-ink uppercase shadow-brutal-sm md:text-[14px]">
              <span className="size-2.5 rounded-full border-2 border-ink bg-paper" />
              {profile.available}
            </p>
          </div>

          <h1
            id="hero-title"
            className="mt-7 flex flex-col items-start gap-[0.16em] font-display text-[clamp(52px,6.2vw,104px)] leading-[0.88] font-black tracking-[-0.03em] text-ink uppercase"
          >
            <span className={`${titleBlockClassName} -rotate-2 bg-paper`}>
              Senior
            </span>{' '}
            <span
              className={`${titleBlockClassName} ml-[0.3em] rotate-1 bg-yellow`}
            >
              Software
            </span>{' '}
            <span className={`${titleBlockClassName} -rotate-1 bg-pink`}>
              Engineer
            </span>
          </h1>

          <p className="mt-9 max-w-[600px] font-display text-[clamp(21px,2.1vw,28px)] leading-[1.75] font-bold">
            I solve big problems with{' '}
            <span className="rounded-[6px] border-[3px] border-ink bg-yellow px-2 py-0.5 text-ink shadow-brutal [box-decoration-break:clone]">
              real solutions.
            </span>
          </p>
          <p className="mt-4 max-w-[560px] text-[16px] leading-[1.6] text-paper/90">
            Give me a hard problem and I’m all in. I love digging into it until
            I understand every corner, losing track of time along the way. I
            enjoy putting myself to the test, and proving to myself, every time,
            that there’s always a way to solve it.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <ActionLink href="#projects" className="bg-yellow text-ink">
              <PlayIcon className="size-5" />
              View Projects
            </ActionLink>
            <ActionLink href="#contact" className="bg-pink text-ink">
              <RocketIcon className="size-5" />
              Let’s Build
            </ActionLink>
            <ActionLink href={emailHref} className="bg-paper text-ink">
              <MailIcon className="size-5" />
              Email Me
            </ActionLink>
          </div>
        </div>

        <HeroShowcase />
      </div>

      <SectionTicker
        items={heroTicker}
        className="border-t-[3px] border-ink bg-ink text-yellow"
        separatorClassName="text-pink"
        reverse
      />
    </section>
  );
}
