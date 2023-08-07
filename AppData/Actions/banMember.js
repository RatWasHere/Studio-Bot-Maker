module.exports = {
  data: {
    memberFrom: "Variable*",
    name: "Ban Member",
    memberVariable: "",
    reason: "",
  },
  UI: {
    compatibleWith: ["Any"],

    text: "Ban Member",

    sepbar: "",

    btext: "Get Member Via",
    menuBar: {
      choices: ["Variable*", "Member ID*"],
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
  run(values, message, client, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);

    let guild = bridge.guild;

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
