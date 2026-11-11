import { parse, commaSeparatedList } from "./lib/cmdline";
import { test_init } from "./lib/helpers";

import { logIn } from "./checks/login";
import { enterExtensionRegistrationPHub } from "./checks/registration";
import { changePatterns } from "./checks/software";
import { finishInstallation, performInstallation } from "./checks/installation";

const options = parse((cmd) =>
  cmd
    .option("--register-package-hub", "Registration for PackageHub")
    .option("--patterns <pattern>...", "Comma-separated list of patterns", commaSeparatedList),
);

test_init(options);

logIn(options.password);
enterExtensionRegistrationPHub();
changePatterns(options.patterns);
performInstallation();
finishInstallation();
