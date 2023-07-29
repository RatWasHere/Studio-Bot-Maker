module.exports = {
  data: { name: "Add Reaction", message: "", emoji: "", messageFrom: "" },

  UI: {
    compatibleWith: ["Text", "DM"],
    text: "Add Reaction",

    sepbar: "",

    btext: "Get Message To Add Reaction On Via",
    menuBar: {
      choices: ["Command Message", "Variable*"],
      storeAs: "messageFrom",
      extraField: "message",
    },

    sepbar0: "",

    btext0: "Reaction Emoji",

    "input*": "emoji",

    preview: "emoji",
    previewName: "Emoji",
  },

  async run(values, inter, uID, fs, client, bridge) {
    const varTools = require(`../Toolkit/variableTools.js`);

    let message;
    if (values.messageFrom == "Command Message") {
      message = inter;
    }
    if (values.messageFrom == "Variable*") {
      message =
        bridge.variables[varTools.transf(values.message, bridge.variables)];
    }
    message.createReaction(varTools.transf(values.emoji, bridge.variables));
  },
};
