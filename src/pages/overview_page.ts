import { type Page } from "puppeteer-core";

export class OverviewPage {
  private readonly page: Page;
  private readonly warningAlert = () => this.page.locator("::-p-text(Warning alert)");
  private readonly installButton = () => this.page.locator("button::-p-text(Install)");

  constructor(page: Page) {
    this.page = page;
  }

  async waitWarningAlertToDisappear() {
    await this.warningAlert().setVisibility("hidden").wait();
  }

  async install() {
    await this.installButton().click();
  }
}
