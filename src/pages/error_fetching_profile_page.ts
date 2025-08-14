import { type Page } from "puppeteer-core";
import assert from "node:assert/strict";

export class ErrorFetchingProfilePage {
  private readonly page: Page;
  private readonly alertWarningMsg = () =>
    this.page.locator("::-p-text(It was not possible to load the configuration)");

  constructor(page: Page) {
    this.page = page;
  }

  async verifyContent() {
    const elementText = await this.alertWarningMsg()
      .map((span) => span.textContent)
      .wait();
    await assert.match(elementText, /It was not possible to load the configuration/);
  }
}
