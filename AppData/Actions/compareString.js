module.exports = {
  data: {
    name: "Compare",
    comparator: "=",
    firstInput: "",
    secondInput: "",
    runIfTrue: [],
    runIfFalse: [],
  },
  UI: {
    compatibleWith: ["Any"],

    text: "Compare",
    sepbar: "",

    btext: "Compare",
    "input*": "firstInput",

    sepbar0: "",
    menuBar: { choices: ["!=", "=", ">", "<"], storeAs: "comparator" },
    "sepbar*": "",

    btext0: "Compare To",
    "input0*": "secondInput",

    sepbar1: "",
    btext1: "If True",
    actions: "runIfTrue",

    sepbar2: "",

    btext2: "If False",
    actions0: "runIfFalse",

    preview: "firstInput",
    previewName: "Compare",
  },
  async run(values, message, client, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    
    let actionRunner = bridge.runner

    let matchesCriteria = false;

    let firstValue = `${varTools.transf(values.firstInput, bridge.variables)}`;
    let secondValue = `${varTools.transf(values.secondInput, bridge.variables)}`;


    console.log(firstValue, secondValue, "FIRSTSECOND", secondValue == firstValue)
    switch (values.comparator) {
      case "!=":
        if (firstValue != secondValue) {
          matchesCriteria = true;
        } else {
          matchesCriteria = false;
        }
        break;

      case "=":
        if (firstValue == secondValue) {
          matchesCriteria = true;
        }
        break;

      case ">":
        if (firstValue > secondValue) {
          matchesCriteria = true;
        }
        break;

      case "<":
        if (firstValue < secondValue) {
          matchesCriteria = true;
        }
        break;
    }

    console.log(matchesCriteria)

    if (matchesCriteria == true) {
      actionRunner(values.runIfTrue, message, client, bridge.variables, true);
    } else {
      actionRunner(values.runIfFalse, message, client, bridge.variables, true);
    }
  },
};
