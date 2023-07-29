module.exports = {
  data: {
    name: "Loop Through List",
    list: "",
    storeIterationAs: "",
    storeValueAs: "",
    actions: [],
  },

  UI: {
    compatibleWith: ["Any"],

    text: "Loop Through List",
    sepbar: "",

    "btext*": "List Name",
    input_direct: "list",

    "sepbar*": "",

    btext: "Store Iteration Number As",
    "input!": "storeIterationAs",

    sepbar0: "",

    btext0: "Store Iteration Value As",
    "input0!": "storeValueAs",

    sepbar1: "",

    btext1: "For Each Item In List, Run",
    actions: "actions",

    preview: "list",
    previewName: "List",
  },
  subtitle:
    "List Name: $[list]$ - Store Iteration As: $[storeIterationAs]$ - Store Iteration Value As: $[storeValueAs]$",

  async run(values, message, uID, fs, client, runner, bridge) {
    let transferVariables = require(`../Toolkit/variableTools.js`).transf;

    const transf = (value) => {
      return transferVariables(value, bridge.variables);
    };

    let list = bridge.variables[transf(values.list)];

    for (let element in list) {
      bridge.variable[transf(values.storeIterationAs)] = element;
      bridge.variable[transf(values.storeValueAs)] = list[element];

      await runner(values.actions, interaction, client, bridge.variables, true);
    }
  },
};
