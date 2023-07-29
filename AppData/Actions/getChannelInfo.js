module.exports = {
  data: {
    name: "Get Channel Info",
    channelVia: "Message Channel",
    channelFrom: "",
    get: "Channel Name",
  },
  UI: {
    compatibleWith: ["Text", "Slash"],
    text: "Get Channel Info",
    sepbar: "",

    btext: "Get Channel Via",
    menuBar: {
      choices: ["Message Channel", "Variable*", "Channel ID*"],
      storeAs: "channelVia",
      extraField: "channelFrom",
    },

    sepbar0: "",

    btext0: "Get",
    menuBar0: {
      choices: [
        "Channel Name",
        "Channel ID",
        "Channel Description",
        "Channel Guild",
        "Channel Topic",
        "Channel URL",
        "Channel Server",
      ],
      storeAs: "get",
    },

    sepbar1: "",
    btext1: "Store As",
    "input!*": "storeAs",

    variableSettings: {
      channelFrom: {
        "Variable*": "direct",
      },
    },
    previewName: "Get",
    preview: "get",
  },
  async run(values, message, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    let channel;
    if (values.channelVia == "Message Channel") {
      channel = message.channel;
    }
    if (values.channelVia == "Variable*") {
      channel =
        bridge.variables[varTools.transf(values.channelFrom, bridge.variables)];
    }
    if (values.channelVia == "Channel ID*") {
      channel = client.channels.get(
        varTools.transf(values.channelFrom, bridge.variables),
      );
    }

    let output;
    switch (values.get) {
      case "Channel Name":
        output = channel.name;
        break;
      case "Channel Topic":
        output = channel.topic;
        break;
      case "Channel URL":
        if (channel.guild) {
          output = `https://discord.com/channels/${channel.guild.id}/${channel.id}`;
        } else {
          output = `https://discord.com/channels/@me/${channel.recipient.id}`;
        }
        break;
      case "Channel Topic":
        output = channel.topic || "-";
        break;
      case "Channel Server":
        output = channel.server;
        break;
      case "Channel ID":
        output = channel.id;
        break;
      case "Channel Guild":
        output = channel.guild || "-";
        break;
    }

    bridge.variables[varTools.transf(values.storeAs, bridge.variables)] =
      output;
  },
};
