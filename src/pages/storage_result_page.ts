import { type Page } from "puppeteer-core";

export class StorageResultPage {
  public readonly resultTableSelector: string;
  public readonly resultTableColapseRowSelector: string;

  private readonly page: Page;
  private readonly resultTable = () => this.page.locator(this.resultTableSelector);

  constructor(page: Page) {
    this.page = page;
    this.resultTableSelector = "table.proposal-result";
    this.resultTableColapseRowSelector = 'button[aria-label="Collapse row undefined"]';
  }

  async waitVisible() {
    await this.resultTable().wait();
  }
}
