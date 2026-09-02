import { type Page } from "puppeteer-core";

export class InstallationSettingsInJsonFormatPage {
  protected readonly page: Page;

  private readonly downloadConfigurationButton = () =>
    this.page.locator("::-p-aria([name='Download configuration'][role='button'])");

  // the dialog exposes two buttons named "Close", the header "X" and this one
  private readonly closeButton = () => this.page.locator("button.pf-m-primary::-p-text(Close)");

  protected readonly jsonEditor = () => this.page.locator('::-p-aria([role="textbox"])');

  protected readonly configurationDialog = () => this.page.locator('div[role="dialog"]');

  private readonly configuration = () =>
    this.page.locator(".pf-v6-c-code-editor__code .view-lines");

  constructor(page: Page) {
    this.page = page;
  }

  async downloadConfiguration() {
    await this.downloadConfigurationButton().click();
  }

  async close() {
    await this.closeButton().click();
    await this.configurationDialog().setVisibility("hidden").wait();
  }

  async ensureJsonVisible() {
    await this.jsonEditor()
      .setTimeout(30 * 1000)
      .wait();
  }

  async displayedConfiguration(): Promise<string> {
    return this.configuration()
      .map((element) => element.textContent ?? "")
      .wait();
  }
}
