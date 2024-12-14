import { type Page } from "puppeteer-core";

export class RegistrationProductRegisteredPage {
  private readonly page: Page;
  private readonly productRegisteredText = () =>
    this.page.locator("::-p-text('Product registered')");

  constructor(page: Page) {
    this.page = page;
  }

  async wait(timeout: number) {
    await this.productRegisteredText().setTimeout(timeout).wait();
  }
}
