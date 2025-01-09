const { getInput, regexConcat } = require("../utils");

const regex_mul = /mul\(\d{1,3}\,\d{1,3}\)/;
const regex_dont = /do\(\)|don't\(\)/;
const isInstruction = {
  "do()": true,
  "don't()": true,
};

async function solve() {
  const input = await getInput(__dirname);

  const ansPart1 = input
    .match(new RegExp(regex_mul, "g"))
    .reduce((acc, strMatch) => {
      const nums = strMatch.match(/\d+/g).map(Number);
      return nums[0] * nums[1] + acc;
    }, 0);

  console.log("Part 1:", ansPart1); // 181345830

  let disabled = false;
  
  const ansPart2 = input
    .match(regexConcat(regex_mul, regex_dont))
    .reduce((acc, strMatch) => {
      if (isInstruction[strMatch]) {
        disabled = strMatch === "don't()"
      } else if (!disabled) {
        const nums = strMatch.match(/\d+/g).map(Number);
        acc += nums[0] * nums[1];
      }

      return acc;
    }, 0);
  console.log('Part 2:', ansPart2);
}

solve();
