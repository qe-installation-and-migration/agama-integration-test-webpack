import { it, page } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar_page";
import { SoftwarePage } from "../pages/software_page";
import { SoftwareSelectionPage } from "../pages/software_selection_page";

export function selectPatterns(patterns: string[]) {
  it(`should select patterns ${patterns.join(", ")}`, async function () {
    const sidebar = new SidebarPage(page);
    const software = new SoftwarePage(page);
    const softwareSelection = new SoftwareSelectionPage(page);

    await sidebar.goToSoftware();
    await software.changeSelection();

    for (const pattern of patterns) await softwareSelection.selectPattern(pattern);
    await softwareSelection.close();
  });
}
