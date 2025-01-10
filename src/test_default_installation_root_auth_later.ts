// This is an example file for running Agama integration tests using Puppeteer.
// If the test fails it saves the page screenshot and the HTML page dump to
// ./log/ subdirectory. For more details about customization see the README.md
// file.

// see https://nodejs.org/docs/latest-v20.x/api/test.html
import { describe } from "node:test";

import { parse } from "./lib/cmdline";
import { Option } from "commander";
import { test_init, ProductId } from "./lib/helpers";

import { logIn } from "./checks/login";
import { createFirstUser } from "./checks/first_user";
import { performInstallation } from "./checks/installation";
import { prepareDasdStorage } from "./checks/storage_dasd";
import { productSelectionByName } from "./checks/product_selection";
import { setupRootPasswordAtALaterStage } from "./checks/root_authentication";

// parse options from the command line
const options = parse((cmd) =>
  cmd
    .addOption(
      new Option("--product-id <id>", "Product id to select a product to install")
        .choices(Object.keys(ProductId))
        .default("none"),
    )
    .option("--install", "Proceed to install the system (the default is not to install it)")
    .option("--dasd", "Prepare DASD storage (the default is not to prepare it)"),
);

describe("Installation with default values", function () {
  test_init(options);

  logIn(options.password);
  if (options.productId !== "none") productSelectionByName(ProductId[options.productId]);
  createFirstUser("Bernhard M. Wiedemann", "bernhard", options.password);
  setupRootPasswordAtALaterStage(options.password);
  if (options.dasd) prepareDasdStorage();
  if (options.install) performInstallation();
});
