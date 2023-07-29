module.exports = {
  data: {
    name: "Delete Message",
    message: "",
    messageFrom: "Command Message",
    channelFrom: "Command Channel",
    channel: "",
  },
  UI: {
    compatibleWith: ["Text", "DM"],
    text: "Delete Message",
    sepbar: "",

    btext: "Get Message Via",
    menuBar: {
      choices: ["Command Message", "Variable*"],
      storeAs: "messageFrom",
      extraField: "message",
    },

    invisible: "",

    variableSettings: {
      message: {
        "Variable*": "direct",
      },
    },
    previewName: "Message Via",
    preview: "messageFrom",
  },

  run(values, message, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    var msg;

    if (values.messageFrom == "Command Message") {
      msg = message;
    } else {
      msg = bridge.variables[varTools.transf(values.message, bridge.variables)];
    }

    msg.delete();
  },
};
