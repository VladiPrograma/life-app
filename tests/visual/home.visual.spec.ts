import { expect, test } from '../fixtures';

test('home page matches the reviewed baseline', async ({ page }) => {
  // The skill tree counts the ongoing job up to today; pin the date so the
  // number of half-year squares stays stable.
  await page.clock.setFixedTime(new Date('2026-10-11T12:00:00Z'));
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Senior Software Engineer',
    }),
  ).toBeVisible();

  // Illustrations below the fold load lazily; bring each rendered one into
  // view and wait until it has decoded before the full-page capture. Images
  // hidden at this viewport never load and are not part of the screenshot.
  for (const image of await page.locator('img:visible').all()) {
    await image.scrollIntoViewIfNeeded();
  }
  await page.waitForFunction(() =>
    Array.from(document.images)
      .filter((image) => image.checkVisibility())
      .every((image) => image.complete && image.naturalWidth > 0),
  );
  await page.evaluate(() => window.scrollTo(0, 0));

  await expect(page).toHaveScreenshot('home.png', { fullPage: true });
});
