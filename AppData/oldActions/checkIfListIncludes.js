module.exports = {
  data: {
    name: "Check If List Includes",
    ListName: "",
    checkFor: "Text*",
    runIfTrue: {},
    runIfFalse: {},
  },

  UI: {
    compatibleWith: ["Any"],

    text: "Check If List Includes",
    sepbar: "",
    btext: "List Name",
    "input_direct*": "ListName",
    sepbar0: "",
    btext1: "Check If List Includes:",
    menuBar: {
      choices: ["Text*", "Variable*"],
      storeAs: "checkFor",
      extraField: "toCheck",
    },

    sepbar1: "",
    btext2: "If True",
    actions: "runIfTrue",

    sepbar2: "",

    btext3: "If False",
    actions0: "runIfFalse",

    variableSettings: {
      toCheck: {
        "Text*": "indirect",
        "Variable*": "direct",
      },
    },

    preview: "checkFor",
    previewName: "Check For",
  },

  async run(values, $, uID, fs, client, actionRunner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);

    let list =
      bridge.variables[varTools.transf(values.ListName, bridge.variables)];
    let toCheckFor;
    if (values.whatToDo == values.whatNotToDo) {
      console.log("Check If List Includes >>> Invalid Options");
    }
    if (values.checkFor == "Text*") {
      toCheckFor = varTools.transf(values.toCheck, bridge.variables);
    } else {
      toCheckFor =
        bridge.variables[varTools.transf(values.toCheck, bridge.variables)];
    }

    if (list.includes(toCheckFor)) {
      actionRunner(values.runIfTrue, message, client, bridge.variables, true);
    } else {
      actionRunner(values.runIfFalse, message, client, bridge.variables, true);
    }
  },
};
