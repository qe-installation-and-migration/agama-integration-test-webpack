import { type Page } from "puppeteer-core";

export class UsersPage {
  private readonly page: Page;
  private readonly firstUserLink = () => this.page.locator("a[href='#/users/first']");
  private readonly editRootUserButton = () => this.page.locator("a[href='#/users/root/edit']");
  private readonly defineTheFirstUserButton = () =>
    this.page.locator("a[href='#/users/first/edit']");

  constructor(page: Page) {
    this.page = page;
  }

  async defineAUserNow() {
    await this.firstUserLink().click();
  }

  async editRootUser() {
    await this.editRootUserButton().click();
  }

  async defineTheFirstUser() {
    await this.defineTheFirstUserButton().click();
  }
}
