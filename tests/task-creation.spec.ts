import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { env } from '../utils/env';

const prompts = [
    'Build a simple todo app with user auth and PostgreSQL backend.',
    'Create an e-commerce website with shopping cart and payment integration.',
    'Develop a blog platform with markdown support and comments section.',
    'Build a real-time chat application with websocket support.',
    'Create a project management tool with task tracking and team collaboration.'
];

test.describe('Dashboard - Task Creation', () => {
    for (const [index, prompt] of prompts.entries()) {
        test(`TC-002.${index + 1}: Create a new task with prompt: ${prompt.slice(0, 30)}...`, async ({ page }) => {
            try {
                // First ensure we're logged in
                const loginPage = new LoginPage(page);
                await page.goto(env.baseUrl);
                
                if (await page.getByText('Sign in').isVisible()) {
                    await loginPage.openEmailLogin();
                    await loginPage.loginWithEnvCredentials();
                    await page.waitForURL('**/*');
                }

                // Initialize dashboard page and perform task creation steps
                const dashboardPage = new DashboardPage(page);
                
                // Step 1: Click 'Create new app' button
                await dashboardPage.clickCreateNewTask();

                // Step 2: Enter the prompt
                await dashboardPage.enterPrompt(prompt);

                // Step 3: Submit the prompt
                await dashboardPage.submitPrompt();

                // Verify expected results
                // await dashboardPage.verifyPlanResponse();

                // Take screenshot for evidence with unique name for each test
                await page.screenshot({ 
                    path: `./test-results/TC-002-${index + 1}-task-creation.png`,
                    fullPage: true 
                });
            } catch (error: any) {
                // Take failure screenshot before failing
                await page.screenshot({ 
                    path: `./test-results/TC-002-${index + 1}-task-creation-failure.png`,
                    fullPage: true 
                });
                throw new Error(`Task creation test failed: ${error?.message || 'Unknown error'}`);
            }
        });
    }
});