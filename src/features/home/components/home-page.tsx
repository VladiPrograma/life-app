import { AboutSection } from '@/features/home/components/about-section';
import { ContactSection } from '@/features/home/components/contact-section';
import { HeroSection } from '@/features/home/components/hero-section';
import { ProjectsSection } from '@/features/home/components/projects-section';
import { SectionTicker } from '@/features/home/components/section-ticker';
import { SiteFooter } from '@/features/home/components/site-footer';
import { SiteHeader } from '@/features/home/components/site-header';
import {
  hobbiesTicker,
  pageMetadata,
  valuesTicker,
} from '@/features/home/home-content';
import { usePageMetadata } from '@/features/home/hooks/use-page-metadata';
import { useLocale } from '@/lib/i18n/locale';
import styles from '@/features/home/components/home-page.module.css';

// Tickers separate the sections, as the user asked, with a new palette each
// time. Counting the hero strip as the first, odd strips scroll right and
// even ones left. Each strip only draws the borders its neighbours lack.
export function HomePage() {
  const locale = useLocale();
  usePageMetadata(pageMetadata[locale]);

  return (
    <div className={`${styles.page} bg-paper text-ink`}>
      <SiteHeader />
      <main>
        <HeroSection />
        <ProjectsSection />
        <SectionTicker
          items={valuesTicker[locale]}
          className="border-b-3 border-ink bg-yellow text-ink"
          separatorClassName="text-pink"
        />
        <AboutSection />
        <SectionTicker
          items={hobbiesTicker[locale]}
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
