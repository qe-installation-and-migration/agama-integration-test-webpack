import { type Page } from "puppeteer-core";

export class StoragePage {
  private readonly page: Page;
  private readonly changeInstallationDeviceButton = () =>
    this.page.locator("a[href='#/storage/target-device']");

  private readonly editEncryptionButton = () => this.page.locator("::-p-text(Edit)");
  private readonly encryptionIsEnabledText = () =>
    this.page.locator("::-p-text(Encryption is enabled)");

  private readonly manageDasdLink = () => this.page.locator("::-p-text(Manage DASD devices)");

  constructor(page: Page) {
    this.page = page;
  }

  async changeInstallationDevice() {
    await this.changeInstallationDeviceButton().click();
  }

  async editEncryption() {
    await this.editEncryptionButton().click();
  }

  async verifyEncryptionEnabled() {
    await this.encryptionIsEnabledText().wait();
  }

  async manageDasd() {
    await this.manageDasdLink().click();
  }
}
