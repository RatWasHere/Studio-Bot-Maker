module.exports = {
  data: {
    name: "Delete Interaction Reply",
  },
  UI: {
    compatibleWith: ["Slash"],
    text: "Delete Interaction Reply",
    sepbar: "",

    btext: "Get Interaction Via",
    menuBar: {
      choices: ["Command Interaction", "Variable*"],
      storeAs: "interactionFrom",
      extraField: "interaction",
    },

    invisible: "",

    variableSettings: {
      interaction: {
        "Variable*": "direct",
      },
    },
  },

  subtitle: "Get Target Reply Via: $[interactionFrom]$",

  async run(values, message, client, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    var interaction;

    if (values.interactionFrom == "Command Interaction") {
      interaction = message;
    } else {
      interaction = bridge.variables[varTools.transf(values.interaction, bridge.variables)];
    }

    interaction.deleteOriginal()
  },
};
