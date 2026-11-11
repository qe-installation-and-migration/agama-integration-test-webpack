import { it, page, getTextContent, waitUntilOverlaySettled } from "../lib/helpers";
import { HeaderPage } from "../pages/header_page";
import { OverviewPage } from "../pages/overview_page";
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
      setARootPassword.alertPasswordLess8CharactersText(),
    );
    assert.deepEqual(
      elementTextPasswordLess8Characters,
      "The password is shorter than 8 characters",
    );

    await setARootPassword.fillPassword("a23b56ca");
    const elementTextPasswordIsWeak = await getTextContent(
      setARootPassword.alertPasswordIsWeakText(),
    );
    assert.deepEqual(elementTextPasswordIsWeak, "The password is weak");

    await setARootPassword.fillPassword("a23b5678");
    const elementTextPasswordFailDictionary = await getTextContent(
      setARootPassword.alertPasswordFailDictionaryCheckText(),
    );
    assert.deepEqual(
      elementTextPasswordFailDictionary,
      "The password fails the dictionary check - it is too simplistic/systematic",
    );
    await header.goToInstallation();
  });
}
