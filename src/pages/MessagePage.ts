import { Page } from "@playwright/test";

export default class MessagePage {
  private readonly messageInputField = "//p[@class='xat24cr xdj266r']";
  private readonly sendbutton = "//div[text()='Send']";
  // private readonly confirmationPopup = "//button[text()='Not Now']";

  constructor(private page: Page) {}

  async sendMessage(message: string) {
    await this.page.locator(this.messageInputField).fill(message);
    await this.page.locator(this.sendbutton).click();
  }
}
