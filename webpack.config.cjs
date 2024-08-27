const path = require("path");

module.exports = {
  entry: "./src/test_root_password.js",
  output: {
    filename: "test_root_password.cjs",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
  target: "node",
  mode: process.env.NODE_ENV || "production" 
};
