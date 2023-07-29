module.exports = {
  data: {
    name: "Get Mentioned User",
    messageFrom: "Command Message",
    message: "",
    storeAs: "",
    store: "User ID",
    position: "First",
    numericPosition: "4",
  },
  UI: {
    compatibleWith: ["Text", "DM"],
    text: "Get Mentioned User",

    sepbar: "",

    btext: "Get Message Via",
    menuBar: {
      choices: ["Command Message", "Variable*"],
      storeAs: "messageFrom",
      extraField: "message",
    },
    sepbar0: "sepbar",
    btext0: "Mention Number",
    menuBar0: {
      choices: ["First", "Second", "Third", "Custom*"],
      storeAs: "position",
      extraField: "numericPosition",
    },

    sepbar1: "",

    btext1: "Store",
    menuBar1: { choices: ["User ID", "User Variable"], storeAs: "store" },

    sepbar2: "",

    btext2: "Store As",
    "input!": "storeAs",
    variableSettings: {
      message: {
        "Variable*": "direct",
      },
    },
    preview: "position",
    previewName: "Mention",
  },
  run(values, message, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    let msg;

    if (values.messageFrom == "Command Message") {
      msg = message;
    } else {
      msg = client
        .getChannel(bridge.variables[values.message].channelId)
        .messages.get(bridge.variables[values.message].id);
    }

    let mentions = msg.mentions.users;
    let mention;
    switch (values.position) {
      case "First":
        mention = mentions[0];
        break;
      case "Second":
        mention = mentions[1];
        break;
      case "Third":
        mention = mentions[2];
        break;
      case "Custom":
        mention =
          mentions[
            parseFloat(
              varTools.transf(values.numericPosition, bridge.variables),
            )
          ];
        break;
    }

    bridge.variables = {
      ...bridge.variables,
      [values.storeAs]: values.store == "User Variable" ? mention : mention.id,
    };
  },
};
