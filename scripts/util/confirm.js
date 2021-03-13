const question = require("./question");

function confirm(message) {
  return question(message).then((value) => /^[yY]$/.test(value));
}
