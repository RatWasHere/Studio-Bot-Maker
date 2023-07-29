module.exports = {
  data: {
    name: "Get Role Info",
    storeAs: "",
    get: "Role Name",
    role: "",
    roleFrom: "Role ID*",
  },
  UI: {
    compatibleWith: ["Text", "Slash"],
    text: "Get Role Info",

    sepbar: "",

    btext: "Get Role Via",
    menuBar: {
      choices: ["Variable*", "Role ID*"],
      storeAs: "roleFrom",
      extraField: "role",
    },
    sepbar0: "",
    btext0: "Get",
    menuBar0: {
      choices: [
        "Role Name",
        "Role Guild",
        "Role Guild ID",
        "Role ID",
        "Role Color",
        "Role Icon",
        "Role Position",
      ],
      storeAs: "get",
    },
    sepbar1: "",
    btext1: "Store As",
    "input!*": "storeAs",

    variableSettings: {
      role: {
        "Variable*": "direct",
      },
    },

    previewName: "Get",
    preview: "get",
  },
  run(values, message, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    let guild = bridge.guild;

    var role;
    if (values.roleFrom == "Variable*") {
      role = bridge.variables[varTools.transf(values.role, bridge.variables)];
    }
    if (values.roleFrom == "Role ID*") {
      role = guild.roles.get(varTools.transf(values.role, bridge.variables));
    }

    let output;

    switch (values.get) {
      case "Role Name":
        output = role.name;
        break;
      case "Role Guild":
        output = role.guild;
        break;
      case "Role Guild ID":
        output = role.guild.id;
        break;
      case "Role ID":
        output = role.id;
        break;
      case "Role Color":
        output = role.color;
        break;
      case "Role Icon":
        output = role.icon;
        break;
      case "Role Position":
        output = role.position;
        break;
    }
    bridge.variables[varTools.transf(values.storeAs, bridge.variables)] =
      output;
  },
};
