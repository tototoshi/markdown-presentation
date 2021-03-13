const child_process = require("child_process");

module.exports = async function spawn(command, args, option) {
  return new Promise((resolve, reject) => {
    const p = child_process.spawn(command, args, option);
    p.stdout.on("data", (data) => console.log(data.toString()));
    p.stderr.on("data", (data) => console.error(data.toString()));
    p.on("error", (e) => reject(e));
    p.on("exit", () => resolve());
  });
};
