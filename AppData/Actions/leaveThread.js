module.exports = {
  data: { name: "Leave Thread", thread: "" },

  UI: {
    compatibleWith: ["Any"],

    text: "Leave Thread",
    sepbar: "",

    btext: "Thread Variable",
    "input_direct": "thread",

    preview: "thread",
    previewName: "Thread Variable",
  },

  async run(values, message, client, bridge) {
    let transferVariables = require(`../Toolkit/variableTools.js`).transf;

    const transf = (value) => {
      return transferVariables(value, bridge.variables);
    };

    bridge.variables[transf(values.thread)].leave()
  },
};
