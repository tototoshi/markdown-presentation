const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = class {
  constructor(cwd, outputPath) {
    this.cwd = cwd;
    this.outputPath = outputPath;
  }

  apply(compiler) {
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(this.cwd, "assets/**/*"),
          context: this.cwd,
          to: this.outputPath,
        },
      ],
    }).apply(compiler);
  }
};
