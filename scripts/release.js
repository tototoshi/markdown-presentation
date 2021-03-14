#!/usr/bin/env node

const path = require("path");

const child_process = require("child_process");
const spawn = require("./util/spawn");
const question = require("./util/question");
const confirm = require("./util/confirm");
const writeFileUtf8 = require("write-file-utf8");

const root = path.resolve(__dirname, "..");
const packageJson = path.resolve(root, "package.json");
const packageInfo = require(path.resolve(root, "package.json"));

async function main() {
  process.chdir(root);

  const diff = child_process.execSync("git status --porcelain");
  if (diff.length > 0) {
    console.error("Workspace is not clean");
    process.exit(1);
  }

  const version = await question(
    `Please input the next version (current: ${packageInfo.version}): `
  );

  console.log(`Will release version ${version}`);

  await writeFileUtf8(
    packageJson,
    JSON.stringify({ ...packageInfo, version: version }, null, 2),
    { encoding: "utf8" }
  );

  await spawn("npm", ["install"]);

  if (!(await confirm("Do you want to commit? [y/n]: "))) {
    return;
  }

  await spawn("git", ["add", "package.json", "package-lock.json"]);
  await spawn("git", ["commit", "-m", `v${version}`]);
  await spawn("git", ["tag", `v${version}`]);

  if (!(await confirm("Do you want to publish? [y/n]: "))) {
    return;
  }

  await spawn("npm", ["publish", "--access", "public"]);

  if (!(await confirm("Do you want to push commits and tags? [y/n]: "))) {
    return;
  }

  await spawn("git", ["push"]);
  await spawn("git", ["push", "--tags"]);

  console.log("All Done!");
}

main().catch((e) => console.error(e));
