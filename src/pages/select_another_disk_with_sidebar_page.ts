import { type Page } from "puppeteer-core";

export class SelectAnotherDiskWithSidebarPage {
  private readonly page: Page;
  public readonly confirmButton = () => this.page.locator("::-p-aria(Confirm[role='button'])");

  constructor(page: Page) {
    this.page = page;
  }

  async confirm() {
    await this.confirmButton().click();
  }
}
