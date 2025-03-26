// This is an example file for running Agama integration tests using Puppeteer.
// If the test fails it saves the page screenshot and the HTML page dump to
// ./log/ subdirectory. For more details about customization see the README.md
// file.

// see https://nodejs.org/docs/latest-v20.x/api/test.html

import { parse, commaSeparatedList } from "./lib/cmdline";
import { test_init } from "./lib/helpers";

import {
  verifyNotImplemented,
  verifyNotSupported,
  verifyAutoYaSTUnsupportedElements,
  abort,
} from "./checks/autoyast_unsupported";
import { logIn } from "./checks/login";

// parse options from the command line
const options = parse((cmd) =>
  cmd
    .option(
      "--not-implemented <elements>",
      "comma-separated list of not implemented yet elements",
      commaSeparatedList,
    )
    .option(
      "--not-supported <elements>",
      "comma-separated list of not supported elements",
      commaSeparatedList,
    ),
);

test_init(options);
logIn(options.password);
if (options.notImplemented) verifyNotImplemented(options.notImplemented);
verifyNotSupported(options.notSupported);
verifyAutoYaSTUnsupportedElements();
abort();
