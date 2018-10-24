var cliengine = require("eslint").CLIEngine;
var Linter = require("eslint").Linter;
var linter = new Linter();
var path;

function solve() {
  var rules = linter.getRules();
  var cnt1 = 0, cnt2 = 0;
  path = process.argv[2];
  //console.log(path);
  var cli = new cliengine({
    useEslintrc: true
  });
  var config = cli.getConfigForFile(path);
  console.log('\nDeprecated/Removed rules still being used in the project:\n');
  let map = new Map();
  for (i in config.rules) {
    map.set(i, true);
    cnt2++;
    var ispresent = rules.get(i);
    if(!ispresent || ispresent.meta.deprecated === true) {
      console.log(i);
    }
  }
  console.log('\nNew rules missing in the project:\n');
  for(let i of rules.keys()) {
    cnt1++;
    var ispresent = map.get(i);
    if(!ispresent)
      console.log(i);
  }
}

solve();
