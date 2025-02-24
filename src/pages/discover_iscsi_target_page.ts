import { type Page } from "puppeteer-core";

export class DiscoverIscsiTargetsPage {
  private readonly page: Page;
  private readonly ipAddressInput = () => this.page.locator("input#ipAddress");
  private readonly cancelButton = () => this.page.locator("button::-p-text(Cancel)");
  private readonly confirmButton = () => this.page.locator("button::-p-text(Confirm)");

  constructor(page: Page) {
    this.page = page;
  }

  async fillIpAddress(ipAddress: string) {
    await this.ipAddressInput().fill(ipAddress);
  }

  async confirm() {
    await this.confirmButton().click();
  }
}
