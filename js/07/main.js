const { getInput } = require("../utils");

async function solve() {
  const input = await getInput(__dirname);

  const answer = input
    .split("\n")
    .map((line) => line.match(/\d+/g).map(Number))
    .filter(line => traverse(line[0], line[1], 2, line))
    .reduce((sum, line) => sum + line[0], 0);

  console.log(`Answer: ${answer}`);
}

// Comment out the 2nd recursive `traverse` call to get the part 1 answer
function traverse(target, curr, idx, inputs) {
  if (idx > inputs.length) return false;
  if (idx === inputs.length) return curr === target;

  return (
    traverse(target, curr + inputs[idx], idx + 1, inputs) ||
    traverse(target, Number("" + curr + inputs[idx]), idx + 1, inputs) ||
    traverse(target, curr * inputs[idx], idx + 1, inputs)
  );
}

solve();
