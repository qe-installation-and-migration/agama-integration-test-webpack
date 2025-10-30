import { it, page, sleep } from "../lib/helpers";
import { SetupRootUserAuthenticationPage } from "../pages/setup_root_user_authentication_page";
import { SetARootPasswordPage } from "../pages/root_authentication_methods";
import { SidebarPage } from "../pages/sidebar_page";
import { UsersPage } from "../pages/users_page";
import assert from "node:assert/strict";

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

export function verifyPasswordStrength() {
  it("should verify the strength of typed password", async function () {
    const sidebar = new SidebarPage(page);
    const users = new UsersPage(page);
    const setARootPassword = new SetARootPasswordPage(page);

    await sidebar.goToUsers();
    await users.editRootUser();
    await setARootPassword.fillPassword("a23b56c");
    const elementTextPasswordLess8Characters = await setARootPassword
      .alertPasswordLess8Characters()
      .map((span) => span.textContent)
      .wait();
    assert.deepEqual(
      elementTextPasswordLess8Characters,
      "The password is shorter than 8 characters",
    );

    await setARootPassword.fillPassword("a23b56ca");
    const elementTextPasswordIsWeak = await setARootPassword
      .alertPasswordIsWeak()
      .map((span) => span.textContent)
      .wait();
    assert.deepEqual(elementTextPasswordIsWeak, "The password is weak");

    await setARootPassword.fillPassword("a23b5678");
    const elementTextPasswordFailDictionary = await setARootPassword
      .alertPasswordFailDictionaryCheck()
      .map((span) => span.textContent)
      .wait();
    assert.deepEqual(
      elementTextPasswordFailDictionary,
      "The password fails the dictionary check - it is too simplistic/systematic",
    );
  });
}
