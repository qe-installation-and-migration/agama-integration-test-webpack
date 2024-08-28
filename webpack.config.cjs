const path = require("path");
const fs = require("fs");
const webpack = require('webpack');

module.exports = {
  entry: "./src/test_root_password.ts",
  output: {
    filename: "test_root_password.cjs",
    path: path.resolve(__dirname, "dist"),
    clean: true
  },
  // TODO: do we want to have the source maps?
  // devtool: "source-map",
  target: "node",
  mode: process.env.NODE_ENV || "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    // do not split the code into several files, generate a single output file
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    // prepend a hashbang at the beginning of the generated file
    new webpack.BannerPlugin({ banner: "#! /usr/bin/env -S node --test-timeout=60000", raw: true }),
    // make the file JS files executable
    function() {
      this.hooks.done.tap("Change permissions", (data) => {
        Object.keys(data.compilation.assets).forEach((file) => {
          if (file.match(/\.cjs$/)) {
            fs.chmodSync(`${__dirname}/dist/${file}`, 0o755);
          }
        });
      });
    },
  ],
};
