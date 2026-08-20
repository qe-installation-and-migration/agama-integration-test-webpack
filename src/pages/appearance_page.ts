import { type Page } from "puppeteer-core";

type ColorScheme = "Automatic" | "Light" | "Dark";
type Contrast = "Automatic" | "Standard" | "High";

export class AppearancePage {
  private readonly page: Page;

  private readonly appearanceButton = () =>
    this.page.locator('::-p-aria(Appearance[role="button"])');

  private readonly colorSchemeOption = (scheme: ColorScheme) =>
    this.page.locator(`::-p-aria(${scheme} color scheme[role='button'])`);

  private readonly contrastButton = (contrast: Contrast) =>
    this.page.locator(`::-p-aria(${contrast} contrast[role='button'])`);

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
    await this.contrastButton(contrast).click();
  }

  isColorSchemeSelected(scheme: ColorScheme): Promise<boolean> {
    return this.colorSchemeOption(scheme)
      .map((element) => element.getAttribute("aria-pressed") === "true")
      .wait();
  }

  isContrastSelected(contrast: Contrast): Promise<boolean> {
    return this.contrastButton(contrast)
      .map((element) => element.getAttribute("aria-pressed") === "true")
      .wait();
  }

  themeClasses(): Promise<string[]> {
    return this.page.evaluate(() => [...document.documentElement.classList]);
  }
}
