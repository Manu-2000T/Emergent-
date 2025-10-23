import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { GitHubIntegrationPage } from '../pages/GitHubIntegrationPage';
import { env } from '../utils/env';

test.describe('GitHub Integration Tests', () => {
    test('TC-004: Verify GitHub integration buttons and repository options', async ({ page }) => {
        try {
            // First ensure we're logged in
            const loginPage = new LoginPage(page);
            await page.goto(env.baseUrl);
            
            if (await page.getByText('Sign in').isVisible()) {
                await loginPage.openEmailLogin();
                await loginPage.loginWithEnvCredentials();
                await page.waitForURL('**/*');
            }

            // Initialize GitHub integration page
            const githubPage = new GitHubIntegrationPage(page);
            
            // Click on GitHub icon
            await githubPage.clickGithubIcon();

            // Verify Connect to Github button is visible
            await githubPage.verifyConnectToGithubButton();

            // Verify repository options are visible
            await githubPage.verifyRepositoryOptions();

            // Take screenshot for evidence
            await page.screenshot({ 
                path: './test-results/TC-004-github-integration.png',
                fullPage: true 
            });
        } catch (error: any) {
            // Take failure screenshot before failing
            await page.screenshot({ 
                path: './test-results/TC-004-github-integration-failure.png',
                fullPage: true 
            });
            throw new Error(`GitHub integration test failed: ${error?.message || 'Unknown error'}`);
        }
    });

    test('TC-005: Verify Buy Credits button functionality', async ({ page }) => {
        try {
            // First ensure we're logged in
            const loginPage = new LoginPage(page);
            await page.goto(env.baseUrl);
            
            if (await page.getByText('Sign in').isVisible()) {
                await loginPage.openEmailLogin();
                await loginPage.loginWithEnvCredentials();
                await page.waitForURL('**/*');
            }

            // Initialize GitHub integration page
            const githubPage = new GitHubIntegrationPage(page);
            
            // Verify and click Buy Credits button
            await githubPage.verifyAndClickBuyCreditsButton();

            // Take screenshot for evidence
            await page.screenshot({ 
                path: './test-results/TC-005-buy-credits.png',
                fullPage: true 
            });
        } catch (error: any) {
            // Take failure screenshot before failing
            await page.screenshot({ 
                path: './test-results/TC-005-buy-credits-failure.png',
                fullPage: true 
            });
            throw new Error(`Buy Credits button test failed: ${error?.message || 'Unknown error'}`);
        }
    });
});