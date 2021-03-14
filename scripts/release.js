#!/usr/bin/env node

const path = require("path");

const child_process = require("child_process");
const spawn = require("./util/spawn");
const prompts = require("prompts");
const writeFileUtf8 = require("write-file-utf8");

const root = path.resolve(__dirname, "..");
const packageJson = path.resolve(root, "package.json");
const packageInfo = require(path.resolve(root, "package.json"));

function checkIfWorkingDirectoryIsClean() {
  const diff = child_process.execSync("git status --porcelain");
  if (diff.length > 0) {
    console.error("Workspace is not clean");
    process.exit(1);
  }
}

async function updatePackgeJson(version) {
  await writeFileUtf8(
    packageJson,
    JSON.stringify({ ...packageInfo, version: version }, null, 2),
    { encoding: "utf8" }
  );

  await spawn("npm", ["install"]);
}

async function commit(version) {
  const answer = await prompts({
    type: "confirm",
    message: "Do you want to commit?",
    name: "doCommit",
  });

  if (!answer.doCommit) {
    return;
  }

  await spawn("git", ["add", "package.json", "package-lock.json"]);
  await spawn("git", ["commit", "-m", `v${version}`]);
  await spawn("git", ["tag", `v${version}`]);
}

async function publish() {
  const answer = await prompts({
    type: "confirm",
    message: "Do you want to publish?",
    name: "doPublish",
  });

  if (!answer.doPublish) {
    return;
  }

  await spawn("npm", ["publish", "--access", "public"]);
}

async function pushCommitAndTag() {
  const answer = await prompts({
    type: "confirm",
    message: "Do you want to push commits and tags?",
    name: "doPush",
  });

  if (!answer.doPush) {
    return;
  }

  await spawn("git", ["push"]);
  await spawn("git", ["push", "--tags"]);
}

async function main() {
  process.chdir(root);

  checkIfWorkingDirectoryIsClean();

  const answer = await prompts({
    type: "text",
    message: `Please input the next version (current: ${packageInfo.version})`,
    name: "version",
  });

  console.log(`Will release version ${answer.version}`);

  await updatePackgeJson(answer.version);

  await commit(answer.version);

  await publish();

  await pushCommitAndTag();

  console.log("All Done!");
}

main().catch((e) => console.error(e));
