import { IProductTestStrategy } from "../lib/product_strategy_factory";
import { setStaticHostname, configureTimeSynchronizationServers } from "../checks/system";
import {
  RegistrationOptions,
  enterExtensionRegistrationHA,
  enterExtensionRegistrationPHub,
  enterProductRegistration,
  verifyRegistrationWarniningAlerts,
} from "../checks/registration";
import { disableEncryption, enableEncryption, verifyEncryptionEnabled } from "../checks/encryption";
import {
  createAdministratorAccount,
  editRootUserLoginMethod,
  verifyPasswordStrength,
} from "../checks/authentication";
import { checkInstallation, finishInstallation, performInstallation } from "../checks/installation";
import { logInWithIncorrectPassword } from "../checks/login";
import { changeDeviceToInstallTheSystem } from "../checks/storage_change_device_to_install";
import { prepareDasdStorage } from "../checks/storage_dasd";
import {
  changePatterns,
  selectADesktop,
  verifySoftwareSelectionNotAvailable,
} from "../checks/software";
import { changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSize } from "../checks/storage_change_root_partition";
import { prepareZfcpStorage } from "../checks/storage_zfcp";
import { ensureLandingOnOverview } from "../checks/overview";
import { addLVMVolumeGroup } from "../checks/storage_select_installation_device";
import { setOnlyInstallationNetwork } from "../checks/network";
import { verifyDecryptDestructiveActions } from "../checks/storage_result_destructive_actions_planned";
import { verifyStorageOutOfSync } from "../checks/storage_out_of_sync";
import { downloadLogs } from "../checks/download_logs";
import { setupWholeDiskForHome } from "../checks/storage_disk_without_partitions";
import { configureBootDevice } from "../checks/storage_boot_options";
import { verifyAppearanceChanges } from "../checks/appearance";

export class ProductionReleaseStrategy implements IProductTestStrategy {
  setStaticHostname(hostname: string) {
    setStaticHostname(hostname);
  }

  verifyRegistrationWarniningAlerts() {
    verifyRegistrationWarniningAlerts();
  }

  enterProductRegistration({ use_custom, code, provide_code, url }: RegistrationOptions): void {
    enterProductRegistration({ use_custom, code, provide_code, url });
  }

  enableEncryption(password: string) {
    enableEncryption(password);
  }

  verifyEncryptionEnabled() {
    verifyEncryptionEnabled();
  }

  disableEncryption() {
    disableEncryption();
  }

  enterExtensionRegistrationHA(code: string) {
    enterExtensionRegistrationHA(code);
  }

  enterExtensionRegistrationPHub() {
    enterExtensionRegistrationPHub();
  }

  createFirstUser(password: string) {
    createAdministratorAccount(password);
  }

  editRootUser(password: string) {
    editRootUserLoginMethod(password);
  }

  performInstallation() {
    performInstallation();
  }

  logInWithIncorrectPassword() {
    logInWithIncorrectPassword();
  }

  checkInstallation() {
    checkInstallation();
  }

  finishInstallation() {
    finishInstallation();
  }

  changeDeviceToInstallTheSystem() {
    changeDeviceToInstallTheSystem();
  }

  verifyPasswordStrength() {
    verifyPasswordStrength();
  }

  prepareZfcpStorage() {
    prepareZfcpStorage();
  }

  prepareDasdStorage() {
    prepareDasdStorage();
  }

  changePatterns(patterns: string[]) {
    changePatterns(patterns);
  }

  selectDesktop(desktop: string) {
    selectADesktop(desktop);
  }

  changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSize() {
    changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSize();
  }

  configureVolumeGroup(disks?: string[]) {
    addLVMVolumeGroup(disks);
  }

  setOnlyInstallationNetwork() {
    setOnlyInstallationNetwork();
  }

  verifyDecryptDestructiveActions(destructiveActions: string[]) {
    verifyDecryptDestructiveActions(destructiveActions);
  }

  verifyStorageOutOfSync() {
    verifyStorageOutOfSync();
  }

  ensureLandingOnOverview() {
    ensureLandingOnOverview();
  }

  downloadLogs() {
    downloadLogs();
  }

  configureTimeSynchronizationServers(ntpServerAddresses: string[]): void {
    configureTimeSynchronizationServers(ntpServerAddresses);
  }

  verifySoftwareSelectionNotAvailable(): void {
    verifySoftwareSelectionNotAvailable();
  }

  setupWholeDiskForHome() {
    setupWholeDiskForHome();
  }

  configureBootDevice() {
    configureBootDevice();
  }

  verifyAppearanceChanges() {
    verifyAppearanceChanges();
  }
}
