const { getInput } = require("../utils");

const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const outOfBounds = (input, r, c) =>
  r < 0 || c < 0 || r >= input.length || c >= input[0].length;

const isValidNextStep = (input, r, dr, c, dc) =>
  !outOfBounds(input, r + dr, c + dc) &&
  Number(input[r + dr][c + dc]) - Number(input[r][c]) === 1;

async function solve(input) {
  const counts = [];

  for (let r = 0; r < input.length; r++)
    for (let c = 0; c < input[0].length; c++)
      if (input[r][c] === "0") counts.push(walk(input, r, c));

  const answer1 = counts
    .map((pathMap) => Object.keys(pathMap).length)
    .reduce((sum, num) => sum + num);

  console.log("Part 1:", answer1);

  const answer2 = counts
    .flatMap((pathMap) => Object.values(pathMap))
    .reduce((sum, num) => sum + num);

  console.log("Part 2:", answer2);
}

function walk(input, r, c, counted = {}) {
  if (input[r][c] === "9") {
    counted[`${r},${c}`] = (counted[`${r},${c}`] || 0) + 1;
  } else {
    DIRECTIONS.forEach(([dr, dc]) => {
      if (isValidNextStep(input, r, dr, c, dc))
        walk(input, r + dr, c + dc, counted);
    });
  }

  return counted;
}

getInput(__dirname).then((res) =>
  res
    .split("\n\n")
    .map((sample) => sample.split("\n"))
    .forEach((input) => solve(input)),
);
