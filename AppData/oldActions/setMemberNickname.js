module.exports = {
  data: {
    name: "Set Member Nickname",
    memberFrom: "Command Author",
    member: "",
    newNickname: "",
  },
  UI: {
    compatibleWith: ["Text", "Slash"],
    text: "Set Member Nickname",

    sepbar: "",

    btext: "Get Member Via",
    menuBar: {
      choices: ["Command Author", "Variable*", "ID*"],
      storeAs: "memberFrom",
      extraField: "member",
    },

    sepbar0: "",

    btext0: "New Nickname",
    input: "newNickname",

    variableSettings: {
      member: {
        "Variable*": "direct",
      },
    },

    previewName: "To",
    preview: "newNickname",
  },
  run(values, message, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    let guild = bridge.guild;

    let member;

    if (values.memberFrom == "Command Author") {
      member = message.member;
    }
    if (values.memberFrom == "Variable*") {
      member =
        bridge.variables[varTools.transf(values.member, bridge.variables)];
    }
    if (values.memberFrom == "ID*") {
      member = guild.members.get(
        varTools.transf(values.member, bridge.variables),
      );
    }

    member.edit({
      nick: varTools.transf(values.newNickname, bridge.variables),
    });
  },
};
