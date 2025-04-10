import { type Page } from "puppeteer-core";

export class EncryptedDevice {
  private readonly page: Page;
  private readonly encryptionPasswordInput = () => this.page.locator("input#luks-password");
  private readonly decryptButton = () => this.page.locator("button::-p-text(Decrypt)");

  constructor(page: Page) {
    this.page = page;
  }

  async decrypt(password: string, timeout: number) {
    await this.encryptionPasswordInput().setTimeout(timeout).fill(password);
    await this.decryptButton().click();
  }
}
