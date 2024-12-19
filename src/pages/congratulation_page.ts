import { type Page } from "puppeteer-core";

export class CongratulationPage {
  private readonly page: Page;
  private readonly congratulationText = () => this.page.locator("h2::-p-text('Congratulations!')");

  constructor(page: Page) {
    this.page = page;
  }

  async wait(timeout: number) {
    await this.congratulationText().setTimeout(timeout).wait();
  }
}
