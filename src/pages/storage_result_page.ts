import { type Page } from "puppeteer-core";

export class StorageResultPage {
  private readonly page: Page;

  private readonly destructiveActionsList = () => this.page.locator("::-p-text(Check)");
  public readonly destructiveActionText = (name: string) =>
    this.page.locator(`::-p-text(Delete ${name})`);

  constructor(page: Page) {
    this.page = page;
  }

  async expandDestructiveActionsList() {
    await this.destructiveActionsList().click();
  }
}
