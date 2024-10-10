import { it, page } from "../lib/helpers";

export function loginCheck(password: string) {
  it("allows logging in", async function () {
    // await page.waitForSelector("input#password");
    await page.type("input#password", password);
    await page.click("button[type='submit']");
  });
}
