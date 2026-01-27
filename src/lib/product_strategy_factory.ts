import { ProductReleaseStrategy } from "../variants/product_release_strategy";
import { StableReleaseStrategy } from "../variants/stable_release_strategy";
import { RegistrationOptions } from "../checks/registration";

export interface IProductTestStrategy {
  setPermanentHostname(hostname: string): void;
  verifyRegistrationWarniningAlerts(use_custom?: string, url?: string);
  enterProductRegistration({use_custom, code, provide_code, url}: RegistrationOptions): void;
  enableEncryption(password: string);
  overviewLanding();
  verifyEncryptionEnabled();
  disableEncryption();
  enterExtensionRegistrationHA(code: string);
  createFirstUser(password: string);
  editRootUser(password: string);
  performInstallation();
  logInWithIncorrectPassword();
  finishInstallation();
  changeDiskToInstallTheSystem();
  verifyPasswordStrength();
  prepareZfcpStorage();
  selectPatterns(patterns: string[]);
  verifyDecryptDestructiveActions(destructiveActions: string[]);
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
