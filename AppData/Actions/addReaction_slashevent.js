module.exports = {
  data: { name: "Add Reaction", message: "", emoji: "" },

  UI: {
    compatibleWith: ["Slash", "Event"],
    text: "Add Reaction",

    sepbar: "",

    btext: "Message Variable",
    input_direct: "message",

    sepbar0: "",

    btext0: "Reaction Emoji",

    "input*": "emoji",

    preview: "emoji",
    previewName: "Emoji",
  },

  async run(values, inter, uID, fs, client, bridge) {
    const varTools = require(`../Toolkit/variableTools.js`);

    let message =
      bridge.variables[varTools.transf(values.message, bridge.variables)];

    message.createReaction(varTools.transf(values.emoji, bridge.variables));
  },
};
