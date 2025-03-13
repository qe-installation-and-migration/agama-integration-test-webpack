import { type Page } from "puppeteer-core";

export class ZfcpPage {
  private readonly page: Page;

  private readonly faDisk = () =>
    this.page.locator("tbody > tr:first-child > td:last-child > button#zfcp_controllers_actions");

  private readonly fcDisk = () =>
    this.page.locator("tbody > tr:last-child > td:last-child > button#zfcp_controllers_actions");

  private readonly activateDisk = () => this.page.locator("::-p-aria(Activate[role='menuitem'])");

  private readonly backButton = () => this.page.locator("button::-p-text(Back)");

  private readonly enableMultipath = () => this.page.locator("::-p-text('Yes')");

  constructor(page: Page) {
    this.page = page;
  }

  async activateDevice(channelId) {
    let element;
    if (channelId === "0.0.fa00") element = this.faDisk();
    else element = this.fcDisk();

    await element.click();
    await this.activateDisk().click();
    await this.page.locator("::-p-text(WWPN)");
    await element.setTimeout(90000).wait();
  }

  async activateMultipath() {
    await this.enableMultipath().setTimeout(40000).click();
  }

  async back() {
    await this.backButton().click();
  }
}
