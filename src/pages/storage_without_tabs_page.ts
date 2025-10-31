import assert from "assert";
import { type Page } from "puppeteer-core";

export class StorageWithoutTabsPage {
  private readonly page: Page;
  private readonly selectMoreDevicesButton = () => this.page.locator("::-p-text(More devices)");

  private readonly encryptionTab = () => this.page.locator("::-p-text(Encryption)");
  private readonly changeEncryptionButton = () => this.page.locator("span::-p-text(Change)");
  private readonly encryptionIsEnabledText = () =>
    this.page.locator("::-p-text(Encryption is enabled)");

  private readonly encryptionIsDisabledText = () =>
    this.page.locator("::-p-text(Encryption is disabled)");

  private readonly manageDasdLink = () => this.page.locator("::-p-text(Manage DASD devices)");

  private readonly ActivateZfcpLink = () => this.page.locator("::-p-text(Activate zFCP disks)");

  private readonly addLvmVolumeLink = () => this.page.locator("::-p-text(Add LVM volume group)");

  constructor(page: Page) {
    this.page = page;
  }

  async selectMoreDevices() {
    await this.selectMoreDevicesButton().click();
  }

  async addLvmVolumeGroup() {
    await this.addLvmVolumeLink().click();
  }

  async selectEncryption() {
    await this.encryptionTab().click();
  }

  async changeEncryption() {
    await this.changeEncryptionButton().click();
  }

  async verifyEncryptionEnabled() {
    await this.encryptionIsEnabledText().wait();
  }

  async verifyEncryptionDisabled() {
    const elementText = await this.encryptionIsDisabledText()
      .map((span) => span.textContent)
      .wait();
    await assert.deepEqual(elementText, "Encryption is disabled");
  }

  async manageDasd() {
    await this.manageDasdLink().click();
  }

  async activateZfcp() {
    await this.ActivateZfcpLink().click();
  }

  async waitForElement(element, timeout) {
    await this.page.locator(element).setTimeout(timeout).wait();
  }
}
