#! /usr/bin/env node
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/checks/download_logs.ts":
/*!*************************************!*\
  !*** ./src/checks/download_logs.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.downloadLogs = downloadLogs;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const strict_1 = __importDefault(__webpack_require__(/*! node:assert/strict */ "node:assert/strict"));
const options_toggle_page_1 = __webpack_require__(/*! ../pages/options_toggle_page */ "./src/pages/options_toggle_page.ts");
const filePath = "/root/Downloads/agama-logs.tar.gz";
async function downloadLogs() {
    (0, helpers_1.it)(`should download logs`, async function () {
        await new options_toggle_page_1.OptionsTogglePage(helpers_1.page).downloadLogs();
        await (0, helpers_1.waitOnFile)(filePath);
        const fileSize = fs_1.default.statSync(filePath).size;
        (0, strict_1.default)(fileSize > 0, "Agama Logfile is empty.");
    });
}


/***/ }),

/***/ "./src/checks/encryption.ts":
/*!**********************************!*\
  !*** ./src/checks/encryption.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.enableEncryption = enableEncryption;
exports.verifyEncryptionEnabled = verifyEncryptionEnabled;
exports.disableEncryption = disableEncryption;
exports.enableEncryptionWithoutTabs = enableEncryptionWithoutTabs;
exports.verifyEncryptionEnabledWithoutTabs = verifyEncryptionEnabledWithoutTabs;
exports.disableEncryptionWithoutTabs = disableEncryptionWithoutTabs;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const encryption_settings_without_tabs_page_1 = __webpack_require__(/*! ../pages/encryption_settings_without_tabs_page */ "./src/pages/encryption_settings_without_tabs_page.ts");
const encryption_settings_page_1 = __webpack_require__(/*! ../pages/encryption_settings_page */ "./src/pages/encryption_settings_page.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
const storage_without_tabs_page_1 = __webpack_require__(/*! ../pages/storage_without_tabs_page */ "./src/pages/storage_without_tabs_page.ts");
const storage_settings_page_1 = __webpack_require__(/*! ../pages/storage_settings_page */ "./src/pages/storage_settings_page.ts");
const strict_1 = __importDefault(__webpack_require__(/*! node:assert/strict */ "node:assert/strict"));
function enableEncryption(password) {
    (0, helpers_1.it)("should enable encryption", async function () {
        const storageSettings = new storage_settings_page_1.StorageSettingsPage(helpers_1.page);
        const encryptionSettings = new encryption_settings_page_1.EncryptionSettingsPage(helpers_1.page);
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
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
function verifyEncryptionEnabled() {
    (0, helpers_1.it)("should verify that encryption is enabled", async function () {
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        const storageSettings = new storage_settings_page_1.StorageSettingsPage(helpers_1.page);
        await sidebar.goToStorage();
        await storageSettings.selectEncryption();
        const elementText = await (0, helpers_1.getTextContent)(storageSettings.encryptionIsEnabledText());
        strict_1.default.deepEqual(elementText, "Encryption is enabled");
    });
}
function disableEncryption() {
    (0, helpers_1.it)("should disable encryption", async function () {
        const storageSettings = new storage_settings_page_1.StorageSettingsPage(helpers_1.page);
        const encryptionSettings = new encryption_settings_page_1.EncryptionSettingsPage(helpers_1.page);
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        await sidebar.goToStorage();
        await storageSettings.selectEncryption();
        await storageSettings.changeEncryption();
        await encryptionSettings.unmarkEncryptTheSystem();
        await encryptionSettings.accept();
        const elementText = await (0, helpers_1.getTextContent)(storageSettings.encryptionIsDisabledText());
        strict_1.default.deepEqual(elementText, "Encryption is disabled");
    });
}
function enableEncryptionWithoutTabs(password) {
    (0, helpers_1.it)("should enable encryption", async function () {
        const storage = new storage_without_tabs_page_1.StorageWithoutTabsPage(helpers_1.page);
        const encryptionSettings = new encryption_settings_without_tabs_page_1.EncryptionSettingsWithoutTabsPage(helpers_1.page);
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        await sidebar.goToStorage();
        await storage.editEncryption();
        await encryptionSettings.checkEncryption();
        await encryptionSettings.fillPassword(password);
        await encryptionSettings.fillPasswordConfirmation(password);
        await encryptionSettings.accept();
        await storage.verifyEncryptionEnabled();
    });
}
function verifyEncryptionEnabledWithoutTabs() {
    (0, helpers_1.it)("should verify that encryption is enabled", async function () {
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        const storage = new storage_without_tabs_page_1.StorageWithoutTabsPage(helpers_1.page);
        await sidebar.goToStorage();
        await storage.verifyEncryptionEnabled();
    });
}
function disableEncryptionWithoutTabs() {
    (0, helpers_1.it)("should disable encryption", async function () {
        const storage = new storage_without_tabs_page_1.StorageWithoutTabsPage(helpers_1.page);
        const encryptionSettings = new encryption_settings_without_tabs_page_1.EncryptionSettingsWithoutTabsPage(helpers_1.page);
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        await sidebar.goToStorage();
        await storage.editEncryption();
        await encryptionSettings.uncheckEncryption();
        await encryptionSettings.accept();
        await storage.verifyEncryptionDisabled();
    });
}


/***/ }),

/***/ "./src/checks/first_user.ts":
/*!**********************************!*\
  !*** ./src/checks/first_user.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createFirstUser = createFirstUser;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const create_user_page_1 = __webpack_require__(/*! ../pages/create_user_page */ "./src/pages/create_user_page.ts");
const users_page_1 = __webpack_require__(/*! ../pages/users_page */ "./src/pages/users_page.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
function createFirstUser(password) {
    (0, helpers_1.it)("should create first user", async function () {
        const users = new users_page_1.UsersPage(helpers_1.page);
        const createFirstUser = new create_user_page_1.CreateFirstUserPage(helpers_1.page);
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        await sidebar.goToUsers();
        await users.defineAUserNow();
        await createFirstUser.fillFullName("Bernhard M. Wiedemann");
        await createFirstUser.fillUserName("bernhard");
        await createFirstUser.fillPassword(password);
        await createFirstUser.fillPasswordConfirmation(password);
        await createFirstUser.accept();
        // puppeteer goes too fast and screen is unresponsive after submit, a small delay helps
        await (0, helpers_1.sleep)(2000);
    });
}


/***/ }),

/***/ "./src/checks/hostname.ts":
/*!********************************!*\
  !*** ./src/checks/hostname.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setPermanentHostname = setPermanentHostname;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const hostname_page_1 = __webpack_require__(/*! ../pages/hostname_page */ "./src/pages/hostname_page.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
function setPermanentHostname(hostname) {
    (0, helpers_1.it)("should allow setting static hostname", async function () {
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        const hostnamePage = new hostname_page_1.HostnamePage(helpers_1.page);
        await sidebar.goToHostname();
        await hostnamePage.useStaticHostname();
        await hostnamePage.fill(hostname);
        await hostnamePage.accept();
    });
}


/***/ }),

/***/ "./src/checks/installation.ts":
/*!************************************!*\
  !*** ./src/checks/installation.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.performInstallation = performInstallation;
exports.checkInstallation = checkInstallation;
exports.finishInstallation = finishInstallation;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const confirm_installation_page_1 = __webpack_require__(/*! ../pages/confirm_installation_page */ "./src/pages/confirm_installation_page.ts");
const congratulation_page_1 = __webpack_require__(/*! ../pages/congratulation_page */ "./src/pages/congratulation_page.ts");
const overview_page_1 = __webpack_require__(/*! ../pages/overview_page */ "./src/pages/overview_page.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
const installation_page_1 = __webpack_require__(/*! ../pages/installation_page */ "./src/pages/installation_page.ts");
const strict_1 = __importDefault(__webpack_require__(/*! node:assert/strict */ "node:assert/strict"));
function performInstallation() {
    (0, helpers_1.it)("should start installation", async function () {
        const confirmInstallation = new confirm_installation_page_1.ConfirmInstallationPage(helpers_1.page);
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        await sidebar.goToOverview();
        await overview.install();
        await confirmInstallation.continue();
    });
}
function checkInstallation() {
    (0, helpers_1.it)("should check installation progress", async function () {
        const installation = new installation_page_1.InstallationPage(helpers_1.page);
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(installation.prepareDisksText()), "Prepare disks");
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(installation.installingSystemText()), "Installing the system, please wait...");
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(installation.installSoftwareText()), "Install software");
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(installation.configureTheSystemText()), "Configure the system");
    });
}
function finishInstallation() {
    (0, helpers_1.it)("should finish installation", async function () {
        const congratulation = new congratulation_page_1.CongratulationPage(helpers_1.page);
        await congratulation.wait(20 * 60 * 1000);
    }, 21 * 60 * 1000);
}


/***/ }),

/***/ "./src/checks/login.ts":
/*!*****************************!*\
  !*** ./src/checks/login.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logIn = logIn;
const strict_1 = __importDefault(__webpack_require__(/*! node:assert/strict */ "node:assert/strict"));
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const login_as_root_page_1 = __webpack_require__(/*! ../pages/login_as_root_page */ "./src/pages/login_as_root_page.ts");
function logIn(password) {
    (0, helpers_1.it)("should have Agama page title", async function () {
        strict_1.default.deepEqual(await helpers_1.page.title(), "Agama");
    });
    (0, helpers_1.it)("should allow logging in", async function () {
        const loginAsRoot = new login_as_root_page_1.LoginAsRootPage(helpers_1.page);
        await loginAsRoot.fillPassword(password);
        await loginAsRoot.logIn();
    });
}


/***/ }),

/***/ "./src/checks/product_selection.ts":
/*!*****************************************!*\
  !*** ./src/checks/product_selection.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.productSelection = productSelection;
exports.productSelectionWithLicense = productSelectionWithLicense;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const product_selection_page_1 = __webpack_require__(/*! ../pages/product_selection_page */ "./src/pages/product_selection_page.ts");
function productSelection(productId) {
    (0, helpers_1.it)(`should allow to select product ${productId}`, async function () {
        const productSelectionPage = new product_selection_page_1.ProductSelectionPage(helpers_1.page);
        await productSelectionPage.choose(productId);
        await productSelectionPage.select();
    });
}
function productSelectionWithLicense(productId) {
    (0, helpers_1.it)(`should allow to choose product ${productId}`, async function () {
        await new product_selection_page_1.ProductSelectionWithRegistrationPage(helpers_1.page).choose(productId);
    });
    (0, helpers_1.it)(`should allow to review its license`, async function () {
        const productSelectionWithRegistrationPage = new product_selection_page_1.ProductSelectionWithRegistrationPage(helpers_1.page);
        await productSelectionWithRegistrationPage.openLicense();
        await productSelectionWithRegistrationPage.verifyLicense();
        await productSelectionWithRegistrationPage.closeLicense();
    });
    (0, helpers_1.it)(`should allow to accept its license`, async function () {
        await new product_selection_page_1.ProductSelectionWithRegistrationPage(helpers_1.page).acceptProductLicense();
    });
    (0, helpers_1.it)(`should allow to select product`, async function () {
        await new product_selection_page_1.ProductSelectionWithRegistrationPage(helpers_1.page).select();
    });
}


/***/ }),

/***/ "./src/checks/registration.ts":
/*!************************************!*\
  !*** ./src/checks/registration.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.enterProductRegistration = enterProductRegistration;
exports.enterExtensionRegistrationHA = enterExtensionRegistrationHA;
exports.enterExtensionRegistrationPHub = enterExtensionRegistrationPHub;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const overview_page_1 = __webpack_require__(/*! ../pages/overview_page */ "./src/pages/overview_page.ts");
const product_registration_page_1 = __webpack_require__(/*! ../pages/product_registration_page */ "./src/pages/product_registration_page.ts");
const extension_registration_phub_page_1 = __webpack_require__(/*! ../pages/extension_registration_phub_page */ "./src/pages/extension_registration_phub_page.ts");
const extension_registration_ha_page_1 = __webpack_require__(/*! ../pages/extension_registration_ha_page */ "./src/pages/extension_registration_ha_page.ts");
const strict_1 = __importDefault(__webpack_require__(/*! node:assert/strict */ "node:assert/strict"));
const trust_registration_certificate_page_1 = __webpack_require__(/*! ../pages/trust_registration_certificate_page */ "./src/pages/trust_registration_certificate_page.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
function enterProductRegistration({ use_custom, code, provide_code, url, }) {
    (0, helpers_1.it)("should allow setting registration", async function () {
        const sidebar = new sidebar_page_1.SidebarWithRegistrationPage(helpers_1.page);
        const productRegistration = new product_registration_page_1.ProductRegistrationPage(helpers_1.page);
        await sidebar.goToRegistration();
        if (use_custom) {
            if (url) {
                const customRegistration = new product_registration_page_1.CustomRegistrationPage(helpers_1.page);
                await customRegistration.selectCustomRegistrationServer();
                await customRegistration.fillServerUrl(url);
            }
            if (provide_code) {
                await productRegistration.selectProvideRegistrationCode();
                await productRegistration.fillCode(code);
            }
        }
        else {
            await productRegistration.fillCode(code);
        }
        await productRegistration.register();
    });
    if (url?.startsWith("https")) {
        (0, helpers_1.it)("should handle HTTPS certificate trust for custom registration server", async function () {
            const trustRegistration = new trust_registration_certificate_page_1.TrustRegistrationCertificatePage(helpers_1.page);
            strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(trustRegistration.titleText()), "Registration certificate");
            strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(trustRegistration.questionText()), "Trying to import a self signed certificate. Do you want to trust it and register the product?");
            strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(trustRegistration.issuerText()), "RMT Certificate Authority");
            strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(trustRegistration.urlText(url)), url);
            await trustRegistration.trustCertificate();
        });
    }
    (0, helpers_1.it)("should display product has been registered", async function () {
        await new overview_page_1.OverviewPage(helpers_1.page).waitVisible(60000);
        const sidebar = new sidebar_page_1.SidebarWithRegistrationPage(helpers_1.page);
        const productRegistration = new product_registration_page_1.ProductRegistrationPage(helpers_1.page);
        await sidebar.goToRegistration();
        await productRegistration.verifyCustomRegistration();
    });
}
function enterExtensionRegistrationHA(code) {
    (0, helpers_1.it)("should allow registering HA extension", async function () {
        const sidebar = new sidebar_page_1.SidebarWithRegistrationPage(helpers_1.page);
        const extensionRegistrationHA = new extension_registration_ha_page_1.ExtensionRegistrationHAPage(helpers_1.page);
        await sidebar.goToRegistration();
        await extensionRegistrationHA.fillCode(code);
        await extensionRegistrationHA.register();
        strict_1.default.match(await (0, helpers_1.getTextContent)(extensionRegistrationHA.extensionRegisteredText()), /The extension has been registered/);
    });
}
function enterExtensionRegistrationPHub() {
    (0, helpers_1.it)("should allow registering Package Hub extension", async function () {
        const sidebar = new sidebar_page_1.SidebarWithRegistrationPage(helpers_1.page);
        const extensionRegistrationPHub = new extension_registration_phub_page_1.ExtensionRegistrationPHubPage(helpers_1.page);
        await sidebar.goToRegistration();
        await extensionRegistrationPHub.register();
        strict_1.default.match(await (0, helpers_1.getTextContent)(extensionRegistrationPHub.trustKeyText()), /is unknown. Do you want to trust this key?/);
        await extensionRegistrationPHub.trustKey();
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(extensionRegistrationPHub.registeredText()), "The extension was registered without any registration code.");
    });
}


/***/ }),

/***/ "./src/checks/root_authentication.ts":
/*!*******************************************!*\
  !*** ./src/checks/root_authentication.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.editRootUser = editRootUser;
exports.verifyPasswordStrength = verifyPasswordStrength;
exports.verifyPasswordStrengthWithoutTabs = verifyPasswordStrengthWithoutTabs;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const root_authentication_methods_1 = __webpack_require__(/*! ../pages/root_authentication_methods */ "./src/pages/root_authentication_methods.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
const users_page_1 = __webpack_require__(/*! ../pages/users_page */ "./src/pages/users_page.ts");
const strict_1 = __importDefault(__webpack_require__(/*! node:assert/strict */ "node:assert/strict"));
function editRootUser(password) {
    (0, helpers_1.it)("should edit the root user", async function () {
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        const users = new users_page_1.UsersPage(helpers_1.page);
        const setARootPassword = new root_authentication_methods_1.SetARootPasswordPage(helpers_1.page);
        await sidebar.goToUsers();
        await users.editRootUser();
        await setARootPassword.usePassword();
        await setARootPassword.fillPassword(password);
        await setARootPassword.fillPasswordConfirmation(password);
        await setARootPassword.accept();
        // puppeteer goes too fast and screen is unresponsive after submit, a small delay helps
        await (0, helpers_1.sleep)(2000);
    });
}
function verifyPasswordStrength() {
    (0, helpers_1.it)("should verify the strength of typed password", async function () {
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        const users = new users_page_1.UsersPage(helpers_1.page);
        const setARootPassword = new root_authentication_methods_1.SetARootPasswordPage(helpers_1.page);
        await sidebar.goToUsers();
        await users.editRootUser();
        await setARootPassword.fillPassword("a23b56c");
        const elementTextPasswordLess8Characters = await (0, helpers_1.getTextContent)(setARootPassword.alertPasswordLess8Characters());
        strict_1.default.deepEqual(elementTextPasswordLess8Characters, "The password is shorter than 8 characters");
        await setARootPassword.fillPassword("a23b56ca");
        const elementTextPasswordIsWeak = await (0, helpers_1.getTextContent)(setARootPassword.alertPasswordIsWeak());
        strict_1.default.deepEqual(elementTextPasswordIsWeak, "The password is weak");
        await setARootPassword.fillPassword("a23b5678");
        const elementTextPasswordFailDictionary = await (0, helpers_1.getTextContent)(setARootPassword.alertPasswordFailDictionaryCheck());
        strict_1.default.deepEqual(elementTextPasswordFailDictionary, "The password fails the dictionary check - it is too simplistic/systematic");
    });
}
function verifyPasswordStrengthWithoutTabs() {
    (0, helpers_1.it)("should verify the strength of typed password", async function () {
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        const users = new users_page_1.UsersPage(helpers_1.page);
        const setARootPassword = new root_authentication_methods_1.SetARootPasswordPage(helpers_1.page);
        await sidebar.goToUsers();
        await users.editRootUser();
        await setARootPassword.fillPassword("a23b56c");
        const elementTextPasswordLess8Characters = await (0, helpers_1.getTextContent)(setARootPassword.alertPasswordLess8Characters());
        strict_1.default.deepEqual(elementTextPasswordLess8Characters, "Warning alert:The password is shorter than 8 characters");
        await setARootPassword.fillPassword("a23b56ca");
        const elementTextPasswordIsWeak = await (0, helpers_1.getTextContent)(setARootPassword.alertPasswordIsWeak());
        strict_1.default.deepEqual(elementTextPasswordIsWeak, "Warning alert:The password is weak");
        await setARootPassword.fillPassword("a23b5678");
        const elementTextPasswordFailDictionary = await (0, helpers_1.getTextContent)(setARootPassword.alertPasswordFailDictionaryCheck());
        strict_1.default.deepEqual(elementTextPasswordFailDictionary, "Warning alert:The password fails the dictionary check - it is too simplistic/systematic");
    });
}


/***/ }),

/***/ "./src/checks/storage_result_destructive_actions_planned.ts":
/*!******************************************************************!*\
  !*** ./src/checks/storage_result_destructive_actions_planned.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.verifyDecryptDestructiveActions = verifyDecryptDestructiveActions;
exports.verifyDecryptDestructiveActionsWithoutTabs = verifyDecryptDestructiveActionsWithoutTabs;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
const storage_result_page_1 = __webpack_require__(/*! ../pages/storage_result_page */ "./src/pages/storage_result_page.ts");
const storage_without_tabs_page_1 = __webpack_require__(/*! ../pages/storage_without_tabs_page */ "./src/pages/storage_without_tabs_page.ts");
function verifyDecryptDestructiveActions(destructiveActions) {
    (0, helpers_1.it)("should display a list of destructive actions", async function () {
        await new sidebar_page_1.SidebarPage(helpers_1.page).goToStorage();
        const storage = new storage_result_page_1.StorageResultPage(helpers_1.page);
        await storage.scrollToDestructiveActionsList();
        for (const action of destructiveActions) {
            await storage.destructiveActionText(action).wait();
        }
    });
}
function verifyDecryptDestructiveActionsWithoutTabs(destructiveActions) {
    (0, helpers_1.it)("should display a list of destructive actions", async function () {
        await new sidebar_page_1.SidebarPage(helpers_1.page).goToStorage();
        const storage = new storage_without_tabs_page_1.StorageWithoutTabsPage(helpers_1.page);
        storage.expandDestructiveActionsList();
        for (const action of destructiveActions) {
            await storage.verifyDestructiveAction(action);
        }
    });
}


/***/ }),

/***/ "./src/checks/storage_zfcp.ts":
/*!************************************!*\
  !*** ./src/checks/storage_zfcp.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.prepareZfcpStorage = prepareZfcpStorage;
exports.prepareZfcpStorageWithoutTabs = prepareZfcpStorageWithoutTabs;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
const storage_settings_page_1 = __webpack_require__(/*! ../pages/storage_settings_page */ "./src/pages/storage_settings_page.ts");
const storage_without_tabs_page_1 = __webpack_require__(/*! ../pages/storage_without_tabs_page */ "./src/pages/storage_without_tabs_page.ts");
const zfcp_page_1 = __webpack_require__(/*! ../pages/zfcp_page */ "./src/pages/zfcp_page.ts");
function prepareZfcpStorage() {
    (0, helpers_1.it)("should prepare zFCP storage", async function () {
        const storage = new storage_settings_page_1.StorageSettingsPage(helpers_1.page);
        const zfcp = new zfcp_page_1.ZfcpPage(helpers_1.page);
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        await sidebar.goToStorage();
        await storage.activateZfcp();
        await zfcp.activateDevice("0.0.fa00");
        await zfcp.activateDevice("0.0.fc00");
        await zfcp.back();
        await zfcp.activateMultipath();
        // Workaround to wait for page to load, sometimes workers take more than 60 seconds to load storage
        await storage.waitForElement("::-p-text(Activate zFCP disks)", 80000);
    }, 3 * 60 * 1000);
}
function prepareZfcpStorageWithoutTabs() {
    (0, helpers_1.it)("should prepare zFCP storage", async function () {
        const storage = new storage_without_tabs_page_1.StorageWithoutTabsPage(helpers_1.page);
        const zfcp = new zfcp_page_1.ZfcpPage(helpers_1.page);
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        await sidebar.goToStorage();
        await storage.activateZfcp();
        await zfcp.activateDevice("0.0.fa00");
        await zfcp.activateDevice("0.0.fc00");
        await zfcp.back();
        await zfcp.activateMultipath();
        // Workaround to wait for page to load, sometimes workers take more than 60 seconds to load storage
        await storage.waitForElement("::-p-text(Activate zFCP disks)", 80000);
    }, 3 * 60 * 1000);
}


/***/ }),

/***/ "./src/lib/cmdline.ts":
/*!****************************!*\
  !*** ./src/lib/cmdline.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.commaSeparatedList = commaSeparatedList;
exports.parse = parse;
const commander_1 = __webpack_require__(/*! commander */ "./node_modules/commander/index.js");
const commander = __importStar(__webpack_require__(/*! commander */ "./node_modules/commander/index.js"));
const helpers_1 = __webpack_require__(/*! ./helpers */ "./src/lib/helpers.ts");
// parse command line argument as an integer
function getInt(value) {
    // parse the value as a decimal number (base 10)
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) {
        throw new commander.InvalidArgumentError("Enter a valid number.");
    }
    return parsed;
}
function commaSeparatedList(value) {
    return value.split(',');
}
/**
 * Parse command line options. When an invalid command line option is used the script aborts.
 * @param callback callback for adding custom command line options
 * @returns [commander.OptionValues] parsed command line
 * @see https://github.com/tj/commander.js
 */
function parse(callback) {
    // define the command line arguments and parse them
    const prg = commander_1.program
        .description("Run a simple Agama integration test")
        .option("-u, --url <url>", "Agama server URL", "http://localhost")
        .option("-p, --password <password>", "Agama login password", "linux")
        .option("-a, --agama-version <version>", "Agama package version")
        .option("-v, --product-version <version>", "Product version")
        .addOption(new commander_1.Option("-b, --browser <browser>", "Browser used for running the test")
        .choices(["firefox", "chrome", "chromium"])
        .default("firefox"))
        .option("-r, --root-password <password>", "Target root login password", "linux")
        .option("-h, --headed", "Run the browser in headed mode with UI (the default is headless mode)")
        .addOption(new commander_1.Option("-d, --delay <miliseconds>", "Delay between the browser actions, useful in headed mode")
        .argParser(getInt)
        .default(0))
        .option("-c, --continue", "Continue the test after a failure (the default is abort on error)", false);
    if (callback)
        callback(prg);
    prg.parse(process.argv);
    (0, helpers_1.setContinueOnError)(commander_1.program.opts().continue);
    // parse options from the command line
    return commander_1.program.opts();
}


/***/ }),

/***/ "./src/lib/helpers.ts":
/*!****************************!*\
  !*** ./src/lib/helpers.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.page = void 0;
exports.test_init = test_init;
exports.setContinueOnError = setContinueOnError;
exports.it = it;
exports.sleep = sleep;
exports.getTextContent = getTextContent;
exports.waitOnFile = waitOnFile;
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const http_1 = __importDefault(__webpack_require__(/*! http */ "http"));
const https_1 = __importDefault(__webpack_require__(/*! https */ "https"));
const zlib_1 = __importDefault(__webpack_require__(/*! zlib */ "zlib"));
const wait_on_1 = __importDefault(__webpack_require__(/*! wait-on */ "./node_modules/wait-on/lib/wait-on.js"));
const puppeteer = __importStar(__webpack_require__(/*! puppeteer-core */ "./node_modules/puppeteer-core/lib/cjs/puppeteer/puppeteer-core.js"));
// see https://nodejs.org/docs/latest-v20.x/api/test.html
const node_test_1 = __webpack_require__(/*! node:test */ "node:test");
let browser;
let url;
// directory for storing the dumped data after a failure
const dir = "log";
// helper function for configuring the browser
function browserSettings(name) {
    switch (name.toLowerCase()) {
        case "firefox":
            return {
                product: "firefox",
                executablePath: "/usr/bin/firefox",
            };
        case "chrome":
            return {
                product: "chrome",
                executablePath: "/usr/bin/google-chrome-stable",
            };
        case "chromium":
            return {
                product: "chrome",
                executablePath: "/usr/bin/chromium",
            };
        default:
            throw new Error(`Unsupported browser type: ${name}`);
    }
}
async function startBrowser(headless, slowMo, agamaBrowser, agamaServer) {
    url = agamaServer;
    browser = await puppeteer.launch({
        // "webDriverBiDi" does not work with old FireFox, comment it out if needed
        protocol: "webDriverBiDi",
        headless,
        ignoreHTTPSErrors: true,
        timeout: 30000,
        slowMo,
        defaultViewport: {
            width: 1280,
            height: 800,
        },
        ...browserSettings(agamaBrowser),
    });
    exports.page = await browser.newPage();
    exports.page.setDefaultTimeout(20000);
    await exports.page.goto(agamaServer, {
        timeout: 60000,
        waitUntil: "domcontentloaded",
    });
    return { page: exports.page, browser };
}
async function finishBrowser() {
    if (exports.page)
        await exports.page.close();
    if (browser)
        await browser.close();
}
function test_init(options) {
    (0, node_test_1.before)(async function () {
        ({ page: exports.page } = await startBrowser(!options.headed, options.delay, options.browser, options.url));
    });
    (0, node_test_1.after)(async function () {
        await finishBrowser();
    });
}
let failed = false;
let continueOnError = false;
function setContinueOnError(enabled) {
    continueOnError = enabled;
}
// helper function, dump the index.css file so the HTML dump can properly displayed
async function dumpCSS() {
    const cssData = [];
    const downloader = url.startsWith("https://") ? https_1.default : http_1.default;
    return new Promise((resolve, reject) => {
        downloader
            .get(url + "/index.css", {
            // ignore HTTPS errors (self-signed certificate)
            rejectUnauthorized: false,
            // use gzip compression
            headers: { "Accept-Encoding": "gzip" },
        }, (res) => {
            res.on("data", (chunk) => {
                cssData.push(Buffer.from(chunk, "binary"));
            });
            res.on("end", () => {
                // merge all chunks
                const data = Buffer.concat(cssData);
                const cssFile = dir + "/index.css";
                if (res.headers["content-encoding"] === "gzip") {
                    zlib_1.default.gunzip(data, (err, unpacked) => {
                        if (err) {
                            console.error("Cannot decompress index.css: ", err.cause);
                            reject(err.cause);
                        }
                        else {
                            fs_1.default.writeFileSync(cssFile, unpacked);
                            resolve(cssFile);
                        }
                    });
                }
                else {
                    fs_1.default.writeFileSync(cssFile, data);
                    resolve(cssFile);
                }
            });
        })
            .on("error", (e) => {
            console.error("Cannot download index.css: ", e);
            reject(e);
        });
    });
}
// dump the current page displayed in puppeteer
async function dumpPage(label) {
    // base file name for the dumps
    const name = path_1.default.join(dir, label.replace(/[^a-zA-Z0-9]/g, "_"));
    await exports.page.screenshot({ path: name + ".png" });
    const html = await exports.page.content();
    fs_1.default.writeFileSync(name + ".html", html);
}
// define it() as a wrapper which dumps the page on a failure
async function it(label, test, timeout) {
    (0, node_test_1.it)(label, 
    // abort when the test takes more than one minute
    { timeout: timeout || 60000 }, async (t) => {
        try {
            // do not run any test after first failure
            if (failed)
                t.skip();
            else
                await test();
        }
        catch (error) {
            // remember the failure for the next tests
            if (!continueOnError)
                failed = true;
            if (exports.page) {
                // dump the current page
                if (!fs_1.default.existsSync(dir))
                    fs_1.default.mkdirSync(dir);
                // dump the page and the CSS in parallel
                await Promise.allSettled([dumpPage(label), dumpCSS()]);
            }
            throw new Error("Test failed!", { cause: error });
        }
    });
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function getTextContent(locator) {
    return locator.map((element) => element.textContent).wait();
}
async function waitOnFile(filePath) {
    const opts = {
        resources: [filePath],
        interval: 100,
        timeout: 20000,
        window: 1000,
    };
    try {
        await (0, wait_on_1.default)(opts);
    }
    catch (error) {
        throw new Error("waitOnFile failed!", { cause: error });
    }
}
;


/***/ }),

/***/ "./src/lib/product_strategy_factory.ts":
/*!*********************************************!*\
  !*** ./src/lib/product_strategy_factory.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductStrategyFactory = void 0;
const pre_release_strategy_1 = __webpack_require__(/*! ../variants/pre_release_strategy */ "./src/variants/pre_release_strategy.ts");
const stable_release_strategy_1 = __webpack_require__(/*! ../variants/stable_release_strategy */ "./src/variants/stable_release_strategy.ts");
class ProductStrategyFactory {
    static create(agamaVersion) {
        if (agamaVersion.includes("pre")) {
            return new pre_release_strategy_1.PreReleaseStrategy();
        }
        return new stable_release_strategy_1.StableReleaseStrategy();
    }
}
exports.ProductStrategyFactory = ProductStrategyFactory;


/***/ }),

/***/ "./src/pages/confirm_installation_page.ts":
/*!************************************************!*\
  !*** ./src/pages/confirm_installation_page.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfirmInstallationPage = void 0;
class ConfirmInstallationPage {
    page;
    continueButton = () => this.page.locator("button::-p-text('Continue')");
    constructor(page) {
        this.page = page;
    }
    async continue() {
        await this.continueButton().click();
    }
}
exports.ConfirmInstallationPage = ConfirmInstallationPage;


/***/ }),

/***/ "./src/pages/congratulation_page.ts":
/*!******************************************!*\
  !*** ./src/pages/congratulation_page.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CongratulationPage = void 0;
class CongratulationPage {
    page;
    congratulationText = () => this.page.locator("::-p-text('Congratulations!')");
    constructor(page) {
        this.page = page;
    }
    async wait(timeout) {
        await this.congratulationText().setTimeout(timeout).wait();
    }
}
exports.CongratulationPage = CongratulationPage;


/***/ }),

/***/ "./src/pages/create_user_page.ts":
/*!***************************************!*\
  !*** ./src/pages/create_user_page.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateFirstUserPage = void 0;
class CreateFirstUserPage {
    page;
    fullNameInput = () => this.page.locator("input#userFullName");
    usernameInput = () => this.page.locator("input#userName");
    passwordInput = () => this.page.locator("input#password");
    passwordConfirmationInput = () => this.page.locator("input#passwordConfirmation");
    acceptButton = () => this.page.locator("button[form='firstUserForm']");
    constructor(page) {
        this.page = page;
    }
    async fillFullName(fullName) {
        await this.fullNameInput().fill(fullName);
    }
    async fillUserName(userName) {
        await this.usernameInput().fill(userName);
    }
    async fillPassword(password) {
        await this.passwordInput().fill(password);
    }
    async fillPasswordConfirmation(password) {
        await this.passwordConfirmationInput().fill(password);
    }
    async accept() {
        await this.acceptButton().click();
    }
}
exports.CreateFirstUserPage = CreateFirstUserPage;


/***/ }),

/***/ "./src/pages/encryption_settings_page.ts":
/*!***********************************************!*\
  !*** ./src/pages/encryption_settings_page.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EncryptionSettingsPage = void 0;
class EncryptionSettingsPage {
    page;
    encryptTheSystemCheckedCheckbox = () => this.page.locator("::-p-aria(Encrypt the system)[type=checkbox]:checked");
    encryptTheSystemNotCheckedCheckbox = () => this.page.locator("::-p-aria(Encrypt the system)[type=checkbox]:not(:checked)");
    passwordInput = () => this.page.locator("#password");
    passwordConfirmationInput = () => this.page.locator("#passwordConfirmation");
    acceptButton = () => this.page.locator("button::-p-text(Accept)");
    constructor(page) {
        this.page = page;
    }
    async markEncryptTheSystem() {
        await this.encryptTheSystemNotCheckedCheckbox().click();
        await this.encryptTheSystemCheckedCheckbox().wait();
    }
    async unmarkEncryptTheSystem() {
        await this.encryptTheSystemCheckedCheckbox().click();
        await this.encryptTheSystemNotCheckedCheckbox().wait();
    }
    async fillPassword(password) {
        await this.passwordInput().fill(password);
    }
    async fillPasswordConfirmation(password) {
        await this.passwordConfirmationInput().fill(password);
    }
    async accept() {
        await this.acceptButton().click();
    }
}
exports.EncryptionSettingsPage = EncryptionSettingsPage;


/***/ }),

/***/ "./src/pages/encryption_settings_without_tabs_page.ts":
/*!************************************************************!*\
  !*** ./src/pages/encryption_settings_without_tabs_page.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EncryptionSettingsWithoutTabsPage = void 0;
class EncryptionSettingsWithoutTabsPage {
    page;
    encryptTheSystemCheckedCheckbox = () => this.page.locator("::-p-aria(Encrypt the system)[type=checkbox]:checked");
    encryptTheSystemNotCheckedCheckbox = () => this.page.locator("::-p-aria(Encrypt the system)[type=checkbox]:not(:checked)");
    passwordInput = () => this.page.locator("#password");
    passwordConfirmationInput = () => this.page.locator("#passwordConfirmation");
    acceptButton = () => this.page.locator("button::-p-text(Accept)");
    constructor(page) {
        this.page = page;
    }
    async checkEncryption() {
        await this.encryptTheSystemNotCheckedCheckbox().click();
        await this.encryptTheSystemCheckedCheckbox().wait();
    }
    async uncheckEncryption() {
        await this.encryptTheSystemCheckedCheckbox().click();
        await this.encryptTheSystemNotCheckedCheckbox().wait();
    }
    async fillPassword(password) {
        await this.passwordInput().fill(password);
    }
    async fillPasswordConfirmation(password) {
        await this.passwordConfirmationInput().fill(password);
    }
    async accept() {
        await this.acceptButton().click();
    }
}
exports.EncryptionSettingsWithoutTabsPage = EncryptionSettingsWithoutTabsPage;


/***/ }),

/***/ "./src/pages/extension_registration_ha_page.ts":
/*!*****************************************************!*\
  !*** ./src/pages/extension_registration_ha_page.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtensionRegistrationHAPage = void 0;
class ExtensionRegistrationHAPage {
    page;
    codeInput = () => this.page.locator("::-p-aria(Registration code)[type='password']");
    registerButton = () => this.page.locator("[id*='register-button-sle-ha']");
    extensionRegisteredText = () => this.page.locator("::-p-text(The extension has been registered)");
    constructor(page) {
        this.page = page;
    }
    async fillCode(code) {
        await this.codeInput().fill(code);
    }
    async register() {
        await this.registerButton().click();
    }
}
exports.ExtensionRegistrationHAPage = ExtensionRegistrationHAPage;


/***/ }),

/***/ "./src/pages/extension_registration_phub_page.ts":
/*!*******************************************************!*\
  !*** ./src/pages/extension_registration_phub_page.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtensionRegistrationPHubPage = void 0;
class ExtensionRegistrationPHubPage {
    page;
    registerButton = () => this.page.locator("[id*='register-button-PackageHub']");
    registeredText = () => this.page.locator("::-p-text(The extension was registered without any registration code)");
    trustKeyText = () => this.page.locator("::-p-text(Do you want to trust this key?)");
    trustKeyButton = () => this.page.locator("::-p-text(Trust)");
    constructor(page) {
        this.page = page;
    }
    async register() {
        await this.registerButton().click();
    }
    async trustKey() {
        await this.trustKeyButton().click();
    }
}
exports.ExtensionRegistrationPHubPage = ExtensionRegistrationPHubPage;


/***/ }),

/***/ "./src/pages/hostname_page.ts":
/*!************************************!*\
  !*** ./src/pages/hostname_page.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HostnamePage = void 0;
class HostnamePage {
    page;
    useStaticHostnameToggle = () => this.page.locator("input#hostname");
    hostnameInput = () => this.page.locator("::-p-aria(Static hostname)");
    acceptButton = () => this.page.locator("::-p-text(Accept)");
    constructor(page) {
        this.page = page;
    }
    async useStaticHostname() {
        await this.useStaticHostnameToggle().click();
    }
    async fill(hostname) {
        await this.hostnameInput().fill(hostname);
    }
    async accept() {
        await this.acceptButton().click();
    }
}
exports.HostnamePage = HostnamePage;


/***/ }),

/***/ "./src/pages/installation_page.ts":
/*!****************************************!*\
  !*** ./src/pages/installation_page.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InstallationPage = void 0;
class InstallationPage {
    page;
    prepareDisksText = () => this.page.locator("::-p-text(Prepare disks)");
    installingSystemText = () => this.page.locator(`::-p-text(Installing the system, please wait...)`);
    installSoftwareText = () => this.page.locator(`::-p-text(Install software)`);
    configureTheSystemText = () => this.page.locator(`::-p-text(Configure the system)`);
    constructor(page) {
        this.page = page;
    }
}
exports.InstallationPage = InstallationPage;


/***/ }),

/***/ "./src/pages/login_as_root_page.ts":
/*!*****************************************!*\
  !*** ./src/pages/login_as_root_page.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginAsRootPage = void 0;
class LoginAsRootPage {
    page;
    passwordInput = () => this.page.locator("input#password");
    logInButton = () => this.page.locator("button[type='submit']");
    constructor(page) {
        this.page = page;
    }
    async fillPassword(password) {
        await this.passwordInput().fill(password);
    }
    async logIn() {
        await this.logInButton().click();
    }
}
exports.LoginAsRootPage = LoginAsRootPage;


/***/ }),

/***/ "./src/pages/options_toggle_page.ts":
/*!******************************************!*\
  !*** ./src/pages/options_toggle_page.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OptionsTogglePage = void 0;
class OptionsTogglePage {
    page;
    optionsToggle = () => this.page.locator("::-p-aria(Options toggle)");
    downloadLogsMenuItem = () => this.page.locator("::-p-aria(Download logs)");
    constructor(page) {
        this.page = page;
    }
    async downloadLogs() {
        await this.optionsToggle().click();
        await this.downloadLogsMenuItem().click();
    }
}
exports.OptionsTogglePage = OptionsTogglePage;


/***/ }),

/***/ "./src/pages/overview_page.ts":
/*!************************************!*\
  !*** ./src/pages/overview_page.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OverviewPage = void 0;
class OverviewPage {
    page;
    installButton = () => this.page.locator("button::-p-text(Install)");
    overviewHeading = () => this.page.locator('::-p-aria([name="Overview"][role="heading"])');
    constructor(page) {
        this.page = page;
    }
    async waitVisible(timeout) {
        await this.overviewHeading().setTimeout(timeout).wait();
    }
    async install() {
        await this.installButton().click();
    }
}
exports.OverviewPage = OverviewPage;


/***/ }),

/***/ "./src/pages/product_registration_page.ts":
/*!************************************************!*\
  !*** ./src/pages/product_registration_page.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomRegistrationPage = exports.ProductRegistrationPage = void 0;
const strict_1 = __importDefault(__webpack_require__(/*! node:assert/strict */ "node:assert/strict"));
class RegistrationBasePage {
    page;
    codeInput = () => this.page.locator("::-p-aria(Registration code)[type='password']");
    infoHasBeenRegisteredText = () => this.page.locator("::-p-text(has been registered with below information)");
    registerButton = () => this.page.locator("::-p-aria(Register)");
    registrationOptionCheckbox = () => this.page.locator("::-p-aria(Provide registration code)");
    constructor(page) {
        this.page = page;
    }
    async selectProvideRegistrationCode() {
        await this.registrationOptionCheckbox().click();
    }
    async fillCode(code) {
        await this.codeInput().fill(code);
    }
    async register() {
        await this.registerButton().click();
    }
    async verifyCustomRegistration() {
        const elementText = await this.infoHasBeenRegisteredText()
            .map((span) => span.textContent)
            .wait();
        await strict_1.default.match(elementText, /SUSE Linux Enterprise Server.*has been registered with below information/);
    }
}
function CustomRegistrable(Base) {
    return class extends Base {
        registrationServerButton = () => this.page.locator("::-p-aria(Registration server)");
        registrationServerCustomOption = () => this.page.locator("::-p-aria(Custom Register using a custom registration server)");
        serverUrlTextbox = () => this.page.locator("::-p-aria(Server URL)[type='text']");
        provideRegistrationCodeCheckbox = () => this.page.locator("::-p-aria(Provide registration code)");
        async provideRegistrationCode() {
            await this.provideRegistrationCodeCheckbox().click();
        }
        async selectCustomRegistrationServer() {
            await this.registrationServerButton().click();
            await this.registrationServerCustomOption().wait();
            await this.registrationServerCustomOption().click();
        }
        async fillServerUrl(url) {
            await this.serverUrlTextbox().wait();
            await this.serverUrlTextbox().fill(url);
        }
    };
}
class ProductRegistrationPage extends RegistrationBasePage {
}
exports.ProductRegistrationPage = ProductRegistrationPage;
class CustomRegistrationPage extends CustomRegistrable(RegistrationBasePage) {
}
exports.CustomRegistrationPage = CustomRegistrationPage;


/***/ }),

/***/ "./src/pages/product_selection_page.ts":
/*!*********************************************!*\
  !*** ./src/pages/product_selection_page.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductSelectionWithRegistrationPage = exports.ProductSelectionPage = void 0;
class ProductSelectionPage {
    page;
    productText = (name) => this.page.locator(`::-p-text(${name})`);
    productId = (id) => this.page.locator("input#" + id.replaceAll(".", "\\."));
    selectButton = () => this.page.locator("button[form='productSelectionForm']");
    constructor(page) {
        this.page = page;
    }
    async choose(id) {
        (await this.productId(id).waitHandle()).scrollIntoView();
        await this.productId(id).click();
    }
    async select() {
        await this.selectButton().click();
    }
    async selectByName(name) {
        await this.choose(name);
        await this.selectButton().click();
    }
}
exports.ProductSelectionPage = ProductSelectionPage;
function LicenseAcceptable(Base) {
    return class extends Base {
        licenseAcceptanceCheckbox = () => this.page.locator("::-p-text(I have read and)");
        licenseOpenButton = () => this.page.locator("::-p-text(license)");
        licenseCloseButton = () => this.page.locator("::-p-text(Close)");
        licenseText = () => this.page.locator("::-p-text(End User License Agreement)");
        async acceptLicense() {
            await this.licenseAcceptanceCheckbox().click();
        }
        async openLicense() {
            await this.licenseOpenButton().click();
        }
        async verifyLicense() {
            await this.licenseText().wait();
        }
        async closeLicense() {
            await this.licenseCloseButton().click();
        }
        async acceptProductLicense() {
            await this.acceptLicense();
        }
    };
}
class ProductSelectionWithRegistrationPage extends LicenseAcceptable(ProductSelectionPage) {
}
exports.ProductSelectionWithRegistrationPage = ProductSelectionWithRegistrationPage;


/***/ }),

/***/ "./src/pages/root_authentication_methods.ts":
/*!**************************************************!*\
  !*** ./src/pages/root_authentication_methods.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SetARootPasswordPage = void 0;
class SetARootPasswordPage {
    page;
    acceptText = () => this.page.locator("button::-p-text(Accept)");
    confirmText = () => this.page.locator("button::-p-text(Confirm)");
    passwordInput = () => this.page.locator("input#password");
    passwordConfirmationInput = () => this.page.locator("input#passwordConfirmation");
    alertPasswordLess8Characters = () => this.page.locator("::-p-text(The password is shorter than 8 characters)");
    alertPasswordIsWeak = () => this.page.locator("::-p-text(The password is weak)");
    alertPasswordFailDictionaryCheck = () => this.page.locator("::-p-text(it is too simplistic/systematic)");
    usePasswordToggle = () => this.page.locator("::-p-text(Use password)");
    constructor(page) {
        this.page = page;
    }
    async accept() {
        await this.acceptText().click();
    }
    async confirm() {
        await this.confirmText().click();
    }
    async fillPassword(password) {
        await this.passwordInput().fill(password);
    }
    async fillPasswordConfirmation(password) {
        await this.passwordConfirmationInput().fill(password);
    }
    async usePassword() {
        await this.usePasswordToggle().click();
    }
}
exports.SetARootPasswordPage = SetARootPasswordPage;


/***/ }),

/***/ "./src/pages/sidebar_page.ts":
/*!***********************************!*\
  !*** ./src/pages/sidebar_page.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SidebarWithRegistrationPage = exports.SidebarPage = void 0;
class SidebarPage {
    page;
    overviewLink = () => this.page.locator("a[href='#/overview']");
    hostnameLink = () => this.page.locator("a[href='#/hostname']");
    localizationLink = () => this.page.locator("a[href='#/l10n']");
    networkLink = () => this.page.locator("a[href='#/network']");
    storageLink = () => this.page.locator("a[href='#/storage']");
    softwareLink = () => this.page.locator("a[href='#/software']");
    usersLink = () => this.page.locator("a[href='#/users']");
    constructor(page) {
        this.page = page;
    }
    async goToOverview() {
        await this.overviewLink().click();
    }
    async goToHostname() {
        await this.hostnameLink().click();
    }
    async goToLocalization() {
        await this.localizationLink().click();
    }
    async goToNetwork() {
        await this.networkLink().click();
    }
    async goToStorage() {
        await this.storageLink().click();
    }
    async goToSoftware() {
        await this.softwareLink().click();
    }
    async goToUsers() {
        await this.usersLink().click();
    }
}
exports.SidebarPage = SidebarPage;
function RegistrationNavigable(Base) {
    return class extends Base {
        registrationLink = () => this.page.locator("a[href='#/registration']");
        async goToRegistration() {
            await this.registrationLink().click();
        }
    };
}
class SidebarWithRegistrationPage extends RegistrationNavigable(SidebarPage) {
}
exports.SidebarWithRegistrationPage = SidebarWithRegistrationPage;


/***/ }),

/***/ "./src/pages/storage_result_page.ts":
/*!******************************************!*\
  !*** ./src/pages/storage_result_page.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageResultPage = void 0;
class StorageResultPage {
    page;
    destructiveActionsList = () => this.page.locator("::-p-text(Actions)");
    destructiveActionText = (name) => this.page.locator(`::-p-text(Delete ${name})`);
    constructor(page) {
        this.page = page;
    }
    async scrollToDestructiveActionsList() {
        (await this.destructiveActionsList().waitHandle()).scrollIntoView();
    }
}
exports.StorageResultPage = StorageResultPage;


/***/ }),

/***/ "./src/pages/storage_settings_page.ts":
/*!********************************************!*\
  !*** ./src/pages/storage_settings_page.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageSettingsPage = void 0;
class StorageSettingsPage {
    page;
    selectMoreDevicesButton = () => this.page.locator("::-p-text(More devices)");
    encryptionTab = () => this.page.locator("::-p-text(Encryption)");
    changeEncryptionLink = () => this.page.locator('::-p-aria([name="Change"][role="link"])');
    encryptionIsEnabledText = () => this.page.locator("::-p-text(Encryption is enabled)");
    encryptionIsDisabledText = () => this.page.locator("::-p-text(Encryption is disabled)");
    manageDasdLink = () => this.page.locator("::-p-text(Manage DASD devices)");
    ActivateZfcpLink = () => this.page.locator("::-p-text(Activate zFCP disks)");
    constructor(page) {
        this.page = page;
    }
    async selectMoreDevices() {
        await this.selectMoreDevicesButton().click();
    }
    async selectEncryption() {
        await this.encryptionTab().click();
    }
    async changeEncryption() {
        await this.changeEncryptionLink().click();
    }
    async manageDasd() {
        await this.manageDasdLink().click();
    }
    async activateZfcp() {
        await this.ActivateZfcpLink().click();
    }
    async waitForElement(element, timeout) {
        await this.page.locator(element).setTimeout(timeout).wait();
    }
}
exports.StorageSettingsPage = StorageSettingsPage;


/***/ }),

/***/ "./src/pages/storage_without_tabs_page.ts":
/*!************************************************!*\
  !*** ./src/pages/storage_without_tabs_page.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageWithoutTabsPage = void 0;
const assert_1 = __importDefault(__webpack_require__(/*! assert */ "assert"));
class StorageWithoutTabsPage {
    page;
    selectMoreDevicesButton = () => this.page.locator("::-p-text(More devices)");
    editEncryptionButton = () => this.page.locator("::-p-text(Edit)");
    encryptionIsEnabledText = () => this.page.locator("::-p-text(Encryption is enabled)");
    encryptionIsDisabledText = () => this.page.locator("::-p-text(Encryption is disabled)");
    manageDasdLink = () => this.page.locator("::-p-text(Manage DASD devices)");
    ActivateZfcpLink = () => this.page.locator("::-p-text(Activate zFCP disks)");
    addLvmVolumeLink = () => this.page.locator("::-p-text(Add LVM volume group)");
    destructiveActionsList = () => this.page.locator("::-p-text(Check)");
    destructiveActionText = (name) => this.page.locator(`::-p-text(Delete ${name})`);
    constructor(page) {
        this.page = page;
    }
    async selectMoreDevices() {
        await this.selectMoreDevicesButton().click();
    }
    async addLvmVolumeGroup() {
        await this.addLvmVolumeLink().click();
    }
    async editEncryption() {
        await this.editEncryptionButton().click();
    }
    async verifyEncryptionEnabled() {
        await this.encryptionIsEnabledText().wait();
    }
    async verifyEncryptionDisabled() {
        const elementText = await this.encryptionIsDisabledText()
            .map((span) => span.textContent)
            .wait();
        await assert_1.default.deepEqual(elementText, "Encryption is disabled");
    }
    async manageDasd() {
        await this.manageDasdLink().click();
    }
    async activateZfcp() {
        await this.ActivateZfcpLink().click();
    }
    async waitForElement(element, timeout) {
        await this.page.locator(element).setTimeout(timeout).wait();
    }
    async expandDestructiveActionsList() {
        await this.destructiveActionsList().click();
    }
    async verifyDestructiveAction(action) {
        await this.destructiveActionText(action).wait();
    }
}
exports.StorageWithoutTabsPage = StorageWithoutTabsPage;


/***/ }),

/***/ "./src/pages/trust_registration_certificate_page.ts":
/*!**********************************************************!*\
  !*** ./src/pages/trust_registration_certificate_page.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TrustRegistrationCertificatePage = void 0;
class TrustRegistrationCertificatePage {
    page;
    titleText = () => this.page.locator("::-p-text(Registration certificate)");
    questionText = () => this.page.locator("::-p-text(Do you want to trust it and register the product?)");
    urlText = (expectedUrl) => this.page.locator(`xpath=//text()[contains(., "${expectedUrl}")]/..`);
    issuerText = () => this.page.locator("::-p-text(RMT Certificate Authority)");
    trustCertificateButton = () => this.page.locator("::-p-text(Trust)");
    constructor(page) {
        this.page = page;
    }
    async trustCertificate() {
        await this.trustCertificateButton().click();
    }
}
exports.TrustRegistrationCertificatePage = TrustRegistrationCertificatePage;


/***/ }),

/***/ "./src/pages/users_page.ts":
/*!*********************************!*\
  !*** ./src/pages/users_page.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersPage = void 0;
class UsersPage {
    page;
    firstUserLink = () => this.page.locator("a[href='#/users/first']");
    editRootUserButton = () => this.page.locator("a[href='#/users/root/edit']");
    defineTheFirstUserButton = () => this.page.locator("a[href='#/users/first/edit']");
    constructor(page) {
        this.page = page;
    }
    async defineAUserNow() {
        await this.firstUserLink().click();
    }
    async editRootUser() {
        await this.editRootUserButton().click();
    }
    async defineTheFirstUser() {
        await this.defineTheFirstUserButton().click();
    }
}
exports.UsersPage = UsersPage;


/***/ }),

/***/ "./src/pages/zfcp_page.ts":
/*!********************************!*\
  !*** ./src/pages/zfcp_page.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ZfcpPage = void 0;
class ZfcpPage {
    page;
    faDisk = () => this.page.locator("tbody > tr:first-child > td:last-child > button#zfcp_controllers_actions");
    fcDisk = () => this.page.locator("tbody > tr:last-child > td:last-child > button#zfcp_controllers_actions");
    zfcpDisk = (channelId) => this.page.locator(`xpath=//tr[contains(., "${channelId}")]`);
    activateDisk = () => this.page.locator("::-p-aria(Activate[role='menuitem'])");
    backButton = () => this.page.locator("button::-p-text(Back)");
    enableMultipath = () => this.page.locator("::-p-text('Yes')");
    constructor(page) {
        this.page = page;
    }
    async activateDevice(channelId) {
        const rowActions = channelId === "0.0.fa00" ? this.faDisk() : this.fcDisk();
        await rowActions.click();
        await this.activateDisk().click();
        await this.zfcpDisk(channelId).setTimeout(90000).wait();
    }
    async activateMultipath() {
        await this.enableMultipath().setTimeout(40000).click();
    }
    async back() {
        await this.backButton().click();
    }
}
exports.ZfcpPage = ZfcpPage;


/***/ }),

/***/ "./src/test_extended.ts":
/*!******************************!*\
  !*** ./src/test_extended.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const cmdline_1 = __webpack_require__(/*! ./lib/cmdline */ "./src/lib/cmdline.ts");
const helpers_1 = __webpack_require__(/*! ./lib/helpers */ "./src/lib/helpers.ts");
const product_strategy_factory_1 = __webpack_require__(/*! ./lib/product_strategy_factory */ "./src/lib/product_strategy_factory.ts");
const first_user_1 = __webpack_require__(/*! ./checks/first_user */ "./src/checks/first_user.ts");
const root_authentication_1 = __webpack_require__(/*! ./checks/root_authentication */ "./src/checks/root_authentication.ts");
const registration_1 = __webpack_require__(/*! ./checks/registration */ "./src/checks/registration.ts");
const login_1 = __webpack_require__(/*! ./checks/login */ "./src/checks/login.ts");
const installation_1 = __webpack_require__(/*! ./checks/installation */ "./src/checks/installation.ts");
const product_selection_1 = __webpack_require__(/*! ./checks/product_selection */ "./src/checks/product_selection.ts");
const hostname_1 = __webpack_require__(/*! ./checks/hostname */ "./src/checks/hostname.ts");
const download_logs_1 = __webpack_require__(/*! ./checks/download_logs */ "./src/checks/download_logs.ts");
const options = (0, cmdline_1.parse)((cmd) => cmd
    .option("--product-id <id>", "Product id to select a product to install", "none")
    .option("--accept-license", "Accept license for a product with license (the default is a product without license)")
    .option("--registration-code <code>", "Registration code")
    .option("--use-custom-registration-server", "Enable custom registration server")
    .option("--provide-registration-code", "provide registration code for customer registration")
    .option("--staticHostname <hostname>", "Static Hostname")
    .option("--install", "Proceed to install the system (the default is not to install it)"));
(0, helpers_1.test_init)(options);
const testStrategy = product_strategy_factory_1.ProductStrategyFactory.create(options.agamaVersion);
(0, login_1.logIn)(options.password);
if (options.productId !== "none")
    if (options.acceptLicense)
        (0, product_selection_1.productSelectionWithLicense)(options.productId);
    else
        (0, product_selection_1.productSelection)(options.productId);
if (options.staticHostname)
    (0, hostname_1.setPermanentHostname)(options.staticHostname);
testStrategy.enableEncryption(options.password);
if (options.registrationCode)
    (0, registration_1.enterProductRegistration)({
        use_custom: options.useCustomRegistrationServer,
        code: options.registrationCode,
        provide_code: options.provideRegistrationCode,
    });
testStrategy.verifyEncryptionEnabled();
testStrategy.disableEncryption();
(0, first_user_1.createFirstUser)(options.password);
(0, root_authentication_1.editRootUser)(options.rootPassword);
testStrategy.verifyPasswordStrength();
if (options.prepareAdvancedStorage === "zfcp")
    testStrategy.prepareZfcpStorage();
(0, download_logs_1.downloadLogs)();
if (options.install) {
    (0, installation_1.performInstallation)();
    (0, installation_1.checkInstallation)();
    (0, installation_1.finishInstallation)();
}


/***/ }),

/***/ "./src/variants/pre_release_strategy.ts":
/*!**********************************************!*\
  !*** ./src/variants/pre_release_strategy.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PreReleaseStrategy = void 0;
const root_authentication_1 = __webpack_require__(/*! ../checks/root_authentication */ "./src/checks/root_authentication.ts");
const encryption_1 = __webpack_require__(/*! ../checks/encryption */ "./src/checks/encryption.ts");
const storage_zfcp_1 = __webpack_require__(/*! ../checks/storage_zfcp */ "./src/checks/storage_zfcp.ts");
const storage_result_destructive_actions_planned_1 = __webpack_require__(/*! ../checks/storage_result_destructive_actions_planned */ "./src/checks/storage_result_destructive_actions_planned.ts");
class PreReleaseStrategy {
    verifyDecryptDestructiveActions(destructiveActions) {
        (0, storage_result_destructive_actions_planned_1.verifyDecryptDestructiveActions)(destructiveActions);
    }
    enableEncryption(password) {
        (0, encryption_1.enableEncryption)(password);
    }
    verifyEncryptionEnabled() {
        (0, encryption_1.verifyEncryptionEnabled)();
    }
    disableEncryption() {
        (0, encryption_1.disableEncryption)();
    }
    verifyPasswordStrength() {
        (0, root_authentication_1.verifyPasswordStrength)();
    }
    prepareZfcpStorage() {
        (0, storage_zfcp_1.prepareZfcpStorage)();
    }
}
exports.PreReleaseStrategy = PreReleaseStrategy;


/***/ }),

/***/ "./src/variants/stable_release_strategy.ts":
/*!*************************************************!*\
  !*** ./src/variants/stable_release_strategy.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StableReleaseStrategy = void 0;
const root_authentication_1 = __webpack_require__(/*! ../checks/root_authentication */ "./src/checks/root_authentication.ts");
const encryption_1 = __webpack_require__(/*! ../checks/encryption */ "./src/checks/encryption.ts");
const storage_zfcp_1 = __webpack_require__(/*! ../checks/storage_zfcp */ "./src/checks/storage_zfcp.ts");
const storage_result_destructive_actions_planned_1 = __webpack_require__(/*! ../checks/storage_result_destructive_actions_planned */ "./src/checks/storage_result_destructive_actions_planned.ts");
class StableReleaseStrategy {
    verifyDecryptDestructiveActions(destructiveActions) {
        (0, storage_result_destructive_actions_planned_1.verifyDecryptDestructiveActionsWithoutTabs)(destructiveActions);
    }
    enableEncryption(password) {
        (0, encryption_1.enableEncryptionWithoutTabs)(password);
    }
    verifyEncryptionEnabled() {
        (0, encryption_1.verifyEncryptionEnabledWithoutTabs)();
    }
    disableEncryption() {
        (0, encryption_1.disableEncryptionWithoutTabs)();
    }
    verifyPasswordStrength() {
        (0, root_authentication_1.verifyPasswordStrengthWithoutTabs)();
    }
    prepareZfcpStorage() {
        (0, storage_zfcp_1.prepareZfcpStorageWithoutTabs)();
    }
}
exports.StableReleaseStrategy = StableReleaseStrategy;


/***/ }),

/***/ "./node_modules/yargs-parser/build sync recursive":
/*!***********************************************!*\
  !*** ./node_modules/yargs-parser/build/ sync ***!
  \***********************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "./node_modules/yargs-parser/build sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "./node_modules/yargs/build sync recursive":
/*!****************************************!*\
  !*** ./node_modules/yargs/build/ sync ***!
  \****************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "./node_modules/yargs/build sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "dns":
/*!**********************!*\
  !*** external "dns" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("dns");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "node:assert/strict":
/*!*************************************!*\
  !*** external "node:assert/strict" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:assert/strict");

/***/ }),

/***/ "node:child_process":
/*!*************************************!*\
  !*** external "node:child_process" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:child_process");

/***/ }),

/***/ "node:events":
/*!******************************!*\
  !*** external "node:events" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:events");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ "node:process":
/*!*******************************!*\
  !*** external "node:process" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:process");

/***/ }),

/***/ "node:test":
/*!****************************!*\
  !*** external "node:test" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:test");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ "readline":
/*!***************************!*\
  !*** external "readline" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("readline");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__(__webpack_require__.s = "./src/test_extended.ts")))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			"test_extended": 1
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.O.require = (chunkId) => (installedChunks[chunkId]);
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 			__webpack_require__.O();
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__webpack_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					installChunk(require("./" + __webpack_require__.u(chunkId)));
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			__webpack_require__.e("vendor");
/******/ 			return next();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;
//# sourceMappingURL=test_extended.js.map