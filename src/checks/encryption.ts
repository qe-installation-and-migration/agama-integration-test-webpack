import { it, page } from "../lib/helpers";
import { SidebarPage } from "../pages/sidebar_page";
import { StorageEncryptionPage } from "../pages/storage_encryption_page";
import { StoragePage } from "../pages/storage_page";

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
