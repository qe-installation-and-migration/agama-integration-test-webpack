import { type Page } from "puppeteer-core";

export class TrustRegistrationCertificatePage {
  private readonly page: Page;

  readonly titleText = () => this.page.locator("::-p-text(Registration certificate)");
  readonly questionText = () =>
    this.page.locator("::-p-text(Do you want to trust it and register the product?)");

  readonly urlText = (expectedUrl: string) =>
    this.page.locator(`xpath=//text()[contains(., "${expectedUrl}")]/..`);

  readonly issuerText = () => this.page.locator("::-p-text(RMT Certificate Authority)");
  private readonly trustCertificateButton = () => this.page.locator("::-p-text(Trust)");

  constructor(page: Page) {
    this.page = page;
  }

  async trustCertificate() {
    await this.trustCertificateButton().click();
  }
}
