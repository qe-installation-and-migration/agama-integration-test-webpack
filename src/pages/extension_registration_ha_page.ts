import { type Page } from "puppeteer-core";

export class ExtensionRegistrationHAPage {
  private readonly page: Page;

  protected readonly codeInput = () =>
    this.page.locator("::-p-aria(Registration code)[type='password']");

  protected readonly registerButton = () => this.page.locator("[id*='register-button-sle-ha']");

  readonly extensionRegisteredText = () =>
    this.page.locator("::-p-text(The extension has been registered)");

  constructor(page: Page) {
    this.page = page;
  }

  async fillCode(code: string) {
    await this.codeInput().fill(code);
  }

  async register() {
    await this.registerButton().click();
  }
}
