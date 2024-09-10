# Webpack Experiment

This is experimental repository for compiling the
[Agama](https://github.com/openSUSE/agama) integration test into a single file
with all dependencies bundled.

## Advantages

- Puppeteer and it's dependencies are not needed on the Live ISO
- The tests can use additional libraries if needed, they do not need to depend
  on the Live ISO content
- The used Puppeteer version is not bound to the Live ISO (it only needs to be
  compatible with the included Firefox browser), the version update is simple
- The builtin Node.js test runner supports the [Test Anything
  Protocol](https://en.wikipedia.org/wiki/Test_Anything_Protocol) (TAP),
  already supported by openQA

## Preparation

First install the NPM packages:

    npm ci

Then we need to patch the Puppeteer code and remove the magic `webpackIgnore`
comments which prevents from including some files in the bundle:

    find node_modules/puppeteer-core/lib -type f -exec sed -i -e "s/webpackIgnore//" \{\} \;

## Compilation

To compile the source test file run:

    npx webpack

This generates the new files into the `dist` subdirectory.

To generate the target file with source map and without optimizations set the
`development` mode:

    NODE_ENV=development npx webpack

In this mode the generated file is significantly bigger.

## Executing the Test

The generated test is executable, simply run it (this connects to the locally
running Agama instance, to use a remote one see the options below):

    ./dist/test_root_password.cjs

To use the TAP output format, use the `--test-reporter` Node.js option:

    node --test-reporter=tap ./dist/test_root_password.cjs

Alternatively it is possible to implement [own test reporter](
https://www.nearform.com/insights/writing-a-node-js-test-reporter/).

The test currently accepts several optional arguments, run
`./dist/test_root_password.cjs --help`:

    Usage: test_root_password [options]

    Run a simple Agama integration test

    Options:
      -u, --url <url>            Agama server URL (default: "http://localhost")
      -p, --password <password>  Agama login password (default: "linux")
      -b, --browser <browser>    Browser used for running the test (choices:
                                 "firefox", "chrome", "chromium", default:
                                 "firefox")
      -h, --headed               Run the browser in headed mode with UI (the
                                 default is headless mode)
      -d, --delay <miliseconds>  Delay between the browser actions, useful in
                                 headed mode (default: 0)
      -c, --continue             Continue the test after a failure (the default is
                                 abort on error)
      --help                     display help for command

Full example for running the browser in the English locale, using local Chrome
browser in headed mode and connecting to a remote Agama instance:

    LC_ALL=en_US.UTF-8 ./dist/test_root_password.cjs -h -b chrome -u https://agama.local

## Notes

- It uses the Node.js built-in test framework and the runner instead of Mocha.js
  (or any similar framework) which needs a special test runner that cannot be
  bundled into the generated file by Webpack.

## TODO

- [x] Dump the HTML page and screenshot on test failure
- [ ] Split the test into small reusable parts
- [x] Use the [commander.js](https://github.com/tj/commander.js) library and
  implement a standard command line option parsing
- [ ] Check why Puppeteer uses that `webpackIgnore` comments, is there a better
  way than patching the Puppeteer code?
