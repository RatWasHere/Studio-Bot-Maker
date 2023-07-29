module.exports = {
  data: {
    name: "Create Role",
    roleName: "",
    reason: "",
    color: "#000000",
    guildFrom: "Command Guild",
    storeAs: "",
    guildVariable: "",
    isRoleMentionable: "Yes",
    displayRoleSeparately: "Yes",
  },
  UI: {
    compatibleWith: ["Slash", "Text"],

    text: "Create Role",

    sepbar: "",

    btext: "Role Name",
    "input*": "roleName",

    sepbar1: "",

    btext0: "Role Color",
    "input0*": "color",

    sepbar2: "",

    btext1: "Display Role Separately?",
    menuBar: { choices: ["Yes", "No"], storeAs: "displayRoleSeparately" },

    btext2: "Make Role Mentionable?",
    menuBar0: { choices: ["Yes", "No"], storeAs: "isRoleMentionable" },

    sepbar3: "",

    btext3: "Reason",
    input: "reason",

    sepbar4: "",

    btext4: "Store As",
    "input!*": "storeAs",

    variableSettings: {
      guildVariable: {
        "Guild*": "direct",
        "Command Guild": "novars",
      },
    },
    preview: "roleName",
    previewName: "Name",
  },
  run(values, message, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);

    let guild = bridge.guild;

    let roleParameters = {
      name: varTools.transf(values.roleName, bridge.variables),
      color: parseInt(
        varTools.transf(values.color, bridge.variables).replace("#", ""),
        16,
      ),
      hoist: values.displayRoleSeparately == "Yes",
      reason:
        values.reason != ""
          ? varTools.transf(values.reason, bridge.variables)
          : "-",
      mentionable: values.isRoleMentionable == "Yes",
    };

    guild.createRole(roleParameters).then((role) => {
      bridge[varTools.transf(values.storeAs, bridge)] = role;
    });
  },
};
