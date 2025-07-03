import { type Page } from "puppeteer-core";
import { type GConstructor } from "../lib/helpers";

export class SidebarPage {
  protected readonly page: Page;
  private readonly overviewLink = () => this.page.locator("a[href='#/overview']");
  private readonly hostnameLink = () => this.page.locator("a[href='#/hostname']");
  private readonly localizationLink = () => this.page.locator("a[href='#/l10n']");
  private readonly networkLink = () => this.page.locator("a[href='#/network']");
  private readonly storageLink = () => this.page.locator("a[href='#/storage']");
  private readonly softwareLink = () => this.page.locator("a[href='#/software']");
  private readonly usersLink = () => this.page.locator("a[href='#/users']");

  constructor(page: Page) {
    this.page = page;
  }

  async goToOverview() {
    await this.overviewLink().click();
  }

  async goToHostname() {
    await this.hostnameLink().click();
  }

  async goToLocalization() {
    await this.localizationLink().click();
  }

  async goToNetwork() {
    await this.networkLink().click();
  }

  async goToStorage() {
    await this.storageLink().click();
  }

  async goToSoftware() {
    await this.softwareLink().click();
  }

  async goToUsers() {
    await this.usersLink().click();
  }
}

function RegistrationNavigable<TBase extends GConstructor<SidebarPage>>(Base: TBase) {
  return class extends Base {
    private readonly registrationLink = () => this.page.locator("a[href='#/registration']");

    async goToRegistration() {
      await this.registrationLink().click();
    }
  };
}

export class SidebarWithRegistrationPage extends RegistrationNavigable(SidebarPage) {}
