const webpack = require("webpack");
const { produce } = require("immer");
const middleware = require("webpack-dev-middleware");
const http = require("http");
const express = require("express");

const getBaseConfig = require("./getBaseConfig");
const createSocket = require("./createSocket");
const AssetCopyWebpackPlugin = require("./AssetCopyWebpackPlugin");
const ThemeWebpackPlugin = require("./ThemeWebpackPlugin");
const HighlightJSThemeWebpackPlugin = require("./HighlightJSThemeWebpackPlugin");

function getServerConfig(cwd, outputPath, filename, theme, highlight) {
  const baseConfig = getBaseConfig();
  return produce(baseConfig, (draft) => {
    draft.output.path = outputPath;
    draft.plugins.push(
      new webpack.EntryPlugin(__dirname, require.resolve("../client/client"), {
        name: undefined,
      })
    );
    draft.plugins.push(
      new ThemeWebpackPlugin({
        name: theme,
      })
    );
    draft.plugins.push(
      new HighlightJSThemeWebpackPlugin({
        name: highlight,
      })
    );
    draft.plugins.push(
      new webpack.ProvidePlugin({
        __markdown_presentation_events__: require.resolve("./events"),
        __markdown_presentation_source__: require.resolve(filename),
      })
    );
    draft.plugins.push(new AssetCopyWebpackPlugin(cwd, outputPath));
  });
}

module.exports = function runServer(
  cwd,
  outputPath,
  port,
  filename,
  writeToDisk,
  theme,
  highlight
) {
  const app = express();
  const server = http.createServer(app);
  const compiler = webpack(
    getServerConfig(cwd, outputPath, filename, theme, highlight)
  );

  app.use(middleware(compiler, { writeToDisk }));

  createSocket(server, filename);

  server.listen(port, () => console.log(`listening on port ${port}`));
};
