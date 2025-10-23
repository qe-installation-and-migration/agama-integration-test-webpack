import { Locator, type Page } from "puppeteer-core";

export class StorageNoDevicesFoundPage {
  private readonly manageDasdDevicesLink: Locator<Element>;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.manageDasdDevicesLink = this.page.locator("::-p-aria(Manage DASD devices[role='link'])");
  }

  async NavigateDasdDevices() {
    await this.manageDasdDevicesLink.click();
  }
}
