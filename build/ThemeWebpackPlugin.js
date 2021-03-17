const webpack = require("webpack");

module.exports = class {
  constructor(options) {
    if (typeof options === "undefined") {
      return;
    }

    if (typeof options.name === "undefined") {
      this.name = "default";
    } else {
      this.name = options.name;
    }
  }

  apply(compiler) {
    new webpack.EntryPlugin(
      __dirname,
      require.resolve("../theme/default.css"),
      {
        name: "theme_default",
      }
    ).apply(compiler);

    if (this.name === "default") {
      return;
    }

    new webpack.EntryPlugin(
      __dirname,
      require.resolve(`../theme/${this.name}.css`),
      {
        name: `theme_${this.name}`,
      }
    ).apply(compiler);
  }
};
