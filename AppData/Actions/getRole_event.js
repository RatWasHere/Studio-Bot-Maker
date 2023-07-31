module.exports = {
  data: {
    name: "Get Role",
    roleID: "",
    storeAs: "",
    guildFrom: "ID*",
    guild: "",
  },
  UI: {
    compatibleWith: ["Event", "DM"],
    text: "Get Role",

    sepbar: "",

    btext: "Get Role Guild Via",
    menuBar: {
      choices: ["ID*", "Variable*"],
      storeAs: "guildFrom",
      extraField: "guild",
    },

    btext: "Role ID",
    "input*": "roleID",

    sepbar0: "",

    btext0: "Store As",
    "input!*": "storeAs",

    variableSettings: {
      guild: {
        "Variable*": "direct",
      },
    },
  },

  subtitle: "ID: $[roleID]$ - Store As: $[storeAs]$",

  run(values, message, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);

    let guild;
    if (values.guildFrom == "ID*") {
      guild = client.guilds.get(
        varTools.transf(values.guild, bridge.variables),
      );
    }
    if (values.guildFrom == "Variable*") {
      guild = bridge.variables[varTools.transf(values.guild, bridge.variables)];
    }

    bridge.variables[values.storeAs] = guild.roles.get(
      varTools.transf(values.roleID, bridge.variables),
    );
  },
};
