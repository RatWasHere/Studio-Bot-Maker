module.exports = {
  data: {
    name: "Create List Object",
    ListName: "",
    checkFor: "Text*",
    toAdd: "",
    storeAs: "",
  },

  UI: {
    compatibleWith: ["Any"],
    text: "Create List Object",
    sepbar: "",
    btext: "List Name",
    "input_direct*": "ListName",
    sepbar0: "",
    btext1: "Object Value",
    "input1*": "toAdd",
    sepbar1: "",
    btext2: "Store Object Position As",
    "input2!": "storeAs",
    preview: "toAdd",
    previewName: "Value",
  },

  async run(values, interaction, uID, fs, client, actionRunner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    let list = bridge.variables[varTools.transf(values.ListName)];

    list.push(varTools.transf(values.toAdd, bridge.variables));
    bridge.variables[varTools.transf(values.storeAs, bridge.variables)] =
      list.length - 1;
  },
};
// ??
