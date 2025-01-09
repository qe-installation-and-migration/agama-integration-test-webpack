#! /usr/bin/env node
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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
function createFirstUser(fullName, userName, password) {
    (0, helpers_1.it)("should create first user", async function () {
        const users = new users_page_1.UsersPage(helpers_1.page);
        const createFirstUser = new create_user_page_1.CreateFirstUserPage(helpers_1.page);
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        await sidebar.goToUsers();
        await users.defineAUserNow();
        await createFirstUser.fillFullName(fullName);
        await createFirstUser.fillUserName(userName);
        await createFirstUser.fillPassword(password);
        await createFirstUser.fillPasswordConfirmation(password);
        await createFirstUser.accept();
        // puppeteer goes too fast and screen is unresponsive after submit, a small delay helps
        await (0, helpers_1.sleep)(2000);
    });
}


/***/ }),

/***/ "./src/checks/installation.ts":
/*!************************************!*\
  !*** ./src/checks/installation.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.performInstallation = performInstallation;
exports.finishInstallation = finishInstallation;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const confirm_installation_page_1 = __webpack_require__(/*! ../pages/confirm_installation_page */ "./src/pages/confirm_installation_page.ts");
const congratulation_page_1 = __webpack_require__(/*! ../pages/congratulation_page */ "./src/pages/congratulation_page.ts");
const installing_page_1 = __webpack_require__(/*! ../pages/installing_page */ "./src/pages/installing_page.ts");
const overview_page_1 = __webpack_require__(/*! ../pages/overview_page */ "./src/pages/overview_page.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
function performInstallation() {
    (0, helpers_1.it)("should start installation", async function () {
        const confirmInstallation = new confirm_installation_page_1.ConfirmInstallationPage(helpers_1.page);
        const installing = new installing_page_1.InstallingPage(helpers_1.page);
        const overview = new overview_page_1.OverviewPage(helpers_1.page);
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        await sidebar.goToOverview();
        await overview.install();
        await confirmInstallation.continue();
        await installing.wait();
    });
    (0, helpers_1.it)("should finish installation", async function () {
        await new congratulation_page_1.CongratulationPage(helpers_1.page).wait(40 * 60 * 1000);
    }, 40 * 60 * 1000);
}
function finishInstallation() {
    (0, helpers_1.it)("should finish", async function () {
        const congratulation = new congratulation_page_1.CongratulationPage(helpers_1.page);
        await congratulation.wait(40 * 60 * 1000);
    }, 40 * 60 * 1000);
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
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const configuring_product_page_1 = __webpack_require__(/*! ../pages/configuring_product_page */ "./src/pages/configuring_product_page.ts");
const product_selection_page_1 = __webpack_require__(/*! ../pages/product_selection_page */ "./src/pages/product_selection_page.ts");
function productSelection(productName) {
    (0, helpers_1.it)(`should allow to select product ${productName}`, async function () {
        await new product_selection_page_1.ProductSelectionPage(helpers_1.page).selectProduct(productName);
    });
    (0, helpers_1.it)("should start configuring the product", async function () {
        await new configuring_product_page_1.ConfiguringProductPage(helpers_1.page).wait();
    });
}


/***/ }),

/***/ "./src/checks/registration.ts":
/*!************************************!*\
  !*** ./src/checks/registration.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.enterRegistration = enterRegistration;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const overview_page_1 = __webpack_require__(/*! ../pages/overview_page */ "./src/pages/overview_page.ts");
const registration_enter_code_page_1 = __webpack_require__(/*! ../pages/registration_enter_code_page */ "./src/pages/registration_enter_code_page.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
function enterRegistration(code) {
    (0, helpers_1.it)("should allow setting registration", async function () {
        const sidebar = new sidebar_page_1.SidebarWithRegistrationPage(helpers_1.page);
        const registration = new registration_enter_code_page_1.RegistrationEnterCodePage(helpers_1.page);
        await sidebar.goToRegistration();
        await registration.fillCode(code);
        await registration.register();
    });
    (0, helpers_1.it)("should not display option to register in Overview", async function () {
        await new overview_page_1.OverviewPage(helpers_1.page).waitWarningAlertToDisappear(2 * 60 * 1000);
    }, 2 * 60 * 1000);
}


/***/ }),

/***/ "./src/checks/root_authentication.ts":
/*!*******************************************!*\
  !*** ./src/checks/root_authentication.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setupRootPasswordAtALaterStage = setupRootPasswordAtALaterStage;
exports.setupRootPassword = setupRootPassword;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const setup_root_user_authentication_page_1 = __webpack_require__(/*! ../pages/setup_root_user_authentication_page */ "./src/pages/setup_root_user_authentication_page.ts");
const root_password_page_1 = __webpack_require__(/*! ../pages/root_password_page */ "./src/pages/root_password_page.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar_page */ "./src/pages/sidebar_page.ts");
const users_page_1 = __webpack_require__(/*! ../pages/users_page */ "./src/pages/users_page.ts");
function setupRootPasswordAtALaterStage(password) {
    (0, helpers_1.it)("should allow setting the root password", async function () {
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        const users = new users_page_1.UsersPage(helpers_1.page);
        const setARootPassword = new root_password_page_1.SetARootPasswordPage(helpers_1.page);
        await sidebar.goToUsers();
        await users.setAPassword();
        await setARootPassword.fillPassword(password);
        await setARootPassword.fillPasswordConfirmation(password);
        await setARootPassword.confirm();
        // puppeteer goes too fast and screen is unresponsive after submit, a small delay helps
        await (0, helpers_1.sleep)(2000);
    });
}
function setupRootPassword(password) {
    (0, helpers_1.it)("should setup root user authentication password", async function () {
        const setupRootuserAuthentication = new setup_root_user_authentication_page_1.SetupRootUserAuthenticationPage(helpers_1.page);
        // longer timeout to refresh repos when coming from product selection
        await setupRootuserAuthentication.wait(3 * 60 * 1000);
        await setupRootuserAuthentication.fillPassword(password);
        await setupRootuserAuthentication.submit();
    }, 3 * 60 * 1000);
}


/***/ }),

/***/ "./src/checks/storage_dasd.ts":
/*!************************************!*\
  !*** ./src/checks/storage_dasd.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.prepareDasdStorage = prepareDasdStorage;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
function prepareDasdStorage() {
    (0, helpers_1.it)("should prepare DASD storage", async function () {
        // Workaround, sometimes the UI seems not responsive
        await helpers_1.page.locator("a[href='#/storage']").click({ delay: 1000 });
        await helpers_1.page.locator("a[href='#/storage']").click({ delay: 1000 });
        await helpers_1.page.locator("a[href='#/storage/target-device']").click();
        await helpers_1.page.locator("span::-p-text('storage techs')").click();
        await helpers_1.page.locator("span::-p-text('DASD')").click({ delay: 1000 });
        // Enabling DASD device, by default it is always disabled
        await helpers_1.page.locator("input[name='checkrow0']").click({ delay: 1000 });
        await helpers_1.page.locator("span::-p-text('Perform an action')").click({ delay: 1000 });
        await helpers_1.page.locator("span::-p-text('Activate')").click();
        // Selecting installation device
        await helpers_1.page.locator("a[href='#/storage']").click();
        await helpers_1.page.locator("a[href='#/storage/target-device']").click({ delay: 1000 });
        await helpers_1.page.locator("input[aria-label='Select row 0']").click();
        await helpers_1.page.locator("button[form='targetSelection']").click();
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
exports.Desktop = exports.ProductId = exports.page = void 0;
exports.startBrowser = startBrowser;
exports.finishBrowser = finishBrowser;
exports.test_init = test_init;
exports.setContinueOnError = setContinueOnError;
exports.dumpPage = dumpPage;
exports.it = it;
exports.sleep = sleep;
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const http_1 = __importDefault(__webpack_require__(/*! http */ "http"));
const https_1 = __importDefault(__webpack_require__(/*! https */ "https"));
const zlib_1 = __importDefault(__webpack_require__(/*! zlib */ "zlib"));
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
        ({ page: exports.page } = await startBrowser(!options.headed, options.slowMo, options.browser, options.url));
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
// for product ids, please check https://github.com/agama-project/agama/tree/master/products.d
var ProductId;
(function (ProductId) {
    ProductId["Leap_16.0"] = "Leap 16.0";
    ProductId["MicroOS"] = "openSUSE MicroOS";
    ProductId["SLES_16.0"] = "SUSE Linux Enterprise Server 16.0";
    ProductId["SLES_SAP_16.0"] = "SUSE Linux Enterprise Server for SAP Applications 16.0";
    ProductId["Slowroll"] = "Slowroll";
    ProductId["Tumbleweed"] = "openSUSE Tumbleweed";
    ProductId["None"] = "none";
})(ProductId || (exports.ProductId = ProductId = {}));
;
var Desktop;
(function (Desktop) {
    Desktop["gnome"] = "GNOME Desktop Environment (Wayland)";
    Desktop["kde"] = "KDE Applications and Plasma Desktop";
    Desktop["xfce"] = "XFCE Desktop Environment";
    Desktop["basic"] = "A basic desktop (based on IceWM)";
    Desktop["none"] = "None";
})(Desktop || (exports.Desktop = Desktop = {}));
;


/***/ }),

/***/ "./src/pages/configuring_product_page.ts":
/*!***********************************************!*\
  !*** ./src/pages/configuring_product_page.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfiguringProductPage = void 0;
class ConfiguringProductPage {
    page;
    configuringTheProductText = () => this.page.locator("::-p-text(Configuring the product)");
    constructor(page) {
        this.page = page;
    }
    async wait() {
        await this.configuringTheProductText().wait();
    }
}
exports.ConfiguringProductPage = ConfiguringProductPage;


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
    congratulationText = () => this.page.locator("h2::-p-text('Congratulations!')");
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

/***/ "./src/pages/installing_page.ts":
/*!**************************************!*\
  !*** ./src/pages/installing_page.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InstallingPage = void 0;
class InstallingPage {
    page;
    installingTheSystemText = () => this.page.locator("::-p-text(Installing the)");
    constructor(page) {
        this.page = page;
    }
    async wait() {
        await this.installingTheSystemText().wait();
    }
}
exports.InstallingPage = InstallingPage;


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
    warningAlert = () => this.page.locator("::-p-text(Warning alert)");
    installButton = () => this.page.locator("button::-p-text(Install)");
    constructor(page) {
        this.page = page;
    }
    async waitWarningAlertToDisappear(timeout) {
        await this.warningAlert().setVisibility("hidden").setTimeout(timeout).wait();
    }
    async install() {
        await this.installButton().click();
    }
}
exports.OverviewPage = OverviewPage;


/***/ }),

/***/ "./src/pages/product_selection_page.ts":
/*!*********************************************!*\
  !*** ./src/pages/product_selection_page.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductSelectionPage = void 0;
class ProductSelectionPage {
    page;
    productText = (product) => this.page.locator(`::-p-text(${product})`);
    selectButton = () => this.page.locator("button[form='productSelectionForm']");
    constructor(page) {
        this.page = page;
    }
    async selectProduct(product) {
        (await this.productText(product).waitHandle()).scrollIntoView();
        await this.productText(product).click();
        await this.selectButton().click();
    }
}
exports.ProductSelectionPage = ProductSelectionPage;


/***/ }),

/***/ "./src/pages/registration_enter_code_page.ts":
/*!***************************************************!*\
  !*** ./src/pages/registration_enter_code_page.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegistrationEnterCodePage = void 0;
class RegistrationEnterCodePage {
    page;
    codeInput = () => this.page.locator("input#key");
    registertButton = () => this.page.locator("button[form='productRegistration']");
    constructor(page) {
        this.page = page;
    }
    async fillCode(code) {
        await this.codeInput().fill(code);
    }
    async register() {
        await this.registertButton().click();
    }
}
exports.RegistrationEnterCodePage = RegistrationEnterCodePage;


/***/ }),

/***/ "./src/pages/root_password_page.ts":
/*!*****************************************!*\
  !*** ./src/pages/root_password_page.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SetARootPasswordPage = void 0;
class SetARootPasswordPage {
    page;
    passwordInput = () => this.page.locator("input#password");
    passwordConfirmationInput = () => this.page.locator("input#passwordConfirmation");
    confirmText = () => this.page.locator("button::-p-text(Confirm)");
    constructor(page) {
        this.page = page;
    }
    async fillPassword(password) {
        await this.passwordInput().fill(password);
    }
    async fillPasswordConfirmation(password) {
        await this.passwordConfirmationInput().fill(password);
    }
    async confirm() {
        await this.confirmText().click();
    }
}
exports.SetARootPasswordPage = SetARootPasswordPage;


/***/ }),

/***/ "./src/pages/setup_root_user_authentication_page.ts":
/*!**********************************************************!*\
  !*** ./src/pages/setup_root_user_authentication_page.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SetupRootUserAuthenticationPage = void 0;
class SetupRootUserAuthenticationPage {
    page;
    rootPasswordInput = () => this.page.locator("input#rootPassword");
    submitButton = () => this.page.locator("button[type='submit']");
    constructor(page) {
        this.page = page;
    }
    async wait(timeout) {
        await this.rootPasswordInput().setTimeout(timeout).wait();
    }
    async fillPassword(password) {
        await this.rootPasswordInput().fill(password);
    }
    async submit() {
        await this.submitButton().click();
    }
}
exports.SetupRootUserAuthenticationPage = SetupRootUserAuthenticationPage;


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
    overviewText = () => this.page.locator("h3::-p-text('Overview')");
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
    async waitOverviewVisible(timeout) {
        await this.overviewText().setTimeout(timeout).wait();
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
    setAPasswordButton = () => this.page.locator("button::-p-text(Set a password)");
    constructor(page) {
        this.page = page;
    }
    async defineAUserNow() {
        await this.firstUserLink().click();
    }
    async setAPassword() {
        await this.setAPasswordButton().click();
    }
}
exports.UsersPage = UsersPage;


/***/ }),

/***/ "./src/test_default_installation.ts":
/*!******************************************!*\
  !*** ./src/test_default_installation.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// This is an example file for running Agama integration tests using Puppeteer.
// If the test fails it saves the page screenshot and the HTML page dump to
// ./log/ subdirectory. For more details about customization see the README.md
// file.
Object.defineProperty(exports, "__esModule", ({ value: true }));
// see https://nodejs.org/docs/latest-v20.x/api/test.html
const node_test_1 = __webpack_require__(/*! node:test */ "node:test");
const cmdline_1 = __webpack_require__(/*! ./lib/cmdline */ "./src/lib/cmdline.ts");
const commander_1 = __webpack_require__(/*! commander */ "./node_modules/commander/index.js");
const helpers_1 = __webpack_require__(/*! ./lib/helpers */ "./src/lib/helpers.ts");
const first_user_1 = __webpack_require__(/*! ./checks/first_user */ "./src/checks/first_user.ts");
const registration_1 = __webpack_require__(/*! ./checks/registration */ "./src/checks/registration.ts");
const login_1 = __webpack_require__(/*! ./checks/login */ "./src/checks/login.ts");
const installation_1 = __webpack_require__(/*! ./checks/installation */ "./src/checks/installation.ts");
const product_selection_1 = __webpack_require__(/*! ./checks/product_selection */ "./src/checks/product_selection.ts");
const storage_dasd_1 = __webpack_require__(/*! ./checks/storage_dasd */ "./src/checks/storage_dasd.ts");
const root_authentication_1 = __webpack_require__(/*! ./checks/root_authentication */ "./src/checks/root_authentication.ts");
// parse options from the command line
const options = (0, cmdline_1.parse)((cmd) => cmd
    .addOption(new commander_1.Option("--product-id <id>", "Product id to select a product to install")
    .choices(Object.keys(helpers_1.ProductId))
    .default("none"))
    .option("--registration-code <code>", "Registration code")
    .option("--install", "Proceed to install the system (the default is not to install it)")
    .option("--dasd", "Prepare DASD storage (the default is not to prepare it)"));
(0, node_test_1.describe)("Installation with default values", function () {
    (0, helpers_1.test_init)(options);
    (0, login_1.logIn)(options.password);
    if (options.productId !== "none")
        (0, product_selection_1.productSelection)(helpers_1.ProductId[options.productId]);
    (0, root_authentication_1.setupRootPassword)(options.rootPassword);
    if (options.registrationCode)
        (0, registration_1.enterRegistration)(options.registrationCode);
    (0, first_user_1.createFirstUser)("Bernhard M. Wiedemann", "bernhard", options.password);
    if (options.dasd)
        (0, storage_dasd_1.prepareDasdStorage)();
    if (options.install)
        (0, installation_1.performInstallation)();
});


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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__(__webpack_require__.s = "./src/test_default_installation.ts")))
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
/******/ 			"test_default_installation": 1
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
//# sourceMappingURL=test_default_installation.js.map