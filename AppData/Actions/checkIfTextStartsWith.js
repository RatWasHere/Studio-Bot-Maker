module.exports = {
  data: {
    name: "Check If Text Starts With",
    string: "",
    startWith: "",
    runIfTrue: {},
    runIfFalse: {},
  },
  UI: {
    compatibleWith: ["Any"],
    text: "Check If Text Starts With",

    sepbar: "",

    btext: "Text",
    input: "string",

    sepbar0: "",

    btext0: "Check If It Starts With",
    input0: "startWith",

    sepbar1: "",

    btext1: "If True, Run:",
    actions: "runIfTrue",

    sepbar2: "",

    btext2: "If False, Run:",
    actions0: "runIfFalse",

    preview: "string",
    previewName: "Text",
  },
  async run(values, message, uID, fs, client, actionRunner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);

    let string = varTools.transf(values.string, bridge.variables);
    let startWith = varTools.transf(values.startWith, bridge.variables);

    if (string.startsWith(startWith)) {
      actionRunner(values.runIfTrue, message, client, bridge.variables, true);
    } else {
      actionRunner(values.runIfFalse, message, client, bridge.variables, true);
    }
  },
};
