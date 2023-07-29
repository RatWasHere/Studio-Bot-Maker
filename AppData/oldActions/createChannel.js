module.exports = {
  data: {
    name: "Create Text Channel",
    channelName: "",
    button: "✕",
    guild: "Message Guild",
    guildVariable: "",
    storeChannelAs: "",
  },
  UI: {
    compatibleWith: ["Text", "Slash"],
    text: "Create Channel",

    sepbar: "",

    btext: "Channel Name",
    "input!*": "channelName",

    sepbar0: "",

    btext0: "Private?",
    ButtonBar: { buttons: ["✓", "✕"] },

    sepbar1: "",

    btext1: "Get Guild Via",
    menuBar: {
      choices: ["Message Guild", "Variable*", "Guild ID*"],
      storeAs: "guild",
      extraField: "guildVariable",
    },

    sepbar2: "",

    btext2: "Store Channel As",
    "input!": "storeChannelAs",

    variableSettings: {
      guildVariable: {
        "Variable*": "direct",
      },
    },

    preview: "channelName",
    previewName: "Name",
  },

  async run(values, message, uID, fs, client, actionRunner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);

    const { ChannelTypes, Permissions } = require("oceanic.js");

    let guild = message.guild;
    if (values.guild == "Guild ID*") {
      guild = client.guilds.get(varTools.transf());
    }
    if (values.guild == "Variable*") {
      guild = client.guilds.get(
        bridge.variables[varTools.transf(values.ExtraData, bridge.variables)],
      );
    }

    const channel = guild.createChannel({
      name: varTools.transf(values.channelName, bridge.variables),
      type: ChannelTypes.GUILD_TEXT,
      nsfw: false,
    });

    if (values.button == "✓") {
      client.channels.editPermissions(channel.id, {
        id: null,
        allow: [""],
        deny: [Permissions.VIEW_CHANNELS],
      });
    }
  },
};
