module.exports = {
  data: {
    name: "Get Interaction Info",
    interaction: "",
    interactionFrom: "Command Interaction",
    get: "Interaction Content",
    storeAs: "",
  },
  UI: {
    compatibleWith: ["Slash"],
    text: "Get Interaction Info",

    sepbar: "",

    btext: "Get Interaction Via",
    menuBar: {
      choices: ["Command Interaction", "Variable*"],
      storeAs: "interactionFrom",
      extraField: "interaction",
    },

    sepbar0: "",

    btext0: "Get",
    menuBar0: {
      choices: [
        "Interaction Channel",
        "Interaction Author",
        "Interaction Timestamp",
        "Interaction ID",
      ],
      storeAs: "get",
    },

    sepbar1: "",

    btext1: "Store As",
    "input!": "storeAs",

    variableSettings: {
      interaction: {
        "Variable*": "direct",
      },
    },

    preview: "get",
    previewName: "Get",
  },
  run(values, interaction, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);

    let _interaction;
    if (values.interactionFrom == "Variable*") {
      _interaction =
        bridge.variables[varTools.transf(values.interaction, bridge.variables)];
    }
    if (values.interactionFrom == "Command Interaction") {
      _interaction = interaction;
    }

    let result;
    switch (values.get) {
      case "Interaction Channel":
        result = _interaction.channel;
        break;
      case "Interaction Author":
        result = _interaction.member.user;
        break;
      case "Interaction ID":
        result = _interaction.id;
        break;
      case "Interaction Timestamp":
        result = Date.parse(_interaction.createdAt.getTime);
        break;
    }

    bridge.variables[varTools.transf(values.storeAs, bridge.variables)] =
      result;
  },
};
