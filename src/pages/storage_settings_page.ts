import { type Page } from "puppeteer-core";

export class StorageSettingsPage {
  private readonly page: Page;
  private readonly selectMoreDevicesButton = () => this.page.locator("::-p-text(More devices)");
  private readonly useDiskButton = () => this.page.locator("::-p-text(Use disk)");
  private readonly selectDiskToInstallButton = () =>
    this.page.locator("::-p-text(Change the disk to install the system)");

  private readonly editEncryptionButton = () =>
    this.page.locator("a[href='#/storage/encryption/edit']");

  private readonly encryptionTab = () => this.page.locator("::-p-text(Encryption)");
  private readonly changeEncryptionLink = () =>
    this.page.locator('::-p-aria([name="Change"][role="link"])');

  public readonly encryptionIsEnabledText = () =>
    this.page.locator("::-p-text(Encryption is enabled)");

  public readonly encryptionIsDisabledText = () =>
    this.page.locator("::-p-text(Encryption is disabled)");

  private readonly manageDasdLink = () => this.page.locator("::-p-text(Manage DASD devices)");

  private readonly ActivateZfcpLink = () => this.page.locator("::-p-text(Activate zFCP disks)");
  private readonly addLvmVolumeLink = () => this.page.locator("::-p-text(Add LVM volume group)");

  private readonly expandPartitionsButton = () =>
    this.page.locator("::-p-text(New partitions will be created)");

  private readonly optionForRoot = () => this.page.locator("::-p-aria(Options for partition /)");
  private readonly editRootPartitionMenu = () =>
    this.page.locator("button[aria-label='Edit /'][role='menuitem']");

  private readonly threeDotsButton = () =>
    this.page.locator("button:has(svg.agm-three-dots-icon):not([aria-label])");

  public readonly storageAllocationWarningText = () =>
    this.page.locator("::-p-text(It is not possible to allocate space for the boot partition)");

  private readonly resetToDefaultsButton = () => this.page.locator("::-p-text(Reset to defaults)");

  constructor(page: Page) {
    this.page = page;
  }

  async selectUsedDisk() {
    await this.useDiskButton().click();
  }

  async changeTheDiskToInstallTheSystem() {
    await this.selectDiskToInstallButton().click();
  }

  async selectMoreDevices() {
    await this.selectMoreDevicesButton().click();
  }

  async editEncryption() {
    await this.editEncryptionButton().click();
  }

  async selectEncryption() {
    await this.encryptionTab().click();
  }

  async changeEncryption() {
    await this.changeEncryptionLink().click();
  }

  async manageDasd() {
    await this.manageDasdLink().click();
  }

  async activateZfcp() {
    await this.ActivateZfcpLink().click();
  }

  async addLvmVolumeGroup() {
    await this.addLvmVolumeLink().click();
  }

  async waitForElement(element, timeout) {
    await this.page.locator(element).setTimeout(timeout).wait();
  }

  async expandPartitions() {
    await this.expandPartitionsButton().click();
  }

  async clickOptionForRoot() {
    await this.optionForRoot().click();
  }

  async editRootPartition() {
    await this.editRootPartitionMenu().click();
  }

  async moreOptions() {
    await this.threeDotsButton().click();
  }

  async resetToDefault() {
    await this.resetToDefaultsButton().click();
  }
}
