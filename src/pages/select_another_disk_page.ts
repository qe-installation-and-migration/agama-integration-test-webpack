import { type Page } from "puppeteer-core";

export class SelectAnotherDiskPage {
  private readonly page: Page;
  public readonly addDiskButton = (diskNameAndSize: string) =>
    this.page.locator(`::-p-aria([name='${diskNameAndSize}'][role='button'])`);

  constructor(page: Page) {
    this.page = page;
  }

  async addDisk(diskNameAndSize: string) {
    await this.addDiskButton(diskNameAndSize).click();
  }
}
