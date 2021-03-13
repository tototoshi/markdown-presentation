const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = function getBaseConfig() {
  const context = path.resolve(__dirname, "..");

  const assetsDir = path.resolve("assets");

  const copyPlugin = fs.existsSync(assetsDir)
    ? [
        new CopyWebpackPlugin({
          patterns: [{ from: "assets/**/*" }],
        }),
      ]
    : [];

  return {
    context,
    // https://github.com/webpack/webpack-dev-server/issues/2758
    // https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/docs/TROUBLESHOOTING.md#webpack-5-compatibility-issues-with-webpack-dev-server3
    // In webpack-dev-server@3, there is a bug causing it to mis-judge the runtime environment when the Webpack 5 browserslist target is used.
    target: "web",
    mode: "development",
    entry: "./src/index.ts",
    devtool: "inline-source-map",
    output: {},
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: path.resolve(context, "src"),
          use: {
            loader: "babel-loader",
            options: {
              cwd: context,
              presets: ["@babel/preset-env", "@babel/preset-typescript"],
            },
          },
        },
        {
          test: /\.md$/,
          type: "asset/source",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new ForkTsCheckerWebpackPlugin(),
      ...copyPlugin,
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
  };
};
