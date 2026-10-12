import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

/** The page's Lenis instance, or null while scrolling is native. */
export const SmoothScrollContext = createContext<Lenis | null>(null);

/**
 * Smooth wheel scrolling with Lenis, driven by the GSAP ticker so scroll
 * animations read the same position in the same frame. Touch scrolling stays
 * native. Users who prefer reduced motion keep native scrolling.
 */
export function useSmoothScroll(): Lenis | null {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // jsdom has no matchMedia, which ScrollTrigger needs even to register;
    // scrolling stays native there.
    if (typeof window.matchMedia !== 'function') return;
    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const instance = new Lenis({ autoRaf: false });
      const tick = (time: number) => instance.raf(time * 1000);
      instance.on('scroll', () => ScrollTrigger.update());
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(instance);

      return () => {
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33);
        instance.destroy();
        setLenis(null);
      };
    });

    return () => media.revert();
  }, []);

  // In-page links glide with Lenis instead of jumping, and still update the
  // URL hash through the router so the language switch keeps it.
  useEffect(() => {
    if (!lenis) return;

    function handleClick(event: MouseEvent) {
      if (
        !lenis ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const link = event.target.closest('a[href^="#"]');
      if (!(link instanceof HTMLAnchorElement)) return;
      const target = document.getElementById(
        decodeURIComponent(link.hash.slice(1)),
      );
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target);
      void navigate({ hash: link.hash });
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [lenis, navigate]);

  return lenis;
}
