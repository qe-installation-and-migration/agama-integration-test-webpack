import { it, page, sleep } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar_page";
import { StorageResultPage } from "../pages/storage_result_page";
import { getElementInCell, getTextInCell } from "../lib/table";

export function readTable() {
  it("should read result table", async function () {
    const sidebar = new SidebarPage(page);
    const storageResult = new StorageResultPage(page);

    await sidebar.goToStorage();
    await storageResult.waitVisible();
    console.log(
      await getTextInCell(page, storageResult.resultTableSelector, "Device", "vda1", "Details"),
    );

    const buttonElement = await getElementInCell(
      page,
      storageResult.resultTableSelector,
      "Device",
      "/dev/vda",
      storageResult.resultTableColapseRowSelector,
    );
    await buttonElement.click();

    await sleep(2000);
  });
}
