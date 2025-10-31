import { it, page } from "../lib/helpers";
import { EncryptionSettingsPage } from "../pages/encryption_settings_page";
import { SidebarPage } from "../pages/sidebar_page";
import { StorageWithoutTabsPage } from "../pages/storage_without_tabs_page";
import { StorageSettingsPage } from "../pages/storage_settings_page";
import assert from "node:assert/strict";

export function enableEncryption(password: string) {
  it("should enable encryption", async function () {
    const storageSettings = new StorageSettingsPage(page);
    const encryptionSettings = new EncryptionSettingsPage(page);
    const sidebar = new SidebarPage(page);

    await sidebar.goToStorage();
    await storageSettings.selectEncryption();
    await storageSettings.changeEncryption();
    await encryptionSettings.markEncryptTheSystem();
    await encryptionSettings.fillPassword(password);
    await encryptionSettings.fillPasswordConfirmation(password);
    await encryptionSettings.accept();
    await storageSettings.encryptionIsEnabledText().wait();
  });
}

export function verifyEncryptionEnabled() {
  it("should verify that encryption is enabled", async function () {
    const sidebar = new SidebarPage(page);
    const storageSettings = new StorageSettingsPage(page);

    await sidebar.goToStorage();
    await storageSettings.encryptionIsEnabledText().wait();
  });
}

export function disableEncryption() {
  it("should disable encryption", async function () {
    const storageSettings = new StorageSettingsPage(page);
    const encryptionSettings = new EncryptionSettingsPage(page);
    const sidebar = new SidebarPage(page);

    await sidebar.goToStorage();
    await storageSettings.selectEncryption();
    await storageSettings.changeEncryption();
    await encryptionSettings.unmarkEncryptTheSystem();
    await encryptionSettings.accept();

    const elementText = await storageSettings
      .encryptionIsDisabledText()
      .map((span) => span.textContent)
      .wait();
    assert.deepEqual(elementText, "Encryption is disabled");
  });
}

export function enableEncryptionWithoutTabs(password: string) {
  it("should enable encryption", async function () {
    const storage = new StorageWithoutTabsPage(page);
    const encryptionSettings = new EncryptionSettingsPage(page);
    const sidebar = new SidebarPage(page);

    await sidebar.goToStorage();
    await storage.changeEncryption();
    await encryptionSettings.markEncryptTheSystem();
    await encryptionSettings.fillPassword(password);
    await encryptionSettings.fillPasswordConfirmation(password);
    await encryptionSettings.accept();
    await storage.verifyEncryptionEnabled();
  });
}

export function verifyEncryptionEnabledWithoutTabs() {
  it("should verify that encryption is enabled", async function () {
    const sidebar = new SidebarPage(page);
    const storage = new StorageWithoutTabsPage(page);

    await sidebar.goToStorage();
    await storage.verifyEncryptionEnabled();
  });
}

export function disableEncryptionWithoutTabs() {
  it("should disable encryption", async function () {
    const storage = new StorageWithoutTabsPage(page);
    const encryptionSettings = new EncryptionSettingsPage(page);
    const sidebar = new SidebarPage(page);

    await sidebar.goToStorage();
    await storage.changeEncryption();
    await encryptionSettings.unmarkEncryptTheSystem();
    await encryptionSettings.accept();
    await storage.verifyEncryptionDisabled();
  });
}
