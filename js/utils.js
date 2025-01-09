const fs = require("fs").promises;

async function getInput(dir) {
  return await fs.readFile(dir + "/input.txt", "utf-8");
}

function regexConcat(...regexArr) {
  const joined = regexArr.map(({ source }) => source).join("|");
  return new RegExp(`(${joined})`, 'g');
}

module.exports = {
  getInput,
  regexConcat,
};
