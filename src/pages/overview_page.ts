import { type Page } from "puppeteer-core";

export class OverviewPage {
  private readonly page: Page;
  private readonly installButton = () => this.page.locator("button::-p-text(Install)");
  private readonly mustBeRegisteredText = () => this.page.locator("::-p-text(must be registered)");

  constructor(page: Page) {
    this.page = page;
  }

  async waitWarningAlertToDisappear() {
    await this.mustBeRegisteredText().setVisibility("hidden").wait();
  }

  async install() {
    await this.installButton().click();
  }
}
