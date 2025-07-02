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

    // Wait for the DOM to actually update
    await this.page.waitForFunction(
      (pattern) => {
        const checkbox = document.querySelector(
          `input[type=checkbox][aria-labelledby*=${pattern}-title]`,
        ) as HTMLInputElement;
        return checkbox && checkbox.checked === true;
      },
      { timeout: 20000 },
      pattern,
    );
  }

  async close() {
    await this.closeButton().click();
  }
}
