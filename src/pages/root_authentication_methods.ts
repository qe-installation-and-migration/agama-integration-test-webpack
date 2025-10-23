import { type Page } from "puppeteer-core";
import assert from "node:assert/strict";

export class SetARootPasswordPage {
  private readonly page: Page;
  private readonly acceptText = () => this.page.locator("button::-p-text(Accept)");
  private readonly confirmText = () => this.page.locator("button::-p-text(Confirm)");
  private readonly passwordInput = () => this.page.locator("input#password");
  private readonly passwordConfirmationInput = () =>
    this.page.locator("input#passwordConfirmation");

  private readonly alertPasswordLess8Characters = () =>
    this.page.locator("::-p-text(The password is shorter than 8 characters)");

  private readonly alertPasswordIsWeak = () => this.page.locator("::-p-text(The password is weak)");
  private readonly alertPasswordFailDictionaryCheck = () =>
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
    const elementText = await this.alertPasswordLess8Characters()
      .map((span) => span.textContent)
      .wait();
    assert.deepEqual(elementText, "Warning alert:The password is shorter than 8 characters");
  }

  async verifyPasswordIsWeak() {
    const elementText = await this.alertPasswordIsWeak()
      .map((span) => span.textContent)
      .wait();
    assert.deepEqual(elementText, "Warning alert:The password is weak");
  }

  async verifyPasswordFailDictionaryCheck() {
    const elementText = await this.alertPasswordFailDictionaryCheck()
      .map((span) => span.textContent)
      .wait();
    assert.deepEqual(
      elementText,
      "Warning alert:The password fails the dictionary check - it is too simplistic/systematic",
    );
  }

  async usePassword() {
    await this.usePasswordToggle().click();
  }
}
