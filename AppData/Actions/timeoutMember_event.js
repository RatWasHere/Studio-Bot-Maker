module.exports = {
  data: {
    button: "Variable*",
    name: "Timeout Member",
    member: "",
    guild: "",
    memberFrom: "Member ID*",
    guildFrom: "Guild ID*",
    reason: "",
    duration: "Minute(s)*",
    howMuch: "",
  },

  UI: {
    compatibleWith: ["Event", "DM"],
    text: "Timeout Member",

    sepbar: "",

    btext: "Get Member From",
    menuBar: {
      choices: ["Variable*", "Member ID*"],
      storeAs: "memberFrom",
      extraField: "member",
    },

    sepbar0: "",

    btext0: "Get Guild From",
    menuBar0: {
      choices: ["Guild ID*", "Variable*"],
      storeAs: "guildFrom",
      extraField: "guild",
    },

    sepbarguildidk: "",
    btextdurationtime: "Duration",
    menuBarduration: {
      choices: ["Day(s)*", "Hour(s)*", "Minute(s)*", "Second(s)*"],
      storeAs: "duration",
      extraField: "howMuch",
    },
    sepbarguilddk: "",
    btextreason: "Reason",
    inputreason: "reason",
    preview: "member",
    previewName: "Member Var",
    variableSettings: {
      howMuch: {
        "Day(s)*": "novars",
        "Hour(s)*": "novars",
        "Minute(s)*": "novars",
        "Second(s)": "novars",
      },
      guild: {
        "Variable*": "direct",
        "Guild ID*": "indirect",
      },
    },
  },
  subtitle: "Amount Of Time: $[howMuch]$ $[duration]$ - Reason: $[reason]$",
  run(values, message, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    let guild;
    if (values.guildFrom == "Variable*") {
      guild = bridge.variables[varTools.transf(values.guild, bridge.variables)];
    }
    if (values.guildFrom == "Guild ID*") {
      guild = client.guilds.get(
        varTools.transf(values.guild, bridge.variables),
      );
    }

    let member;
    if (values.memberFrom == "Variable*") {
      guild.getMember(
        bridge.variables[varTools.transf(values.guild, bridge.variables)].id,
      );
    }
    if (values.guildFrom == "Member ID*") {
      guild.getMember(varTools.transf(values.guild, bridge.variables));
    }

    let duration;
    switch (values.duration) {
      case "Minute(s)*":
        duration = parseFloat(values.howMuch) * 60 * 1000;
        break;
      case "Second(s)*":
        duration = parseFloat(values.howMuch) * 1000;
        break;
      case "Hour(s)*":
        duration = parseFloat(values.howMuch) * 60 * 60 * 1000;
        break;
      case "Day(s)*":
        duration = parseFloat(values.howMuch) * 60 * 60 * 24 * 1000;
        break;
    }

    if (values.reason.trim() == "") {
      member.edit({
        communicationDisabledUntil: new Date().getTime() + duration,
      });
    } else {
      member.edit({
        communicationDisabledUntil: new Date().getTime() + duration,
        reason: varTools.transf(values.reason, bridge.variables),
      });
    }
  },
};
