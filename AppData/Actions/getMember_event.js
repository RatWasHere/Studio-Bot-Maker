module.exports = {
  data: {
    name: "Get Member",
    memberFrom: "ID*",
    member: "",
    storesAs: "",
    guildFrom: "ID*",
    guild: "",
  },
  UI: {
    compatibleWith: ["Event"],
    text: "Get Member",

    sepbar: "",

    btext: "Get Guild Via",
    menuBar: {
      choices: ["Variable*", "ID*"],
      storeAs: "guildFrom",
      extraField: "guild",
    },

    sepbar0: "",

    btext1: "Get Member Via",
    menuBar1: {
      choices: ["ID*", "Name*", "Command Author"],
      storeAs: "memberFrom",
      extraField: "member",
    },

    sepbar1: "",

    btext2: "Store As",
    "input!*": "storesAs",

    variableSettings: {
      member: {
        "ID*": "indirect",
        "Name*": "indirect",
        "Command Author": "novars",
      },
      guild: {
        "Variable*": "direct",
      },
    },

    preview: "memberFrom",
    previewName: "Via",
  },
  async run(values, message, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);

    if (values.guildFrom == "ID*") {
    }
    if (values.guildFrom == "Variable*") {
    }

    if (values.memberFrom == "Command Author") {
      const member = guild.getMember(message.author.id);
      bridge.variables[values.storesAs] = await member;
    }
    if (values.memberFrom == "Name*") {
      const member = guild.members.find(
        (m) => m.nick === varTools.transf(values.member, bridge.variables),
      );
      bridge.variables[values.storesAs] = await member;
    }
    if (values.memberFrom == "ID*") {
      const member = guild.getMember(
        varTools.transf(values.member, bridge.variables),
      );
      bridge.variables[values.storesAs] = await member;
    }
  },
};
