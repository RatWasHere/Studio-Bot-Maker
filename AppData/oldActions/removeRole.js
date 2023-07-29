module.exports = {
  data: {
    name: "Remove Role",
    storeAs: "",
    removeFrom: "Command Author",
    reason: "",
    member: "",
    roleFrom: "Variable*",
    role: "",
  },
  UI: {
    compatibleWith: ["Text", "Slash"],
    text: "Remove Role",
    sepbar: "",
    btext: "Get Role Via",
    menuBar: {
      choices: ["Role ID*", "Variable*"],
      storeAs: "roleFrom",
      extraField: "role",
    },

    sepbar0: "",

    btext0: "Get Member To Remove Role From Via",
    menuBar0: {
      choices: ["Command Author", "Variable*", "Member ID*"],
      storeAs: "removeFrom",
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

  run(values, message, uID, fs, client, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);

    let guild = bridge.guild;

    let role;
    if (values.roleFrom == "Variable*") {
      guild = client.guilds.get(
        bridge.variables[varTools.transf(values.role, bridge.variables)]
          .guildID,
      );
      role = guild.roles.get(
        bridge.variables[varTools.transf(values.role, bridge.variables)].id,
      ).id;
    }
    if (values.roleFrom == "Role ID*") {
      role = guild.roles.get(
        varTools.transf(values.role, uID, tempVariables),
      ).id;
    }

    var member;
    if (values.removeFrom == "Command Author") {
      member = guild.getMember(message.member.id);
    }
    if (values.removeFrom == "Variable*") {
      member = guild.getMember(
        bridge.variables[varTools.transf(values.member, bridge.variables)].id,
      );
    }
    if (values.removeFrom == "Member ID*") {
      member = guild.getMember(
        varTools.transf(values.member, bridge.variables),
      );
    }

    member.removeRole(role, varTools.transf(values.reason, bridge.variables));
  },
};
