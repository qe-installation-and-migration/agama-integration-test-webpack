import { type Page } from "puppeteer-core";

export class IscsiPage {
  private readonly page: Page;
  private readonly discoverIscsiTargetsButton = () =>
    this.page.locator("button::-p-text(DiscoverIscsiTargets)");

  constructor(page: Page) {
    this.page = page;
  }

  async discoverTargets() {
    await this.discoverIscsiTargetsButton().click();
  }
}
