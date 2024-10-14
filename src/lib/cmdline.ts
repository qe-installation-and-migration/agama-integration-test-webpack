import { program, Option } from "commander";
import * as commander from "commander";

// parse command line argument as an integer
function getInt(value: string) {
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
export function parse(callback?: (cmd: commander.Command) => void) {
  // define the command line arguments and parse them
  const prg = program
    .description("Run a simple Agama integration test")
    .option("-u, --url <url>", "Agama server URL", "http://localhost")
    .option("-p, --password <password>", "Agama login password", "linux")
    .addOption(
      new Option("-b, --browser <browser>", "Browser used for running the test")
        .choices(["firefox", "chrome", "chromium"])
        .default("firefox")
    )
    .option(
      "-h, --headed",
      "Run the browser in headed mode with UI (the default is headless mode)"
    )
    .addOption(
      new Option(
        "-d, --delay <miliseconds>",
        "Delay between the browser actions, useful in headed mode"
      )
        .argParser(getInt)
        .default(0)
    )
    .option(
      "-c, --continue",
      "Continue the test after a failure (the default is abort on error)"
    );

  if (callback) callback(prg);

  prg.parse(process.argv);

  // parse options from the command line
  return program.opts();
}
