import { chromium, FullConfig } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { env } from './utils/env';

async function globalSetup(config: FullConfig) {
  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage();
    const loginPage = new LoginPage(page);

    // Navigate to the page and login with increased timeout
    await page.goto(env.baseUrl, { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    
    await loginPage.openEmailLogin();
    await loginPage.login(env.userEmail, env.userPassword);

    // Wait for navigation and save signed-in state
    await page.waitForURL('**/*', { timeout: 60000 });
    await page.context().storageState({ path: 'storageState.json' });
  } catch (error: any) {
    console.error('Global setup failed:', error);
    throw new Error(`Global setup failed: ${error?.message || 'Unknown error'}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

export default globalSetup;