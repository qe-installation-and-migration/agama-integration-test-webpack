import { type Page } from "puppeteer-core";

export class OptionsTogglePage {
  protected readonly page: Page;

  private readonly optionsToggle = () => this.page.locator("::-p-aria(Options toggle)");
  private readonly downloadLogsMenuItem = () => this.page.locator("::-p-aria(Download logs)");

  constructor(page: Page) {
    this.page = page;
  }

  async downloadLogs() {
    await this.optionsToggle().click();
    await this.downloadLogsMenuItem().click();
  }
}
