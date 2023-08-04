module.exports = {
  data: {
    name: "Await Message",
    storeMessageAuthorAs: "",
    storeMessageAs: "",
    actions: {},
    channelFrom: "Command Channel",
    fromWho: "",
    targetUser: "Anybody",
    stopAwaitingAfter: "60",
    channel: "",
  },

  UI: {
    compatibleWith: ["Text", "Slash"],
    text: "Await Message",

    sepbar: "",

    btext: "Get Channel To Await Message From Via:",
    menuBar: {
      choices: ["Command Channel", "ID*", "Variable*"],
      storeAs: "channelFrom",
      extraField: "channel",
    },

    sepbar0: "",

    btext0: "Get User To Await Message From Via:",
    menuBar0: {
      choices: ["Anybody", "Command Author", "User*", "User ID*"],
      storeAs: "targetUser",
      extraField: "fromWho",
    },

    sepbar1: "",

    btext1: "Once Sent, Run",

    actions: "actions",
    sepbar2: "",

    btext3: "Stop Waiting After (seconds)",
    input: "stopAwaitingAfter",

    sepbar3: "",

    btext4: "Store Message Author As",
    "input!": "storeMessageAuthorAs",

    btext5: "Store Message As",
    "input0!": "storeMessageAs",

    preview: "targetUser",
    previewName: "Await From",

    variableSettings: {
      fromWho: {
        "User*": "direct",
        Anybody: "novars",
        "Command Author": "novars",
      },
      emoji: {
        "Custom*": "indirect",
      },
      message: {
        "Variable*": "direct",
      },
    },
  },

  async run(values, inter, client, bridge) {
    const varTools = require(`../Toolkit/variableTools.js`);
    
    let actionRunner = bridge.runner;

    let message;

    const handlemessage = (msg) => {
      message = msg
      let matchesTarget = false;
      let matchesChannel = false;

      switch (values.channelFrom) {
        case "Command Channel":
          matchesChannel = `${inter.channelID}` == `${message.channelID}`;
          break;
        case "ID*":
          matchesChannel =
            varTools.transf(values.channel, bridge.variables) ==
            message.channel.id;
          break;
        case "Variable*":
          matchesChannel =
            bridge.variables[varTools.transf(values.channel, bridge.variables)]
              .id == message.channel.id;
          break;
      }


      switch (values.targetUser) {
        case "Anybody":
          matchesTarget = true;
          break;
        case "Command Author":
          matchesTarget = message.author.id == inter.author.id;
          break;
        case "User*":
          matchesTarget =
            message.author.id ==
            bridge.variables[varTools.transf(values.fromWho, bridge.variables)]
              .id;
          break;
        case "User ID*":
          matchesTarget =
            message.author.id ==
            varTools.transf(values.fromWho, bridge.variables);
          break;
      }
      if (matchesTarget && matchesChannel) {
        actionRunner(
          values.actions,
          message,
          client,
          {
            ...bridge.variables,
            [varTools.transf(values.storeMessageAs, bridge.variables)]: message,
            [varTools.transf(values.storeMessageAuthorAs, bridge.variables)]:
              message.author,
          },
          true,
        );
      }
    };

    client.on(
      "messageCreate",
      handlemessage,
    );

    if (values.stopAwaitingAfter != "") {
      setTimeout(
        () => {
          client.off("messageCreate", handlemessage);
        },
        parseFloat(values.stopAwaitingAfter) * 1000,
      );
    }
  },
};
