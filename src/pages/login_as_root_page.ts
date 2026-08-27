import { type Page } from "puppeteer-core";

export class LoginAsRootPage {
  private readonly page: Page;
  readonly passwordInput = () => this.page.locator("::-p-aria(Password input)");

  private readonly logInButton = () => this.page.locator("::-p-aria(Log in[role='button'])");
  readonly couldNotLoginHeading = () =>
    this.page.locator("::-p-aria(Danger alert: Could not log in[role='heading'])");

  readonly passwordVisibilityButton = () =>
    this.page.locator("::-p-aria(Password visibility button[role='button'])");

  constructor(page: Page) {
    this.page = page;
  }

  async fillPassword(password: string) {
    await this.passwordInput().fill(password);
  }

  async logIn() {
    await this.logInButton().click();
  }

  async togglePasswordVisibility() {
    await this.passwordVisibilityButton().click();
  }
}
