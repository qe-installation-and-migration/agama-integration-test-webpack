import { type Page } from "puppeteer-core";

export class ExtensionRegistrationPHubPage {
  private readonly page: Page;

  protected readonly registerButton = () => this.page.locator("[id*='register-button-PackageHub']");

  readonly registeredText = () =>
    this.page.locator("::-p-text(The extension was registered without any registration code)");

  readonly trustKeyText = () => this.page.locator("::-p-text(Do you want to trust this key?)");
  private readonly trustKeyButton = () => this.page.locator("::-p-text(Trust)");

  constructor(page: Page) {
    this.page = page;
  }

  async register() {
    await this.registerButton().click();
  }

  async trustKey() {
    await this.trustKeyButton().click();
  }
}
