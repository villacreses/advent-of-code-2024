const { getInput } = require("../utils");


async function solve() {
  const input = await getInput(__dirname);

  let id = 0;
  const printedStart = input
    .split("")
    .map((num, idx) => `${idx % 2 ? "." : id++},`.repeat(Number(num)))
    .join()
    .split(",")
    .filter(Boolean);

  console.log("Printed:", printedStart);

  const output = [];

  for (let l = 0, r = printedStart.length - 1; l <= r; l++) {
    while (printedStart[r] === ".") r--;

    if (printedStart[l] === ".") {
      output.push(printedStart[r--]);
    } else {
      output.push(printedStart[l]);
    }
  }

  console.log("Number:", output.map(Number));

  const answer = output
    .map((num, idx) => Number(num) * idx)
    .reduce((sum, num) => sum + num);

  console.log("Answer:", answer);
}

solve();
// Too low:    88100595464
// Too high: 6201390809186
