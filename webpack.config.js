const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/scripts/index.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/scripts/"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
};
