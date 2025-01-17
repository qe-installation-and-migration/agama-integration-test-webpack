import { type Page } from "puppeteer-core";

export class OverviewPage {
  private readonly page: Page;
  private readonly overviewTitle = () => this.page.locator("h2::-p-text(Overview)");
  private readonly installButton = () => this.page.locator("button::-p-text(Install)");

  constructor(page: Page) {
    this.page = page;
  }

  async wait(timeout: number) {
    await this.overviewTitle().setTimeout(timeout).wait();
  }

  async install() {
    await this.installButton().click();
  }
}
