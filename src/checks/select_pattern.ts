import { it, page } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar-page";
import { SoftwarePage } from "../pages/software-page";
import { SoftwareSelectionPage } from "../pages/software-selection-page";

export function selectPattern(pattern: string) {
    it(`should select pattern ${pattern}`, async function () {
        const sidebar = new SidebarPage(page);
        const software = new SoftwarePage(page);
        const softwareSelection = new SoftwareSelectionPage(page);

        await sidebar.goToSoftware();
        await software.changeSelection();
        await softwareSelection.selectPattern(pattern);
        await softwareSelection.close();
    });
}
