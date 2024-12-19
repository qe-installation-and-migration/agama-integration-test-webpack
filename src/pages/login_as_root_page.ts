import { type Page } from "puppeteer-core";

export class LoginAsRootPage {
  private readonly page: Page;
  private readonly passwordInput = () => this.page.locator("input#password");
  private readonly logInButton = () => this.page.locator("button[type='submit']");

  constructor(page: Page) {
    this.page = page;
  }

  async fillPassword(password: string) {
    await this.passwordInput().fill(password);
  }

  async logIn() {
    await this.logInButton().click();
  }
}
