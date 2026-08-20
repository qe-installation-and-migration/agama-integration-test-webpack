import { type Page } from "puppeteer-core";

export class StorageBootOptionsPage {
  private readonly page: Page;
  private readonly selectADiskRadio = () =>
    this.page.locator("::-p-aria(Select a disk[role='radio'])");

  private readonly bootDeviceSelect = () => this.page.locator("select[name='bootDevice']");
  private readonly acceptButton = () => this.page.locator("::-p-aria(Accept[role='button'])");

  constructor(page: Page) {
    this.page = page;
  }

  async selectADisk(diskNameAndSize: string) {
    await this.selectADiskRadio().click();
    await (await this.bootDeviceSelect().waitHandle()).select(diskNameAndSize);
  }

  async accept() {
    await this.acceptButton().click();
  }
}
