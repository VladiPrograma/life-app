import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, type RefObject } from 'react';

// Where each revealed element starts. Every one ends where the layout puts
// it, so the CSS tilts and offsets are untouched: GSAP animates `transform`,
// while Tailwind's tilts use the separate `rotate` and `translate` properties.
const revealStates = {
  rise: { from: { y: 48, autoAlpha: 0 }, ease: 'power3.out' },
  pop: {
    from: { scale: 0.6, rotation: -8, autoAlpha: 0 },
    ease: 'back.out(2)',
  },
  drop: {
    from: { y: -110, rotation: -10, autoAlpha: 0 },
    ease: 'back.out(1.6)',
  },
};

type RevealName = keyof typeof revealStates;

function isRevealName(name: string | undefined): name is RevealName {
  return name !== undefined && name in revealStates;
}

/**
 * Scroll animations for the home page, all skipped when the user prefers
 * reduced motion:
 * - `data-reveal="rise|pop|drop"` animates an element in the first time it
 *   scrolls into view; `data-reveal-children` does it for each direct child.
 *   Elements entering together play one after another, in page order, which
 *   also staggers the hero on load.
 * - `data-parallax="<percent>"` moves an element by that share of its height
 *   while its section crosses the viewport.
 * - `data-spin="<degrees>"` turns an element while its section crosses.
 */
export function useScrollAnimations(rootRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    // jsdom has no matchMedia, which ScrollTrigger needs even to register;
    // nothing animates there.
    if (!root || typeof window.matchMedia !== 'function') return;
    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia(root);
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const revealed = gsap.utils
        .toArray<HTMLElement>('[data-reveal], [data-reveal-children] > *')
        .flatMap((element) => {
          const name =
            element.dataset.reveal ??
            element.parentElement?.dataset.revealChildren;
          return isRevealName(name) ? [{ element, name }] : [];
        });

      for (const { element, name } of revealed) {
        gsap.set(element, revealStates[name].from);
      }

      ScrollTrigger.batch(
        revealed.map(({ element }) => element),
        {
          start: 'top 92%',
          once: true,
          onEnter: (batch) => {
            batch.forEach((element, index) => {
              const name = revealed.find(
                (item) => item.element === element,
              )?.name;
              gsap.to(element, {
                y: 0,
                scale: 1,
                rotation: 0,
                autoAlpha: 1,
                duration: 0.8,
                delay: Math.min(index * 0.07, 0.8),
                ease: name ? revealStates[name].ease : 'power3.out',
                clearProps: 'transform,opacity,visibility',
              });
            });
          },
        },
      );

      for (const element of gsap.utils.toArray<HTMLElement>(
        '[data-parallax]',
      )) {
        gsap.to(element, {
          yPercent: Number(element.dataset.parallax),
          ease: 'none',
          scrollTrigger: {
            trigger: element.closest('section') ?? element,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      for (const element of gsap.utils.toArray<HTMLElement | SVGElement>(
        '[data-spin]',
      )) {
        gsap.to(element, {
          rotation: Number(element.dataset.spin),
          ease: 'none',
          scrollTrigger: {
            trigger: element.closest('section') ?? element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Opening a project, switching language or loading an image moves
      // everything below it; recalculate where each animation starts.
      let frame = 0;
      const observer = new ResizeObserver(() => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => ScrollTrigger.refresh());
      });
      observer.observe(root);

      return () => {
        observer.disconnect();
        cancelAnimationFrame(frame);
      };
    });

    return () => media.revert();
  }, [rootRef]);
}
