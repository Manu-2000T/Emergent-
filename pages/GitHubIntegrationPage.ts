import { Page, expect } from '@playwright/test';

export class GitHubIntegrationPage {
    constructor(private page: Page) {}

    // Locators
    private githubIconButton = () => this.page.getByRole('button', { name: 'GitHub', exact: true });
    private connectToGithubButton = () => this.page.getByRole('button', { name: 'Connect to Github' });
    private privateRepoOption = () => this.page.getByText('Private Repository');
    private publicRepoOption = () => this.page.getByText('Public Repository');
    private buyCreditsButton = () => this.page.getByRole('button', { name: 'Buy Credits' });

    // Actions
    async clickGithubIcon() {
        try {
            await expect(this.githubIconButton()).toBeVisible();
            await this.githubIconButton().click();
        } catch (error: any) {
            throw new Error(`Failed to click GitHub icon: ${error?.message || 'Unknown error'}`);
        }
    }

    async verifyConnectToGithubButton() {
        try {
            await expect(this.connectToGithubButton()).toBeVisible();
            return true;
        } catch (error: any) {
            throw new Error(`Failed to verify Connect to Github button: ${error?.message || 'Unknown error'}`);
        }
    }

    async verifyRepositoryOptions() {
        try {
            await expect(this.privateRepoOption()).toBeVisible();
            await expect(this.publicRepoOption()).toBeVisible();
            return true;
        } catch (error: any) {
            throw new Error(`Failed to verify repository options: ${error?.message || 'Unknown error'}`);
        }
    }

    async verifyAndClickBuyCreditsButton() {
        try {
            await expect(this.buyCreditsButton()).toBeVisible();
            await this.buyCreditsButton().click();
            // Verify that clicking the button had some effect (you can add more specific verifications here)
            await expect(this.page).toHaveURL(/.*credits|pricing.*/i);
            return true;
        } catch (error: any) {
            throw new Error(`Failed to verify or click Buy Credits button: ${error?.message || 'Unknown error'}`);
        }
    }
}