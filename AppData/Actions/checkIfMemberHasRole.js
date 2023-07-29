module.exports = {
  data: {
    name: "Check If Member Has Role",
    role: "",
    roleFrom: "Role ID*",
    runIfTrue: {},
    runIfFalse: {},
    memberVariable: "",
    memberChoice: "Command Author",
  },
  UI: {
    compatibleWith: ["Text", "Slash"],

    text: "Check If Member Has Role",
    sepbar: "sepber",
    btext: "Get Member From",
    menuBar: {
      choices: ["Command Author", "Variable*", "Member ID*"],
      storeAs: "memberChoice",
      extraField: "memberVariable",
    },
    sepbar0: "",

    btext0: "Get Role Via",
    menuBar0: {
      choices: ["Role ID*", "Variable*"],
      storeAs: "roleFrom",
      extraField: "role",
    },

    sepbar1: "",

    btext1: "If Member Has Role, Run",
    actions: "runIfTrue",

    sepbar2: "",

    btext2: "If Member Doesn't Have Role, Run",
    actions0: "runIfFalse",

    variableSettings: {
      memberVariable: {
        "Variable*": "direct",
      },
    },

    previewName: "Role Variable",
    preview: "role",
  },

  async run(values, message, uID, fs, client, actionRunner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);

    let guild = bridge.guild;
    var user = message.member;
    if (values.memberChoice == "Variable*") {
      user = guild.getMember(
        bridge.variables[
          varTools.transf(values.memberVariable, bridge.variables)
        ].id,
      );
    }
    if (values.memberChoice == "Member ID*") {
      user = guild.getMember(
        varTools.transf(values.memberVariable, bridge.variables),
      );
    }

    let role;
    if (values.roleFrom == "Role ID*") {
      role = varTools.transf(values.role, bridge.variables);
    }
    if (values.roleFrom == "Variable*") {
      role =
        bridge.variables[varTools.transf(values.role, bridge.variables)].id;
    }

    let hasRole = member.roles.has(role);

    if (hasRole == true) {
      actionRunner(values.runIfTrue, message, client, bridge.variables, true);
    } else {
      actionRunner(values.runIfFalse, message, client, bridge.variables, true);
    }
  },
};
