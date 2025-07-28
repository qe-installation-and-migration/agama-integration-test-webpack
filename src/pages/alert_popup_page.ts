//import assert from "node:assert/strict";
import { type Page } from "puppeteer-core";

export class AlertPopupPage {
  private readonly page: Page;
  private readonly warningAlertHeading = () =>
    this.page.locator(`::-p-text(It was not possible to load the configuration)`);

  constructor(page: Page) {
    this.page = page;
  }

  async verifyInvalidUrl() {
    await this.warningAlertHeading().wait();
  }
}
