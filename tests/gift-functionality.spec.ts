import { test } from '@playwright/test';
import { GiftPage } from '../pages/GiftPage';
import { env } from '../utils/env';

test.describe('Gift functionality tests', () => {
  test('should click gift icon and verify dropdown menu', async ({ page }) => {
    const giftPage = new GiftPage(page);
    
    // Navigate to the application
    await page.goto(env.baseUrl);
    
    // Click the gift icon and verify menu
    await giftPage.clickGiftIcon();
    await giftPage.verifyAndClickGiftMenu();
  });

  test('should verify gift menu interaction after login', async ({ page }) => {
    const giftPage = new GiftPage(page);
    
    // Navigate to the application
    await page.goto(env.baseUrl);
    
    // Click the gift icon
    await giftPage.clickGiftIcon();
    
    // Verify menu functionality
    await giftPage.verifyAndClickGiftMenu();
  });
});