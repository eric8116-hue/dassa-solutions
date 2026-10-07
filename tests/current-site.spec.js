const { test, expect } = require('@playwright/test');

const BOOKING = 'https://calendly.com/edassa-dassasolutions/30min';

test.describe('Current Dassa ride experience', () => {
  test('loads without console errors and exposes the business chooser', async ({ page }) => {
    const errors = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/');
    await expect(page.locator('#ride')).toBeVisible();
    await expect(page.locator('#ride-q')).toBeVisible();
    await expect(page.locator('.ride-count')).toContainText('business types');
    expect(errors).toEqual([]);
  });

  test('searching Auto Repair opens the four-beat walkthrough', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#ride-q')).toBeVisible();
    await page.locator('#ride-q').fill('auto repair');
    await page.locator('#ride-list button', { hasText: 'Auto Repair' }).click();
    await expect(page.locator('#ride-stage')).toContainText('Your one person up front is mid-checkout.');
    await expect(page.locator('#ride-photo')).toHaveAttribute('src', /assets\/scenes\/auto\//);
    await expect(page.locator('#ride-steps li.is-current')).toHaveCount(1);
  });

  test('direct vertical links open a supported business and preserve the mobile frame', async ({ page }, testInfo) => {
    await page.goto('/?vertical=beauty-spa');
    await expect(page.locator('#ride-stage')).toContainText('Your front desk is checking out a client.');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(overflow, `${testInfo.project.name} has horizontal overflow`).toBe(false);
  });

  test('calculator produces a clearly qualified planning estimate', async ({ page }) => {
    await page.goto('/?vertical=auto-repair');
    for (let i = 0; i < 7; i += 1) {
      await page.getByRole('button', { name: /Next|Why it costs you|Meet the Virtual Service Advisor|See what it is worth/ }).click();
    }
    await page.getByRole('button', { name: 'Run the one-call math' }).click();
    await page.locator('#calc-calls').fill('10');
    await page.locator('#calc-ticket').fill('400');
    await expect(page.locator('.ride-result')).toContainText('About');
    await expect(page.locator('.ride-note')).toContainText('planning estimate');
  });

  test('booking links use the approved Calendly destination', async ({ page }) => {
    await page.goto('/?vertical=auto-repair');
    await expect(page.locator(`a[href="${BOOKING}"]`).last()).toHaveAttribute('href', BOOKING);
  });
});
