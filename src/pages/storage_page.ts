import { type Page } from "puppeteer-core";

export class StoragePage {
  private readonly page: Page;
  private readonly changeDiskButton = () => this.page.locator('::-p-aria(Change[role="button"])');

  private readonly selectADiskToInstallTheSystemButton = () =>
    this.page.locator("::-p-aria(Select a disk to install the system[role='button'])");

  private readonly otherOptionsButton = () =>
    this.page.locator("::-p-aria(Other options[role='button'])");

  public readonly storageAllocationWarningHeading = () =>
    this.page.locator(
      "::-p-aria(It is not possible to allocate space for the boot partition[role='heading'])",
    );

  private readonly resetToDefaultsMenuitem = () =>
    this.page.locator("::-p-aria(Reset to defaults[role='menuitem'])");

  private readonly expandPartitionsButton = () =>
    this.page.locator("::-p-aria(New partitions will be created[role='button'])");

  private readonly editRootPartitionMenuitem = () =>
    this.page.locator("::-p-aria(Edit /'][role='menuitem'])");

  private readonly selectMoreDevicesButton = () =>
    this.page.locator("::-p-aria(More devices[role='button'])");

  private readonly addDeviceMenuitem = () =>
    this.page.locator("::-p-aria(Add device menu[role='menuitem'])");

  private readonly notConfiguredYetButton = () =>
    this.page.locator("button::-p-aria(Not configured yet)");

  private readonly useTheDiskWithoutPartitionsMenuitem = () =>
    this.page.locator(
      "::-p-aria(Use the disk without partitions Format the whole device or mount an existing file system[role='menuitem'])",
    );

  private readonly changeBootOptionsButton = () =>
    this.page.locator(
      "::-p-aria(Change boot options Select the disk to configure partitions for booting[role='menuitem'])",
    );

  constructor(page: Page) {
    this.page = page;
  }

  async selectChangeDisk() {
    await this.changeDiskButton().click();
  }

  async selectADiskToInstallTheSystem() {
    await this.selectADiskToInstallTheSystemButton().click();
  }

  async otherOptions() {
    await this.otherOptionsButton().click();
  }

  async resetToDefault() {
    await this.resetToDefaultsMenuitem().click();
  }

  async expandPartitions() {
    await this.expandPartitionsButton().click();
  }

  async editRootPartition() {
    await this.editRootPartitionMenuitem().click();
  }

  async changeBootOptions() {
    await this.changeBootOptionsButton().click();
  }

  async selectMoreDevices() {
    await this.selectMoreDevicesButton().click();
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
}
