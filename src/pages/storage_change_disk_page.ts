import { type Page } from "puppeteer-core";

export class StorageChangeDiskPage {
  private readonly page: Page;
  private readonly confirmButton = () =>
    this.page.locator("button::-p-aria(Confirm[role='button'])");

  public readonly diskTableSelector: string;

  constructor(page: Page) {
    this.page = page;

    this.diskTableSelector = 'div[aria-modal="true"] table[data-type="agama/expandable-selector"]';
  }

  async confirm() {
    await this.confirmButton().click();
  }
}
