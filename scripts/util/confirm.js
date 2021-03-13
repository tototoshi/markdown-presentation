const question = require("./question");

module.exports = function confirm(message) {
  return question(message).then((value) => /^[yY]$/.test(value));
};
