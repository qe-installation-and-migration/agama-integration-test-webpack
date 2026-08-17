import assert from "node:assert/strict";
import { it, page } from "../lib/helpers";
import { AppearancePage } from "../pages/appearance_page";

export function changeAppearance() {
  it("should allow changing the color scheme to Dark and the contrast to High", async function () {
    const appearance = new AppearancePage(page);

    await appearance.open();
    await appearance.selectDarkColorScheme();
    await appearance.selectHighContrast();

    assert.ok(await appearance.isDarkColorSchemeSelected(), "Dark color scheme is not selected");
    assert.ok(await appearance.isHighContrastSelected(), "High contrast is not selected");

    assert.deepEqual(await appearance.themeClasses(), [
      "pf-v6-theme-dark",
      "pf-v6-theme-high-contrast",
    ]);

    await appearance.close();
  });
}
