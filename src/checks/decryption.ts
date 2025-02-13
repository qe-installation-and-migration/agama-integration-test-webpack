import { it, page } from "../lib/helpers";
import { StorageDecryptionPage } from "../pages/storage_decryption_page";

export function decryptExistingDrive(password: string) {
  it("Should decrypt existitng storage", async function () {
    const storageDecryption = new StorageDecryptionPage(page);
    await storageDecryption.wait(3 * 60 * 1000);
    await storageDecryption.decrypt(password);
  });
}

export function skipDecryption() {
  it("Should skip decryption for encrypted storage", async function () {
    const storageDecryption = new StorageDecryptionPage(page);

    await storageDecryption.skip();
  });
}
