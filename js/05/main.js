const { getInput } = require("../utils");

const getMiddlePagesSum = (sum, update) =>
  sum + update[Math.floor(update.length / 2)];

async function solve() {
  const input = await getInput(__dirname);
  const [rulesRaw, updatesRaw] = input
    .split("\n\n")
    .map((str) => str.split("\n"));

  const rules = rulesRaw.map((line) => line.split("|"));

  const updates = updatesRaw.map((line) => line.split(",").map(Number));

  const adj = rules.reduce(
    (acc, [r, c]) => ({ ...acc, [r]: (acc[r] || []).concat(c) }),
    {},
  );

  const hasViolations = updates.map((update) => {
    const precedes = {};
    let violations = false;

    for (const page of update) {
      precedes[page] = true;

      for (const followUp of adj[page] || []) {
        if (precedes[followUp]) violations = true;
        if (violations) break;
      }

      if (violations) break;
    }

    return violations;
  });

  // All updates are confirmed to have an odd number of pages
  const sumOfMiddlePagesProper = updates
    .filter((_, idx) => !hasViolations[idx])
    .reduce(getMiddlePagesSum, 0);

  const sumOfMiddlePagesImproper = updates
    .filter((_, idx) => hasViolations[idx])
    .map((update) => fixViolations(update, rules))
    .reduce(getMiddlePagesSum, 0);

  console.log("Part 1:", sumOfMiddlePagesProper);
  console.log("Part 2:", sumOfMiddlePagesImproper);
}

function fixViolations(update, rules) {
  const order = update.reduce((acc, page) => ({ ...acc, [page]: 0 }), {});

  rules
    .filter(([a, b]) => order[a] !== undefined && order[b] !== undefined)
    .forEach(([a, b]) => {
      order[a]--;
      order[b]++;
    });

  return update.sort((a, b) => order[a] - order[b]);
}

console.time("time");
solve();
console.timeEnd("time");
