import { type Page } from "puppeteer-core";

export class WarningCalculateLayoutPage {
  private readonly page: Page;

  readonly alertFailedCalculateStorageLayoutText = () =>
    this.page.locator("::-p-text(Failed to calculate a storage layout)");

  constructor(page: Page) {
    this.page = page;
  }
}
