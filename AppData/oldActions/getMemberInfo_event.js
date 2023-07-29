module.exports = {
  data: {
    name: "Get Member Info",
    storeAs: "",
    guildFrom: "Guild ID*",
    guild: "",
    get: "Member Nickname",
    member: "",
    memberFrom: "Member ID*",
  },
  UI: {
    compatibleWith: ["Event", "DM"],
    text: "Get Member Info",

    sepbar: "",
    btext: "Get Member Guild Via",
    menuBar: {
      choices: ["Variable*", "Guild ID*"],
      storeAs: "guildFrom",
      extraField: "guild",
    },
    sepbar0: "",
    btext0: "Get Member Via",
    menuBar0: {
      choices: ["Variable*", "Member ID*"],
      storeAs: "memberFrom",
      extraField: "member",
    },
    sepbar1: "",
    btext1: "Get",
    menuBar1: {
      choices: [
        "Member Nickname",
        "Member Guild",
        "Member ID",
        "Member Name",
        "Member Profile Picture (URL)",
        "Timeout End Timestamp",
      ],
      storeAs: "get",
    },
    sepbar2: "",
    btext2: "Store As",
    "input!*": "storeAs",

    variableSettings: {
      member: {
        "Command Author": "novars",
        "Variable*": "direct",
      },
      guild: {
        "Variable*": "direct",
      },
    },

    previewName: "Get",
    preview: "get",
  },
  run(values, message, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    let guild;
    if (values.guildFrom == "Variable*") {
      guild = client.guilds.get(
        bridge.variables[varTools.transf(values.guild, bridge.variables)].id,
      );
    }
    if (values.guildFrom == "Guild ID*") {
      guild = client.guilds.get(
        varTools.transf(values.guild, bridge.variables),
      );
    }

    var member;
    if (values.memberFrom == "Command Author") {
      member = message.member;
    }
    if (values.memberFrom == "Variable*") {
      member =
        bridge.variables[varTools.transf(values.member, bridge.variables)];
    }
    if (values.memberFrom == "Member ID*") {
      member = guild.getMember(
        varTools.transf(values.member, bridge.variables),
      );
    }
    switch (values.get) {
      case "Member Nickname":
        bridge.variables[values.storeAs] = member.nickname || member.username;
        break;

      case "Member Name":
        bridge.variables[values.storeAs] = member.username;
        break;

      case "Member Profile Picture (URL)":
        bridge.variables[values.storeAs] = member.avatarURL();
        break;

      case "Member Guild":
        bridge.variables[values.storeAs] = member.guild;
        break;

      case "Member ID":
        bridge.variables[values.storeAs] = member.id;
        break;

      case "Timeout End Timestamp":
        bridge.variables[values.storeAs] =
          Date.parse(member.communicationDisabledUntil) || "-";
        break;
    }
  },
};
