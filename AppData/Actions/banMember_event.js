module.exports = {
  data: {
    memberFrom: "Variable*",
    name: "Ban Member",
    memberVariable: "",
    guild: "Variable*",
    guildField: "",
    reason: "",
  },
  UI: {
    compatibleWith: ["DM", "Event"],
    text: "Ban Member",
    sepbar: "",

    btext: "Get Member Via",
    menuBar: {
      choices: ["Variable*", "Member ID*"],
      storeAs: "memberFrom",
      extraField: "memberVariable",
    },

    sepbar1: "sepbar",

    btext1: "Get Member Guild From",
    menuBar1: {
      choices: ["Variable*", "Guild ID*"],
      storeAs: "guild",
      extraField: "guildField",
    },

    sepbar2: "",

    btext2: "Reason",
    input: "reason",

    preview: "memberFrom",
    previewName: "Ban",
    variableSettings: {
      memberVariable: {
        "Variable*": "direct",
      },
      guildField: {
        "Variable*": "direct",
      },
    },
  },
  run(values, message, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);

    let guild;
    if (values.guild == "Variable*") {
      guild = client.guilds.get(
        bridge.variables[varTools.transf(values.guildField, bridge.variables)]
          .id,
      );
    }
    if (values.guild == "Guild ID*") {
      guild = client.guilds.get(
        varTools.transf(values.guildField, bridge.variables),
      );
    }

    let member;
    if (values.memberFrom == "Variable*") {
      member =
        bridge.variables[
          varTools.transf(values.memberVariable, bridge.variables)
        ].id;
    }
    if (values.memberFrom == "Member ID*") {
      member = varTools.transf(values.memberVariable, bridge.variables);
    }

    if (values.reason.trim() == "") {
      guild.createBan(member);
    } else {
      guild.createBan(member, {
        reason: varTools.transf(values.reason, bridge.variables),
      });
    }
  },
};
