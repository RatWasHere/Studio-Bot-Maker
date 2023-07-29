module.exports = {
  data: {
    name: "Find Object In List",
    ListName: "",
    elementIndex: "",
    storeAs: "",
  },

  UI: {
    compatibleWith: ["Any"],

    text: "Find Object In List",
    sepbar: "",

    btext: "List Name",
    "input_direct*": "ListName",

    sepbar1: "",

    btext1: "Object Numeric Position",
    input0: "elementIndex",

    sepbar2: "",
    btext2: "Store Object Value As",
    "input!*": "storeAs",
    variableSettings: {
      search: {
        "Object Value*": "indirect",
        "Variable*": "direct",
        "Numeric Position*": "indirect",
      },
    },

    preview: "elementIndex",
    previewName: "Position #",
  },

  async run(values, interaction, uID, fs, client, actionRunner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);

    let list = bridge.variables[varTools.transf(values.ListName)];
    let toCheckFor =
      list[parseFloat(varTools.transf(values.elementIndex, bridge.variables))];

    bridge.variables[varTools.transf(values.storeAs, bridge.variables)] =
      toCheckFor;
  },
};
