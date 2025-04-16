import { type Page } from "puppeteer-core";

export class RegistrationEnterCodePage {
  private readonly page: Page;
  private readonly codeInput = () => this.page.locator("input#key");
  private readonly codeHaInput = () => this.page.locator("input[id='input-reg-code-sle-ha-16.0']");
  private readonly registertButton = () => this.page.locator("button::-p-text(Register)");

  constructor(page: Page) {
    this.page = page;
  }

  async fillCode(code: string) {
    await this.codeInput().fill(code);
  }

  async fillCodeHa(code: string) {
    await this.codeHaInput().fill(code);
  }

  async register() {
    await this.registertButton().click();
  }
}
