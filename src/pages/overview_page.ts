import { type Page } from "puppeteer-core";

export class OverviewPage {
  private readonly page: Page;
  private readonly installButton = () => this.page.locator("button::-p-text(Install)");
  private readonly overviewHeading = () =>
    this.page.locator('::-p-aria([name="Overview"][role="heading"])');

  constructor(page: Page) {
    this.page = page;
  }

  async waitVisible(timeout: number) {
    await this.overviewHeading().setTimeout(timeout).wait();
  }

  async install() {
    await this.installButton().click();
  }
}
