import { it, page } from "../lib/helpers";
import { ProductSelectionPage } from "../pages/product-selection-page";

export function productSelection(product: string) {
    it("should display the product selection dialog", async function () {
        const productselection = new ProductSelectionPage(page);
        let timeout = 2 * 60 * 1000;

        if (product !== "sle") {
            if (product === "leap") {
                await productselection.selectProduct("Leap 16.0 Alpha");
            }
            else {
                await productselection.selectProduct("openSUSE Tumbleweed");
            }
            // Check if configuration procedure is progressing
            await page.locator("::-p-text(Configuring the product)").wait();

            // refreshing the repositories might take long time
            await page.locator("h3::-p-text('Overview')").setTimeout(timeout).wait();
        }
    });
}
