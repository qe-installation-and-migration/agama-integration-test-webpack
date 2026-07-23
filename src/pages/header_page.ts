import { type Page } from "puppeteer-core";

export class HeaderPage {
  protected readonly page: Page;
  private readonly installationLink = () => this.page.locator("a[href='#/overview']");
  private readonly storageLink = () => this.page.locator("a[href='#/storage']");

  constructor(page: Page) {
    this.page = page;
  }

  async goToInstallation() {
    await this.installationLink().click();
  }

  async goToStorage() {
    await this.storageLink().click();
  }
}
