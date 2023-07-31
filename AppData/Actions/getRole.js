module.exports = {
  data: { name: "Get Role", roleID: "", storeAs: "" },
  UI: {
    compatibleWith: ["Text", "Slash"],
    text: "Get Role",

    sepbar: "",

    btext: "Role ID",
    "input*": "roleID",

    sepbar0: "",

    btext0: "Store As",
    "input!*": "storeAs",
  },

  subtitle: "ID: $[roleID]$ - Store As: $[storeAs]$",

  run(values, message, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    bridge.variables[values.storeAs] = bridge.guild.roles.get(
      varTools.transf(values.roleID, bridge.variables),
    );
  },
};
