import { it, page } from "../lib/helpers";
import { AppearancePage } from "../pages/appearance_page";
import assert from "node:assert/strict";

export function verifyAppearanceChanges() {
  it("should cycle through color scheme and contrast combinations and return to the initial state", async function () {
    const appearance = new AppearancePage(page);

    await appearance.open();

    // (1) Initial status: Automatic color scheme + Automatic contrast.
    // "Automatic" depends on the browser/system preference, so only the
    // pressed state is checked here, not the applied theme classes.
    await appearance.waitColorSchemeSelected("Automatic");
    await appearance.waitContrastSelected("Automatic");

    // (2) Automatic color scheme + High contrast
    await appearance.selectContrast("High");
    await appearance.waitContrastSelected("High");
    assert.match(await appearance.getHtmlClasses(), /pf-v6-theme-high-contrast/);

    // (3) Light color scheme + Automatic contrast
    await appearance.selectColorScheme("Light");
    await appearance.selectContrast("Automatic");
    await appearance.waitColorSchemeSelected("Light");
    await appearance.waitContrastSelected("Automatic");
    assert.doesNotMatch(await appearance.getHtmlClasses(), /pf-v6-theme-dark/);

    // (4) Light color scheme + High contrast
    await appearance.selectContrast("High");
    await appearance.waitContrastSelected("High");
    const classesAtCombo4 = await appearance.getHtmlClasses();
    assert.doesNotMatch(classesAtCombo4, /pf-v6-theme-dark/);
    assert.match(classesAtCombo4, /pf-v6-theme-high-contrast/);

    // (5) Dark color scheme + Automatic contrast
    await appearance.selectColorScheme("Dark");
    await appearance.selectContrast("Automatic");
    await appearance.waitColorSchemeSelected("Dark");
    await appearance.waitContrastSelected("Automatic");
    assert.match(await appearance.getHtmlClasses(), /pf-v6-theme-dark/);

    // (6) Dark color scheme + High contrast
    await appearance.selectContrast("High");
    await appearance.waitContrastSelected("High");
    const classesAtCombo6 = await appearance.getHtmlClasses();
    assert.match(classesAtCombo6, /pf-v6-theme-dark/);
    assert.match(classesAtCombo6, /pf-v6-theme-high-contrast/);

    // Back to (1): Automatic color scheme + Automatic contrast
    await appearance.selectColorScheme("Automatic");
    await appearance.selectContrast("Automatic");
    await appearance.waitColorSchemeSelected("Automatic");
    await appearance.waitContrastSelected("Automatic");

    await appearance.close();
  });
}
