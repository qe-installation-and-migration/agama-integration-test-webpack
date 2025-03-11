import { type Page } from "puppeteer-core";

export class SetARootPasswordPage {
  private readonly page: Page;
  private readonly acceptText = () => this.page.locator("button::-p-text(Accept)");
  private readonly confirmText = () => this.page.locator("button::-p-text(Confirm)");
  private readonly passwordInput = () => this.page.locator("input#password");
  private readonly sshKeyInput = () => this.page.locator("textarea#sshkey");
  private readonly passwordConfirmationInput = () =>
    this.page.locator("input#passwordConfirmation");

  private readonly usePasswordToggle = () => this.page.locator("::-p-text(Use password)");
  private readonly usePublicKeyToggle = () => this.page.locator("::-p-text(Use public SSH Key)");

  constructor(page: Page) {
    this.page = page;
  }

  async accept() {
    await this.acceptText().click();
  }

  async confirm() {
    await this.confirmText().click();
  }

  async fillPassword(password: string) {
    await this.passwordInput().fill(password);
  }

  async fillPasswordConfirmation(password: string) {
    await this.passwordConfirmationInput().fill(password);
  }

  async usePassword() {
    await this.usePasswordToggle().click();
  }

  async usePublicKey() {
    await this.usePublicKeyToggle().click();
  }

  async fillSshKey(key: string) {
    await this.sshKeyInput().fill(key);
  }
}
