import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // Locators
  // Authentication related locators
  private signInButton = () => this.page.getByText('Sign in');
  private emailLoginButton = () => this.page.getByRole('button', { name: /Log in with Email/i });
  private emailInput = () => this.page.getByPlaceholder(/Enter your email/i);
  private passwordInput = () => this.page.getByPlaceholder(/Enter your password/i);
  private loginButton = () => this.page.getByRole('button', { name: /Log In/i });

  // Header and navigation elements
  private homeText = () => this.page.getByRole('paragraph').filter({ hasText: 'Home' });
  private mainHeading = () => this.page.getByRole('heading', { name: 'Where ideas become reality' });
  private subHeading = () => this.page.getByText('Build fully functional apps and websites through simple conversations');

  // Toolbar buttons
  private giftIconButton = () => this.page.getByRole('button', { name: 'Gift Icon' });
  private buyCreditsButton = () => this.page.getByRole('button', { name: 'right arrow Buy Credits' });
  private publicButton = () => this.page.getByRole('button', { name: 'Public' });
  private attachButton = () => this.page.getByRole('button', { name: 'Attach' });

  // Quick action links
  private cloneNetflixLink = () => this.page.getByRole('link', { name: 'Clone Netflix' });
  private moodTrackerLink = () => this.page.getByRole('link', { name: 'Mood Tracker' });
  private smartCourseLink = () => this.page.getByRole('link', { name: 'Smart Course' });
  private surpriseMeLink = () => this.page.getByRole('link', { name: 'Surprise Me' });

  // Other UI elements
  private buildInput = () => this.page.getByRole('textbox', { name: 'Build me a be' });
  private aiModelText = () => this.page.getByText('Claude 4.5 Sonnet');
  private exploreShowcasesText = () => this.page.getByText('Explore showcases');

  async openEmailLogin() {
    try {
      await this.signInButton().click();
      await this.emailLoginButton().click();
    } catch (error: any) {
      throw new Error(`Failed to open email login: ${error?.message || 'Unknown error'}`);
    }
  }

  async login(email: string, password: string) {
    try {
      await this.emailInput().fill(email);
      await this.passwordInput().fill(password);
      await this.loginButton().click();
    } catch (error: any) {
      throw new Error(`Login failed: ${error?.message || 'Unknown error'}`);
    }
  }

  async loginWithEnvCredentials() {
    try {
      const { env } = await import('../utils/env');
      await this.login(env.userEmail, env.userPassword);
    } catch (error: any) {
      throw new Error(`Login with environment credentials failed: ${error?.message || 'Unknown error'}`);
    }
  }

  // Verification methods
  async verifyNavigationElements() {
    await expect(this.homeText()).toBeVisible();
  }

  async verifyQuickActionLinks() {
    await expect(this.cloneNetflixLink()).toBeVisible();
    await expect(this.moodTrackerLink()).toBeVisible();
    await expect(this.smartCourseLink()).toBeVisible();
    await expect(this.surpriseMeLink()).toBeVisible();
  }

  async verifyAIElements() {
    await expect(this.buildInput()).toBeVisible();
    await expect(this.aiModelText()).toBeVisible();
    await expect(this.exploreShowcasesText()).toBeVisible();
  }

  async verifyToolbarButtons() {
    await expect(this.giftIconButton()).toBeVisible();
    await expect(this.buyCreditsButton()).toBeVisible();
    await expect(this.publicButton()).toBeVisible();
    await expect(this.attachButton()).toBeVisible();
  }
}