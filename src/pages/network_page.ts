import { type Page } from "puppeteer-core";

export class NetworkPage {
  private readonly page: Page;
  private readonly wiredConnection = () =>
    this.page.locator(`ul[aria-label="Wired connections"] > li`);

  private readonly installationOnlyCheckboxNotChecked = () =>
    this.page.locator(`input[type="checkbox"]:not(:checked)[role="switch"]`);

  private readonly installationOnlyCheckboxChecked = () =>
    this.page.locator(`input[type="checkbox"]:checked[role="switch"]`);

  private readonly warningAlertHeading = () =>
    this.page.locator(`::-p-text(Installed system may not have network connections)`);

  constructor(page: Page) {
    this.page = page;
  }

  async selectWiredConnection() {
    await this.wiredConnection().click();
  }

  async selectInstallationOnly() {
    await this.installationOnlyCheckboxNotChecked().click();
    await this.installationOnlyCheckboxChecked().wait();
  }

  async verifyWarningAlert() {
    await this.warningAlertHeading().wait();
  }
}
