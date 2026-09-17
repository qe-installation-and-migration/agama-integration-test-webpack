import { type Page } from "puppeteer-core";

export class StorageResultPage {
  private readonly page: Page;

  private readonly destructiveActionsListWithSidebar = () => this.page.locator("::-p-text(Check)");
  private readonly destructiveActionsList = () => this.page.locator("::-p-text(Actions)");

  public readonly destructiveActionText = (name: string) =>
    this.page.locator(`::-p-text(Delete ${name})`);

  constructor(page: Page) {
    this.page = page;
  }

  async scrollToDestructiveActionsList() {
    (await this.destructiveActionsList().waitHandle()).scrollIntoView();
  }

  async expandDestructiveActionsList() {
    await this.destructiveActionsListWithSidebar().click();
  }
}
