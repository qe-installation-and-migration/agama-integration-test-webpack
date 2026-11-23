import { parse, commaSeparatedList } from "./lib/cmdline";
import { test_init } from "./lib/helpers";

import { logIn } from "./checks/login";
import { finishInstallationCongratulation, performInstallation } from "./checks/installation";
import { enterExtensionRegistrationPHub } from "./checks/registration";
import { selectPatterns } from "./checks/software";
import { verifyStorageOutOfSync } from "./checks/storage_out_of_sync";

const options = parse((cmd) =>
  cmd
    .option("--register-package-hub", "Registration for PackageHub")
    .option("--patterns <pattern>...", "Comma-separated list of patterns", commaSeparatedList),
);

test_init(options);

logIn(options.password);
enterExtensionRegistrationPHub();
selectPatterns(options.patterns);
verifyStorageOutOfSync();
performInstallation();
finishInstallationCongratulation();
