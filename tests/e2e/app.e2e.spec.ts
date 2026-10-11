import { expect, test } from '../fixtures';

test('loads the conversation scene without errors or horizontal overflow', async ({
  page,
}) => {
  await page.goto('/chat');

  await expect(page).toHaveTitle('Vlad Dinca · Senior Software Engineer');
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('img', { name: 'Guide' })).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'You, not yet known' }),
  ).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});

test('answers the questions with the keyboard', async ({ page }) => {
  await page.goto('/chat');

  // The last match is the visible typed line; earlier ones are for assistive tech and layout.
  await expect(
    page
      .getByText('Before we begin, I need to know something about you.', {
        exact: true,
      })
      .last(),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Continue' })).toBeFocused();
  await page.keyboard.press('Enter');

  const nameInput = page.getByRole('textbox', { name: 'What is your name?' });
  await expect(nameInput).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(nameInput).toHaveAccessibleDescription(
    'Type an answer first, then press Enter.',
  );

  await page.keyboard.type('Ada');
  await page.keyboard.press('Enter');

  const goalInput = page.getByRole('textbox', {
    name: 'Nice to meet you, Ada. What are you looking for?',
  });
  await expect(goalInput).toBeFocused();
  await page.keyboard.type('A quiet place');
  const completionLog = page.waitForEvent('console', (message) =>
    message.text().startsWith('[conversation] completed'),
  );
  await page.keyboard.press('Enter');

  const result: unknown = await (await completionLog).args()[1]?.jsonValue();
  expect(result).toMatchObject({
    answers: { name: 'Ada', goal: 'A quiet place' },
  });

  await expect(
    page
      .getByText('Thank you, Ada. I will remember that.', { exact: true })
      .last(),
  ).toBeVisible();
  await expect(page.getByRole('textbox')).toHaveCount(0);
});

test('loads the home page without horizontal overflow', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Senior Software Engineer',
    }),
  ).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});

test('navigates to home sections from the header', async ({ page }) => {
  await page.goto('/');

  await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link', { name: 'Projects' })
    .click();

  await expect(page).toHaveURL(/#projects$/);
  await expect(
    page.getByRole('heading', { level: 2, name: 'Damn! I built this?' }),
  ).toBeInViewport();
});

test('hides the header while scrolling down and shows it scrolling up', async ({
  page,
}) => {
  await page.goto('/');
  const header = page.getByRole('banner');

  await page.mouse.wheel(0, 1200);
  await expect(header).toHaveAttribute('data-visible', 'false');
  await expect(header).not.toBeInViewport();

  await page.mouse.wheel(0, -300);
  await expect(header).toHaveAttribute('data-visible', 'true');
  await expect(header).toBeInViewport();
});

test('loads chat directly after a browser refresh', async ({ page }) => {
  await page.goto('/chat');
  await expect(page.getByRole('button', { name: 'Continue' })).toBeFocused();
  await page.reload();

  await expect(page).toHaveURL(/\/chat$/);
  await expect(page.getByRole('button', { name: 'Continue' })).toBeFocused();
});
