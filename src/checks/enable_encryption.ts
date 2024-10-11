import { it, page } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar-page";
import { StorageEncryptionPage } from "../pages/storage-encryption-page";
import { StoragePage } from "../pages/storage-page";

export function enableEncryption(password: string) {
    it("should enable encryption", async function () {
        const storage = new StoragePage(page);
        const storageEncryption = new StorageEncryptionPage(page);
        const sidebar = new SidebarPage(page);

        await sidebar.goToStorage();
        await storage.enableEncryption();
        await storageEncryption.encrypt(password);
        await storage.verifyEncryptionEnabled();
    });
}
