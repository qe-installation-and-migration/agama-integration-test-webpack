import { it, page } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar_page";
import { SoftwarePage } from "../pages/software_page";
import { SoftwareSelectionPage } from "../pages/software_selection_page";

export function selectSinglePattern(pattern: string) {
    const patternMap = {
        "gnome": "GNOME Desktop Environment (Wayland)",
        "kde": "KDE Appications and Plasma Desktop",
        "xfce": "XFCE Desktop Environment",
        "basic": "A basic desktop (based on IceWM)"
    };

    it(`should select pattern ${pattern}`, async function () {
        const sidebar = new SidebarPage(page);
        const software = new SoftwarePage(page);
        const softwareSelection = new SoftwareSelectionPage(page);

        await sidebar.goToSoftware();
        await software.changeSelection();
        await softwareSelection.selectPattern(patternMap[pattern]);
        await softwareSelection.close();
    });
}
