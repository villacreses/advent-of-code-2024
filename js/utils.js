const fs = require("fs").promises;

async function getInput(dir, filename = "input.txt") {
  return await fs.readFile(`${dir}/${filename}`, "utf-8");
}

function regexConcat(...regexArr) {
  const joined = regexArr.map(({ source }) => source).join("|");
  return new RegExp(`(${joined})`, "g");
}

module.exports = {
  getInput,
  regexConcat,
};
