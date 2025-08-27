import { type Page } from "puppeteer-core";

export class EncryptionSettingsPage {
  private readonly page: Page;
  private readonly encryptTheSystemCheckbox = () =>
    this.page.locator("::-p-text(Encrypt the system)");

  private readonly encryptTheSystemCheckedCheckbox = () =>
    this.page.locator("::-p-aria(Encrypt the system)[type=checkbox]:checked");

  private readonly encryptTheSystemNotCheckedCheckbox = () =>
    this.page.locator("::-p-aria(Encrypt the system)[type=checkbox]:not(:checked)");

  private readonly passwordInput = () => this.page.locator("#password");
  private readonly passwordConfirmationInput = () => this.page.locator("#passwordConfirmation");
  private readonly acceptButton = () => this.page.locator("button::-p-text(Accept)");

  constructor(page: Page) {
    this.page = page;
  }

  async checkEncryption() {
    await this.encryptTheSystemNotCheckedCheckbox().click();
    await this.encryptTheSystemCheckedCheckbox().wait();
  }

  async uncheckEncryption() {
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
