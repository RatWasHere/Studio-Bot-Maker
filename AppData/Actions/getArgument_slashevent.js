const variableTools = require("../Toolkit/variableTools.js");

module.exports = {
  data: {
    name: "Get Argument",
    messageFrom: "",
    firstArgument: "",
    secondArgument: "",
    argumentParameter: "",
    storesAs: "",
    ArgumentFrom: "Argument #*",
  },
  UI: {
    compatibleWith: ["Slash", "Event"],
    text: "Get Argument",

    sepbar: "",

    btext: "Message Variable",
    input_direct: "messageFrom",

    sepbar0: "",

    btext0: "From Argument #",
    "input custom number <min>0</min> <max>2048</max>": "firstArgument",

    sepbar1: "",

    btext1: "To",
    menuBar0: {
      choices: ["None", "Argument #*", "End"],
      storeAs: "ArgumentFrom",
      extraField: "argumentParameter",
    },

    sepbar2: "",

    btext2: "Store As",
    "input!": "storesAs",

    preview: "storesAs",
    previewName: "Store As",

    variableSettings: {
      messageFrom: {
        "Variable*": "direct",
        "Command Message": "novars",
      },
      argumentParameter: {},
    },
  },
  subtitle:
    "Starting At: $[firstArgument]$ to $[ArgumentFrom]$ $[argumentParameter]$ - Store As: $[storesAs]$",
    async run(values, msg, client, bridge) {
      // i left comments so i dont completely shit myself next time i update this
    let transferVariables = require(`../Toolkit/variableTools.js`).transf;

    const transf = (value) => {
      return transferVariables(value, bridge.variables);
    };

    var output = "";
    let message;
    message = bridge.variables[transf(values.messageFrom)];

    if (values.ArgumentFrom == "None") {
      output =
        message.content.split(" ")[
          variableTools.transf(values.firstArgument, bridge.variables)
        ];
    }

    if (values.ArgumentFrom == "Argument #*") {
      let argumentList = message.content.split(" ");
      var argumentsParsed = 0;
      for (let argument in argumentList) {
        // if the argument is higher or equal to the first argument where it should begin
        if (argument >= transf(values.firstArgument)) {
          argumentsParsed++;

          // if the arguments parsed are smaller or equal to the end argument's number
          if (argumentsParsed <= parseFloat(transf(values.argumentParameter))) {
            output = `${output} ${argumentList[argument]}`;
          }
        }
      }
    }
    if (values.ArgumentFrom == "End") {
      let firstIndex = parseFloat(transf(values.firstArgument))
      output = message.content.split(" ").splice(firstIndex).join(" ");
    }
    bridge.variables[transf(values.storesAs)] = output;
  },
};
