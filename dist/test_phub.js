#! /usr/bin/env node
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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
exports.performInstallationWithSidebar = performInstallationWithSidebar;
exports.checkInstallation = checkInstallation;
exports.finishInstallation = finishInstallation;
exports.finishInstallationCongratulation = finishInstallationCongratulation;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const confirm_installation_page_1 = __webpack_require__(/*! ../pages/confirm_installation_page */ "./src/pages/confirm_installation_page.ts");
const congratulation_page_1 = __webpack_require__(/*! ../pages/congratulation_page */ "./src/pages/congratulation_page.ts");
const overview_page_1 = __webpack_require__(/*! ../pages/overview_page */ "./src/pages/overview_page.ts");
const overview_with_sidebar_page_1 = __webpack_require__(/*! ../pages/overview_with_sidebar_page */ "./src/pages/overview_with_sidebar_page.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
const installation_page_1 = __webpack_require__(/*! ../pages/installation_page */ "./src/pages/installation_page.ts");
const strict_1 = __importDefault(__webpack_require__(/*! node:assert/strict */ "node:assert/strict"));
const confirm_installation_with_sidebar_page_1 = __webpack_require__(/*! ../pages/confirm_installation_with_sidebar_page */ "./src/pages/confirm_installation_with_sidebar_page.ts");
const installation_complete_page_1 = __webpack_require__(/*! ../pages/installation_complete_page */ "./src/pages/installation_complete_page.ts");
function performInstallation() {
    (0, helpers_1.it)("should start installation", async function () {
        const confirmInstallation = new confirm_installation_page_1.ConfirmInstallationPage(helpers_1.page);
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        await overview.install();
        await confirmInstallation.confirmAndInstall();
    });
}
function performInstallationWithSidebar() {
    (0, helpers_1.it)("should start installation", async function () {
        const confirmInstallation = new confirm_installation_with_sidebar_page_1.ConfirmInstallationWithSidebarPage(helpers_1.page);
        const overview = new overview_with_sidebar_page_1.OverviewWithSidebarPage(helpers_1.page);
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
        const installationComplete = new installation_complete_page_1.InstallationCompletePage(helpers_1.page);
        await installationComplete.wait(20 * 60 * 1000);
    }, 21 * 60 * 1000);
}
function finishInstallationCongratulation() {
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
exports.logInWithIncorrectPassword = logInWithIncorrectPassword;
exports.logInWithIncorrectPasswordWithSidebar = logInWithIncorrectPasswordWithSidebar;
const strict_1 = __importDefault(__webpack_require__(/*! node:assert/strict */ "node:assert/strict"));
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const login_as_root_page_1 = __webpack_require__(/*! ../pages/login_as_root_page */ "./src/pages/login_as_root_page.ts");
function verifyAgamaTitle() {
    (0, helpers_1.it)("should have Agama page title", async function () {
        strict_1.default.deepEqual(await helpers_1.page.title(), "Agama");
    });
}
function logIn(password) {
    verifyAgamaTitle();
    (0, helpers_1.it)("should allow logging in", async function () {
        const loginAsRoot = new login_as_root_page_1.LoginAsRootPage(helpers_1.page);
        await loginAsRoot.fillPassword(password);
        await loginAsRoot.logIn();
    });
}
function logInWithIncorrectPassword() {
    verifyAgamaTitle();
    (0, helpers_1.it)("should show warning alert for logging with wrong password", async function () {
        const loginAsRoot = new login_as_root_page_1.LoginAsRootPage(helpers_1.page);
        const invalidpassword = "invalid password";
        await loginAsRoot.fillPassword(invalidpassword);
        await loginAsRoot.logIn();
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(loginAsRoot.couldNotLoginText()), "Danger alert:Could not log in");
        await loginAsRoot.togglePasswordVisibility();
        strict_1.default.deepEqual(await (0, helpers_1.getValue)(loginAsRoot.passwordInput()), invalidpassword);
    });
}
function logInWithIncorrectPasswordWithSidebar() {
    verifyAgamaTitle();
    (0, helpers_1.it)("should show warning alert for logging with wrong password", async function () {
        const loginAsRoot = new login_as_root_page_1.LoginAsRootPage(helpers_1.page);
        const invalidpassword = "invalid password";
        await loginAsRoot.fillPassword(invalidpassword);
        await loginAsRoot.logIn();
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(loginAsRoot.couldNotLoginText()), "Danger alert:Could not log in. Please, make sure that the password is correct.");
        await loginAsRoot.togglePasswordVisibility();
        strict_1.default.deepEqual(await (0, helpers_1.getValue)(loginAsRoot.passwordInput()), invalidpassword);
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
exports.enterProductRegistrationWithSidebar = enterProductRegistrationWithSidebar;
exports.enterExtensionRegistrationHA = enterExtensionRegistrationHA;
exports.enterExtensionRegistrationHAWithSidebar = enterExtensionRegistrationHAWithSidebar;
exports.enterExtensionRegistrationPHub = enterExtensionRegistrationPHub;
exports.verifyRegistrationWarniningAlerts = verifyRegistrationWarniningAlerts;
exports.verifyRegistrationWarniningAlertsWithSidebar = verifyRegistrationWarniningAlertsWithSidebar;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const overview_page_1 = __webpack_require__(/*! ../pages/overview_page */ "./src/pages/overview_page.ts");
const product_registration_page_1 = __webpack_require__(/*! ../pages/product_registration_page */ "./src/pages/product_registration_page.ts");
const extension_registration_phub_page_1 = __webpack_require__(/*! ../pages/extension_registration_phub_page */ "./src/pages/extension_registration_phub_page.ts");
const extension_registration_ha_page_1 = __webpack_require__(/*! ../pages/extension_registration_ha_page */ "./src/pages/extension_registration_ha_page.ts");
const strict_1 = __importDefault(__webpack_require__(/*! node:assert/strict */ "node:assert/strict"));
const trust_registration_certificate_page_1 = __webpack_require__(/*! ../pages/trust_registration_certificate_page */ "./src/pages/trust_registration_certificate_page.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
const header_page_1 = __webpack_require__(/*! ../pages/header_page */ "./src/pages/header_page.ts");
const overview_with_sidebar_page_1 = __webpack_require__(/*! ../pages/overview_with_sidebar_page */ "./src/pages/overview_with_sidebar_page.ts");
function enterProductRegistration({ use_custom, code, provide_code, url, }) {
    (0, helpers_1.it)("should allow setting registration", async function () {
        const overview = new overview_page_1.OverviewWithRegistrationPage(helpers_1.page);
        const productRegistration = new product_registration_page_1.ProductRegistrationPage(helpers_1.page);
        await overview.goToRegistration();
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
        const header = new header_page_1.HeaderPage(helpers_1.page);
        const productRegistration = new product_registration_page_1.ProductRegistrationPage(helpers_1.page);
        await productRegistration.verifyCustomRegistration();
        await header.goToOverview();
    });
}
function enterProductRegistrationWithSidebar({ use_custom, code, provide_code, url, }) {
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
        await new overview_with_sidebar_page_1.OverviewWithSidebarPage(helpers_1.page).waitVisible(60000);
        const sidebar = new sidebar_page_1.SidebarWithRegistrationPage(helpers_1.page);
        const productRegistration = new product_registration_page_1.ProductRegistrationPage(helpers_1.page);
        await sidebar.goToRegistration();
        await productRegistration.verifyCustomRegistration();
    });
}
function enterExtensionRegistrationHA(code) {
    (0, helpers_1.it)("should allow registering HA extension", async function () {
        const overview = new overview_page_1.OverviewWithRegistrationPage(helpers_1.page);
        const header = new header_page_1.HeaderPage(helpers_1.page);
        const extensionRegistrationHA = new extension_registration_ha_page_1.ExtensionRegistrationHAPage(helpers_1.page);
        await overview.goToRegistration();
        await extensionRegistrationHA.fillCode(code);
        await extensionRegistrationHA.register();
        strict_1.default.match(await (0, helpers_1.getTextContent)(extensionRegistrationHA.extensionRegisteredText()), /The extension has been registered/);
        await header.goToOverview();
    });
}
function enterExtensionRegistrationHAWithSidebar(code) {
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
function verifyRegistrationWarniningAlerts(use_custom, url) {
    (0, helpers_1.it)("should show warning alert for missing registration code", async function () {
        const overview = new overview_page_1.OverviewWithRegistrationPage(helpers_1.page);
        const customRegistration = new product_registration_page_1.CustomRegistrationPage(helpers_1.page);
        await overview.goToRegistration();
        if (use_custom) {
            await customRegistration.selectProvideRegistrationCode();
        }
        await customRegistration.register();
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(customRegistration.enterRegistrationCodeText()), "Enter a registration code");
    });
    (0, helpers_1.it)("should show warning alert for invalid registration code", async function () {
        const customRegistration = new product_registration_page_1.CustomRegistrationPage(helpers_1.page);
        await customRegistration.fillCode("1234invalid4321");
        await customRegistration.register();
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(customRegistration.connectionToRegistrationServerFailedText()), "Warning alert:Connection to registration server failed: Unknown Registration Code.");
    });
    (0, helpers_1.it)("should show warning alert for invalid custom registration server", async function () {
        const customRegistration = new product_registration_page_1.CustomRegistrationPage(helpers_1.page);
        await customRegistration.selectCustomRegistrationServer();
        await customRegistration.selectProvideRegistrationCode();
        await customRegistration.fillServerUrl("http://scc.example.net");
        await customRegistration.register();
        strict_1.default.match(await (0, helpers_1.getTextContent)(customRegistration.connectionToRegistrationServerFailedText()), /Connection to registration server failed: dial tcp: lookup .+ on .+: no such host \(network error\)/);
        if (use_custom) {
            await customRegistration.fillServerUrl(url);
        }
        else {
            await customRegistration.selectSCCRegistrationServer();
            await customRegistration.fillCode("1234invalid4321");
        }
        await customRegistration.register();
        const header = new header_page_1.HeaderPage(helpers_1.page);
        await header.goToOverview();
    });
}
function verifyRegistrationWarniningAlertsWithSidebar(use_custom, url) {
    (0, helpers_1.it)("should show warning alert for missing registration code", async function () {
        const sidebar = new sidebar_page_1.SidebarWithRegistrationPage(helpers_1.page);
        const customRegistration = new product_registration_page_1.CustomRegistrationPage(helpers_1.page);
        await sidebar.goToRegistration();
        if (use_custom)
            await customRegistration.selectProvideRegistrationCode();
        await customRegistration.register();
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(customRegistration.enterRegistrationCodeText()), "Enter a registration code");
    });
    (0, helpers_1.it)("should show warning alert for invalid registration code", async function () {
        const customRegistration = new product_registration_page_1.CustomRegistrationPage(helpers_1.page);
        await customRegistration.fillCode("1234invalid4321");
        await customRegistration.register();
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(customRegistration.connectionToRegistrationServerFailedText()), "Warning alert:Connection to registration server failed: Unknown Registration Code.");
    });
    (0, helpers_1.it)("should show warning alert for invalid custom registration server", async function () {
        const customRegistration = new product_registration_page_1.CustomRegistrationPage(helpers_1.page);
        await customRegistration.selectCustomRegistrationServer();
        await customRegistration.selectProvideRegistrationCode();
        await customRegistration.fillServerUrl("http://scc.example.net");
        await customRegistration.register();
        strict_1.default.match(await (0, helpers_1.getTextContent)(customRegistration.connectionToRegistrationServerFailedText()), /Connection to registration server failed: dial tcp: lookup .+ on .+: no such host \(network error\)/);
        if (use_custom) {
            await customRegistration.fillServerUrl(url);
        }
        else {
            await customRegistration.selectSCCRegistrationServer();
            await customRegistration.fillCode("1234invalid4321");
        }
        await customRegistration.register();
    });
}


/***/ }),

/***/ "./src/checks/software_selection.ts":
/*!******************************************!*\
  !*** ./src/checks/software_selection.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.selectPatterns = selectPatterns;
exports.selectPatternsWithSidebar = selectPatternsWithSidebar;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const header_page_1 = __webpack_require__(/*! ../pages/header_page */ "./src/pages/header_page.ts");
const overview_page_1 = __webpack_require__(/*! ../pages/overview_page */ "./src/pages/overview_page.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
const software_page_1 = __webpack_require__(/*! ../pages/software_page */ "./src/pages/software_page.ts");
const software_selection_page_1 = __webpack_require__(/*! ../pages/software_selection_page */ "./src/pages/software_selection_page.ts");
function selectPatterns(patterns) {
    (0, helpers_1.it)(`should select patterns ${patterns.join(", ")}`, async function () {
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        const header = new header_page_1.HeaderPage(helpers_1.page);
        const software = new software_page_1.SoftwarePage(helpers_1.page);
        const softwareSelection = new software_selection_page_1.SoftwareSelectionPage(helpers_1.page);
        await overview.goToSoftware();
        await software.changeSelection();
        for (const pattern of patterns)
            await softwareSelection.selectPattern(pattern);
        await softwareSelection.close();
        header.goToOverview();
    });
}
function selectPatternsWithSidebar(patterns) {
    (0, helpers_1.it)(`should select patterns ${patterns.join(", ")}`, async function () {
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        const software = new software_page_1.SoftwarePage(helpers_1.page);
        const softwareSelection = new software_selection_page_1.SoftwareSelectionPage(helpers_1.page);
        await sidebar.goToSoftware();
        await software.changeSelection();
        for (const pattern of patterns)
            await softwareSelection.selectPattern(pattern);
        await softwareSelection.close();
    });
}


/***/ }),

/***/ "./src/checks/storage_out_of_sync.ts":
/*!*******************************************!*\
  !*** ./src/checks/storage_out_of_sync.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.verifyStorageOutOfSync = verifyStorageOutOfSync;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const util_1 = __importDefault(__webpack_require__(/*! util */ "util"));
const strict_1 = __importDefault(__webpack_require__(/*! node:assert/strict */ "node:assert/strict"));
const child_process_1 = __webpack_require__(/*! child_process */ "child_process");
const storage_warning_out_of_sync_page_1 = __webpack_require__(/*! ../pages/storage_warning_out_of_sync_page */ "./src/pages/storage_warning_out_of_sync_page.ts");
function verifyStorageOutOfSync() {
    (0, helpers_1.it)("should verify storage out of sync popup", async function () {
        const storageWarningOutOfSyncPage = new storage_warning_out_of_sync_page_1.StorageWarningOutOfSyncPage(helpers_1.page);
        const execPromise = util_1.default.promisify(child_process_1.exec);
        await execPromise("agama probe");
        strict_1.default.deepEqual(await (0, helpers_1.getTextContent)(storageWarningOutOfSyncPage.configurationOutOfSyncWarningAlert()), "Configuration out of sync");
        await storageWarningOutOfSyncPage.reload();
    });
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
exports.getValue = getValue;
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
        // This timeout is increased due to DASD format step review in future changes
        protocolTimeout: 360000,
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
function getValue(locator) {
    return locator.map((element) => element.value).wait();
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
    continueButton = () => this.page.locator('::-p-aria([name="Confirm and install"][role="button"])');
    constructor(page) {
        this.page = page;
    }
    async confirmAndInstall() {
        await this.continueButton().click();
    }
}
exports.ConfirmInstallationPage = ConfirmInstallationPage;


/***/ }),

/***/ "./src/pages/confirm_installation_with_sidebar_page.ts":
/*!*************************************************************!*\
  !*** ./src/pages/confirm_installation_with_sidebar_page.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfirmInstallationWithSidebarPage = void 0;
class ConfirmInstallationWithSidebarPage {
    page;
    continueButton = () => this.page.locator("button::-p-text('Continue')");
    constructor(page) {
        this.page = page;
    }
    async continue() {
        await this.continueButton().click();
    }
}
exports.ConfirmInstallationWithSidebarPage = ConfirmInstallationWithSidebarPage;


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

/***/ "./src/pages/header_page.ts":
/*!**********************************!*\
  !*** ./src/pages/header_page.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HeaderPage = void 0;
class HeaderPage {
    page;
    overviewLink = () => this.page.locator("a[href='#/overview']");
    constructor(page) {
        this.page = page;
    }
    async goToOverview() {
        await this.overviewLink().click();
    }
}
exports.HeaderPage = HeaderPage;


/***/ }),

/***/ "./src/pages/installation_complete_page.ts":
/*!*************************************************!*\
  !*** ./src/pages/installation_complete_page.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InstallationCompletePage = void 0;
class InstallationCompletePage {
    page;
    installationCompleteText = () => this.page.locator("::-p-aria('Installation complete')");
    constructor(page) {
        this.page = page;
    }
    async wait(timeout) {
        await this.installationCompleteText().setTimeout(timeout).wait();
    }
}
exports.InstallationCompletePage = InstallationCompletePage;


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
    couldNotLoginText = () => this.page.locator(`::-p-text(Could not log in)`);
    passwordVisibilityButton = () => this.page.locator("[aria-label='Password visibility button']");
    constructor(page) {
        this.page = page;
    }
    async fillPassword(password) {
        await this.passwordInput().fill(password);
    }
    async logIn() {
        await this.logInButton().click();
    }
    async togglePasswordVisibility() {
        await this.passwordVisibilityButton().click();
    }
}
exports.LoginAsRootPage = LoginAsRootPage;


/***/ }),

/***/ "./src/pages/overview_page.ts":
/*!************************************!*\
  !*** ./src/pages/overview_page.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OverviewWithRegistrationPage = exports.OverviewPage = void 0;
class OverviewPage {
    page;
    hostnameLink = () => this.page.locator("a[href='#/hostname']");
    localizationLink = () => this.page.locator("a[href='#/l10n']");
    networkLink = () => this.page.locator("a[href='#/network']");
    storageLink = () => this.page.locator("a[href='#/storage']");
    softwareLink = () => this.page.locator("a[href='#/software']");
    usersLink = () => this.page.locator("a[href='#/users']");
    installButton = () => this.page.locator('::-p-aria([name="Install now"][role="button"])');
    overviewHeading = () => this.page.locator('::-p-aria([name="System Information"][role="heading"])');
    constructor(page) {
        this.page = page;
    }
    async waitVisible(timeout) {
        await this.overviewHeading().setTimeout(timeout).wait();
    }
    async install() {
        await this.installButton().click();
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
exports.OverviewPage = OverviewPage;
function RegistrationNavigable(Base) {
    return class extends Base {
        registrationLink = () => this.page.locator("a[href='#/registration']");
        async goToRegistration() {
            await this.registrationLink().click();
        }
    };
}
class OverviewWithRegistrationPage extends RegistrationNavigable(OverviewPage) {
}
exports.OverviewWithRegistrationPage = OverviewWithRegistrationPage;


/***/ }),

/***/ "./src/pages/overview_with_sidebar_page.ts":
/*!*************************************************!*\
  !*** ./src/pages/overview_with_sidebar_page.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OverviewWithSidebarPage = void 0;
class OverviewWithSidebarPage {
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
exports.OverviewWithSidebarPage = OverviewWithSidebarPage;


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
    connectionToRegistrationServerFailedText = () => this.page.locator("::-p-text(Connection to registration server failed:)");
    enterRegistrationCodeText = () => this.page.locator("::-p-text(Enter a registration code)");
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
        registrationServerSCCOption = () => this.page.locator("::-p-aria(SUSE Customer Center (SCC) Register using SUSE server)");
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
        async selectSCCRegistrationServer() {
            await this.registrationServerButton().click();
            await this.registrationServerSCCOption().click();
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

/***/ "./src/pages/software_page.ts":
/*!************************************!*\
  !*** ./src/pages/software_page.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SoftwarePage = void 0;
class SoftwarePage {
    page;
    changeSelectionButton = () => this.page.locator("::-p-text(Change selection)");
    constructor(page) {
        this.page = page;
    }
    async changeSelection() {
        await this.changeSelectionButton().click();
    }
}
exports.SoftwarePage = SoftwarePage;


/***/ }),

/***/ "./src/pages/software_selection_page.ts":
/*!**********************************************!*\
  !*** ./src/pages/software_selection_page.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SoftwareSelectionPage = void 0;
class SoftwareSelectionPage {
    page;
    patternCheckboxNotChecked = (pattern) => this.page.locator(`input[type=checkbox]:not(:checked)[aria-labelledby*=${pattern}-title]`);
    patternCheckboxChecked = (pattern) => this.page.locator(`input[type=checkbox]:checked[aria-labelledby*=${pattern}-title]`);
    closeButton = () => this.page.locator("::-p-text(Close)");
    constructor(page) {
        this.page = page;
    }
    async selectPattern(pattern) {
        const checkbox = await this.patternCheckboxNotChecked(pattern).waitHandle();
        await checkbox.scrollIntoView();
        await this.patternCheckboxNotChecked(pattern).click();
        await this.patternCheckboxChecked(pattern).wait();
    }
    async close() {
        await this.closeButton().click();
    }
}
exports.SoftwareSelectionPage = SoftwareSelectionPage;


/***/ }),

/***/ "./src/pages/storage_warning_out_of_sync_page.ts":
/*!*******************************************************!*\
  !*** ./src/pages/storage_warning_out_of_sync_page.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageWarningOutOfSyncPage = void 0;
class StorageWarningOutOfSyncPage {
    page;
    configurationOutOfSyncWarningAlert = () => this.page.locator("::-p-text(Configuration out of sync)");
    reloadButton = () => this.page.locator("::-p-text(Reload now)");
    constructor(page) {
        this.page = page;
    }
    async reload() {
        await this.reloadButton().setTimeout(60000).click();
    }
}
exports.StorageWarningOutOfSyncPage = StorageWarningOutOfSyncPage;


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

/***/ "./src/test_phub.ts":
/*!**************************!*\
  !*** ./src/test_phub.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const cmdline_1 = __webpack_require__(/*! ./lib/cmdline */ "./src/lib/cmdline.ts");
const helpers_1 = __webpack_require__(/*! ./lib/helpers */ "./src/lib/helpers.ts");
const login_1 = __webpack_require__(/*! ./checks/login */ "./src/checks/login.ts");
const storage_out_of_sync_1 = __webpack_require__(/*! ./checks/storage_out_of_sync */ "./src/checks/storage_out_of_sync.ts");
const registration_1 = __webpack_require__(/*! ./checks/registration */ "./src/checks/registration.ts");
const software_selection_1 = __webpack_require__(/*! ./checks/software_selection */ "./src/checks/software_selection.ts");
const installation_1 = __webpack_require__(/*! ./checks/installation */ "./src/checks/installation.ts");
const options = (0, cmdline_1.parse)((cmd) => cmd
    .option("--register-package-hub", "Registration for PackageHub")
    .option("--patterns <pattern>...", "comma-separated list of patterns", cmdline_1.commaSeparatedList));
(0, helpers_1.test_init)(options);
(0, login_1.logIn)(options.password);
(0, registration_1.enterExtensionRegistrationPHub)();
(0, software_selection_1.selectPatterns)(options.patterns);
(0, storage_out_of_sync_1.verifyStorageOutOfSync)();
(0, installation_1.performInstallation)();
(0, installation_1.finishInstallation)();


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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__(__webpack_require__.s = "./src/test_phub.ts")))
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
/******/ 			"test_phub": 1
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
//# sourceMappingURL=test_phub.js.map