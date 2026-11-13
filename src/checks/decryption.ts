import { it, page, waitUntilSystemToIdle } from "../lib/helpers";
import { EncryptedDevice } from "../pages/encrypted_device_page";

export function decryptDevice(password: string) {
  it("Should decrypt encrypted device", async function () {
    const storageDecryption = new EncryptedDevice(page);
    await storageDecryption.decrypt(password, 3 * 60 * 1000);
    await waitUntilSystemToIdle(undefined, 60 * 1000);
  });
}
