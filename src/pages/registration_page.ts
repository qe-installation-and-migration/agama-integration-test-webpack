import { Locator, type Page } from "puppeteer-core";
import { type GConstructor } from "../lib/helpers";

class RegistrationBasePage {
  protected readonly page: Page;
  protected readonly codeInput: () => Locator<HTMLInputElement>;
  protected readonly registerButton = () => this.page.locator("button::-p-text(Register)");
  protected readonly extensionRegisteredText = () =>
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

function ProductRegistrable<TBase extends GConstructor<RegistrationBasePage>>(Base: TBase) {
  return class extends Base {
    codeInput = () => this.page.locator("input#code");
  };
}

function ExtensionHaRegistrable<TBase extends GConstructor<RegistrationBasePage>>(Base: TBase) {
  return class extends Base {
    codeInput = () => this.page.locator("input[id^='input-reg-code-sle-ha-16.']");
    extensionRegisteredText = () =>
      this.page.locator("::-p-text(The extension has been registered)");

    async verifyExtensionRegistration() {
      await this.extensionRegisteredText().wait();
    }
  };
}

export class ProductRegistrationPage extends ProductRegistrable(RegistrationBasePage) {}
export class ExtensionHaRegistrationPage extends ExtensionHaRegistrable(RegistrationBasePage) {}
