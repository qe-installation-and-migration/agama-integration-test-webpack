import { type Page } from "puppeteer-core";

export class InstallationPage {
  private readonly page: Page;
  readonly prepareDisksText = () => this.page.locator("::-p-text(Prepare disks)");
  readonly installingSystemText = () =>
    this.page.locator(`::-p-text(Installing the system, please wait...)`);

  readonly installSoftwareText = () => this.page.locator(`::-p-text(Install software)`);
  readonly configureTheSystemText = () => this.page.locator(`::-p-text(Configure the system)`);

  constructor(page: Page) {
    this.page = page;
  }
}
