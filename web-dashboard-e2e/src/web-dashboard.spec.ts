import { test, expect } from '@playwright/test';

test.describe('web-dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main application header', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Real-Time Telemetry Engine');
  });

  test('should gracefully handle the connection state', async ({ page }) => {
    // check if the main container is ready
    await expect(page.locator('h1')).toBeVisible();

    // check if the fallback "Waiting" text is present on the page
    const loadingText = page.locator('text=Waiting for telemetry data...');
    const isWaiting = await loadingText.isVisible();

    if (isWaiting) {
      // backend is likely off; assert the fallback UI is visible
      await expect(page.locator('text=Disconnected')).toBeVisible();
    } else {
      // backend is streaming; assert the metric cards rendered successfully
      await expect(page.locator('text=Live Connection Active')).toBeVisible();
      await expect(page.locator('text=CPU Usage')).toBeVisible();
      await expect(page.locator('text=Memory')).toBeVisible();
      await expect(page.locator('text=System Status')).toBeVisible();
    }
  });
});
