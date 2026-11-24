import { type Page } from "puppeteer-core";

export class StorageSettingsPage {
  private readonly page: Page;

  private readonly selectMoreDevicesButton = () =>
    this.page.locator("::-p-aria(More devices[role='button'])");

  // investigate: aria cannot be used
  private readonly useDiskButton = () => this.page.locator("button::-p-text(Use disk)");

  private readonly settingsHeading = () => this.page.locator("::-p-aria(Settings[role='heading'])");

  private readonly changeDeviceMenuitem = () =>
    this.page.locator("::-p-aria(Change device menu[role='menuitem'])");

  private readonly editEncryptionButton = () =>
    this.page.locator("a[href='#/storage/encryption/edit']");

  private readonly installationDevicesTab = () =>
    this.page.locator("::-p-aria(Installation devices[role='tab'])");

  private readonly encryptionTab = () =>
    this.page.locator("::-p-aria(Encryption[role='tab']), ::-p-aria(Encryption[role='heading'])");

  private readonly changeEncryptionLink = () =>
    this.page.locator('::-p-aria([name="Change"][role="link"])');

  public readonly encryptionIsEnabledText = () =>
    this.page.locator("::-p-text(Encryption is enabled)");

  public readonly encryptionIsDisabledText = () =>
    this.page.locator("::-p-text(Encryption is disabled)");

  private readonly manageDasdLink = () =>
    this.page.locator("::-p-aria(Manage DASD devices[role='link'])");

  private readonly ActivateZfcpLink = () =>
    this.page.locator("::-p-aria(Activate zFCP disks[role='link'])");

  private readonly addLvmVolumeMenuitem = () =>
    this.page.locator(
      "::-p-aria(Add LVM volume group Define a new LVM on top of one or several disks[role='menuitem'])",
    );

  // investigate: aria cannot be used
  private readonly expandPartitionsButton = () =>
    this.page.locator("button::-p-text(New partitions will be created)");

  private readonly optionsForPartitionRootButton = () =>
    this.page.locator("::-p-aria(Options for partition /[role='button'])");

  private readonly editRootPartitionMenuitem = () =>
    this.page.locator("::-p-aria(Edit /[role='menuitem'])");

  private readonly threeDotsButton = () =>
    this.page.locator('::-p-aria([role="button"]):not([aria-label]):has(svg.agm-three-dots-icon)');

  // investigate: aria cannot be used
  public readonly storageAllocationWarningText = () =>
    this.page.locator("::-p-text(It is not possible to allocate space for the boot partition)");

  private readonly resetToDefaultsMenuitem = () =>
    this.page.locator(
      "::-p-aria(Reset to defaults Start from scratch with the default configuration[role='menuitem'])",
    );

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
    await this.settingsHeading().wait();
  }

  async selectUsedDisk() {
    await this.useDiskButton().click();
  }

  async changeTheDeviceToInstallTheSystem() {
    await this.changeDeviceMenuitem().click();
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
    await this.addLvmVolumeMenuitem().click();
  }

  async waitForElement(element, timeout) {
    await this.page.locator(element).setTimeout(timeout).wait();
  }

  async expandPartitions() {
    await this.expandPartitionsButton().click();
  }

  async clickOptionForRoot() {
    await this.optionsForPartitionRootButton().click();
  }

  async editRootPartition() {
    await this.editRootPartitionMenuitem().click();
  }

  async moreOptions() {
    await this.threeDotsButton().click();
  }

  async resetToDefault(timeout: number = 30 * 1000) {
    await this.resetToDefaultsMenuitem().setTimeout(timeout).click();
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
