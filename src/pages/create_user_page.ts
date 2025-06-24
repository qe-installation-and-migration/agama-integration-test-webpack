import { type Page } from "puppeteer-core";

export class CreateFirstUserPage {
  private readonly page: Page;
  private readonly fullNameInput = () => this.page.locator("input#userFullName");
  private readonly usernameInput = () => this.page.locator("input#userName");
  private readonly passwordInput = () => this.page.locator("input#password");
  private readonly passwordConfirmationInput = () =>
    this.page.locator("input#passwordConfirmation");

  private readonly acceptButton = () => this.page.locator("button[form='firstUserForm']");

  constructor(page: Page) {
    this.page = page;
  }

  async fillFullName(fullName: string) {
    // Fill the full name first to generate suggestions
    await this.fullNameInput().fill(fullName);
    await this.page.evaluate(() => document.getElementById("userFullName").blur());
    console.log("userFullName blurred - suggestions generated");
  }

  async fillUserName(userName: string) {
    // Focus username field to show suggestions
    await this.page.focus("#userName");
    console.log("focus userName - dropdown should appear");

    // Wait for suggestions dropdown to appear
    await this.page.waitForSelector(".first-username-dropdown", { visible: true });

    // Click the first suggestion to dismiss the dropdown
    await this.page.click('.first-username-dropdown [role="menuitem"]:first-child');
    console.log("clicked first suggestion - dropdown dismissed");

    // await this.page.type("#userName", userName);
    console.log(`click to choose username with: ${userName}`);
  }

  async fillPassword(password: string) {
    console.log("before filled passwordInput");
    const passwordSelector = "#password";
    await this.page.click(passwordSelector, { clickCount: 3 });
    await this.page.type(passwordSelector, password);
    console.log(`after filled passwordInput passwd=${password}`);
  }

  async fillPasswordConfirmation(password: string) {
    console.log("before ConfirmationInpu");
    const passwordConfirmationSelector = "#passwordConfirmation";
    await this.page.click(passwordConfirmationSelector, { clickCount: 3 });
    await this.page.type(passwordConfirmationSelector, password);
    // await this.passwordConfirmationInput().fill(password);
    console.log(`after fillPasswordConfirmation... passwd=${password}`);
  }

  async accept() {
    await this.acceptButton().click();
  }
}
