import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { env } from '../utils/env';

test.describe('LLM Selection', () => {
    const llmOptions = [
        { id: '1', name: 'Claude 4.5 Sonnet', context: '200k Context', requiresPro: false },
        { id: '2', name: 'Claude 4.5 Sonnet - 1M', context: '1 Million Context', requiresPro: true },
        { id: '3', name: 'GPT-5 (Beta)', context: 'OpenAI newest model', requiresPro: true },
        { id: '4', name: 'Claude 4.0 Sonnet', context: 'Anthropic older Model', requiresPro: false }
    ];

    for (const llm of llmOptions) {
        const testFn = llm.requiresPro ? test.skip : test;
        testFn(`TC-003.${llm.id}: Select ${llm.name}`, async ({ page }) => {
            try {
                // First ensure we're logged in
                const loginPage = new LoginPage(page);
                await page.goto(env.baseUrl);
                
                if (await page.getByText('Sign in').isVisible()) {
                    await loginPage.openEmailLogin();
                    await loginPage.loginWithEnvCredentials();
                    await page.waitForURL('**/*');
                }

                // Initialize dashboard page
                const dashboardPage = new DashboardPage(page);
                await dashboardPage.waitForDashboardLoad();

                // Select the LLM
                await dashboardPage.selectLLM(llm.name);

                // Verify the context text is visible
                // await expect(page.getByText(llm.context)).toBeVisible();

                // Take screenshot for evidence
                await page.screenshot({ 
                    path: `./test-results/TC-003-${llm.id}-llm-selection-${llm.name.toLowerCase().replace(/\s+/g, '-')}.png`,
                    fullPage: true 
                });
            } catch (error: any) {
                // Take failure screenshot before failing
                await page.screenshot({ 
                    path: `./test-results/TC-003-${llm.id}-llm-selection-${llm.name.toLowerCase().replace(/\s+/g, '-')}-failure.png`,
                    fullPage: true 
                });
                throw new Error(`LLM selection test failed: ${error?.message || 'Unknown error'}`);
            }
        });
    }
});