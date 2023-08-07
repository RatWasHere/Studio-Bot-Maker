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
    compatibleWith: ["Event"],

    text: "Check If Member Has Role",
    sepbar: "sepber",
    btext: "Get Member From",
    menuBar: {
      choices: ["Variable*", "Member ID*"],
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
      role: {
        "Variable*": "direct",
      },
    },

    previewName: "Role Variable",
    preview: "role",
  },

  async run(values, message, client, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);

    let actionRunner = bridge.runner

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
    let hasRole = user.roles.includes(role);

    if (hasRole == true) {
      actionRunner(values.runIfTrue, message, client, bridge.variables, true);
    } else {
      actionRunner(values.runIfFalse, message, client, bridge.variables, true);
    }
  },
};
