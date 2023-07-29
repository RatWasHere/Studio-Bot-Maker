module.exports = {
  data: {
    memberFrom: "Variable*",
    name: "Ban Member",
    memberVariable: "",
    reason: "",
  },
  UI: {
    compatibleWith: ["Text", "Slash"],

    text: "Ban Member",

    sepbar: "",

    btext: "Get Member Via",
    menuBar: {
      choices: ["Command Author", "Variable*", "Member ID*"],
      storeAs: "memberFrom",
      extraField: "memberVariable",
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
    },
  },
  run(values, message, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);

    let guild = bridge.guild;

    let member;
    if (values.memberFrom == "Command Author") {
      member = message.author.id;
    }
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
