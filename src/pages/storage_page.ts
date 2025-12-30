import { type Page } from "puppeteer-core";

export class StoragePage {
  private readonly page: Page;
  private readonly changeDiskButton = () =>
    this.page.locator('::-p-aria([name="Change"][role="button"])');

  private readonly selectADiskToInstallTheSystemButton = () =>
    this.page.locator("::-p-text(Select a disk to install the system)");

  private readonly otherOptionsButton = () => this.page.locator("::-p-text(Other options)");

  public readonly storageAllocationWarningText = () =>
    this.page.locator("::-p-text(It is not possible to allocate space for the boot partition)");

  private readonly resetToDefaultsButton = () => this.page.locator("::-p-text(Reset to defaults)");

  private readonly expandPartitionsButton = () =>
    this.page.locator("::-p-text(New partitions will be created)");

  private readonly editRootPartitionMenu = () =>
    this.page.locator("button[aria-label='Edit /'][role='menuitem']");

  private readonly selectMoreDevicesButton = () => this.page.locator("::-p-text(More devices)");

  private readonly addDeviceMenuitem = () =>
    this.page.locator("::-p-aria(Add device menu[role='menuitem'])");

  private readonly notConfiguredYetButton = () =>
    this.page.locator("button::-p-text(Not configured yet)");

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
    await this.resetToDefaultsButton().click();
  }

  async expandPartitions() {
    await this.expandPartitionsButton().click();
  }

  async editRootPartition() {
    await this.editRootPartitionMenu().click();
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
