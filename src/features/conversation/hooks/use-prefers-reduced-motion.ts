import { useSyncExternalStore } from 'react';

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

function getMediaQueryList(): MediaQueryList | undefined {
  return typeof window.matchMedia === 'function'
    ? window.matchMedia(reducedMotionQuery)
    : undefined;
}

function subscribe(onChange: () => void) {
  const mediaQueryList = getMediaQueryList();
  mediaQueryList?.addEventListener('change', onChange);
  return () => mediaQueryList?.removeEventListener('change', onChange);
}

// Without matchMedia (e.g. jsdom) motion is treated as reduced, so text appears immediately.
function getSnapshot() {
  return getMediaQueryList()?.matches ?? true;
}

function getServerSnapshot() {
  return true;
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
