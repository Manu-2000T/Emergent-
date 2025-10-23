import { Page, expect } from '@playwright/test';

export class GiftPage {
    constructor(private page: Page) {}

    // Locators
    private giftIconButton = () => this.page.getByRole('button', { name: 'Gift Icon' });
    private giftMenu = () => this.page.locator('.relative.px-4');

    // Actions
    async clickGiftIcon() {
        try {
            await expect(this.giftIconButton()).toBeVisible();
            await this.giftIconButton().click();
        } catch (error: any) {
            throw new Error(`Failed to click Gift icon: ${error?.message || 'Unknown error'}`);
        }
    }

    async verifyAndClickGiftMenu() {
        try {
            await expect(this.giftMenu()).toBeVisible();
            await expect(this.giftMenu()).toBeEnabled();
            await this.giftMenu().click();
            return true;
        } catch (error: any) {
            throw new Error(`Failed to verify or click gift menu: ${error?.message || 'Unknown error'}`);
        }
    }
}