import { type Page } from "puppeteer-core";

export class SoftwareSelectionPage {
  private readonly page: Page;
  private readonly patternText = (pattern: string) =>
    this.page.locator(`::-p-aria(Select ${pattern})`);

  private readonly closeButton = () => this.page.locator("::-p-text(Close)");

  constructor(page: Page) {
    this.page = page;
  }

  async selectPattern(pattern: string) {
    await this.patternText(pattern).click();
  }

  async close() {
    await this.closeButton().click();
  }
}
