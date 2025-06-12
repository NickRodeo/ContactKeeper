const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/frontend/client.tsx",
  output: {
    path: path.resolve(__dirname, "dist/src/frontend"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "source-map",
};
