module.exports = {
  data: { name: "Start Typing", channelFrom: "Message Channel", channel: "" },

  UI: {
    compatibleWith: ["Text", "Slash"],
    text: "Start Typing",

    sepbar3: "",

    btext00guild: "Start Typing In",
    menuBar: {
      choices: ["Message Channel", "Variable*"],
      storeAs: "channelFrom",
      extraField: "channel",
    },

    sepbar134324121232: "",

    variableSettings: {
      channel: {
        "Variable*": "direct",
        "Message Channel": "novars",
      },
    },

    preview: "channelFrom",
    previewName: "In",
  },

  async run(values, message, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    var storedData = JSON.parse(
      fs.readFileSync("./AppData/Toolkit/storedData.json", "utf8"),
    );

    if (values.channelFrom == "Message Channel") {
      message.channel.sendTyping();
    } else {
      let channelId =
        bridge.variables[varTools.transf(values.channel, bridge.variables)].id;
      client.getChannel(channelId).sendTyping();
    }
  },
};
