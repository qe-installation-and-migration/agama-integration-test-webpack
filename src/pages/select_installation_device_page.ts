import { type Page } from "puppeteer-core";
import { sleep } from "../lib/helpers";

export class SelectInstallationDevicePage {
  private readonly page: Page;
  private readonly newLvmVolumeGroupInput = () =>
    this.page.locator("::-p-text(A new LVM Volume Group)");

  private readonly deviceCheckbox = (index: number) =>
    this.page.locator(`::-p-aria(Select row ${index}[role=\\"checkbox\\"])`);

  private readonly deviceRadio = (index: number) =>
    this.page.locator(`::-p-aria(Select row ${index}[role=\\"radio\\"])`);

  private readonly storageTechsToggleButton = () => this.page.locator("::-p-text('storage techs')");

  private readonly deviceType = () => this.page.locator("a[href='#/storage/dasd']");

  private readonly acceptButton = () => this.page.locator("button::-p-text(Accept)");

  constructor(page: Page) {
    this.page = page;
  }

  async installOnNewLvm() {
    await this.newLvmVolumeGroupInput().click();
    await this.deviceCheckbox(0).click();
    await this.acceptButton().click();
  }

  async prepareDasd() {
    await this.storageTechsToggleButton().click();
    await this.deviceType().click();
  }

  async selectDevice(index: number) {
    // puppeteer goes too fast and screen is unresponsive after submit, a small delay helps
    await sleep(2000);
    await this.deviceRadio(index).click();
    await this.acceptButton().click();
  }

  async selectStorageTechs() {
    await this.storageTechsToggleButton().click();
    await this.deviceType().click();
  }
}
