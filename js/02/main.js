const fs = require("fs");
fs.readFile(__dirname + "/input.txt", "utf-8", solve);

const allDiffsAreSafe = (diffs) =>
  diffs.map((num) => Math.abs(num)).every((num) => num >= 1 && num <= 3);

const isMonodirectional = (diffs) =>
  diffs.every((num) => (diffs[0] > 0 ? num > 0 : num < 0));

function solve(err, data) {
  // Part 1
  const lines = data.split("\n").map((line) => line.match(/\d+/g).map(Number));
  const safeLines = lines
    .map(calcDiffs)
    .filter((line) => allDiffsAreSafe(line) && isMonodirectional(line));
  console.log(safeLines.length);
}

function calcDiffs(arr) {
  return arr
    .map((num, i) => (i < arr.length - 1 ? arr[i + 1] - num : null))
    .slice(0, -1);
}

/**
 * Notes:
 * - Ans 1: 230
 * - Ans 2?: 300 < answer < 356
 * - 344 is wrong
 *
 * Part 2:
 * - Account for the first element being bad
 * - Violator index: If single violator in each filter function, violators should have same index
 */
