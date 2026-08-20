import { it, page } from "../lib/helpers";
import { AppearancePage } from "../pages/appearance_page";
import assert from "node:assert/strict";

export function verifyAppearanceChanges() {
  it("should cycle through color scheme and contrast combinations and return to the initial state", async function () {
    const appearance = new AppearancePage(page);

    await appearance.open();

    assert.ok(await appearance.isColorSchemeSelected("Automatic"));
    assert.ok(await appearance.isContrastSelected("Automatic"));

    await appearance.selectContrast("High");
    assert.ok(await appearance.isContrastSelected("High"));
    assert.ok((await appearance.themeClasses()).includes("pf-v6-theme-high-contrast"));

    await appearance.selectColorScheme("Light");
    await appearance.selectContrast("Automatic");
    assert.ok(await appearance.isColorSchemeSelected("Light"));
    assert.ok(await appearance.isContrastSelected("Automatic"));
    assert.ok(!(await appearance.themeClasses()).includes("pf-v6-theme-dark"));

    await appearance.selectContrast("High");
    assert.ok(await appearance.isColorSchemeSelected("Light"));
    assert.ok(await appearance.isContrastSelected("High"));
    assert.deepEqual(await appearance.themeClasses(), ["pf-v6-theme-high-contrast"]);

    await appearance.selectColorScheme("Dark");
    await appearance.selectContrast("Automatic");
    assert.ok(await appearance.isColorSchemeSelected("Dark"));
    assert.ok(await appearance.isContrastSelected("Automatic"));
    assert.ok((await appearance.themeClasses()).includes("pf-v6-theme-dark"));

    await appearance.selectContrast("High");
    assert.ok(await appearance.isColorSchemeSelected("Dark"));
    assert.ok(await appearance.isContrastSelected("High"));
    assert.deepEqual(await appearance.themeClasses(), [
      "pf-v6-theme-dark",
      "pf-v6-theme-high-contrast",
    ]);

    await appearance.selectColorScheme("Automatic");
    await appearance.selectContrast("Automatic");
    assert.ok(await appearance.isColorSchemeSelected("Automatic"));
    assert.ok(await appearance.isContrastSelected("Automatic"));

    await appearance.close();
  });
}
