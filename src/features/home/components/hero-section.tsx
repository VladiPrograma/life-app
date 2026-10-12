import { ActionLink } from '@/features/home/components/action-link';
import { HeroShowcase } from '@/features/home/components/hero-showcase';
import { SectionTicker } from '@/features/home/components/section-ticker';
import {
  MailIcon,
  PlayIcon,
  RocketIcon,
} from '@/features/home/components/icons';
import { emailHref, heroTicker, profile } from '@/features/home/home-content';
import { localized, useLocale } from '@/lib/i18n/locale';

// Each title word is a separate taped-on block with its own tilt.
const titleBlockClassName =
  'inline-block border-3 border-ink px-[0.14em] pt-[0.06em] pb-[0.02em] shadow-brutal-lg md:border-4 md:shadow-brutal-xl';

// The title stays in English in both languages, as in the Spanish CV.
const copy = localized({
  en: {
    greeting: 'Hello, I’m Vlad',
    leadStart: 'I solve big problems with',
    leadHighlight: 'real solutions.',
    intro:
      'Give me a hard problem and I’m all in. I love digging into it until I understand every corner, losing track of time along the way. I enjoy putting myself to the test, and proving to myself, every time, that there’s always a way to solve it.',
    viewProjects: 'View Projects',
    letsBuild: 'Let’s Build',
    emailMe: 'Email Me',
  },
  es: {
    greeting: 'Hola, soy Vlad',
    leadStart: 'Resuelvo grandes problemas con',
    leadHighlight: 'soluciones reales.',
    intro:
      'Dame un problema difícil y me lanzo de cabeza. Me encanta escarbar en él hasta entender cada rincón, perdiendo la noción del tiempo por el camino. Disfruto poniéndome a prueba y demostrándome, cada vez, que siempre hay una forma de resolverlo.',
    viewProjects: 'Ver proyectos',
    letsBuild: 'Hablemos',
    emailMe: 'Escríbeme',
  },
});

export function HeroSection() {
  const locale = useLocale();
  const text = copy[locale];

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative scroll-mt-4 overflow-clip border-b-3 border-ink bg-blue text-paper"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid"
      />

      <div className="relative mx-auto grid max-w-page gap-14 px-4 pt-10 pb-14 md:px-10 md:pt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-12 lg:pt-12">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="-rotate-2 rounded-md border-3 border-ink bg-paper px-3 py-1.5 font-mono text-sm leading-none font-black text-ink uppercase shadow-brutal-sm">
              {text.greeting}
            </p>
            <p className="inline-flex items-center gap-2 rounded-full border-3 border-ink bg-green px-3 py-1.5 font-mono text-sm leading-none font-black text-ink uppercase shadow-brutal-sm">
              <span className="size-2.5 rounded-full border-2 border-ink bg-paper" />
              {profile.available[locale]}
            </p>
          </div>

          <h1
            id="hero-title"
            className="mt-7 flex flex-col items-start gap-[0.16em] font-display text-display leading-[0.88] font-black text-ink uppercase"
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

          <p className="mt-9 max-w-[600px] font-display text-lead leading-[1.75] font-bold">
            {text.leadStart}{' '}
            <span className="rounded-md border-3 border-ink bg-yellow px-2 py-0.5 text-ink shadow-brutal [box-decoration-break:clone]">
              {text.leadHighlight}
            </span>
          </p>
          <p className="mt-4 max-w-[560px] text-base leading-relaxed text-paper/80">
            {text.intro}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <ActionLink href="#projects" className="bg-yellow">
              <PlayIcon className="size-5" />
              {text.viewProjects}
            </ActionLink>
            <ActionLink href="#contact" className="bg-pink">
              <RocketIcon className="size-5" />
              {text.letsBuild}
            </ActionLink>
            <ActionLink href={emailHref} className="bg-paper">
              <MailIcon className="size-5" />
              {text.emailMe}
            </ActionLink>
          </div>
        </div>

        <HeroShowcase />
      </div>

      <SectionTicker
        items={heroTicker}
        className="border-t-3 border-ink bg-ink text-yellow"
        separatorClassName="text-pink"
        reverse
      />
    </section>
  );
}
