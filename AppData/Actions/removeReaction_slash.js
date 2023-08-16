module.exports = {
  data: { name: "Remove Reaction", message: "", emoji: "", userFrom: "", user: "" },

  UI: {
    compatibleWith: ["Slash"],
    text: "Remove Reaction",

    sepbar: "",

    btext: "Get Message To Remove Reaction From Via",
    input_direct: "message",

    sepbar0: "",

    btext0: "Reaction Emoji",
    "input*": "emoji",

    sepbar1:"",

    btext1: "Get User To Remove Reaction Of Via",
    menuBar0: {
      choices: ["Bot Client", "Command Author", "User Variable*", "User ID*"],
      storeAs: "userFrom",
      extraField: "user"
    },

    preview: "emoji",
    previewName: "Emoji",
    variableSettings: {
      "message": {
        "Variable*": "direct"
      },
      user: {
        "User Variable*": "direct"
      }
    }
  },

  async run(values, inter, client, bridge) {
    const varTools = require(`../Toolkit/variableTools.js`);

    let message = bridge.variables[varTools.transf(values.message, bridge.variables)];

    let user;

    switch (values.userFrom) {
      case 'Bot Client':
        user = '@me'
        break

      case 'Command Author':
        user = inter.author
        break
      
      case 'User Variable*':
        user = await bridge.toUser(bridge.variables[varTools.transf(values.user, bridge.variables)])
        break
      
      case 'User ID*':
        user = varTools.transf(values.user, bridge.variables)
        break
    }

    message.deleteReaction(varTools.transf(values.emoji, bridge.variables), user);
  },
};
