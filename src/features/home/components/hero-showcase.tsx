import { HeroTerminal } from '@/features/home/components/hero-terminal';
import vladAvatar from '@/assets/illustrations/vlad-avatar.webp';

/** Personal photo portrait and terminal. */
export function HeroShowcase() {
  return (
    <div className="relative mx-auto w-full max-w-[600px] pt-6 pb-[clamp(114px,23%,140px)]">
      <img
        src={vladAvatar}
        alt="Portrait of Vlad"
        width={1200}
        height={1080}
        fetchPriority="high"
        decoding="async"
        className="aspect-[10/9] w-full object-contain drop-shadow-[10px_10px_0_var(--color-ink)] md:translate-x-[12%] md:translate-y-[6%]"
      />

      <HeroTerminal />
    </div>
  );
}
