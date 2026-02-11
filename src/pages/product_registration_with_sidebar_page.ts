import { type Page } from "puppeteer-core";
import assert from "node:assert/strict";

class RegistrationBaseWithSidebarPage {
  protected readonly page: Page;
  protected readonly codeInput = () =>
    this.page.locator("::-p-aria(Registration code)[type='password']");

  protected readonly infoHasBeenRegisteredText = () =>
    this.page.locator("::-p-text(has been registered with below information)");

  protected readonly registerButton = () => this.page.locator("::-p-aria(Register)");
  protected readonly registrationOptionCheckbox = () =>
    this.page.locator("::-p-aria(Provide registration code)");

  readonly connectionToRegistrationServerFailedText = () =>
    this.page.locator("::-p-text(Connection to registration server failed:)");

  readonly enterRegistrationCodeText = () =>
    this.page.locator("::-p-text(Enter a registration code)");

  constructor(page: Page) {
    this.page = page;
  }

  readonly unknownRegistrationCodeText = () =>
    this.page.locator("::-p-text(Unknown Registration Code)");

  async selectProvideRegistrationCode() {
    await this.registrationOptionCheckbox().click();
  }

  async fillCode(code: string) {
    await this.codeInput().fill(code);
  }

  async register() {
    await this.registerButton().click();
  }

  async verifyCustomRegistration() {
    const elementText = await this.infoHasBeenRegisteredText()
      .map((span) => span.textContent)
      .wait();
    assert.match(
      elementText,
      /SUSE Linux Enterprise Server.*has been registered with below information/,
    );
  }
}

export class ProductRegistrationWithSidebarPage extends RegistrationBaseWithSidebarPage {}
