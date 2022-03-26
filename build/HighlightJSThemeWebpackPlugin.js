const webpack = require("webpack");

module.exports = class {
  constructor(options) {
    this.name = options.name;
  }

  apply(compiler) {
    try {
      require.resolve(`highlight.js/styles/${this.name}.css`);
    } catch (e) {
      console.error(`Theme not found. [${this.name}]`);
      this.name = "default";
    }
    new webpack.EntryPlugin(
      __dirname,
      require.resolve(`highlight.js/styles/${this.name}.css`),
      {
        name: `highlight.js_styles_${this.name}`,
      }
    ).apply(compiler);
  }
};
