import { type Page } from "puppeteer-core";

export class EncryptionSettingsPage {
  private readonly page: Page;

  private readonly encryptTheSystemCheckedCheckbox = () =>
    this.page.locator("::-p-aria(Encrypt the system[role='checkbox']):checked");

  private readonly encryptTheSystemNotCheckedCheckbox = () =>
    this.page.locator("::-p-aria(Encrypt the system[role='checkbox']):not(:checked)");

  private readonly passwordInput = () =>
    this.page.locator("::-p-aria(Encryption password[role='textbox'])");

  private readonly passwordConfirmationInput = () =>
    this.page.locator("::-p-aria(Confirm encryption password[role='textbox'])");

  private readonly acceptButton = () => this.page.locator("::-p-aria(Accept[role='button'])");

  constructor(page: Page) {
    this.page = page;
  }

  async markEncryptTheSystem() {
    await this.encryptTheSystemNotCheckedCheckbox().click();
    await this.encryptTheSystemCheckedCheckbox().wait();
  }

  async unmarkEncryptTheSystem() {
    await this.encryptTheSystemCheckedCheckbox().click();
    await this.encryptTheSystemNotCheckedCheckbox().wait();
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
