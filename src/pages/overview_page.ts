import { type Page } from "puppeteer-core";

export class OverviewPage {
  private readonly page: Page;
  private readonly installButton = () => this.page.locator("button::-p-text(Install)");

  constructor(page: Page) {
    this.page = page;
  }

  async install() {
    await this.installButton().click();
  }
}
