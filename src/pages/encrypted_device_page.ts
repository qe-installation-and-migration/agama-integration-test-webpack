import { type Page } from "puppeteer-core";

export class EncryptedDevice {
  private readonly page: Page;
  private readonly encryptionPasswordInput = () =>
    this.page.locator("::-p-aria(LUKS password[role='textbox'])");

  private readonly decryptButton = () => this.page.locator("::-p-aria(Decrypt[role='button'])");

  constructor(page: Page) {
    this.page = page;
  }

  async decrypt(password: string, timeout: number) {
    await this.encryptionPasswordInput().setTimeout(timeout).fill(password);
    await this.decryptButton().click();
  }
}
