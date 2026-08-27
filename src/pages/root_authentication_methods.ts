import { type Page } from "puppeteer-core";

export class SetARootPasswordPage {
  private readonly page: Page;
  private readonly acceptButton = () => this.page.locator("::-p-aria(Accept[role='button'])");
  private readonly passwordInput = () => this.page.locator("input::-p-aria(Password)");
  private readonly passwordConfirmationInput = () =>
    this.page.locator("input::-p-aria(Password confirmation)");

  public readonly alertPasswordLess8CharactersHeading = () =>
    this.page.locator(
      "::-p-aria(Warning alert: The password is shorter than 8 characters[role='heading'])",
    );

  public readonly alertPasswordIsWeakHeading = () =>
    this.page.locator("::-p-aria(Warning alert: The password is weak[role='heading'])");

  public readonly alertPasswordFailDictionaryCheckHeading = () =>
    this.page.locator(
      "::-p-aria(Warning alert: The password fails the dictionary check - it is too simplistic/systematic[role='heading'])",
    );

  private readonly usePasswordCheckbox = () =>
    this.page.locator("::-p-aria(Use password[role='checkbox'])");

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
    await this.usePasswordCheckbox().click();
  }
}
