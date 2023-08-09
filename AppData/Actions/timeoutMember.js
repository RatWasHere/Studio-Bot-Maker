module.exports = {
  data: {
    name: "Timeout Member",
    memberFrom: "Variable*",
    member: "",
    reason: "",
    duration: "Minute(s)*",
    howLong: "",
  },

  UI: {
    compatibleWith: ["Any"],
    text: "Timeout Member",

    sepbar: "",

    btext: "Get Member From",
    menuBar: {
      choices: ["Variable*", "Member ID*"],
      storeAs: "memberFrom",
      extraField: "member",
    },

    sepbar0: "",

    btext0: "Duration",
    menuBar0: {
      choices: ["Day(s)*", "Hour(s)*", "Minute(s)*", "Second(s)*"],
      storeAs: "duration",
      extraField: "howLong",
    },

    sepbar1: "",

    btext1: "Reason",
    input: "reason",
    preview: "memberFrom",
    previewName: "Member",

    variableSettings: {
      howLong: {
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
  subtitle: "Amount Of Time: $[howLong]$ $[duration]$ - Reason: $[reason]$",
  run(values, message, client,  bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    let guild =  bridge.guild;

    let member;
    if (values.memberFrom == "Variable*") {
      member = guild.getMember(
        bridge.variables[varTools.transf(values.member, bridge.variables)].id,
      );
    }
    if (values.memberFrom == "Member ID*") {
      member = guild.getMember(varTools.transf(values.member));
    }

    let duration;
    let timeoutDuration = varTools.transf(values.howLong, bridge.variables)
    switch (values.duration) {
      case "Second(s)*":
        duration = parseFloat() * 1000;
        break;

      case "Minute(s)*":
        duration = parseFloat(timeoutDuration) * 60 * 1000;
        break;

      case "Hour(s)*":
        duration = parseFloat(timeoutDuration) * 60 * 60 * 1000;
        break;

      case "Day(s)*":
        duration = parseFloat(timeoutDuration) * 60 * 60 * 24 * 1000;
        break;
    }

    if (values.reason.trim() == "") {
      member.edit({
        communicationDisabledUntil: new Date().getTime() + duration,
        reason: '-',
      });
    } else {
      member.edit({
        communicationDisabledUntil: new Date().getTime() + duration,
        reason: varTools.transf(values.reason, bridge.variables),
      });
    }
  },
};
