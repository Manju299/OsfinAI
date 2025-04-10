import { expect, Page } from "@playwright/test";

export default class loginPage {
  private readonly userID = "[name='username']";
  private readonly password = "[name='password']";
  private readonly loginButton = "button[type='submit']";
  // private readonly landingPage = "xpath=//span[text()='Home']";
  private readonly landingPage = "svg[aria-label='Instagram']";

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("https://www.instagram.com/");
  }

  async login(username: string, password: string) {
    await this.page.locator(this.userID).fill(username);
    await this.page.locator(this.password).fill(password);
    await this.page.locator(this.loginButton).click();
    // await expect(this.page.locator(this.landingPage)).toBeVisible();
  }
}
