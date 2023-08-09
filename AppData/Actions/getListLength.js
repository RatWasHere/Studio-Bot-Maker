module.exports = {
  data: { name: "Get List Length", listName: "", storeAs: "" },

  UI: {
    compatibleWith: ["Any"],

    text: "Get List Length",
    sepbar: "",

    btext: "List Name",
    "input_direct": "listName",

    sepbar0:"",

    btext0: "Store List Length As",
    "input!": "storeAs"
  },

  subtitle: "List Name: $[listName]$ - Store List As: $[storeAs]$",

  async run(values, message, client, bridge) {
    let transferVariables = require(`../Toolkit/variableTools.js`).transf;

    const transf = (value) => {
      return transferVariables(value, bridge.variables);
    };

    bridge.variables[transf(values.storeAs)] = bridge.variables[transf(values.list)].length;
  },
};
