module.exports = {
  data: {
    name: "Check Member Permission",
    runIfTrue: {},
    runIfFalse: {},
    permission: "Admin",
    memberVariable: "",
    memberChoice: "Command Author",
  },

  UI: {
    compatibleWith: ["Text", "Slash"],

    text: "Check Member Permission",
    sepbar: "",
    btext: "Get Member From",
    menuBar: {
      choices: ["Command Author", "Variable*", "Member ID*"],
      storeAs: "memberChoice",
      extraField: "memberVariable",
    },

    sepbar0: "",

    btext0: "Check Permission",
    menuBar0: {
      choices: [
        "Administrator",
        "Timeout",
        "Kick",
        "Ban",
        "Manage Roles",
        "Manage Messages",
        "Attach Files",
        "Manage Channels",
        "Manage Nicknames",
        "Change Nickname",
        "Create Threads",
        "Manage Threads",
        "Create Events",
        "Manage Events",
        "Mention Everyone",
        "View Audit Log",
        "Booster",
        "Manage Server",
      ],
      storeAs: "permission",
    },

    sepbar1: "",

    btext1: "If Member Has Permission, Run:",
    actions: "runIfTrue",

    sepbar2: "",

    btext2: "If Member Doesn't Have Permission, Run:",
    actions0: "runIfFalse",

    variableSettings: {
      whatNot: {
        "Run Action Group*": "actionGroup",
      },
      whatTo: {
        "Run Action Group*": "actionGroup",
      },
      memberVariable: {
        "Variable*": "direct",
      },
    },

    invisible: "",
    previewName: "Check For",
    preview: "permission",
  },

  async run(values, message, uID, fs, client, actionRunner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    let transferVariables = require(`../Toolkit/variableTools.js`).transf;

    const transf = (value) => {
      return transferVariables(value, bridge.variables);
    };

    let guild = bridge.guild;
    var member = message.member;
    if (values.memberChoice == "Variable*") {
      member = guild.getMember(
        bridge.variables[transf(values.memberVariable)].id,
      );
    }
    if (values.memberChoice == "Member ID*") {
      member = guild.getMember(
        varTools.transf(values.memberVariable, bridge.variables),
      );
    }
    let hasPermission = false;

    switch (values.permission) {
      case "Admin":
        if (member.permissions.has("ADMINISTRATOR")) {
          hasPermission = true;
        }
        break;

      case "Timeout":
        if (member.permissions.has("MODERATE_MEMBERS")) {
          hasPermission = true;
        }
        break;

      case "Kick":
        if (member.permissions.has("KICK_MEMBERS")) {
          hasPermission = true;
        }
        break;

      case "Ban":
        if (member.permissions.has("BAN_MEMBERS")) {
          hasPermission = true;
        }
        break;

      case "Manage Roles":
        if (member.permissions.has("MANAGE_ROLES")) {
          hasPermission = true;
        }
        break;

      case "Manage Messages":
        if (member.permissions.has("MANAGE_MESSAGES")) {
          hasPermission = true;
        }
        break;

      case "Attach Files":
        if (member.permissions.has("ATTACH_FILES")) {
          hasPermission = true;
        }
        break;

      case "Manage Channels":
        if (member.permissions.has("MANAGE_CHANNELS")) {
          hasPermission = true;
        }
        break;

      case "Manage Webhooks":
        if (member.permissions.has("MANAGE_WEBHOOKS")) {
          hasPermission = true;
        }
        break;

      case "Change Nickname":
        if (member.permissions.has("CHANGE_NICKNAME")) {
          hasPermission = true;
        }
        break;

      case "Manage Nicknames":
        if (member.permissions.has("MANAGE_NICKNAMES")) {
          hasPermission = true;
        }
        break;

      case "Create Threads":
        if (
          member.permissions.has("CREATE_PUBLIC_THREADS") ||
          member.permissions.has("CREATE_PRIVATE_THREADS")
        ) {
          hasPermission = true;
        }
        break;

      case "Manage Threads":
        if (member.permissions.has("MANAGE_THREADS")) {
          hasPermission = true;
        }
        break;

      case "Create Events":
        if (member.permissions.has("CREATE_EVENTS")) {
          hasPermission = true;
        }
        break;

      case "Manage Events":
        if (member.permissions.has("MANAGE_EVENTS")) {
          hasPermission = true;
        }
        break;

      case "Mention Everyone":
        if (member.permissions.has("MENTION_EVERYONE")) {
          hasPermission = true;
        }
        break;

      case "View Audit Log":
        if (member.permissions.has("VIEW_AUDIT_LOG")) {
          hasPermission = true;
        }
        break;

      case "Booster":
        if (member.premiumSince != null) {
          hasPermission = true;
        }
        break;

      case "Manage Server":
        if (member.permissions.has("MANAGE_GUILD")) {
          hasPermission = true;
        }
        break;
    }

    if (hasPermission == true) {
      actionRunner(values.runIfTrue, message, client, bridge.variables, true);
    } else {
      actionRunner(values.runIfFalse, message, client, bridge.variables, true);
    }
  },
};
