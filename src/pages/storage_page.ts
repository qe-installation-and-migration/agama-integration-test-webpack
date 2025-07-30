import { type Page } from "puppeteer-core";

export class StoragePage {
  private readonly page: Page;
  private readonly selectMoreDevicesButton = () => this.page.locator("::-p-text(More devices)");

  private readonly editEncryptionButton = () => this.page.locator("::-p-text(Edit)");
  private readonly encryptionIsEnabledText = () =>
    this.page.locator("::-p-text(Encryption is enabled)");

  private readonly manageDasdLink = () => this.page.locator("::-p-text(Manage DASD devices)");

  private readonly ActivateZfcpLink = () => this.page.locator("::-p-text(Activate zFCP disks)");

  private readonly addLvmVolumeLink = () => this.page.locator("::-p-text(Add LVM volume group)");

  private readonly createLvmVolumeGroupSystem = () =>
    this.page.locator("::-p-text(Create Lvm Volume Group System)");

  private readonly deleteVolumeGroup = () => this.page.locator("::-p-text(Delete Volume Group)");

  private readonly destructiveActionsList = () => this.page.locator("::-p-text(Check)");

  private readonly destructiveActionText = (name: string) =>
    this.page.locator(`::-p-text(Delete ${name})`);

  constructor(page: Page) {
    this.page = page;
  }

  async selectMoreDevices() {
    await this.selectMoreDevicesButton().click();
  }

  async addLvmVolumeGroup() {
    await this.addLvmVolumeLink().click();
  }

  async clickCreateLvmVolumeGroupSystem() {
    await this.createLvmVolumeGroupSystem().click();
  }

  async clickDeleteVolumeGroup() {
    await this.deleteVolumeGroup().click();
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

  async activateZfcp() {
    await this.ActivateZfcpLink().click();
  }

  async waitForElement(element, timeout) {
    await this.page.locator(element).setTimeout(timeout).wait();
  }

  async expandDestructiveActionsList() {
    await this.destructiveActionsList().click();
  }

  async verifyDestructiveAction(action: string) {
    await this.destructiveActionText(action).wait();
  }
}
