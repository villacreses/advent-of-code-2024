const fs = require("fs");
fs.readFile(__dirname + "/input.txt", "utf-8", solve);

function solve(err, data) {
  const lists = data.split("\n").map((line) => line.match(/\d+/g));
  const list1 = lists.map(([a]) => Number(a)).sort();
  const list2 = lists.map(([_, b]) => Number(b)).sort();

  // Part 1
  const ansPart1 = list1
    .map((a, idx) => Math.abs(a - list2[idx]))
    .reduce((sum, num) => sum + num);
  
  console.log(ansPart1);

  // Part 2
  const freq = list2.reduce(
    (acc, num) => ({ ...acc, [num]: (acc[num] || 0) + 1 }),
    {},
  );

  const ansPart2 = list1
    .map((num) => num * (freq[num] || 0))
    .reduce((sum, num) => sum + num);

  console.log(ansPart2)
}
