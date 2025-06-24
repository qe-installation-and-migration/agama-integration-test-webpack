import { type Page } from "puppeteer-core";

export class CreateFirstUserPage {
  private readonly page: Page;
  private readonly fullNameInput = () => this.page.locator("input#userFullName");
  private readonly usernameInput = () => this.page.locator("input#userName");
  // private readonly usernameDropdownSelector = "[aria-label='Username suggestion dropdown']";
  private readonly passwordInput = () => this.page.locator("input#password");
  private readonly passwordConfirmationInput = () =>
    this.page.locator("input#passwordConfirmation");

  private readonly acceptButton = () => this.page.locator("button[form='firstUserForm']");

  constructor(page: Page) {
    this.page = page;
  }

  async fillFullName(fullName: string) {
    await this.fullNameInput().fill(fullName);
  }

  async fillUserName(userName: string) {
    // await this.usernameInput().click();
    // await this.page.keyboard.press('Escape');
    await this.usernameInput().fill(userName);
    // await this.page.type('input#userName', userName, { delay: 100 });
    // await this.page.waitForSelector(this.usernameDropdownSelector, { hidden: true });
  }

  async fillPassword(password: string) {
    // await this.passwordInput().setWaitForStableBoundingBox(true).fill(password);
    await this.passwordInput().fill(password);
  }

  async fillPasswordConfirmation(password: string) {
    await this.passwordConfirmationInput().fill(password);
  }

  async accept() {
    await this.acceptButton().click();
    // await this.page.waitForSelector("Something went wrong", { hidden: true });
  }
}
