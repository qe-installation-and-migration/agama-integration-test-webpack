import { ProductReleaseStrategy } from "../variants/product_release_strategy";
import { StableReleaseStrategy } from "../variants/stable_release_strategy";
import { RegistrationOptions } from "../checks/registration";

export interface IProductTestStrategy {
  setPermanentHostname(hostname: string): void;
  verifyRegistrationWarniningAlerts(use_custom?: string, url?: string);
  enterProductRegistration({use_custom, code, provide_code, url}: RegistrationOptions): void;
  enableEncryption(password: string);
  verifyEncryptionEnabled();
  disableEncryption();
  enterExtensionRegistrationHA(code: string);
  enterExtensionRegistrationPHub();
  createFirstUser(password: string);
  editRootUser(password: string);
  performInstallation();
  logInWithIncorrectPassword();
  finishInstallation();
  changeDiskToInstallTheSystem();
  verifyPasswordStrength();
  prepareZfcpStorage();
  prepareDasdStorage();
  selectPatterns(patterns: string[]);
  changeFileSystemToBtrfsWithoutSnapshotsAndAdjustToMinSize();
  productSelectionWithLicense(productId: string);
  productSelection(productId: string);
  selectMoreDevices();
  setOnlyInstallationNetwork();
  verifyDecryptDestructiveActions(destructiveActions: string[]);
  ensureLandingOnOverview();
  verifyStorageOutOfSync();
}

// ts-prune-ignore-next
export class ProductStrategyFactory {
  public static create(productVersion: string, agamaVersion: string): IProductTestStrategy {
    if (productVersion === "16.1" && agamaVersion.includes("19")) {
      return new ProductReleaseStrategy();
    }
    return new StableReleaseStrategy();
  }
}
