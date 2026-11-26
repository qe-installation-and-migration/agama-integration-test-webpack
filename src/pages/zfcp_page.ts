import { type Page } from "puppeteer-core";

export class ZfcpPage {
  private readonly page: Page;

  // investigate: aria cannot be used - button is selected by position in table
  private readonly faDisk = () =>
    this.page.locator("tbody > tr:first-child > td:last-child > button#zfcp_controllers_actions");

  // investigate: aria cannot be used - button is selected by position in table
  private readonly fcDisk = () =>
    this.page.locator("tbody > tr:last-child > td:last-child > button#zfcp_controllers_actions");

  private readonly activateDisk = () => this.page.locator("::-p-aria(Activate[role='menuitem'])");

  // investigate: aria cannot be used - dynamic xpath to find row by channel ID
  private readonly zfcpDisk = (channelId: string) =>
    this.page.locator(`xpath=//tr[contains(., "${channelId}")]`);

  private readonly backButton = () => this.page.locator("::-p-aria(Back[role='button'])");

  private readonly enableMultipath = () => this.page.locator("::-p-aria(Yes[role='button'])");

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
