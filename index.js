const fs = require("fs");
const http = require("http");
const path = require("path");
const EventEmitter = require("events");
const express = require("express");

const program = require("commander");

const webpack = require("webpack");
const middleware = require("webpack-dev-middleware");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const readFile = require("./serve/readFile");

const app = express();
const server = http.createServer(app);

function getBaseConfig() {
  const assetsDir = path.resolve("assets");
  const outDir = path.resolve("dist");

  const copyPlugin = fs.existsSync(assetsDir)
    ? [new CopyWebpackPlugin({ patterns: [{ from: assetsDir, to: outDir }] })]
    : [];

  return {
    context: __dirname,
    // https://github.com/webpack/webpack-dev-server/issues/2758
    // https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/docs/TROUBLESHOOTING.md#webpack-5-compatibility-issues-with-webpack-dev-server3
    // In webpack-dev-server@3, there is a bug causing it to mis-judge the runtime environment when the Webpack 5 browserslist target is used.
    target: "web",
    mode: "development",
    entry: "./src/index.tsx",
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: path.resolve(__dirname, "src"),
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cwd: __dirname,
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
}

function build(outputPath, filename) {
  const baseConfig = getBaseConfig();
  const config = {
    ...baseConfig,
    target: "browserslist",
    mode: "production",
    output: {
      path: outputPath,
    },
    plugins: [
      ...baseConfig.plugins,
      new webpack.ProvidePlugin({
        __markdown_presentation_source__: require.resolve(filename),
      }),
    ],
  };

  webpack(config, (error, stats) => {
    if (error) {
      console.error(error);
    }
    if (stats.hasErrors()) {
      console.log(stats);
    }
  });
}

function runServer(outputPath, port, filename, writeToDisk) {
  const baseConfig = getBaseConfig();
  const config = {
    ...baseConfig,
    output: {
      path: outputPath,
    },
    plugins: [
      ...baseConfig.plugins,
      new webpack.EntryPlugin(__dirname, require.resolve("./client/client"), {
        name: undefined,
      }),
      new webpack.ProvidePlugin({
        __markdown_presentation_events__: require.resolve("./serve/events"),
        __markdown_presentation_source__: require.resolve(filename),
      }),
    ],
  };

  const compiler = webpack(config);

  const FS_EVENT_CONTENT_CHANGED = "content-changed";
  const SOCKET_IO_EVENT_CONTENT_CHANGED = "content-changed";

  const fsEvents = new EventEmitter();

  fs.watch(filename, {}, () => {
    fsEvents.emit(FS_EVENT_CONTENT_CHANGED, readFile(filename));
  });

  app.use(
    middleware(compiler, {
      writeToDisk,
    })
  );

  const io = require("socket.io")(server);

  io.on("connection", (socket) => {
    const callback = (source) => {
      socket.emit(SOCKET_IO_EVENT_CONTENT_CHANGED, source);
    };

    fsEvents.on(FS_EVENT_CONTENT_CHANGED, callback);

    socket.on("disconnect", () => {
      fsEvents.off(FS_EVENT_CONTENT_CHANGED, callback);
    });
  });

  server.listen(port, () => console.log(`listening on port ${port}`));
}

const DEFAULT_PORT = 8080;

const packageInfo = require("./package.json");

function main() {
  program
    .name(packageInfo.name.replace("@tototoshi/", ""))
    .version(packageInfo.version)
    .option(
      "-p, --port <port>",
      "The port the server will listen on",
      DEFAULT_PORT
    )
    .option("-w, --write", "Write files")
    .option("-s, --serve", "Run dev server")
    .arguments("<filename>")
    .parse(process.argv);
  const options = program.opts();
  const port = parseInt(options.port);
  const write = options.write || false;
  const serve = options.serve || false;

  if (program.args.length === 1) {
    const cwd = process.cwd();
    const filename = path.resolve(cwd, program.args[0]);

    if (!fs.existsSync(filename)) {
      console.error(`${filename} does not exist`);
      process.exit(1);
    }

    const outputPath = path.resolve("dist");

    if (serve) {
      runServer(outputPath, port, filename, write);
    } else {
      build(outputPath, filename);
    }
  } else {
    program.help();
  }
}

main();
