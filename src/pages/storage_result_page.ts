import { type Page } from "puppeteer-core";

export class StorageResultPage {
  private readonly page: Page;

  private readonly destructiveActionsList = () => this.page.locator("::-p-text(Actions)");
  public readonly destructiveActionText = (name: string) =>
    this.page.locator(`::-p-text(Delete ${name})`);

  constructor(page: Page) {
    this.page = page;
  }

  async expandDestructiveActionsListWithoutTabs() {
    await this.destructiveActionsList().click();
  }

  async scrollToDestructiveActionsList() {
    (await this.destructiveActionsList().waitHandle()).scrollIntoView();
  }
}
