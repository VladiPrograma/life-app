import { expect, test } from '../fixtures';

test('loads the application without errors or horizontal overflow', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Life App');
  await expect(page.getByRole('main')).toBeVisible();
  await expect(
    page.getByRole('heading', { level: 1, name: 'Application ready' }),
  ).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});
