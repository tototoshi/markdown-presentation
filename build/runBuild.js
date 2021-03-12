const webpack = require("webpack");
const { produce } = require("immer");

const getBaseConfig = require("./getBaseConfig");

module.exports = function build(outputPath, filename) {
  const baseConfig = getBaseConfig();

  const config = produce(baseConfig, (draft) => {
    draft.target = "browserslist";
    draft.mode = "production";
    draft.output.path = outputPath;
    draft.plugins.push(
      new webpack.ProvidePlugin({
        __markdown_presentation_source__: require.resolve(filename),
      })
    );
  });

  webpack(config, (error, stats) => {
    if (error) {
      console.error(error);
    }
    if (stats.hasErrors()) {
      console.log(stats);
    }
  });
};
