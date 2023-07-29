module.exports = {
  data: {
    name: "Timeout Member",
    memberFrom: "Variable*",
    member: "",
    reason: "",
    duration: "Minute(s)*",
    howMuch: "",
  },

  UI: {
    compatibleWith: ["Text", "Slash"],
    text: "Timeout Member",

    sepbar: "",

    btext: "Get Member From",
    menuBar: {
      choices: ["Command Author", "Variable*", "Member ID*"],
      storeAs: "memberFrom",
      extraField: "member",
    },

    sepbar0: "",

    btext0: "Duration",
    menuBar0: {
      choices: ["Day(s)*", "Hour(s)*", "Minute(s)*", "Second(s)*"],
      storeAs: "duration",
      extraField: "howMuch",
    },

    sepbar1: "",

    btext1: "Reason",
    input: "reason",
    preview: "memberFrom",
    previewName: "Member",

    variableSettings: {
      howMuch: {
        "Day(s)*": "novars",
        "Hour(s)*": "novars",
        "Minute(s)*": "novars",
        "Second(s)": "novars",
      },
      member: {
        "Command Author": "novars",
        "Variable*": "direct",
        "Member ID*": "indirect",
      },
    },
  },
  subtitle: "Amount Of Time: $[howMuch]$ $[duration]$ - Reason: $[reason]$",
  run(values, message, uID, fs, client, actionContextBridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    let guild = actionContextBridge.guild;

    let member;
    if (values.memberFrom == "Command Author") {
      member = guild.getMember(message.author.id);
    }
    if (values.memberFrom == "Variable*") {
      member = guild.getMember(
        bridge.variables[varTools.transf(values.member, bridge.variables)].id,
      );
    }
    if (values.memberFrom == "Member ID*") {
      member = guild.getMember(varTools.transf(values.member));
    }

    let duration;
    switch (values.duration) {
      case "Second(s)*":
        duration = parseFloat(values.howMuch) * 1000;
        break;

      case "Minute(s)*":
        duration = parseFloat(values.howMuch) * 60 * 1000;
        break;

      case "Hour(s)*":
        duration = parseFloat(values.howMuch) * 60 * 60 * 1000;
        break;

      case "Day(s)*":
        duration = parseFloat(values.howMuch) * 60 * 60 * 24 * 1000;
        break;
    }

    if (values.reason.trim() == "") {
      member.timeout({
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
