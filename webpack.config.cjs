const path = require("path");
const fs = require("fs");
const webpack = require("webpack");

const entry = {}
// process all ./src/test-*.ts files
fs.readdirSync("./src").filter(f => f.startsWith("test-") && f.endsWith(".ts")).forEach(
  (f) => { entry[path.basename(f, ".ts")] = "./src/" + f }
);

module.exports = {
  entry,
  output: {
    filename: "[name].cjs",
    path: path.resolve(__dirname, "dist"),
    clean: true
  },
  // the source map is generated only in the development mode
  devtool: "inline-source-map",
  target: "node",
  mode: process.env.NODE_ENV || "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    // do not split the code into several files, generate a single output file
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    // prepend a hashbang at the beginning of the generated file
    new webpack.BannerPlugin({ banner: "#! /usr/bin/env -S node --enable-source-maps --test-timeout=60000", raw: true, test: /^test-.*\.cjs$/ }),
    // make the file JS files executable
    function () {
      this.hooks.done.tap("Change permissions", (data) => {
        Object.keys(data.compilation.assets).forEach((file) => {
          if (file.match(/^test-.*\.cjs$/)) {
            fs.chmodSync(`${__dirname}/dist/${file}`, 0o755);
          }
        });
      });
    },
  ],
};
