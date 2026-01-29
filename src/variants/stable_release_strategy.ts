import { IProductTestStrategy } from "../lib/product_strategy_factory";
import { setPermanentHostnameWithSidebar } from "../checks/hostname";
import {
  verifyRegistrationWarniningAlertsWithSidebar,
  RegistrationOptions,
  enterProductRegistrationWithSidebar,
  enterExtensionRegistrationHAWithSidebar,
  enterExtensionRegistrationPHubWithSidebar,
} from "../checks/registration";
import {
  disableEncryptionWithSidebar,
  enableEncryptionWithSidebar,
  verifyEncryptionEnabledWithSidebar,
} from "../checks/encryption";
import { createFirstUserWithSidebar } from "../checks/first_user";
import {
  editRootUserWithSidebar,
  verifyPasswordStrengthWithSidebar,
} from "../checks/root_authentication";
import {
  finishInstallationCongratulation,
  performInstallationWithSidebar,
} from "../checks/installation";
import { logInWithIncorrectPasswordWithSidebar } from "../checks/login";
import { changeDiskToInstallTheSystemWithSidebar } from "../checks/storage_change_disk_to_install";
import { prepareZfcpStorageWithSidebar } from "../checks/storage_zfcp";
import { selectPatternsWithSidebar } from "../checks/software_selection";
import { changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSizeWithSidebar } from "../checks/storage_change_root_partition";
import { prepareDasdStorageWithSidebar } from "../checks/storage_dasd";
import {
  ensureLandingOnOverviewWithSidebar,
  productSelectionWithLicenseWithSidebar,
  productSelectionWithSidebar,
} from "../checks/product_selection";
import { selectMoreDevicesWithSidebar } from "../checks/storage_select_installation_device";
import { setOnlyInstallationNetworkWithSidebar } from "../checks/network";
import { verifyDecryptDestructiveActionsWithSidebar } from "../checks/storage_result_destructive_actions_planned";
import { verifyStorageOutOfSyncWithSidebar } from "../checks/storage_out_of_sync";

export class StableReleaseStrategy implements IProductTestStrategy {
  setPermanentHostname(hostname: string) {
    setPermanentHostnameWithSidebar(hostname);
  }

  verifyRegistrationWarniningAlerts(use_custom?: string, url?: string) {
    verifyRegistrationWarniningAlertsWithSidebar(use_custom, url);
  }

  enterProductRegistration({ use_custom, code, provide_code, url }: RegistrationOptions): void {
    enterProductRegistrationWithSidebar({ use_custom, code, provide_code, url });
  }

  enableEncryption(password: string) {
    enableEncryptionWithSidebar(password);
  }

  verifyEncryptionEnabled() {
    verifyEncryptionEnabledWithSidebar();
  }

  disableEncryption() {
    disableEncryptionWithSidebar();
  }

  enterExtensionRegistrationHA(code: string) {
    enterExtensionRegistrationHAWithSidebar(code);
  }

  enterExtensionRegistrationPHub() {
    enterExtensionRegistrationPHubWithSidebar();
  }

  createFirstUser(password: string) {
    createFirstUserWithSidebar(password);
  }

  editRootUser(password: string) {
    editRootUserWithSidebar(password);
  }

  performInstallation() {
    performInstallationWithSidebar();
  }

  logInWithIncorrectPassword() {
    logInWithIncorrectPasswordWithSidebar();
  }

  finishInstallation() {
    finishInstallationCongratulation();
  }

  changeDiskToInstallTheSystem() {
    changeDiskToInstallTheSystemWithSidebar();
  }

  verifyPasswordStrength() {
    verifyPasswordStrengthWithSidebar();
  }

  prepareZfcpStorage() {
    prepareZfcpStorageWithSidebar();
  }

  prepareDasdStorage() {
    prepareDasdStorageWithSidebar();
  }

  selectPatterns(patterns: string[]) {
    selectPatternsWithSidebar(patterns);
  }

  changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSize() {
    changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSizeWithSidebar();
  }

  productSelection(productId: string) {
    productSelectionWithSidebar(productId);
  }

  productSelectionWithLicense(productId: string) {
    productSelectionWithLicenseWithSidebar(productId);
  }

  selectMoreDevices() {
    selectMoreDevicesWithSidebar();
  }

  setOnlyInstallationNetwork() {
    setOnlyInstallationNetworkWithSidebar();
  }

  verifyDecryptDestructiveActions(destructiveActions: string[]) {
    verifyDecryptDestructiveActionsWithSidebar(destructiveActions);
  }

  ensureLandingOnOverview() {
    ensureLandingOnOverviewWithSidebar();
  }

  verifyStorageOutOfSync() {
    verifyStorageOutOfSyncWithSidebar();
  }
}
