import { type Page } from "puppeteer-core";

export class ConfigureLvmVolumeGroupPage {
  private readonly page: Page;
  private readonly acceptButton = () => this.page.locator("button::-p-text(Accept)");
  constructor(page: Page) {
    this.page = page;
  }

  get diskCheckboxSelector(): string {
    return '::-p-aria([role="checkbox"])';
  }

  async accept() {
    await this.acceptButton().click();
  }
}
