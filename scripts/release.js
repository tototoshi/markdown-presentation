#!/usr/bin/env node

const path = require("path");
const shell = require("shelljs");

const prompts = require("prompts");
const writeFileUtf8 = require("write-file-utf8");

const root = path.resolve(__dirname, "..");
const packageJson = path.resolve(root, "package.json");
const packageInfo = require(path.resolve(root, "package.json"));

function checkIfWorkingDirectoryIsClean() {
  const diff = shell.exec("git status --porcelain").stdout;
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

  shell.exec("npm install");
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

  shell.exec("git add package.json package-lock.json");
  shell.exec(`git commit -m v${version}`);
  shell.exec(`git tag v${version}`);
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

  shell.exec("npm publish --access public");
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

  shell.exec("git push");
  shell.exec("git push --tags");
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
