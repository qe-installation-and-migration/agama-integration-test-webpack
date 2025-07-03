import { it, page } from "../lib/helpers";
import { EncryptedDevice } from "../pages/encrypted_device_page";
import { OverviewPage } from "../pages/overview_page";

export function decryptDevice(password: string) {
  it("Should decrypt encrypted device", async function () {
    const storageDecryption = new EncryptedDevice(page);
    await storageDecryption.decrypt(password, 3 * 60 * 1000);
  });

  it("should display Overview", async function () {
    await new OverviewPage(page).waitVisible(40000);
  });
}
