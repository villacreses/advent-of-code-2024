const { getInput } = require("../utils");

const WORD = "XMAS";
const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [1, 1],
  [0, -1],
  [-1, 0],
  [-1, -1],
  [-1, 1],
  [1, -1],
];

// Sample 1 should give 18
// Sample 2 should give 9
async function solve() {
  const sample = await getInput(__dirname);

  const graph = sample.split("\n");
  let ansPart1 = 0,
    ansPart2 = 0;

  for (let r = 0; r < graph.length; r++)
    for (let c = 0; c < graph[0].length; c++)
      if (graph[r][c] === WORD[0]) ansPart1 += traversePart1(graph, r, c);

  console.log("Ans Part 1:", ansPart1);

  for (let r = 0; r < graph.length; r++)
    for (let c = 0; c < graph[0].length; c++)
      if (graph[r][c] === "A") ansPart2 += traversePart2(graph, r, c);

  console.log("Ans Part 2:", ansPart2);
}

function traversePart1(graph, r, c) {
  let count = 0;

  function walk(l, dr, dc) {
    let x = r + dr * l,
      y = c + dc * l;

    if (graph[x] && graph[x][y] === WORD[l]) {
      if (l === WORD.length - 1) count++;
      else walk(l + 1, dr, dc);
    }
  }

  for (const [x, y] of DIRECTIONS) {
    walk(1, x, y);
  }

  return count;
}

function traversePart2(graph, r, c) {
  const isInRange =
    r > 0 && c > 0 && r < graph.length - 1 && c < graph[0].length - 1;

  if (!isInRange) return 0;

  /**
   * Given a 9-element subarray around 'A', set the following criteria:
   *   - The corner elements are exclusively 'S' or 'M'
   *   - Every 'S' is diagonally opposite to an 'M', and vice versa
   * Then it must be the case that a valid X-MAS was found.
   */

  // The listing order for the corners matter
  // Goal is to resemble "circling around" the subarray
  const corners = [
    graph[r - 1][c - 1],
    graph[r - 1][c + 1],
    graph[r + 1][c + 1],
    graph[r + 1][c - 1],
  ];

  const isValid = corners.every(
    (l, idx, arr) =>
      (l === "M" || l === "S") &&
      (l === "M" ? arr[(idx + 2) % 4] === "S" : arr[(idx + 2) % 4] === "M"),
  );

  return Number(isValid);
}
solve();
