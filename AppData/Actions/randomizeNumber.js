module.exports = {
  data: {
    firstNumber: "",
    secondNumber: "",
    storeAs: "",
    name: "Randomize Number",
  },
  UI: {
    compatibleWith: ["Any"],
    text: "Randomize Number",
    sepbar: "",
    btext: "Minimum",
    "input custom number <min>-999999999</min> <max>999999999</max>*":
      "firstNumber",
    sepbar0: "",
    btext0: "Maximum",
    "input custom number <min>-999999999</min> <max>999999999</max>":
      "secondNumber",
    sepbar1: "noice, 69!",
    btext1: "Store As",
    "input!": "storeAs",
    preview: "secondNumber",
    previewName: "Max Value",
  },
  subtitle:
    "Min Value: $[firstNumber]$ - Max Value: $[secondNumber]$ - Store As: $[storeAs]$",
  run(values, message, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);

    let first = parseFloat(
      varTools.transf(values.firstNumber, bridge.variables),
    );
    let second = parseFloat(
      varTools.transf(values.secondNumber, bridge.variables),
    );

    let randomNumber = Math.floor(Math.random() * (second - first + 1)) + first;

    bridge.variables[varTools.transf(values.storeAs, bridge.variables)] =
      randomNumber;
  },
};
