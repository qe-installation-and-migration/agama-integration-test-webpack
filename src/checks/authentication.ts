import { it, page, sleep, getTextContent, waitUntilOverlaySettled } from "../lib/helpers";
import { HeaderPage } from "../pages/header_page";
import { OverviewPage } from "../pages/overview_page";
import { SidebarPage } from "../pages/sidebar_page";
import { UsersPage } from "../pages/users_page";
import { CreateFirstUserPage } from "../pages/create_user_page";
import { SetARootPasswordPage } from "../pages/root_authentication_methods";
import { AuthenticationWithRootLoginPassword } from "../pages/authentication_page";
import assert from "node:assert/strict";

export function createAdministratorAccount(password: string) {
  it("should define an administrator user", async function () {
    const defineAdministratorUser = new AuthenticationWithRootLoginPassword(page);
    const overview = new OverviewPage(page);
    const header = new HeaderPage(page);

    await overview.goToAuthentication();

    await defineAdministratorUser.defineAnAdministratorUser();
    await defineAdministratorUser.fillFullName("Bernhard M. Wiedemann");
    await defineAdministratorUser.fillUserName("bernhard");
    await defineAdministratorUser.fillPassword(password);
    await defineAdministratorUser.fillPasswordConfirmation(password);
    await waitUntilOverlaySettled(() => defineAdministratorUser.accept());
    await header.goToInstallation();
  });
}

export function createFirstUserWithSidebar(password: string) {
  it("should create first user", async function () {
    const users = new UsersPage(page);
    const createFirstUser = new CreateFirstUserPage(page);
    const sidebar = new SidebarPage(page);

    await sidebar.goToUsers();

    await users.defineAUserNow();
    await createFirstUser.fillFullName("Bernhard M. Wiedemann");
    await createFirstUser.fillUserName("bernhard");
    await createFirstUser.fillPassword(password);
    await createFirstUser.fillPasswordConfirmation(password);
    await createFirstUser.accept();
    // puppeteer goes too fast and screen is unresponsive after submit, a small delay helps
    await sleep(2000);
  });
}

export function editRootUserLoginMethod(password: string) {
  it("should enable the root account", async function () {
    const overview = new OverviewPage(page);
    const header = new HeaderPage(page);
    const setARootPassword = new AuthenticationWithRootLoginPassword(page);

    await overview.goToAuthentication();
    await setARootPassword.selectRootLoginMethod();
    await setARootPassword.selectPasswordAsRootLoginMethod();
    await setARootPassword.fillRootPassword(password);
    await setARootPassword.fillRootPasswordConfirmation(password);
    await waitUntilOverlaySettled(() => setARootPassword.accept());
    await header.goToInstallation();
  });
}

export function editRootUserWithSidebar(password: string) {
  it("should edit the root user", async function () {
    const sidebar = new SidebarPage(page);
    const users = new UsersPage(page);
    const setARootPassword = new SetARootPasswordPage(page);

    await sidebar.goToUsers();
    await users.editRootUser();
    await setARootPassword.usePassword();
    await setARootPassword.fillPassword(password);
    await setARootPassword.fillPasswordConfirmation(password);
    await setARootPassword.accept();
    // puppeteer goes too fast and screen is unresponsive after submit, a small delay helps
    await sleep(2000);
  });
}

export function verifyPasswordStrength() {
  it("should verify the strength of typed password", async function () {
    const header = new HeaderPage(page);
    const overview = new OverviewPage(page);

    const setARootPassword = new AuthenticationWithRootLoginPassword(page);
    await overview.goToAuthentication();
    await setARootPassword.selectRootLoginMethod();
    await setARootPassword.selectPasswordAsRootLoginMethod();
    await setARootPassword.fillRootPassword("a23b56c");
    const elementTextPasswordLess8Characters = await getTextContent(
      setARootPassword.alertPasswordLess8CharactersHeading(),
    );
    assert.deepEqual(
      elementTextPasswordLess8Characters,
      "The password is shorter than 8 characters",
    );

    await setARootPassword.fillPassword("a23b56ca");
    const elementTextPasswordIsWeak = await getTextContent(
      setARootPassword.alertPasswordIsWeakHeading(),
    );
    assert.deepEqual(elementTextPasswordIsWeak, "The password is weak");

    await setARootPassword.fillPassword("a23b5678");
    const elementTextPasswordFailDictionary = await getTextContent(
      setARootPassword.alertPasswordFailDictionaryCheckHeading(),
    );
    assert.deepEqual(
      elementTextPasswordFailDictionary,
      "The password fails the dictionary check - it is too simplistic/systematic",
    );
    await header.goToInstallation();
  });
}

export function verifyPasswordStrengthWithSidebar() {
  it("should verify the strength of typed password", async function () {
    const sidebar = new SidebarPage(page);
    const users = new UsersPage(page);
    const setARootPassword = new SetARootPasswordPage(page);

    await sidebar.goToUsers();
    await users.editRootUser();

    await setARootPassword.fillPassword("a23b56c");
    const elementTextPasswordLess8Characters = await getTextContent(
      setARootPassword.alertPasswordLess8CharactersHeading(),
    );
    assert.deepEqual(
      elementTextPasswordLess8Characters,
      "Warning alert:The password is shorter than 8 characters",
    );

    await setARootPassword.fillPassword("a23b56ca");
    const elementTextPasswordIsWeak = await getTextContent(
      setARootPassword.alertPasswordIsWeakHeading(),
    );
    assert.deepEqual(elementTextPasswordIsWeak, "Warning alert:The password is weak");

    await setARootPassword.fillPassword("a23b5678");
    const elementTextPasswordFailDictionary = await getTextContent(
      setARootPassword.alertPasswordFailDictionaryCheckHeading(),
      50000,
    );
    assert.deepEqual(
      elementTextPasswordFailDictionary,
      "Warning alert:The password fails the dictionary check - it is too simplistic/systematic",
    );
  });
}
