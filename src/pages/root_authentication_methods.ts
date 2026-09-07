import { type Page } from "puppeteer-core";

export class SetARootPasswordPage {
  private readonly page: Page;
  private readonly acceptButton = () => this.page.locator("::-p-aria(Accept[role='button'])");
  private readonly passwordInput = () => this.page.locator("input::-p-aria(Password)");
  private readonly passwordConfirmationInput = () =>
    this.page.locator("input::-p-aria(Password confirmation)");

  // investigate: aria cannot be used
  public readonly alertPasswordLess8CharactersText = () =>
    this.page.locator("::-p-text(Warning alert: The password is shorter than 8 characters)");

  // investigate: aria cannot be used
  public readonly alertPasswordIsWeakText = () =>
    this.page.locator("::-p-text(Warning alert: The password is weak)");

  // investigate: aria cannot be used
  public readonly alertPasswordFailDictionaryCheckText = () =>
    this.page.locator(
      "::-p-text(Warning alert: The password fails the dictionary check - it is too simplistic/systematic)",
    );

  // investigate: aria cannot be used
  private readonly usePasswordText = () => this.page.locator("::-p-text(Use password)");

  constructor(page: Page) {
    this.page = page;
  }

  async accept() {
    await this.acceptButton().click();
  }

  async fillPassword(password: string) {
    await this.passwordInput().fill(password);
  }

  async fillPasswordConfirmation(password: string) {
    await this.passwordConfirmationInput().fill(password);
  }

  async usePassword() {
    await this.usePasswordText().click();
  }
}
