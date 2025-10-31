import { type Page } from "puppeteer-core";
import { type GConstructor } from "../lib/helpers";
import assert from "node:assert/strict";

class RegistrationBasePage {
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

  readonly checkTheFollowingBeforeContinuingText = () =>
    this.page.locator("::-p-text(Check the following before continuing)");

  constructor(page: Page) {
    this.page = page;
  }

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
    await assert.match(
      elementText,
      /SUSE Linux Enterprise Server.*has been registered with below information/,
    );
  }
}

function CustomRegistrable<TBase extends GConstructor<RegistrationBasePage>>(Base: TBase) {
  return class extends Base {
    private readonly registrationServerButton = () =>
      this.page.locator("::-p-aria(Registration server)");

    private readonly registrationServerCustomOption = () =>
      this.page.locator("::-p-aria(Custom Register using a custom registration server)");

    private readonly registrationSUSEServerOption = () =>
      this.page.locator("::-p-aria(SUSE Customer Center (SCC) Register using SUSE server)");

    private readonly serverUrlTextbox = () =>
      this.page.locator("::-p-aria(Server URL)[type='text']");

    protected readonly provideRegistrationCodeCheckbox = () =>
      this.page.locator("::-p-aria(Provide registration code)");

    async provideRegistrationCode() {
      await this.provideRegistrationCodeCheckbox().click();
    }

    async selectCustomRegistrationServer() {
      await this.registrationServerButton().click();
      await this.registrationServerCustomOption().wait();
      await this.registrationServerCustomOption().click();
    }

    async selectSUSERegistrationServer() {
      await this.registrationServerButton().click();
      await this.registrationSUSEServerOption().wait();
      await this.registrationSUSEServerOption().click();
    }

    async fillServerUrl(url: string) {
      await this.serverUrlTextbox().wait();
      await this.serverUrlTextbox().fill(url);
    }
  };
}

export class ProductRegistrationPage extends RegistrationBasePage {}
export class CustomRegistrationPage extends CustomRegistrable(RegistrationBasePage) {}
