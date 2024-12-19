import { type Page } from "puppeteer-core";

export class RegistrationEnterCodePage {
  private readonly page: Page;
  private readonly codeInput = () => this.page.locator("input#key");
  private readonly registertButton = () => this.page.locator("button[form='productRegistration']");

  constructor(page: Page) {
    this.page = page;
  }

  async fillCode(code: string) {
    await this.codeInput().fill(code);
  }

  async register() {
    await this.registertButton().click();
  }
}
