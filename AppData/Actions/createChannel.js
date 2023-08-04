module.exports = {
  data: {
    name: "Create Text Channel",
    channelName: "",
    private: true,
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

    toggle: {name: "Private", storeAs: "private"},

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

  async run(values, message, client, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);

    const { ChannelTypes, Permissions } = require("oceanic.js");

    let guild = bridge.guild;

    await guild.createChannel(ChannelTypes.GUILD_TEXT, {
      name: varTools.transf(values.channelName, bridge.variables),
      reason: "-",
      nsfw: false,
    }).then((channel) => {
      if (values.private == true) {
        client.channels.editPermissions(channel.id, {
          id: null,
          allow: [""],
          deny: [Permissions.VIEW_CHANNELS],
        });
      }
      bridge.variables[varTools.transf(values.storeAs, bridge.variables)] = channel;
    });
  },
};
