module.exports = {
  data: { name: "Create Variable", variableName: "", variableValue: "" },
  UI: {
    compatibleWith: ["Any"],
    text: "Create Variable",
    sepbar: "",
    btext: "Variable Name",
    "input!*": "variableName",
    sepbar0: "",
    btext0: "Variable Value",
    input: "variableValue",
    previewName: "Name",
    preview: "variableName",
  },

  run(values, interaction, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);

    bridge.variables[varTools.transf(values.variableName, bridge.variables)] =
      varTools.transf(values.variableValue, bridge.variables);
  },
};
