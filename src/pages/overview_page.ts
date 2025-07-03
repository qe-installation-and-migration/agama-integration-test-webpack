import { type Page } from "puppeteer-core";

export class OverviewPage {
  private readonly page: Page;
  private readonly installButton = () => this.page.locator("button::-p-text(Install)");
  private readonly overviewText = () => this.page.locator("h2::-p-text('Overview')");

  constructor(page: Page) {
    this.page = page;
  }

  async waitVisible(timeout: number) {
    await this.overviewText().setTimeout(timeout).wait();
  }

  async install() {
    await this.installButton().click();
  }
}
