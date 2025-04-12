import { expect, Page } from "@playwright/test";

export default class MessagePage {
  private readonly messageInputField = "//p[@class='xat24cr xdj266r']";
  private readonly sendbutton = "//div[text()='Send']";

  constructor(private page: Page) {}

  async sendMessage(message: string) {
    await this.page.locator(this.messageInputField).fill(message);
    const sendbtn = this.page.locator(this.sendbutton);
    await expect(sendbtn).toBeVisible();
    await sendbtn.click();
  }
}
