const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = function getBaseConfig() {
  const context = path.resolve(__dirname, "..");

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
        {
          test: /\.s[ac]ss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new ForkTsCheckerWebpackPlugin(),
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
  };
};
