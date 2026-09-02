import { type Page } from "puppeteer-core";

export class CreateFirstUserPage {
  private readonly page: Page;
  private readonly fullNameTextbox = () =>
    this.page.locator("::-p-aria(Full name[role='textbox'])");

  private readonly usernameTextbox = () => this.page.locator("::-p-aria(Username[role='textbox'])");
  private readonly passwordInput = () => this.page.locator("input::-p-aria(Password)");

  private readonly passwordConfirmationInput = () =>
    this.page.locator("input::-p-aria(Password confirmation)");

  private readonly acceptButton = () => this.page.locator("::-p-aria(Accept[role='button'])");

  constructor(page: Page) {
    this.page = page;
  }

  async fillFullName(fullName: string) {
    await this.fullNameTextbox().fill(fullName);
  }

  async fillUserName(userName: string) {
    await this.usernameTextbox().fill(userName);
  }

  async fillPassword(password: string) {
    await this.passwordInput().fill(password);
  }

  async fillPasswordConfirmation(password: string) {
    await this.passwordConfirmationInput().fill(password);
  }

  async accept() {
    await this.acceptButton().click();
  }
}
