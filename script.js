var CLIengine = require("eslint").CLIEngine;
var Linter = require("eslint").Linter;

/* Function to check all the current rules for a project
and display a list of all the rules that are deprecated
and a list of all the new rules missing from the project*/
function solve() {
  var linter = new Linter();
  var allRules = linter.getRules(); // Getting all latest rules
  var path = process.argv[2];      // Path to the sample project
  var cli = new CLIengine({
    useEslintrc: true,
  });
  var config = cli.getConfigForFile(path); // ESLint Config for the sample project
  console.log('\nDeprecated/Removed rules still being used in the project:\n');
  for (rule in config.rules) {
    var ruleSrc = allRules.get(rule);
    /*config.rules[rule] !=== 'off :- rule is not 'off' in ESLint Configuration
    !ruleSrc :- Rule does not exist, meaning it has been removed OR
    ruleSrc.meta.deprecated :- Rule has been deprecated,
    identified by the deprecated flag in rule source*/
    if(config.rules[rule] !== 'off' && (!ruleSrc || ruleSrc.meta.deprecated === true)) {
      console.log(rule);
    }
  }
  console.log('\nNew rules missing in the project:\n');
  for(let rule of allRules.keys()) {
    var ruleStatus = config.rules[rule];
    /*allRules.get(rule).meta.deprecated !=== true :- Rule exists AND hasn't been deprecated
    !ruleStatus :- rule is not present in the ESLint Configuration for the project
    ruleStatus === 'off' :- Rule is present in ESLint Configuration, but is turned off,
    so it is not being used for linting in the project*/
    if(allRules.get(rule).meta.deprecated !== true && (!ruleStatus || ruleStatus === 'off'))
      console.log(rule);
  }
}

solve();
