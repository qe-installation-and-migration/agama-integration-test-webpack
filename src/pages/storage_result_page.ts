import { type Page } from "puppeteer-core";

export class StorageResultPage {
  public readonly finalLayoutTabSelector: string;
  public readonly resultTableSelector: string;
  public readonly resultTableColapseRowSelector: string;

  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;

    this.finalLayoutTabSelector = "::-p-aria(Final layout[role='tab'])";
    this.resultTableSelector = 'table[data-type="agama/tree-table"]';
    this.resultTableColapseRowSelector = 'button[aria-label="Collapse row undefined"]';
  }
}
