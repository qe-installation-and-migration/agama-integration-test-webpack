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

  private readonly checkActiveDisk = () =>
    this.page.locator("table tbody tr:nth-child(1) td:nth-child(4)");

  private readonly formatDiskButton = () => this.page.locator("button::-p-text(Format)");
  private readonly formatNowDiskButton = () => this.page.locator("::-p-text(Format now)");
  private readonly formattingDasdText = () =>
    this.page.locator("::-p-text(Formatting DASD devices)");

  private readonly backButton = () => this.page.locator("button::-p-text(Back)");

  constructor(page: Page) {
    this.page = page;
  }

  async activateDevice() {
    await this.actionsForDisk().click();
    await this.activateDisk().click();
    await this.page.waitForFunction(
      (selector, text) => {
        const element = document.querySelector(selector);
        return element && element.textContent.trim() !== text;
      },
      { timeout: 5000 },
      "table tbody tr:nth-child(1) td:nth-child(4)",
      "offline",
    );
  }

  async formatDevice() {
    await this.selectRow(0).click();
    await this.formatDiskButton().click();
    await this.formatNowDiskButton().click();
  }

  async waitFormattingDevice() {
    await this.formattingDasdText().wait();
    await this.page.waitForSelector('div[role="dialog"][aria-modal="true"]', {
      hidden: true,
      timeout: 5 * 60 * 1000,
    });
  }

  async back() {
    await this.backButton().click();
  }
}
