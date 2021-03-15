const fs = require("fs");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = class {
  constructor(cwd, outputPath) {
    this.cwd = cwd;
    this.outputPath = outputPath;
  }

  apply(compiler) {
    const assetsDir = path.resolve(this.cwd, "assets");

    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${assetsDir}/**/*`,
          context: this.cwd,
          to: this.outputPath,
          noErrorOnMissing: true,
        },
      ],
    }).apply(compiler);
  }
};
