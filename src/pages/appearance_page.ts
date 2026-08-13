import { type Page } from "puppeteer-core";

type ColorScheme = "Automatic" | "Light" | "Dark";
type Contrast = "Automatic" | "Standard" | "High";

export class AppearancePage {
  private readonly page: Page;

  private readonly appearanceButton = () =>
    this.page.locator('::-p-aria(Appearance[role="button"])');

  private readonly colorSchemeOption = (scheme: ColorScheme) =>
    this.page.locator(`::-p-aria(${scheme} color scheme[role='button'])`);

  private readonly contrastOption = (contrast: Contrast) =>
    this.page.locator(`::-p-aria(${contrast} contrast[role='button'])`);

  private readonly htmlElement = () => this.page.locator("html");

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.appearanceButton().click();
  }

  async close() {
    await this.appearanceButton().click();
  }

  async selectColorScheme(scheme: ColorScheme) {
    await this.colorSchemeOption(scheme).click();
  }

  async selectContrast(contrast: Contrast) {
    await this.contrastOption(contrast).click();
  }

  async waitColorSchemeSelected(scheme: ColorScheme) {
    await this.colorSchemeOption(scheme)
      .filter((element) => element.getAttribute("aria-pressed") === "true")
      .wait();
  }

  async waitContrastSelected(contrast: Contrast) {
    await this.contrastOption(contrast)
      .filter((element) => element.getAttribute("aria-pressed") === "true")
      .wait();
  }

  getHtmlClasses(): Promise<string> {
    return this.htmlElement()
      .map((element) => element.className)
      .wait();
  }
}
