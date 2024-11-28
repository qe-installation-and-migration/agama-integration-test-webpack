import { it, page } from "../lib/helpers";
import { ConfiguringProductPage } from "../pages/configuring_product_page";
import { ProductSelectionPage } from "../pages/product_selection_page";
import { SidebarPage } from "../pages/sidebar_page";

export function productSelection(product: string) {
    const productMap = {
        "tumbleweed": "openSUSE Tumbleweed",
        "leap": "Leap 16.0 Alpha"
    };

    it("should allow to select a product", async function () {
        await new ProductSelectionPage(page).selectProduct(productMap[product]);
    });

    it("should start configuring the product", async function () {
        await new ConfiguringProductPage(page).wait();
    });

    it("should display overview section", async function () {
        // longer timeout to refresh repos when coming from product selection
        await new SidebarPage(page).waitOverviewVisible(2 * 60 * 1000);
    });
}
