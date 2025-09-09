import { type Page } from "puppeteer-core";

export class TrustKeyPage {
  private readonly page: Page;
  readonly trustKeyText = () => this.page.locator("::-p-text(Do you want to trust this key?)");
  private readonly trustKeyButton = () => this.page.locator("::-p-text(Trust)");

  constructor(page: Page) {
    this.page = page;
  }

  async trustKey() {
    await this.trustKeyButton().click();
  }
}
