import { type Page } from "puppeteer-core";

export class SelectInstallationDevicePage {
  private readonly page: Page;

  private readonly deviceCheckbox = (index: number) =>
    this.page.locator(`::-p-aria(Select row ${index}[role=\\"checkbox\\"])`);

  private readonly deviceSelectButton = () => this.page.locator("::-p-aria(Drive)");

  private readonly deviceSelector = (name) => this.page.locator(`::-p-text(${name})`);

  private readonly storageTechsToggleButton = () => this.page.locator("::-p-text('storage techs')");

  private readonly deviceTypeDasdLink = () => this.page.locator("a[href='#/storage/dasd']");

  private readonly deviceTypeZfcpLink = () => this.page.locator("a[href='#/storage/zfcp']");

  private readonly acceptButton = () => this.page.locator("button::-p-text(Accept)");

  constructor(page: Page) {
    this.page = page;
  }

  async prepareDasd() {
    await this.storageTechsToggleButton().click();
    await this.deviceTypeDasdLink().click();
  }

  async prepareZfcp() {
    await this.storageTechsToggleButton().click();
    await this.deviceTypeZfcpLink().click();
  }

  async selectDevice(name) {
    this.deviceSelectButton().click();
    this.deviceSelector(name).click();
  }
}
