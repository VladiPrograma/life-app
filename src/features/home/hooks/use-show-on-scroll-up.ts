import { useEffect, useState } from 'react';

// Near the top of the page the header always stays visible.
const topZone = 80;
// Ignores small scroll jitter, e.g. from trackpad inertia.
const minimumDelta = 8;
// In-page link jumps are not a request for the header, even when they go up.
const anchorJumpWindow = 1000;

/** Hidden while scrolling down, shown again as soon as the user scrolls up. */
export function useShowOnScrollUp(): boolean {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    let anchorJumpUntil = 0;

    function handleScroll() {
      const y = window.scrollY;
      if (y <= topZone) {
        lastY = y;
        setIsVisible(true);
        return;
      }

      const delta = y - lastY;
      if (Math.abs(delta) < minimumDelta) return;
      lastY = y;
      setIsVisible(delta < 0 && performance.now() > anchorJumpUntil);
    }

    function handleClick(event: MouseEvent) {
      if (
        event.target instanceof Element &&
        event.target.closest('a[href^="#"]')
      ) {
        anchorJumpUntil = performance.now() + anchorJumpWindow;
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return isVisible;
}
