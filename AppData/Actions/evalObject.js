module.exports = {
  data: { toEval: "", name: "Evaluate", storeAs: "", storeTypeAs: "" },
  UI: {
    compatibleWith: ["Any"],
    text: "Evaluate (JS)",

    sepbar: "",

    btext: "Code",
    largeInput: "toEval",

    sepbar0: "",

    btext0: "Store As",
    "input!*": "storeAs",

    btext1: "Store Result Type As",
    "input!": "storeTypeAs",

    preview: "storeAs",
    previewName: "Store As",
  },
  async run(values, command, client, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    let result = () => {
      return eval(values.toEval);
    };
    let endResult = result();
    bridge.variables[values.storeAs] = endResult;
    bridge.variables[values.storeTypeAs] = typeof endResult;
  },
};
