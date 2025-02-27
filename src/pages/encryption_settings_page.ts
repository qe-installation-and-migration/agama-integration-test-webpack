import { type Page } from "puppeteer-core";

export class EncryptionSettingsPage {
  private readonly page: Page;
  private readonly encryptTheSystemToggle = () =>
    this.page.locator("::-p-text(Encrypt the system)");

  private readonly passwordInput = () => this.page.locator("#password");
  private readonly passwordConfirmationInput = () => this.page.locator("#passwordConfirmation");
  private readonly acceptButton = () => this.page.locator("button::-p-text(Accept)");

  constructor(page: Page) {
    this.page = page;
  }

  async encryptTheSystem() {
    await this.encryptTheSystemToggle().click();
  }

  async fillPassword(password: string) {
    await this.passwordInput().fill(password);
  }

  async fillPasswordConfirmation(password: string) {
    await this.passwordConfirmationInput().fill(password);
  }

  async accept() {
    await this.acceptButton().click();
  }
}
