module.exports = {
  data: {
    name: "Get Guild Info",
    storeAs: "",
    toGet: "Guild Name",
    guildVariable: "",
    guildFrom: "Command Guild",
  },
  UI: {
    compatibleWith: ["Text", "Slash"],
    text: "Get Member Info",
    variableSettings: {
      memberVariable: {
        "Message Author": "novars",
        "Variable*": "direct",
      },
    },

    sepbar: "",
    btext: "Get Guild From",

    menuBar: {
      choices: ["Command Guild", "Variable*", "Guild ID*"],
      storeAs: "guildFrom",
      extraField: "guildVariable",
    },
    sepbar0: "",
    btext0: "Get",
    menuBar0: {
      choices: [
        "Guild Name",
        "Guild Icon URL",
        "Guild Members List",
        "Guild Member Count",
        "Guild Owner",
      ],
      storeAs: "toGet",
    },
    sepbar1: "",
    btext1: "Store As",
    "input!*": "storeAs",
    previewName: "Get",
    preview: "toGet",

    variableSettings: {
      guildVariable: {
        "Variable*": "direct",
      },
    },
  },
  run(values, message, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    var guild;
    if (values.guildFrom == "Command Guild") {
      guild = message.guild;
    }
    if (values.guildFrom == "Guild Variable*") {
      guild = client.guilds.get(
        varTools.transf(
          bridge.variables[values.guildVariable].id,
          bridge.variables,
        ),
      );
    }
    if (values.guildFrom == "Guild ID*") {
      guild = client.guilds.get(
        varTools.transf(values.guildVariable, bridge.variables),
      );
    }
    switch (values.toGet) {
      case "Guild Name":
        bridge.variables[values.storeAs] = guild.name;
        break;
      case "Guild Icon URL":
        bridge.variables[values.storeAs] = guild.iconURL();
        break;
      case "Guild Members List":
        bridge.variables[values.storeAs] = guild.members;
        break;
      case "Guild Member Count":
        bridge.variables[values.storeAs] = guild.members.map(
          (m) => m.id,
        ).length;
        break;
      case "Guild Owner":
        bridge.variables[values.storeAs] = guild.owner;
        break;
    }
  },
};
