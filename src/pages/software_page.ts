import { type Page } from "puppeteer-core";

export class SoftwarePage {
  private readonly page: Page;
  private readonly changeSelectionButton = () => this.page.locator("::-p-text(Change selection)");

  constructor(page: Page) {
    this.page = page;
  }

  async changeSelection() {
    await this.changeSelectionButton().click();
  }
}
