module.exports = {
  data: { name: "Delete Role", role: "", roleFrom: "Variable*", reason: "" },
  UI: {
    compatibleWith: ["Text", "Slash"],
    text: "Delete Role",

    sepbar: "",

    btext: "Get Role Via",
    menuBar: {
      choices: ["Variable*", "Role ID*"],
      storeAs: "roleFrom",
      extraField: "role",
    },

    sepbar0: "",

    btext0: "Reason",
    input: "reason",

    previewName: "Variable",
    preview: "roleVariable",
  },
  run(values, message, uID, fs, client, runner, bridge) {
    let roleFrom = bridge.guild;
    let varTools = require(`../Toolkit/variableTools.js`);

    let role;

    if (values.roleFrom == "Variable*") {
      role = bridge.variables[varTools.transf(values.role, bridge.variables)];
    }
    if (values.roleFrom == "Role ID*") {
      role = bridge.guild.roles.get(varTools.transf(role, bridge.variables));
    }

    role.delete(
      values.role == ""
        ? "-"
        : varTools.transf(values.reason, bridge.variables),
    );
  },
};
