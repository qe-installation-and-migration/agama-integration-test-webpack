import { it, page, waitUntilOverlaySettled } from "../lib/helpers";
import { HeaderPage } from "../pages/header_page";
import { OverviewPage } from "../pages/overview_page";
import { SidebarPage } from "../pages/sidebar_page";
import { SoftwarePage } from "../pages/software_page";
import { SoftwareLegacyPage } from "../pages/software_legacy_page";
import { SoftwarePatternsSelectionPage } from "../pages/software_patterns_selection_page";
import { SoftwarePatternsSelectionLegacyPage } from "../pages/software_patterns_selection_legacy_page";
import { SoftwareDesktopSelectionPage } from "../pages/software_desktop_selection_page";

export function selectADesktop(desktop: string) {
  it(`should select a desktop ${desktop}`, async function () {
    const overview = new OverviewPage(page);
    const header = new HeaderPage(page);
    const software = new SoftwarePage(page);
    const softwareDesktopSelectionPage = new SoftwareDesktopSelectionPage(page);

    await overview.goToSoftware();
    await software.selectADesktop();
    await waitUntilOverlaySettled(() => softwareDesktopSelectionPage.select(desktop));
    await waitUntilOverlaySettled(() => softwareDesktopSelectionPage.accept());
    await header.goToInstallation();
  });
}

export function changePatterns(patterns: string[]) {
  it(`should change patterns by selecting ${patterns.join(", ")}`, async function () {
    const overview = new OverviewPage(page);
    const header = new HeaderPage(page);
    const software = new SoftwarePage(page);
    const softwarePatternsSelection = new SoftwarePatternsSelectionPage(page);

    await overview.goToSoftware();
    await software.changePatterns();
    for (const pattern of patterns) await softwarePatternsSelection.select(pattern);
    await waitUntilOverlaySettled(() => softwarePatternsSelection.accept());
    header.goToInstallation();
  });
}

export function selectPatternsWithSidebar(patterns: string[]) {
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
