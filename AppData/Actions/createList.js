module.exports = {
  data: { name: "Create List", listName: "" },

  UI: {
    compatibleWith: ["Any"],

    text: "Create List",
    sepbar: "",

    btext: "List Name",
    "input!": "listName",

    preview: "listName",
    previewName: "Name",
  },

  async run(values, message, uID, fs, client, runner, bridge) {
    let transferVariables = require(`../Toolkit/variableTools.js`).transf;

    const transf = (value) => {
      transferVariables(value, bridge.variables);
    };

    bridge.variables[transf(values.listName)] = [];
  },
};
