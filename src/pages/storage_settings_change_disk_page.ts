import { type Page } from "puppeteer-core";

export class StorageSettingsChangeDiskPage {
  private readonly page: Page;
  // investigate: aria cannot be used
  private readonly changeToButton = () => this.page.locator("button::-p-text(Change to)");

  public readonly diskTableSelector: string;

  constructor(page: Page) {
    this.page = page;

    this.diskTableSelector = 'div[aria-modal="true"] table[data-type="agama/expandable-selector"]';
  }

  async changeTo() {
    await this.changeToButton().click();
  }
}
