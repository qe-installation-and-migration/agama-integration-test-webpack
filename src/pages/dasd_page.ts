import { type Page } from "puppeteer-core";

export class DasdPage {
  private readonly page: Page;

  private readonly selectRow = (index) =>
    this.page.locator(`::-p-aria(Select row ${index}[role=\\"checkbox\\"])`);

  private readonly actionsForDisk = () =>
    this.page.locator("xpath/descendant-or-self::button[starts-with(@aria-label, 'Actions for')]");

  private readonly activateDisk = () =>
    this.page
      .locator('button[role="menuitem"]')
      .filter((item) => item.getAttribute("tabindex") === "0");

  private readonly formatDiskButton = () => this.page.locator("::-p-aria(Format[role='button'])");
  private readonly formatNowDiskButton = () => this.page.locator("::-p-text(Format now)");

  constructor(page: Page) {
    this.page = page;
  }

  async selectDevice() {
    await this.actionsForDisk().click();
  }

  async activateDevice() {
    await this.activateDisk().click();
  }

  async selectDeviceToFormat() {
    await this.selectRow(0).click();
    await this.formatDiskButton().click();
  }

  async formatNowDevice() {
    await this.formatNowDiskButton().click();
  }
}
