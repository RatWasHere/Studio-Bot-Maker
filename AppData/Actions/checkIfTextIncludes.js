module.exports = {
  data: {
    name: "Check If Text Includes",
    string: "",
    mustInclude: "",
    runIfTrue: {},
    runIfFalse: {},
  },
  UI: {
    compatibleWith: ["Any"],
    text: "Check If Text Starts Includes",

    sepbar: "",

    btext: "Text",
    input: "string",

    sepbar0: "",

    btext0: "Check If It Includes",
    input0: "mustInclude",

    sepbar1: "",

    btext1: "If True, Run:",
    actions: "runIfTrue",

    sepbar2: "",

    btext2: "If False, Run:",
    actions0: "runIfFalse",

    preview: "string",
    previewName: "Text",
  },
  async run(values, message, client, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    
    let actionRunner = bridge.runner

    let string = varTools.transf(values.string, bridge.variables);
    let mustInclude = varTools.transf(values.mustInclude, bridge.variables);

    if (string.includes(mustInclude)) {
      actionRunner(values.runIfTrue, message, client, bridge.variables, true);
    } else {
      actionRunner(values.runIfFalse, message, client, bridge.variables, true);
    }
  },
};
