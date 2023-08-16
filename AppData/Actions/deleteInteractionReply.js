module.exports = {
  data: {
    name: "Delete Interaction Reply",
  },
  UI: {
    compatibleWith: ["Text", "Event"],
    text: "Delete Interaction Reply",
    sepbar: "",

    btext: "Get Interaction Via",
    input_direct: "interaction",

    variableSettings: {
      interaction: {
        "Variable*": "direct",
      },
    },
  },

  subtitle: "Target Reply Interaction Variable: $[interaction]$",

  async run(values, message, client, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    var interaction = bridge.variables[varTools.transf(values.interaction, bridge.variables)];

    interaction.deleteOriginal()
  },
};