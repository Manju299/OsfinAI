import { Page } from "@playwright/test";
import { equal } from "assert";

export default class SearchPage {
  private readonly serachIcon = "svg[aria-label='Search']";
  private readonly searchField = "input[aria-label='Search input']";
  private readonly suggesteddAccounts =
    "//div[contains(@class, 'xh8yej3 xocp1fn')]/a[1]";

  constructor(private page: Page) {}

  async searchForAccount(accountName: string) {
    await this.page.locator(this.serachIcon).click();
    await this.page.locator(this.searchField).fill(accountName);
    const listItems = this.page.locator(this.suggesteddAccounts);
    await listItems.click();
  }
}
