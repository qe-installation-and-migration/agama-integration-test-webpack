import { type Page } from "puppeteer-core";
import { type GConstructor } from "../lib/helpers";

class AuthenticationAdministratorAccountPage {
  protected readonly page: Page;

  protected readonly defineAnAdministratorUserCheckbox = () =>
    this.page.locator("::-p-aria(Define an administrator user[role='checkbox'])");

  protected readonly rootLoginMethodButton = () =>
    this.page.locator("::-p-aria(Root login method[role='button'])");

  private readonly fullNameTextbox = () =>
    this.page.locator("::-p-aria(Full name[role='textbox'])");

  private readonly usernameCombobox = () =>
    this.page.locator("::-p-aria(Username[role='combobox'])");

  private readonly userPasswordInput = () =>
    this.page.locator("input::-p-aria(Administrator account Password)");

  private readonly userPasswordConfirmationInput = () =>
    this.page.locator("input::-p-aria(Administrator account Password confirmation)");

  protected readonly acceptButton = () => this.page.locator("::-p-aria(Accept[role='button'])");

  public readonly alertPasswordLess8CharactersHeading = () =>
    this.page.locator(
      "div[aria-live='polite'] ::-p-text(The password is shorter than 8 characters)",
    );

  public readonly alertPasswordIsWeakHeading = () =>
    this.page.locator("div[aria-live='polite'] ::-p-text(The password is weak)");

  public readonly alertPasswordFailDictionaryCheckHeading = () =>
    this.page.locator("div[aria-live='polite'] ::-p-text(it is too simplistic/systematic)");

  constructor(page: Page) {
    this.page = page;
  }

  async defineAnAdministratorUser() {
    await this.defineAnAdministratorUserCheckbox().click();
  }

  async selectRootLoginMethod() {
    await this.rootLoginMethodButton().click();
  }

  async fillFullName(fullName: string) {
    await this.fullNameTextbox().fill(fullName);
  }

  async fillUserName(userName: string) {
    await this.usernameCombobox().fill(userName);
  }

  async fillPassword(password: string) {
    await this.userPasswordInput().fill(password);
  }

  async fillPasswordConfirmation(password: string) {
    await this.userPasswordConfirmationInput().fill(password);
  }

  async accept() {
    await this.acceptButton().click();
  }
}

function RootLoginMethodPasswordDefinable<
  TBase extends GConstructor<AuthenticationAdministratorAccountPage>,
>(Base: TBase) {
  return class extends Base {
    private readonly rootPasswordOption = () =>
      this.page.locator("::-p-aria(Password Log in using a password[role='option'])");

    private readonly rootPasswordInput = () =>
      this.page.locator("input::-p-aria(Root account Password)");

    private readonly rootPasswordConfirmationInput = () =>
      this.page.locator("input::-p-aria(Root account Password confirmation)");

    async selectPasswordAsRootLoginMethod() {
      await this.rootPasswordOption().click();
    }

    async fillRootPassword(password: string) {
      await this.rootPasswordInput().fill(password);
    }

    async fillRootPasswordConfirmation(password: string) {
      await this.rootPasswordConfirmationInput().fill(password);
    }
  };
}

export class AuthenticationWithRootLoginPassword extends RootLoginMethodPasswordDefinable(
  AuthenticationAdministratorAccountPage,
) {}
