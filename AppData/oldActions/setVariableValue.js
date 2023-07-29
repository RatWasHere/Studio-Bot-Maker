module.exports = {
  data: { name: "Control Variable", variableName: "", variableValue: "" },
  UI: {
    compatibleWith: ["Any"],
    text: "Control Variable",
    sepbar: "",
    btext: "Variable Name",
    "input*": "variableName",
    sepbar0: "",
    btext0: "Variable New Value",
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
