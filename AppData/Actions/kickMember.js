module.exports = {
  data: {
    memberFrom: "Variable*",
    name: "Kick Member",
    memberVariable: "",
    reason: "",
  },
  UI: {
    compatibleWith: ["Any"],

    text: "Kick Member",

    sepbar: "",

    btext: "Get Member Via",
    menuBar: {
      choices: ["Variable*", "ID*"],
      storeAs: "memberFrom",
      extraField: "memberVariable",
    },

    sepbar2: "",
    btext2: "Reason",
    input: "reason",
    preview: "memberFrom",
    previewName: "Kick",
    variableSettings: {
      memberVariable: {
        "Variable*": "direct",
      },
    },
  },
  subtitle: "Kick: $[memberFrom]$ - Reason: $[reason]$",

  async run(values, message, client, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);

    let guild = bridge.guild;

    let member;
    if (values.memberFrom == "Variable*") {
      member = await guild.getMember(
        bridge.variables[
          varTools.transf(values.memberVariable, bridge.variables)
        ].id,
      );
    }
    if (values.memberFrom == "ID*") {
      member = await guild.getMember(
        varTools.transf(values.memberVariable, bridge.variables),
      );
    }
    if (values.reason.trim() == "") {
      member.kick();
    } else {
      member.kick({ reason: varTools.transf(values.reason, bridge.variables) });
    }
  },
};
