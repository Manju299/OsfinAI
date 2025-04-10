import { Page } from "@playwright/test";

export default class profilePage {
  private readonly messageButton = "//div[text()='Message']";
  private readonly confirmationPopup = "//button[text()='Not Now']";

  constructor(private page: Page) {}

  async openMessage() {
    await this.page.locator(this.messageButton).click();
    await this.page.locator(this.confirmationPopup).click();
  }
}
