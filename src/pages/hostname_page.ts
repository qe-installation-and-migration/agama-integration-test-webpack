import { type Page } from "puppeteer-core";

export class HostnamePage {
  private readonly page: Page;
  private readonly useStaticHostnameToggle = () => this.page.locator("input#hostname");
  private readonly hostnameInput = () => this.page.locator("::-p-aria(Static hostname)");
  private readonly acceptButton = () => this.page.locator("::-p-text(Accept)");

  constructor(page: Page) {
    this.page = page;
  }

  async useStaticHostname() {
    await this.useStaticHostnameToggle().click();
  }

  async fill(hostname) {
    await this.hostnameInput().fill(hostname);
  }

  async accept() {
    await this.acceptButton().click();
  }
}
