import { type Page } from "puppeteer-core";

export class SetARootPasswordPage {
  private readonly page: Page;
  private readonly acceptText = () => this.page.locator("button::-p-text(Accept)");
  private readonly confirmText = () => this.page.locator("button::-p-text(Confirm)");
  private readonly passwordInput = () => this.page.locator("input#password");
  private readonly passwordConfirmationInput = () =>
    this.page.locator("input#passwordConfirmation");

  private readonly passwordLess8Characters = () =>
    this.page.locator("::-p-text(The password is shorter than 8 characters)");

  private readonly passwordIsWeak = () => this.page.locator("::-p-text(The password is weak)");
  private readonly passwordFailDisctionaryCheck = () =>
    this.page.locator("::-p-text(it is too simplistic/systematic)");

  private readonly usePasswordToggle = () => this.page.locator("::-p-text(Use password)");

  constructor(page: Page) {
    this.page = page;
  }

  async accept() {
    await this.acceptText().click();
  }

  async confirm() {
    await this.confirmText().click();
  }

  async fillPassword(password: string) {
    await this.passwordInput().fill(password);
  }

  async fillPasswordConfirmation(password: string) {
    await this.passwordConfirmationInput().fill(password);
  }

  async verifyPasswordLess8Characters() {
    await this.passwordLess8Characters().wait();
  }

  async verifyPasswordIsWeak() {
    await this.passwordIsWeak().wait();
  }

  async verifyPasswordFailDictionaryCheck() {
    await this.passwordFailDisctionaryCheck().wait();
  }

  async usePassword() {
    await this.usePasswordToggle().click();
  }
}
