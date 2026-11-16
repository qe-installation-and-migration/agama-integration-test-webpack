import { describe } from "node:test";

import { parse } from "./lib/cmdline";
import { test_init } from "./lib/helpers";

import { logIn } from "./checks/login";
import { finishInstallationCongratulation } from "./checks/installation";
import { verifyActivateMultipath } from "./checks/multipath";

const options = parse((cmd) => cmd.option("--activate-multipath", "Activate multipath"));

describe("Running installation", function () {
  test_init(options);

  logIn(options.password);
  if (options.activateMultipath) verifyActivateMultipath();
  finishInstallationCongratulation();
});
