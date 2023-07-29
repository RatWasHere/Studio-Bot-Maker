module.exports = {
  data: {
    name: "Add Role",
    storeAs: "",
    addTo: "Command Author",
    reason: "",
    member: "",
    roleFrom: "Variable*",
    role: "",
  },
  UI: {
    compatibleWith: ["Text", "Slash"],
    text: "Add Role",
    sepbar: "",
    btext: "Get Role Via",
    menuBar: {
      choices: ["Role ID*", "Variable*"],
      storeAs: "roleFrom",
      extraField: "role",
    },

    sepbar0: "",

    btext0: "Get Member To Add Role To Via",
    menuBar0: {
      choices: ["Command Author", "Variable*", "Member ID*"],
      storeAs: "addTo",
      extraField: "member",
    },

    sepbar1: "",

    btext1: "Reason",
    input: "reason",

    preview: "roleFrom",
    previewName: "Via",
    variableSettings: {
      member: {
        "Variable*": "direct",
        "Member ID*": "indirect",
      },
      role: {
        "Variable*": "direct",
        "Role ID*": "indirect",
      },
    },
  },

  run(values, message, uID, fs, client, actionRunner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);

    let guild = bridge.guild;

    let role;
    if (values.roleFrom == "Variable*") {
      role = bridge.variables[varTools.transf(values.role, bridge.variables)];
    }
    if (values.roleFrom == "Role ID*") {
      role = varTools.transf(values.role, uID, tempVariables);
    }

    var member;
    if (values.addTo == "Command Author") {
      member = guild.getMember(message.member.id);
    }
    if (values.addTo == "Variable*") {
      member =
        bridge.variables[varTools.transf(values.member, bridge.variables)];
    }
    if (values.addTo == "Member ID*") {
      member = guild.getMember(
        varTools.transf(values.member, bridge.variables),
      );
    }

    member.addRole(role, varTools.transf(values.reason, bridge.variables));
  },
};
