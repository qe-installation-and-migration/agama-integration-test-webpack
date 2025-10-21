import { parse, commaSeparatedList } from "./lib/cmdline";
import { test_init } from "./lib/helpers";

import { logIn } from "./checks/login";
import { enterExtensionRegistrationPHub } from "./checks/registration";
import { selectPatterns } from "./checks/software_selection";
import { performInstallation, finishInstallation } from "./checks/installation";

const options = parse((cmd) =>
  cmd
    .option("--register-package-hub", "Registration for PackageHub")
    .option("--patterns <pattern>...", "comma-separated list of patterns", commaSeparatedList),
);

test_init(options);
logIn(options.password);
enterExtensionRegistrationPHub();
selectPatterns(options.patterns);
performInstallation();
finishInstallation();
