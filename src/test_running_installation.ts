import { describe } from "node:test";

import { parse } from "./lib/cmdline";
import { test_init } from "./lib/helpers";

import { logIn } from "./checks/login";
import { verifyActivateMultipath } from "./checks/multipath";
import { finishInstallation } from "./checks/installation";

const options = parse((cmd) => cmd.option("--activate-multipath", "Activate multipath"));

describe("Running installation", function () {
  test_init(options);

  logIn(options.password);
  if (options.activateMultipath) verifyActivateMultipath();
  finishInstallation();
});
