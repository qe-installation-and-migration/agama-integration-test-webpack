# Webpack Experiment TEST

This is experimental repository for compiling the
[Agama](https://github.com/agama-project/agama) integration tests and bundling
all dependencies into a single file.

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

First install the needed NPM packages:

    npm ci

## Compilation

To compile the source test files run:

    npm run build

This compiles the sources into the `dist` subdirectory.

To generate the target files without optimizations run this command:

    npm run devel

In this case the generated files are a bit bigger.

To rebuild the tests during development automatically you can run:

    npm run watch

This builds the tests in development mode to have faster builds.

By default the ESlint checks are enabled, if you want to disable them set
`ESLINT=0` environment variable. For example use `ESLINT=0 npm run watch`.

## Executing the Test

The generated test is executable, simply run it (this connects to the locally
running Agama instance, to use a remote one see the options below):

    ./dist/test_root_password.js

If you copy the test to different machine do not forget to also copy the
`vendor.js` file and `*.map` files if you want to get backtrace locations in the
original source code. To use the map files use the `--enable-source-maps` node
option:

    node --enable-source-maps ./dist/test_root_password.js

To use the TAP output format, use the `--test-reporter` Node.js option:

    node --test-reporter=tap ./dist/test_root_password.cjs

Alternatively it is possible to implement [own test reporter](
https://www.nearform.com/insights/writing-a-node-js-test-reporter/).

The test currently accepts several optional arguments, run
`./dist/test_root_password.js --help`:

```
Usage: test_root_password [options]
Run a simple Agama integration test
Options:
  -u, --url <url>                 Agama server URL (default:
                                  "http://localhost")
  -p, --password <password>       Agama login password (default: "linux")
  -r, --root-password <password>  Target root login password (default:
                                  "linux")
  -b, --browser <browser>         Browser used for running the test (choices:
                                  "firefox", "chrome", "chromium", default:
                                  "firefox")
  -h, --headed                    Run the browser in headed mode with UI (the
                                  default is headless mode)
  -d, --delay <miliseconds>       Delay between the browser actions, useful
                                  in headed mode (default: 0)
  -c, --continue                  Continue the test after a failure (the
                                  default is abort on error)
  --help                          display help for command
```

Full example for running the browser in the English locale, using local Chrome
browser in headed mode and connecting to a remote Agama instance:

    LC_ALL=en_US.UTF-8 ./dist/test_root_password.js -h -b chrome -u https://agama.local

## Notes

- It uses the Node.js built-in testing framework and the runner instead of Mocha.js
  (or any similar framework) which needs a special test runner that cannot be
  bundled into the generated file by Webpack.
