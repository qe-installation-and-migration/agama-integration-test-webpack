import { type Page } from "puppeteer-core";

export class StorageResultPage {
  public readonly resultTableSelector: string;

  private readonly page: Page;
  private readonly resultTable = () => this.page.locator(this.resultTableSelector);

  constructor(page: Page) {
    this.page = page;
    this.resultTableSelector = "table.proposal-result";
  }

  async waitVisible() {
    await this.resultTable().wait();
  }
}
