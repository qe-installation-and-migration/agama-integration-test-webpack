import { it, page, sleep } from "../lib/helpers";

export function performInstallation() {
    it("should start installation", async function () {
        // todo: button is moving in the page and fails in slow machines
        await sleep(2000);
        await page.locator("button::-p-text('Install')").click();
        await page.locator("button::-p-text('Continue')").click();
        await page.locator("::-p-text(Installing the)").wait();
    });

    it("should finish installation", async function () {
        await page
            .locator("h2::-p-text('Congratulations!')")
            .setTimeout(40 * 60 * 1000)
            .wait();
    }, 40 * 60 * 1000);
}
