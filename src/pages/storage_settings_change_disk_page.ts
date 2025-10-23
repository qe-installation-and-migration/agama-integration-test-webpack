import { type Page } from "puppeteer-core";

export class StorageSettingsChangeDiskPage {
  public readonly diskTableSelector: string;

  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;

    this.diskTableSelector = 'div[aria-modal="true"] table[data-type="agama/expandable-selector"]';
  }
}
