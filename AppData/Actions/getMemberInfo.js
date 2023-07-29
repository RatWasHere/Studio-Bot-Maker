module.exports = {
  data: {
    name: "Get Member Info",
    storeAs: "",
    get: "Member Nickname",
    member: "",
    memberFrom: "Command Author",
  },
  UI: {
    compatibleWith: ["Text", "Slash"],
    text: "Get Member Info",

    sepbar: "",

    btext: "Get Member Via",
    menuBar: {
      choices: ["Command Author", "Variable*", "Member ID*"],
      storeAs: "memberFrom",
      extraField: "member",
    },
    sepbar0: "",
    btext0: "Get",
    menuBar0: {
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
    sepbar1: "",
    btext1: "Store As",
    "input!*": "storeAs",

    variableSettings: {
      member: {
        "Command Author": "novars",
        "Variable*": "direct",
      },
    },

    previewName: "Get",
    preview: "get",
  },
  run(values, message, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    let guild = bridge.guild;

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
