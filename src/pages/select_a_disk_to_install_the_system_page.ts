import { type Page } from "puppeteer-core";

export class SelectADiskToInstallTheSystemPage {
  private readonly page: Page;

  private readonly confirmButton = () => this.page.locator("button::-p-text(Confirm)");

  private readonly deviceRadio = (deviceName: string) =>
    this.page.locator(`xpath=//tr[contains(., "${deviceName}")]//input[@type="radio"]`);

  constructor(page: Page) {
    this.page = page;
  }

  async selectDevice(name: string) {
    await this.deviceRadio(name).click();
  }

  async confirm() {
    await this.confirmButton().click();
  }
}
