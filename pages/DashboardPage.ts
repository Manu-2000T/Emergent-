import { Page, expect } from '@playwright/test';

export class DashboardPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForDashboardLoad() {
        try {
            // Wait for key dashboard elements to be visible
            // await this.page.waitForSelector('text=Where ideas become reality', { timeout: 10000 });
            // Wait for the loading sections to disappear
            await this.page.waitForSelector('text=Loading section...', { state: 'hidden', timeout: 10000 });
        } catch (error: any) {
            throw new Error(`Failed to load dashboard: ${error?.message || 'Unknown error'}`);
        }
    }

    async clickCreateNewTask() {
        try {
            await this.waitForDashboardLoad();
            
            // Use a more specific selector combining multiple attributes
            const promptInput = this.page.locator('textarea#mainTaskInput.flex.rounded-md.font-brockmann').first();
            await expect(promptInput).toBeVisible({ timeout: 5000 });
            await promptInput.click();
        } catch (error: any) {
            throw new Error(`Failed to click create new task: ${error?.message || 'Unknown error'}`);
        }
    }

    async enterPrompt(prompt: string) {
        try {
            // Use the same specific selector for consistency
            const promptInput = this.page.locator('textarea#mainTaskInput.flex.rounded-md.font-brockmann').first();
            await expect(promptInput).toBeVisible({ timeout: 5000 });
            await promptInput.fill(prompt);
        } catch (error: any) {
            throw new Error(`Failed to enter prompt: ${error?.message || 'Unknown error'}`);
        }
    }

    async submitPrompt() {
        try {
            // Wait for Submit button to be enabled after entering text
            const submitButton = this.page.getByRole('button', { name: 'Submit' });
            
            // First ensure the button is visible
            await expect(submitButton).toBeVisible({ timeout: 5000 });
            
            // Then wait for it to be enabled (since it starts disabled)
            await this.page.waitForFunction(() => {
                const button = document.querySelector('button:has(img[alt="Submit"])') as HTMLButtonElement;
                return button && !button.disabled;
            }, { timeout: 5000 });
            
            await submitButton.click();
        } catch (error: any) {
            throw new Error(`Failed to submit prompt: ${error?.message || 'Unknown error'}`);
        }
    }

    async selectLLM(llmName: string) {
        // Click on the LLM dropdown button (the currently active model)
        const llmButton = this.page.getByRole('button', { name: /Claude.*Sonnet|GPT-5.*Beta/ }).first();
        await llmButton.click();

        // Wait for the LLM options to be visible and select based on the model
        let llmOption;
        switch(llmName) {
            case 'Claude 4.0 Sonnet':
                llmOption = this.page.locator('div').filter({ hasText: /^Claude 4\.0 SonnetAnthropic older Model$/ }).nth(1);
                break;
            case 'GPT-5 (Beta)':
                llmOption = this.page.locator('div').filter({ hasText: /^GPT-5 \(Beta\)OpenAI newest model$/ }).first();
                break;
            case 'Claude 4.5 Sonnet - 1M':
                llmOption = this.page.locator('div').filter({ hasText: 'Claude 4.5 Sonnet - 1M' }).first();
                break;
            default:
                llmOption = this.page.getByText(llmName, { exact: true }).last();
        }

        await expect(llmOption).toBeVisible();
        await llmOption.click();

        // Check if upgrade modal appears (for premium features)
        const upgradeModal = this.page.getByRole('heading', { name: 'Choose your plan' });
        if (await upgradeModal.isVisible()) {
            // Close the modal and skip verification since we can't select premium models
            const closeButton = this.page.getByRole('button', { name: 'Close modal' });
            await closeButton.click();
            return;
        }

        // Only verify selection for free models
        const selectedLLM = this.page.getByRole('button', { name: new RegExp(llmName) }).first();
        await expect(selectedLLM).toBeVisible();
    }

    // async verifyPlanResponse() {
    //     // Wait for response - the textarea should have our prompt text
    //     await expect(
    //         this.page.locator('textarea#mainTaskInput.flex.rounded-md.font-brockmann')
    //     ).toHaveValue('Build a simple todo app with user auth and PostgreSQL backend.');

    //     // Verify that the "Keep Building" button is available
    //     const keepBuildingBtn = this.page.getByRole('button', { name: 'Keep Building' });
    //     await expect(keepBuildingBtn).toBeVisible({ timeout: 10000 });
        
    //     // Verify we're on the planning view by checking for the headings
    //     await expect(this.page.getByRole('heading', { name: 'Start building with' })).toBeVisible();
    //     await expect(this.page.getByRole('heading', { name: 'Emergent Today' })).toBeVisible();
    // }
}