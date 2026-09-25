import { type Page } from "puppeteer-core";

export class InstallationJsonPage {
  protected readonly page: Page;

  private readonly downloadConfigurationButton = () =>
    this.page.locator("::-p-aria([name='Download configuration'][role='button'])");

  private readonly closeButton = () => this.page.locator("button.pf-m-primary::-p-text(Close)");

  protected readonly jsonEditor = () => this.page.locator('::-p-aria([role="textbox"])');

  private readonly configuration = () =>
    this.page.locator(".pf-v6-c-code-editor__code .view-lines");

  constructor(page: Page) {
    this.page = page;
  }

  async downloadJsonFile() {
    await this.downloadConfigurationButton().click();
  }

  async closeJsonFile() {
    await this.closeButton().click();
    await this.page.waitForSelector('div[role="dialog"]', { hidden: true });
  }

  async ensureJsonVisible(timeout: number = 30 * 1000) {
    await this.jsonEditor().setTimeout(timeout).wait();
  }

  async displayedConfiguration(): Promise<string> {
    return this.configuration()
      .map((element) => element.textContent ?? "")
      .wait();
  }
}
