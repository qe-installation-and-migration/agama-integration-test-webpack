import { it, page } from "../lib/helpers";
import { HostnamePage } from "../pages/hostname_page";
import { SidebarPage } from "../pages/sidebar_page";

export function setPermanentHostname(hostname: string) {
  it("should allow setting static hostname", async function () {
    const sidebar = new SidebarPage(page);
    const hostnamePage = new HostnamePage(page);

    await sidebar.goToHostname();
    await hostnamePage.useStaticHostname();
    await hostnamePage.fill(hostname);
    await hostnamePage.accept();
  });
}
