import { it, page, sleep } from "../lib/helpers";
import { SetupRootUserAuthenticationPage } from "../pages/setup_root_user_authentication_page";
import { SetARootPasswordPage } from "../pages/root_authentication_methods";
import { SidebarPage } from "../pages/sidebar_page";
import { UsersPage } from "../pages/users_page";

export function editRootUser(password: string) {
  it("should edit the root user", async function () {
    const sidebar = new SidebarPage(page);
    const users = new UsersPage(page);
    const setARootPassword = new SetARootPasswordPage(page);

    await sidebar.goToUsers();
    await users.editRootUser();
    await setARootPassword.usePassword();
    await setARootPassword.fillPassword(password);
    await setARootPassword.fillPasswordConfirmation(password);
    await setARootPassword.usePublicKey();
    await setARootPassword.fillSshKey("test");
    await setARootPassword.accept();
    // puppeteer goes too fast and screen is unresponsive after submit, a small delay helps
    await sleep(2000);
  });
}

export function setupMandatoryRootAuth(password: string) {
  it(
    "should setup root user authentication password",
    async function () {
      const setupRootuserAuthentication = new SetupRootUserAuthenticationPage(page);

      // longer timeout to refresh repos when coming from product selection
      await setupRootuserAuthentication.wait(3 * 60 * 1000);
      await setupRootuserAuthentication.fillPassword(password);
      await setupRootuserAuthentication.submit();
    },
    3 * 60 * 1000,
  );
}
