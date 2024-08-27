# Webpack Experiment

This is experimental repository for compiling the
[Agama](https://github.com/openSUSE/agama) integration test into a single file
with all dependencies bundled.

The idea is to remove Puppeteer and it's dependencies from the Live ISO and
bundle them into the test to make a single static file. Then copy the file to
the Live ISO and run it.

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

## Executing the Test

So far the test still needs to be executed via the `mocha.js` script:

    node --enable-source-maps node_modules/mocha/bin/mocha.js --bail dist/test_root_password.cjs
