const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  // https://github.com/webpack/webpack-dev-server/issues/2758
  // https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/docs/TROUBLESHOOTING.md#webpack-5-compatibility-issues-with-webpack-dev-server3
  // In webpack-dev-server@3, there is a bug causing it to mis-judge the runtime environment when the Webpack 5 browserslist target is used.
  target: "web",
  mode: "development",
  entry: "./src/index.tsx",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    watchContentBase: true,
    hot: false,
    writeToDisk: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
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
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, "assets"), to: path.resolve(__dirname, "dist") }],
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
};
