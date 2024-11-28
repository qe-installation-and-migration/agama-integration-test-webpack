#! /usr/bin/env node
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/checks/login.ts":
/*!*****************************!*\
  !*** ./src/checks/login.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.login = login;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const login_as_root_page_1 = __webpack_require__(/*! ../pages/login-as-root-page */ "./src/pages/login-as-root-page.ts");
function login(password) {
    (0, helpers_1.it)("allows logging in", async function () {
        const loginAsRoot = new login_as_root_page_1.LoginAsRootPage(helpers_1.page);
        await loginAsRoot.fillPassword(password);
        await loginAsRoot.logIn();
    });
}


/***/ }),

/***/ "./src/checks/perform_installation.ts":
/*!********************************************!*\
  !*** ./src/checks/perform_installation.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.performInstallation = performInstallation;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
function performInstallation() {
    // it("should start installation", async function () {
    //     // todo: button is moving in the page and fails in slow machines
    //     await sleep(2000);
    //     await page.locator("button::-p-text('Install')").click();
    //     await page.locator("button::-p-text('Continue')").click();
    //     await page.locator("::-p-text(Installing the)").wait();
    // });
    (0, helpers_1.it)("should finish installation", async function () {
        await helpers_1.page
            .locator("h2::-p-text('Congratulations!')")
            .setTimeout(40 * 60 * 1000)
            .wait();
    }, 40 * 60 * 1000);
}


/***/ }),

/***/ "./src/checks/select_pattern.ts":
/*!**************************************!*\
  !*** ./src/checks/select_pattern.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.selectPattern = selectPattern;
const helpers_1 = __webpack_require__(/*! ../lib/helpers */ "./src/lib/helpers.ts");
const sidebar_page_1 = __webpack_require__(/*! ../pages/sidebar-page */ "./src/pages/sidebar-page.ts");
const software_page_1 = __webpack_require__(/*! ../pages/software-page */ "./src/pages/software-page.ts");
const software_selection_page_1 = __webpack_require__(/*! ../pages/software-selection-page */ "./src/pages/software-selection-page.ts");
function selectPattern(pattern) {
    (0, helpers_1.it)(`should select pattern ${pattern}`, async function () {
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        const software = new software_page_1.SoftwarePage(helpers_1.page);
        const softwareSelection = new software_selection_page_1.SoftwareSelectionPage(helpers_1.page);
        await sidebar.goToSoftware();
        await software.changeSelection();
        await softwareSelection.selectPattern(pattern);
        await softwareSelection.close();
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parse = parse;
const commander_1 = __webpack_require__(/*! commander */ "./node_modules/commander/index.js");
const commander = __importStar(__webpack_require__(/*! commander */ "./node_modules/commander/index.js"));
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
        .option("-h, --headed", "Run the browser in headed mode with UI (the default is headless mode)")
        .addOption(new commander_1.Option("-d, --delay <miliseconds>", "Delay between the browser actions, useful in headed mode")
        .argParser(getInt)
        .default(0))
        .option("-c, --continue", "Continue the test after a failure (the default is abort on error)");
    if (callback)
        callback(prg);
    prg.parse(process.argv);
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.page = void 0;
exports.startBrowser = startBrowser;
exports.finishBrowser = finishBrowser;
exports.test_init = test_init;
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
            height: 768,
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
// helper function, dump the index.css file so the HTML dump can properly displayed
async function dumpCSS() {
    let cssData = [];
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


/***/ }),

/***/ "./src/pages/login-as-root-page.ts":
/*!*****************************************!*\
  !*** ./src/pages/login-as-root-page.ts ***!
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

/***/ "./src/pages/sidebar-page.ts":
/*!***********************************!*\
  !*** ./src/pages/sidebar-page.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SidebarPage = void 0;
class SidebarPage {
    page;
    overviewLink = () => this.page.locator("a[href='#/overview']");
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


/***/ }),

/***/ "./src/pages/software-page.ts":
/*!************************************!*\
  !*** ./src/pages/software-page.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SoftwarePage = void 0;
class SoftwarePage {
    page;
    changeSelectionButton = () => this.page.locator("button::-p-text(ChangeSelection)");
    constructor(page) {
        this.page = page;
    }
    async changeSelection() {
        await this.changeSelectionButton().click();
    }
}
exports.SoftwarePage = SoftwarePage;


/***/ }),

/***/ "./src/pages/software-selection-page.ts":
/*!**********************************************!*\
  !*** ./src/pages/software-selection-page.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SoftwareSelectionPage = void 0;
class SoftwareSelectionPage {
    page;
    patternText = (pattern) => this.page.locator(`::-p-text('${pattern}')`);
    closeButton = () => this.page.locator("button::-p-text(Close)");
    constructor(page) {
        this.page = page;
    }
    async selectPattern(pattern) {
        await this.patternText(pattern).click();
    }
    async close() {
        await this.closeButton().click();
    }
}
exports.SoftwareSelectionPage = SoftwareSelectionPage;


/***/ }),

/***/ "./src/test_graphical_environments.ts":
/*!********************************************!*\
  !*** ./src/test_graphical_environments.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// This is an example file for running Agama integration tests using Puppeteer.
// If the test fails it saves the page screenshot and the HTML page dump to
// ./log/ subdirectory. For more details about customization see the README.md
// file.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// see https://nodejs.org/docs/latest-v20.x/api/test.html
const node_test_1 = __webpack_require__(/*! node:test */ "node:test");
// see https://nodejs.org/docs/latest-v20.x/api/assert.html
const strict_1 = __importDefault(__webpack_require__(/*! node:assert/strict */ "node:assert/strict"));
const cmdline_1 = __webpack_require__(/*! ./lib/cmdline */ "./src/lib/cmdline.ts");
const helpers_1 = __webpack_require__(/*! ./lib/helpers */ "./src/lib/helpers.ts");
const login_1 = __webpack_require__(/*! ./checks/login */ "./src/checks/login.ts");
const perform_installation_1 = __webpack_require__(/*! ./checks/perform_installation */ "./src/checks/perform_installation.ts");
const sidebar_page_1 = __webpack_require__(/*! ./pages/sidebar-page */ "./src/pages/sidebar-page.ts");
const select_pattern_1 = __webpack_require__(/*! ./checks/select_pattern */ "./src/checks/select_pattern.ts");
// parse options from the command line
const options = (0, cmdline_1.parse)((cmd) => cmd.option("-i, --install", "Proceed to install the system (the default is not to install it)")
    .option("-s, --software <name>", "Proceed to select pattern", "GNOME Desktop Environment (Wayland)"));
(0, node_test_1.describe)("Agama test", function () {
    (0, helpers_1.test_init)(options);
    (0, helpers_1.it)("should have Agama page title", async function () {
        strict_1.default.deepEqual(await helpers_1.page.title(), "Agama");
    });
    (0, login_1.login)(options.password);
    (0, select_pattern_1.selectPattern)(options.pattern);
    (0, helpers_1.it)("should be ready for installation", async function () {
        const sidebar = new sidebar_page_1.SidebarPage(helpers_1.page);
        await sidebar.goToOverview();
        await helpers_1.page.locator("button::-p-text(Install)").wait();
    });
    if (options.install)
        (0, perform_installation_1.performInstallation)();
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

/***/ "constants":
/*!****************************!*\
  !*** external "constants" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("constants");

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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__(__webpack_require__.s = "./src/test_graphical_environments.ts")))
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
/******/ 			"test_graphical_environments": 1
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
//# sourceMappingURL=test_graphical_environments.js.map