import { IProductTestStrategy } from "../lib/product_strategy_factory";
import { setPermanentHostname } from "../checks/hostname";
import {
  verifyRegistrationWarniningAlerts,
  RegistrationOptions,
  enterProductRegistration,
  enterExtensionRegistrationHA,
  enterExtensionRegistrationPHub,
} from "../checks/registration";
import { disableEncryption, enableEncryption, verifyEncryptionEnabled } from "../checks/encryption";
import { createFirstUser } from "../checks/first_user";
import { editRootUser, verifyPasswordStrength } from "../checks/root_authentication";
import { finishInstallation, performInstallation } from "../checks/installation";
import { logInWithIncorrectPassword } from "../checks/login";
import { changeDiskToInstallTheSystem } from "../checks/storage_change_disk_to_install";
import { prepareDasdStorage } from "../checks/storage_dasd";
import { selectPatterns } from "../checks/software_selection";
import { changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSize } from "../checks/storage_change_root_partition";
import { prepareZfcpStorage } from "../checks/storage_zfcp";
import { ensureLandingOnOverview } from "../checks/overview";
import { selectMoreDevices } from "../checks/storage_select_installation_device";
import { setOnlyInstallationNetwork } from "../checks/network";
import { verifyDecryptDestructiveActions } from "../checks/storage_result_destructive_actions_planned";

export class ProductReleaseStrategy implements IProductTestStrategy {
  setPermanentHostname(hostname: string) {
    setPermanentHostname(hostname);
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
    createFirstUser(password);
  }

  editRootUser(password: string) {
    editRootUser(password);
  }

  performInstallation() {
    performInstallation();
  }

  logInWithIncorrectPassword() {
    logInWithIncorrectPassword();
  }

  finishInstallation() {
    finishInstallation();
  }

  changeDiskToInstallTheSystem() {
    changeDiskToInstallTheSystem();
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

  selectPatterns(patterns: string[]) {
    selectPatterns(patterns);
  }

  changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSize() {
    changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSize();
  }

  selectMoreDevices() {
    selectMoreDevices();
  }

  setOnlyInstallationNetwork() {
    setOnlyInstallationNetwork();
  }

  verifyDecryptDestructiveActions(destructiveActions: string[]) {
    verifyDecryptDestructiveActions(destructiveActions);
  }

  ensureLandingOnOverview() {
    ensureLandingOnOverview();
  }
}
