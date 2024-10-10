import { it, page } from "../lib/helpers";

export function prepareDasdStorage() {
    it("should prepare DASD storage", async function () {
        // Workaround, sometimes the UI seems not responsive
        await page.locator("a[href='#/storage']").click({ delay: 1000 });
        await page.locator("a[href='#/storage']").click({ delay: 1000 });
        await page.locator("a[href='#/storage/target-device']").click();
        await page.locator("span::-p-text('storage techs')").click();
        await page.locator("span::-p-text('DASD')").click({ delay: 1000 });

        // Enabling DASD device, by default it is always disabled
        await page.locator("input[name='checkrow0']").click({ delay: 1000 });
        await page.locator("span::-p-text('Perform an action')").click({ delay: 1000 });
        await page.locator("span::-p-text('Activate')").click();

        // Selecting installation device
        await page.locator("a[href='#/storage']").click();
        await page.locator("a[href='#/storage/target-device']").click({ delay: 1000 });
        await page.locator("input[aria-label='Select row 0']").click();
        await page.locator("button[form='targetSelection']").click();
    });
}
