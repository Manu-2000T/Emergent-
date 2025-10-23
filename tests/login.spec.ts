import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { env } from '../utils/env';

test.describe('Login tests', () => {
  test('should login with stored credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // First navigate to the page
    await page.goto(env.baseUrl);
    
    // Perform login if not already logged in
    if (await page.getByText('Sign in').isVisible()) {
      await loginPage.openEmailLogin();
      await loginPage.loginWithEnvCredentials();
      
      // Wait for navigation after login
      await page.waitForURL('**/*');
    }
    
    // Now verify the logged-in state elements
    await loginPage.verifyToolbarButtons();
  });

  test('should login with fresh credentials if needed', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto(env.baseUrl);
    await loginPage.openEmailLogin();
    await loginPage.login(env.userEmail, env.userPassword);
    
    // Add verification steps here
    
  });
});