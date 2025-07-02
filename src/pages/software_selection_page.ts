import { type Page } from "puppeteer-core";

export class SoftwareSelectionPage {
  private readonly page: Page;
  private readonly patternCheckbox = (pattern: string) =>
    this.page.locator(`input[type=checkbox][aria-labelledby*=${pattern}-title]`);

  private readonly closeButton = () => this.page.locator("::-p-text(Close)");

  constructor(page: Page) {
    this.page = page;
  }

  async selectPattern(pattern: string) {
    const checkbox = await this.patternCheckbox(pattern).waitHandle();
    await checkbox.scrollIntoView();

    await this.patternCheckbox(pattern)
      .filter((input) => !input.checked)
      .click();

    // Add a small delay before checking state
    await new Promise((resolve) => setTimeout(resolve, 500));

    // ensure selection due to puppeteer might go too fast
    await this.patternCheckbox(pattern)
      .filter((input) => input.checked)
      .wait();
  }

  async close() {
    await this.closeButton().click();
  }
}
