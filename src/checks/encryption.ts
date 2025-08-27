import { it, page } from "../lib/helpers";
import { EncryptionSettingsPage } from "../pages/encryption_settings_page";
import { SidebarPage } from "../pages/sidebar_page";
import { StoragePage } from "../pages/storage_page";

export function enableEncryption(password: string) {
  it("should enable encryption", async function () {
    const storage = new StoragePage(page);
    const encryptionSettings = new EncryptionSettingsPage(page);
    const sidebar = new SidebarPage(page);

    await sidebar.goToStorage();
    await storage.editEncryption();
    await encryptionSettings.checkEncryption();
    await encryptionSettings.fillPassword(password);
    await encryptionSettings.fillPasswordConfirmation(password);
    await encryptionSettings.accept();
    await storage.verifyEncryptionEnabled();
  });
}

export function verifyEncryptionEnabled() {
  it("should verify that encryption is enabled", async function () {
    const sidebar = new SidebarPage(page);
    const storage = new StoragePage(page);

    await sidebar.goToStorage();
    await storage.verifyEncryptionEnabled();
  });
}

export function disableEncryption() {
  it("should disable encryption", async function () {
    const storage = new StoragePage(page);
    const encryptionSettings = new EncryptionSettingsPage(page);
    const sidebar = new SidebarPage(page);

    await sidebar.goToStorage();
    await storage.editEncryption();
    await encryptionSettings.uncheckEncryption();
    await encryptionSettings.accept();
    await storage.verifyEncryptionDisabled();
  });
}
