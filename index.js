const fs = require("fs");
const path = require("path");
const program = require("commander");

const runBuild = require("./build/runBuild");
const runServer = require("./build/runServer");

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
      runBuild(outputPath, filename);
    }
  } else {
    program.help();
  }
}

main();
