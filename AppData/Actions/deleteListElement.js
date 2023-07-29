module.exports = {
  data: { name: "Delete List Element", list: "", elementPosition: "" },

  UI: {
    compatibleWith: ["Any"],
    text: "Delete List Element",
    sepbar: "",
    btext: "List Name",
    "input*": "list",
    sepbar0: "",
    btext1: "Element Position",
    "input1*": "elementPosition",
    preview: "elementPosition",
    previewName: "Position",
  },

  async run(values, interaction, uID, fs, actionRunner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    let list = bridge.variables[varTools.transf(values.list)];

    list.push(varTools.transf(values.toAdd, bridge.variables));
    bridge.variables[varTools.transf(values.storeAs, bridge.variables)].splice(
      varTools.transf(elementPosition, bridge.variables),
      1,
    );
  },
};
