mkdir $1
cd $1
touch sample.txt
touch input.txt

cat << EOF >> main.js
const { getInput } = require("../utils");

async function solve() {
  const input = await getInput(__dirname);
}

solve();
EOF