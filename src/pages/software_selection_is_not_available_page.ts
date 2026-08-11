import { type Page } from "puppeteer-core";

export class SoftwareSelectionIsNotAvailablePage {
  private readonly page: Page;

  readonly softwareSelectionNotAvailableText = () =>
    this.page.locator("::-p-aria(Software selection is not available[role='heading'])");

  constructor(page: Page) {
    this.page = page;
  }
}
