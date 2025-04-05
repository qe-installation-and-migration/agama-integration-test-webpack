import { type Page } from "puppeteer-core";

export class AutoyastUnsupportedPage {
  private readonly page: Page;
  private readonly abortButton = () => this.page.locator("button::-p-text(Abort)");
  private readonly continueButton = () => this.page.locator("button::-p-text(Continue)");
  // private readonly unsupportedElementText = (
  //   sectionTitle: string,
  //   numElements: number,
  //   element: string,
  // ) =>
  //   this.page.locator(
  //     `::-p-aria([name="${sectionTitle} (${numElements})"][role="region"]) ::-p-text(${element})`,
  //   );

  private readonly unsupportedElementText = (element: string) => this.page.locator(`::-p-aria([name="Not supported (29)"][role="region"]) ::-p-text(${element})`);
  // private readonly unsupportedElementText = (element: string) => this.page.locator(`::-p-text(${element})`);

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
    await this.unsupportedElementText(element).click();
  }
}
