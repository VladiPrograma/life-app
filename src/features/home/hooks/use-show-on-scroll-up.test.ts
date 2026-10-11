import { act, renderHook } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import { useShowOnScrollUp } from '@/features/home/hooks/use-show-on-scroll-up';

function scrollTo(y: number) {
  act(() => {
    window.scrollY = y;
    window.dispatchEvent(new Event('scroll'));
  });
}

afterEach(() => {
  window.scrollY = 0;
  vi.useRealTimers();
});

test('hides while scrolling down and reappears when scrolling up', () => {
  const { result } = renderHook(() => useShowOnScrollUp());
  expect(result.current).toBe(true);

  scrollTo(600);
  expect(result.current).toBe(false);

  scrollTo(500);
  expect(result.current).toBe(true);
});

test('ignores tiny scroll movements', () => {
  const { result } = renderHook(() => useShowOnScrollUp());

  scrollTo(600);
  scrollTo(596);
  expect(result.current).toBe(false);
});

test('stays visible near the top of the page', () => {
  const { result } = renderHook(() => useShowOnScrollUp());

  scrollTo(60);
  expect(result.current).toBe(true);
});

test('stays hidden after an in-page link jumps upward', () => {
  vi.useFakeTimers();
  const { result } = renderHook(() => useShowOnScrollUp());
  const link = document.createElement('a');
  link.href = '#projects';
  document.body.append(link);

  scrollTo(2000);
  act(() => link.click());
  scrollTo(900);
  expect(result.current).toBe(false);

  vi.advanceTimersByTime(1500);
  scrollTo(800);
  expect(result.current).toBe(true);
  link.remove();
});
