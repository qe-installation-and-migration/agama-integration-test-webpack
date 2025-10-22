import { type Page } from "puppeteer-core";

export class ZfcpPage {
  private readonly page: Page;

  private readonly faDisk = () =>
    this.page.locator("tbody > tr:first-child > td:last-child > button#zfcp_controllers_actions");

  private readonly fcDisk = () =>
    this.page.locator("tbody > tr:last-child > td:last-child > button#zfcp_controllers_actions");

  private readonly zfcpDisk = (channelId: string) =>
    this.page.locator(`xpath=//tr[contains(., "${channelId}")]`);

  private readonly activateDisk = () => this.page.locator("::-p-aria(Activate[role='menuitem'])");

  private readonly backButton = () => this.page.locator("button::-p-text(Back)");

  private readonly enableMultipath = () => this.page.locator("::-p-text('Yes')");

  constructor(page: Page) {
    this.page = page;
  }

  async activateDevice(channelId: string) {
    const rowActions = channelId === "0.0.fa00" ? this.faDisk() : this.fcDisk();
    await rowActions.click();
    await this.activateDisk().click();
    await this.zfcpDisk(channelId).setTimeout(90000).wait();
  }

  async activateMultipath() {
    await this.enableMultipath().setTimeout(40000).click();
  }

  async back() {
    await this.backButton().click();
  }
}
