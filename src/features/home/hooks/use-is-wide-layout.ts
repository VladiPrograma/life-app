import { useSyncExternalStore } from 'react';

// Matches the `lg` breakpoint in tokens.css, where home sections switch to
// their side-by-side layouts.
const wideLayoutQuery = '(min-width: 64rem)';

function getMediaQueryList(): MediaQueryList | undefined {
  return typeof window.matchMedia === 'function'
    ? window.matchMedia(wideLayoutQuery)
    : undefined;
}

function subscribe(onChange: () => void) {
  const mediaQueryList = getMediaQueryList();
  mediaQueryList?.addEventListener('change', onChange);
  return () => mediaQueryList?.removeEventListener('change', onChange);
}

// Without matchMedia (e.g. jsdom) the wide layout is assumed.
function getSnapshot() {
  return getMediaQueryList()?.matches ?? true;
}

function getServerSnapshot() {
  return true;
}

/** Whether the viewport reaches the `lg` breakpoint. */
export function useIsWideLayout(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
