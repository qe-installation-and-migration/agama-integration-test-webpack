import { type Page } from "puppeteer-core";

export class StorageSettingsPage {
  public readonly useDiskSelector: string;
  public readonly changeDeviceMenuSelector: string;
  public readonly newPartitionsButtonSelector: string;

  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;

    this.useDiskSelector = "::-p-text(Use disk)";
    this.changeDeviceMenuSelector = "::-p-aria(Change device menu[role='menuitem'])";
    this.newPartitionsButtonSelector = "::-p-text(New partitions will be created)";
  }
}
