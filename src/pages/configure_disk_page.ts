import { type Page } from "puppeteer-core";

export class ConfigureDiskPage {
  private readonly page: Page;

  private readonly mountPointCombobox = () =>
    this.page.locator("::-p-aria(Mount point[role='combobox'])");

  private readonly homeMountPointOption = () =>
    this.page.locator("::-p-aria(/home[role='option'])");

  private readonly acceptButton = () => this.page.locator("::-p-aria(Accept[role='button'])");

  constructor(page: Page) {
    this.page = page;
  }

  async fillMountPoint(mountpoint: string) {
    await this.mountPointCombobox().fill(mountpoint);
  }

  async selectHomeMountPoint() {
    await this.mountPointCombobox().click();
    await this.homeMountPointOption().click();
  }

  async accept() {
    await this.acceptButton().click();
  }
}
