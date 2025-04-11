import { type Page } from "puppeteer-core";

export class AutoyastUnsupportedPage {
  private readonly page: Page;
  private readonly abortButton = () => this.page.locator("button::-p-text(Abort)");
  private readonly continueButton = () => this.page.locator("button::-p-text(Continue)");
  // atm we cannot be more specific to distinguish the section which belongs each element due to some
  // problem with puppeteer when running so many asyn calls, so this locator is used for both sections
  private readonly unsupportedElementText = (element: string) =>
    this.page.locator(`::-p-text(${element})`);

  constructor(page: Page) {
    this.page = page;
  }

  async abort() {
    await this.abortButton().click();
  }

  async continue() {
    await this.continueButton().click();
  }

  async verifyNotImplementedElement(element: string) {
    await this.unsupportedElementText(element).wait();
  }

  async verifyNotSupportedElement(element: string) {
    await this.unsupportedElementText(element).wait();
  }
}
