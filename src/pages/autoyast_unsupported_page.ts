import { type Page } from "puppeteer-core";

export class AutoyastUnsupportedPage {
  private readonly page: Page;
  private readonly abortButton = () => this.page.locator("button::-p-text(Abort)");
  private readonly continueButton = () => this.page.locator("button::-p-text(Continue)");
  private readonly unsupportedElementText = (
    sectionTitle: string,
    numElements: number,
    element: string,
  ) =>
    this.page.locator(
      `::-p-aria([name="${sectionTitle} (${numElements})"][role="region"]) ::-p-text(${element})`,
    );

  constructor(page: Page) {
    this.page = page;
  }

  async abort() {
    await this.abortButton().click();
  }

  async continue() {
    await this.continueButton().click();
  }

  async verifyNotImplementedElement(numElements: number, element: string) {
    const elementHandle = await this.unsupportedElementText(
      "Not implemented yet",
      numElements,
      element,
    ).waitHandle();
    elementHandle.dispose();
  }

  async verifyNotSupportedElement(numElements: number, element: string) {
    const elementHandle = await this.unsupportedElementText(
      "Not supported",
      numElements,
      element,
    ).waitHandle();
    elementHandle.dispose();
  }
}
