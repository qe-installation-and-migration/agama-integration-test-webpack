import { type Page } from "puppeteer-core";

export class CongratulationPage {
  private readonly page: Page;
  private readonly congratulationText = () => this.page.locator('h2:Contains("Congratulations!")');

  constructor(page: Page) {
    this.page = page;
  }

  async wait(timeout: number) {
    await this.congratulationText().setTimeout(timeout).wait();
  }

  async checkCongratulationText() {
    await this.congratulationText();
  }
}
