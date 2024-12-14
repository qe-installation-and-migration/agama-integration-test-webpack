import { type Page } from "puppeteer-core";

export class SetupRootUserAuthenticationPage {
  private readonly page: Page;
  private readonly rootPasswordInput = () => this.page.locator("input#rootPassword");
  private readonly submitButton = () => this.page.locator("button[type='submit']");

  constructor(page: Page) {
    this.page = page;
  }

  async wait(timeout: number) {
    await this.rootPasswordInput().setTimeout(timeout).wait();
  }

  async fillPassword(password: string) {
    await this.rootPasswordInput().fill(password);
  }

  async submit() {
    await this.submitButton().click();
  }
}
