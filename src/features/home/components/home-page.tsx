import { AboutSection } from '@/features/home/components/about-section';
import { ContactSection } from '@/features/home/components/contact-section';
import { HeroSection } from '@/features/home/components/hero-section';
import { ProjectsSection } from '@/features/home/components/projects-section';
import { SectionTicker } from '@/features/home/components/section-ticker';
import { SiteFooter } from '@/features/home/components/site-footer';
import { SiteHeader } from '@/features/home/components/site-header';
import { hobbiesTicker, valuesTicker } from '@/features/home/home-content';
import styles from '@/features/home/components/home-page.module.css';

// Tickers separate the sections, as the user asked, with a new palette each
// time. Counting the hero strip as the first, odd strips scroll right and
// even ones left. Each strip only draws the borders its neighbours lack.
export function HomePage() {
  return (
    <div className={`${styles.page} bg-paper text-ink`}>
      <SiteHeader />
      <main>
        <HeroSection />
        <ProjectsSection />
        <SectionTicker
          items={valuesTicker}
          className="border-b-[3px] border-ink bg-yellow text-ink"
          separatorClassName="text-pink"
        />
        <AboutSection />
        <SectionTicker
          items={hobbiesTicker}
          className="bg-pink text-ink"
          separatorClassName="text-blue"
          reverse
        />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
