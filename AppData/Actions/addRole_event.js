module.exports = {
  data: {
    name: "Add Role",
    storeAs: "",
    addTo: "Member ID*",
    guildFrom: "Guild ID*",
    guild: "",
    reason: "",
    member: "",
    roleFrom: "Variable*",
    role: "",
  },
  UI: {
    compatibleWith: ["Event", "DM"],
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
      choices: ["Variable*", "Member ID*"],
      storeAs: "addTo",
      extraField: "member",
    },

    sepbar1: "",

    btext1: "Get Role Guild Via",
    menuBar: {
      choices: ["Guild ID*", "Variable*"],
      storeAs: "guildFrom",
      extraField: "guild",
    },

    sepbar2: "",

    btext2: "Reason",
    input: "reason",

    preview: "roleFrom",
    previewName: "Via",
    variableSettings: {
      member: {
        "Member*": "direct",
        "Member ID*": "indirect",
      },
      role: {
        "Variable*": "direct",
        "Role ID*": "indirect",
      },
      guild: {
        "Variable*": "direct",
        "Guild ID*": "indirect",
      },
    },
  },

  run(values, message, uID, fs, client, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);

    let guild;
    if (values.guildFrom == "Variable*") {
      guild = client.guilds.get(
        bridge.variables[varTools.transf(values.guild, bridge)].id,
      );
    }
    if (values.guildFrom == "Guild ID*") {
      guild = client.guilds.get(varTools.transf(values.guild, bridge));
    }

    let role;
    if (values.roleFrom == "Variable*") {
      role = bridge.variables[varTools.transf(values.role, bridge)];
    }
    if (values.roleFrom == "Role ID*") {
      role = guild.roles.get(varTools.transf(values.role, bridge)).id;
    }

    var member;
    if (values.addTo == "Variable*") {
      member = guild.getMember(
        bridge.variables[varTools.transf(values.member, bridge)].id,
      );
    }
    if (values.addTo == "Member ID*") {
      member = guild.getMember(varTools.transf(values.member, bridge));
    }

    member.addRole(role, varTools.transf(values.reason, bridge));
  },
};
