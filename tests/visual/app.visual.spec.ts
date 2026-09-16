import { expect, test } from '../fixtures';

test('application shell matches the reviewed infrastructure baseline', async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date('2026-01-01T12:00:00Z'));
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Application ready' }),
  ).toBeVisible();
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot('application-shell.png', {
    fullPage: true,
  });
});
