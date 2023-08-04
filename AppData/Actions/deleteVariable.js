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

  async run(values, interaction, client, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);

    delete bridge.variables[
      varTools.transf(values.variableName, bridge.variables)
    ];
  },
};
