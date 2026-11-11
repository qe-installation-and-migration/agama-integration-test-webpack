import { it, page } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar_page";
import { SoftwareLegacyPage } from "../pages/software_legacy_page";
import { SoftwarePatternsSelectionLegacyPage } from "../pages/software_patterns_selection_legacy_page";

export function selectPatterns(patterns: string[]) {
  it(`should select patterns ${patterns.join(", ")}`, async function () {
    const sidebar = new SidebarPage(page);
    const software = new SoftwareLegacyPage(page);
    const softwarePatternsSelection = new SoftwarePatternsSelectionLegacyPage(page);

    await sidebar.goToSoftware();
    await software.changeSelection();

    for (const pattern of patterns) await softwarePatternsSelection.selectPattern(pattern);
    await softwarePatternsSelection.close();
  });
}
