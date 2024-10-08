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

export function parse() {
  // define the command line arguments and parse them
  // see https://github.com/tj/commander.js
  program
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
    )
    .parse(process.argv);

  // parse options from the command line
  return program.opts();
}
