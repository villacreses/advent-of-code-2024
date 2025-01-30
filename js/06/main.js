const { getInput } = require("../utils");

const DIR = Object.freeze([
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
]);

async function solve() {
  const input = await getInput(__dirname, "sample.txt");
  const lab = new Lab(input);

  console.log("Part 1:", lab.solvePart1());
}

class Lab {
  constructor(input) {
    this.grid = input.split("\n");

    const soldierStartLinear = this.grid.join("").indexOf("^");
    const r = Math.floor(soldierStartLinear / this.grid[0].length);
    const c = soldierStartLinear - r * this.grid[0].length;

    this.soldierStart = Object.freeze({ r, c });
  }

  inBounds = (r, c) =>
    r >= 0 && c >= 0 && r < this.grid.length && c < this.grid[0].length;

  setBlankVisitedGraph = () => {
    this.visited = new Array(this.grid.length)
      .fill()
      .map(() => new Array(this.grid[0].length).fill(false));
  };

  print = () => {
    const output = this.visited
      .map((line) =>
        line
          .map((value) => (value === false ? "." : value !== 9 ? "*" : value))
          .join(""),
      )
      .join("\n");
    console.log(output);
  };

  solvePart1 = () => {
    let count = 0;
    this.setBlankVisitedGraph();

    for (
      let r = this.soldierStart.r, c = this.soldierStart.c, d = 0;
      this.inBounds(r, c);
      r += DIR[d][0], c += DIR[d][1]
    ) {
      if (this.grid[r][c] === "#") {
        r -= DIR[d][0];
        c -= DIR[d][1];
        d = (d + 1) % DIR.length;
      }
      if (this.visited[r][c] === false) {
        this.visited[r][c] = d;
        count++;
      } else {
        const e = (d + 1) % 4 === this.visited[r][c];
        if (e) {
          this.visited[r][c] = 9;
        }
        console.log(`(${r},${c}): ${d}, ${this.visited[r][c]}`, e);
      }
    }

    this.print();

    return count;
  };
}

solve();
