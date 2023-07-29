module.exports = {
  data: { name: "Delete Variable", variableName: "" },
  UI: {
    compatibleWith: ["Any"],
    text: "Delete Variable",
    sepbar: "",
    btext: "Variable",
    "input_direct*": "variableName",
    previewName: "Variable",
    preview: "variableName",
  },

  run(values, interaction, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);

    delete bridge.variables[
      varTools.transf(values.variableName, bridge.variables)
    ];
  },
};
