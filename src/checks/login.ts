import assert from "node:assert/strict";
import { it, page, getTextContent, getValue } from "../lib/helpers";
import { LoginAsRootPage } from "../pages/login_as_root_page";

function verifyAgamaTitle() {
  it("should have Agama page title", async function () {
    assert.deepEqual(await page.title(), "Agama");
  });
}

export function logIn(password: string) {
  verifyAgamaTitle();
  it("should allow logging in", async function () {
    const loginAsRoot = new LoginAsRootPage(page);

    await loginAsRoot.fillPassword(password);
    await loginAsRoot.logIn();
  });
}

export function logInWithIncorrectPassword() {
  verifyAgamaTitle();
  it("should show warning alert for logging with wrong password", async function () {
    const loginAsRoot = new LoginAsRootPage(page);
    const invalidpassword = "invalid password";

    await loginAsRoot.fillPassword(invalidpassword);
    await loginAsRoot.logIn();
    assert.deepEqual(
      await getTextContent(loginAsRoot.couldNotLoginHeading()),
      "Danger alert:Could not log in",
    );
    await loginAsRoot.togglePasswordVisibility();
    assert.deepEqual(await getValue(loginAsRoot.passwordInput()), invalidpassword);
  });
}

export function logInWithIncorrectPasswordWithSidebar() {
  verifyAgamaTitle();
  it("should show warning alert for logging with wrong password", async function () {
    const loginAsRoot = new LoginAsRootPage(page);
    const invalidpassword = "invalid password";

    await loginAsRoot.fillPassword(invalidpassword);
    await loginAsRoot.logIn();
    const alertText = await getTextContent(loginAsRoot.couldNotLoginHeading());
    assert.deepEqual(
      alertText,
      "Danger alert:Could not log in. Please, make sure that the password is correct.",
    );

    await loginAsRoot.togglePasswordVisibility();
    const passwordInputValue = await getValue(loginAsRoot.passwordInput());
    assert.deepEqual(passwordInputValue, invalidpassword);
  });
}
