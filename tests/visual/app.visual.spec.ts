import { expect, test } from '../fixtures';

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-01-01T12:00:00Z'));
  await page.goto('/chat');
  await page.evaluate(() => document.fonts.ready);
});

test('opening line matches the reviewed baseline', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Continue' })).toBeFocused();

  await expect(page).toHaveScreenshot('conversation-opening.png', {
    fullPage: true,
  });
});

test('question with a typed answer matches the reviewed baseline', async ({
  page,
}) => {
  await page.keyboard.press('Enter');
  const nameInput = page.getByRole('textbox', { name: 'What is your name?' });
  await expect(nameInput).toBeFocused();
  await nameInput.fill('Ada');

  await expect(page).toHaveScreenshot('conversation-question.png', {
    fullPage: true,
  });
});
