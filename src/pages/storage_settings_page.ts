import { type Page } from "puppeteer-core";

export class StorageSettingsPage {
  private readonly page: Page;
  private readonly selectMoreDevicesButton = () => this.page.locator("::-p-text(More devices)");
  private readonly useDiskButton = () => this.page.locator("::-p-text(Use disk)");

  private readonly settingsText = () => this.page.locator("::-p-text(Settings)");

  private readonly selectDeviceToInstallButton = () =>
    this.page.locator("::-p-text(Change the device to install the system)");

  private readonly selectDiskToInstallButton = () =>
    this.page.locator("::-p-text(Change the disk to install the system)");

  private readonly editEncryptionButton = () =>
    this.page.locator("a[href='#/storage/encryption/edit']");

  private readonly installationDevicesTab = () =>
    this.page.locator("::-p-text(Installation devices)");

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
    this.page.locator("::-p-aria(Edit /[role='menuitem'])");

  private readonly threeDotsButton = () =>
    this.page.locator("button:has(svg.agm-three-dots-icon):not([aria-label])");

  public readonly storageAllocationWarningText = () =>
    this.page.locator("::-p-text(It is not possible to allocate space for the boot partition)");

  private readonly resetToDefaultsButton = () => this.page.locator("::-p-text(Reset to defaults)");

  private readonly notConfiguredYetButton = () =>
    this.page.locator("::-p-aria(Not configured yet[role='button'])");

  private readonly useTheDiskWithoutPartitionsMenuitem = () =>
    this.page.locator(
      "::-p-aria(Use the disk without partitions Format the whole device or mount an existing file system[role='menuitem'])",
    );

  private readonly bootOptionsTab = () => this.page.locator("::-p-aria(Boot options[role='tab'])");
  private readonly changeBootOptionsButton = () =>
    this.page.locator("a[href='#/storage/boot-device/edit']");

  private readonly addDeviceMenuitem = () =>
    this.page.locator("::-p-aria(Add device menu[role='menuitem'])");

  constructor(page: Page) {
    this.page = page;
  }

  async ensureStorageSettingsPresent() {
    await this.settingsText().wait();
  }

  async selectUsedDisk() {
    await this.useDiskButton().click();
  }

  async changeTheDeviceToInstallTheSystem() {
    const element = await Promise.any([
      this.selectDeviceToInstallButton().waitHandle(),
      this.selectDiskToInstallButton().waitHandle(),
    ]);
    await element.click();
  }

  async selectMoreDevices() {
    await this.selectMoreDevicesButton().click();
  }

  async editEncryption() {
    await this.editEncryptionButton().click();
  }

  async selectInstallationDevices() {
    await this.installationDevicesTab().click();
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

  async activateZfcpDisks() {
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

  async resetToDefault(timeout: number = 30 * 1000) {
    await this.resetToDefaultsButton().setTimeout(timeout).click();
  }

  async selectAnotherDisk() {
    await this.addDeviceMenuitem().click();
  }

  async selectDiskNotConfiguredYet() {
    await this.notConfiguredYetButton().click();
  }

  async useTheDiskWithoutPartitions() {
    await this.useTheDiskWithoutPartitionsMenuitem().click();
  }

  async selectBootOptions() {
    await this.bootOptionsTab().click();
  }

  async changeBootOptions() {
    await this.changeBootOptionsButton().click();
  }
}
