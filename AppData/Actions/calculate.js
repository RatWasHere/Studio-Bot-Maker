module.exports = {
  data: {
    name: "Calculate",
    firstNumber: "",
    secondNumber: "",
    storeAs: "",
    operation: "Addition",
  },

  UI: {
    compatibleWith: ["Any"],
    text: "Calculate",

    sepbar3: "",

    btextFirstNumber: "First Number",
    "inputfirstnumber*": "firstNumber",
    sepbarfirstnumber: "",

    btextOperation: "Operation",
    menuBar: {
      choices: ["Addition", "Substraction", "Multiplication", "Division"],
      storeAs: "operation",
    },
    sepbarsecondnumber: "",
    btextSecondNumber: "Second Number",
    "inputsecondnumber*": "secondNumber",
    sepbarsecond: "",

    btextStoreAs: "Store Result As",
    "inputstoreResultAs!*": "storeAs",

    preview: "operation",
    previewName: "Operation",
  },

  async run(values, message, client, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    let firstNumber = parseFloat(
      varTools.transf(values.firstNumber, bridge.variables),
    );
    let secondNumber = parseFloat(
      varTools.transf(values.secondNumber, bridge.variables),
    );

    let result = 0;
    switch (values.operation) {
      case "Addition":
        result = firstNumber + secondNumber;
        break;
      case "Substraction":
        result = firstNumber - secondNumber;
        break;
      case "Multiplication":
        result = firstNumber * secondNumber;
        break;
      case "Division":
        result = firstNumber / secondNumber;
        break;
    }
    
    bridge.variables[varTools.transf(values.storeAs, bridge.variables)] = result
  },
};
