import { HeroTerminal } from '@/features/home/components/hero-terminal';
import vladAvatar from '@/assets/illustrations/vlad-avatar.webp';
import { useLocale, type Localized } from '@/lib/i18n/locale';

const portraitAlt: Localized<string> = {
  en: 'Portrait of Vlad',
  es: 'Retrato de Vlad',
};

/** Personal photo portrait and terminal. */
export function HeroShowcase() {
  const locale = useLocale();

  return (
    <div
      data-reveal="pop"
      className="relative mx-auto w-full max-w-[600px] pt-6 pb-[clamp(114px,23%,140px)]"
    >
      <img
        src={vladAvatar}
        alt={portraitAlt[locale]}
        width={1200}
        height={1080}
        fetchPriority="high"
        data-parallax="-12"
        decoding="async"
        className="aspect-[10/9] w-full object-contain drop-shadow-[10px_10px_0_var(--color-ink)] md:translate-x-[12%] md:translate-y-[6%]"
      />

      <HeroTerminal />
    </div>
  );
}
