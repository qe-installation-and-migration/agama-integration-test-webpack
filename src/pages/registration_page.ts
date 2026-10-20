import { type Page } from "puppeteer-core";
import { type GConstructor, waitUntilOverlaySettled } from "../lib/helpers";

class RegistrationBasePage {
  page: Page;

  protected readonly registerButton = () => this.page.locator("::-p-aria(Register)");

  protected readonly registrationServerButton = () =>
    this.page.locator("::-p-aria(Registration server)");

  public readonly infoHasBeenRegisteredText = () =>
    this.page.locator("::-p-text(has been registered with below information)");

  public readonly alertWarningUnknownRegistrationCodeText = () =>
    this.page.locator("::-p-text(Unknown Registration Code.)");

  public readonly alertWarningEnterARegistrationCodeText = () =>
    this.page.locator("::-p-text(Please provide Registration Code.)");

  public readonly alertWarningNetworkErrorText = () =>
    this.page.locator("::-p-text(Network error)");

  constructor(page: Page) {
    this.page = page;
  }

  async register() {
    await this.registerButton().click();
  }
}

function SCCSelectable<TBase extends GConstructor<RegistrationBasePage>>(Base: TBase) {
  return class extends Base {
    private readonly codeInput = () =>
      this.page.locator("::-p-aria('Registration code')[type='password']");

    private readonly registrationServerSCCOption = () =>
      this.page.locator("::-p-aria(SUSE Customer Center (SCC) Register using SUSE server)");

    async fillCode(code: string) {
      await this.codeInput().fill(code);
    }

    async selectSCCRegistrationServer() {
      await this.registrationServerButton().click();
      await this.registrationServerSCCOption().click();
    }
  };
}

function CustomSelectable<TBase extends GConstructor<RegistrationBasePage>>(Base: TBase) {
  return class extends Base {
    private readonly codeInput = () =>
      this.page.locator("::-p-aria('Registration code (optional)')[type='password']");

    private readonly serverUrlTextbox = () =>
      this.page.locator("::-p-aria(Server URL)[type='text']");

    private readonly registrationServerCustomOption = () =>
      this.page.locator("::-p-aria(Custom Register using a custom registration server)");

    async fillCode(code: string) {
      await this.codeInput().fill(code);
    }

    async selectCustomRegistrationServer() {
      await this.registrationServerButton().click();
      await this.registrationServerCustomOption().wait();
      await this.registrationServerCustomOption().click();
    }

    async fillServerUrl(url: string) {
      await this.serverUrlTextbox().fill(url);
    }

    async ensureCustomPageReady(timeout: number = 15 * 1000) {
      try {
        await this.serverUrlTextbox().setTimeout(2000).wait();
      } catch {
        await waitUntilOverlaySettled(async () => {
          await this.page.reload();
        });

        await this.serverUrlTextbox()
          .setTimeout(Math.max(timeout - 2000, 1000))
          .wait();
      }
    }
  };
}
export class RegistrationSCCPage extends SCCSelectable(RegistrationBasePage) {}
export class RegistrationCustomPage extends CustomSelectable(RegistrationBasePage) {}
