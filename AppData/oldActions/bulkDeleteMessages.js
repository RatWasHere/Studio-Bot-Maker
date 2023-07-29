module.exports = {
  data: {
    name: "Bulk Delete",
    channelVariable: "",
    channelFrom: "Command Channel",
    user: "Anybody",
    fromWho: "",
    mustInclude: "Nothing",
    toInclude: "",
    amount: "Custom*",
    quantity: "",
  },

  UI: {
    compatibleWith: ["Text", "Slash"],
    text: "Bulk Delete",
    sepbar: "",
    btext: "Get Messages Channel Via",
    menuBar: {
      choices: ["Command Channel", "Variable*", "ID*"],
      storeAs: "channelFrom",
      extraField: "channelVariable",
    },
    sepbar0: "",
    btext0: "Message Must Include",
    menuBar0: {
      choices: ["Nothing", "Word(s)*"],
      storeAs: "mustInclude",
      extraField: "toInclude",
    },
    sepbar1: "",
    btext1: "Amount",
    menuBar1: {
      choices: ["Custom*", "Max"],
      storeAs: "amount",
      extraField: "quantity",
    },
    sepbar2: "",
    btext2: "Get User To Delete Messages From Via",
    menuBar2: {
      choices: ["Command Author", "User*", "ID*", "Anybody"],
      storeAs: "user",
      extraField: "fromWho",
    },
    invisible: "",
    variableSettings: {
      channelVariable: {
        "Variable*": "direct",
      },
      toInclude: {
        "Word(s)*": "indirect",
      },
      quantity: {
        "Custom*": "indirect",
      },
      fromWho: {
        "User*": "direct",
      },
    },
    previewName: "From",
    preview: "channelFrom",
  },

  run(values, message, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);

    let channel;
    if (values.channelFrom == "Command Channel") {
      channel = message.channel;
    }
    if (values.channelFrom == "Variable*") {
      const channelID =
        bridge.variables[
          varTools.transf(values.channelVariable, bridge.variables)
        ].id;
      channel = client.getChannel(channelID);
    }
    if (values.channelFrom == "ID*") {
      channel = client.getChannel(
        varTools.transf(values.channelVariable, bridge.variables),
      );
    }

    const timestamp = new Date().getTime() - 1000 * 60 * 60 * 24 * 13;

    let mustInclude = "";
    if (values.mustInclude == "Word(s)*") {
      mustInclude = varTools.transf(values.toInclude, bridge.variables);
    }

    let mustBeFrom = null;
    if (values.user == "Command Author") {
      mustBeFrom = message.author.id;
    }
    if (values.user == "User*") {
      mustBeFrom =
        bridge.variables[varTools.transf(values.fromWho, bridge.variables)].id;
    }
    if (values.user == "ID*") {
      mustBeFrom = varTools.transf(values.fromWho, bridge.variables);
    }

    let amount = 300;
    if (values.amount == "Custom*") {
      amount = parseFloat(varTools.transf(values.quantity, bridge.variables));
    }

    let checkFor = (m) =>
      m.content.toLowerCase().includes(mustInclude.toLowerCase());
    var deletedMessages = 0;
    channel.getMessages({ limit: amount * 5 }).then((messages) => {
      messages.filter(checkFor).forEach((msg) => {
        if (deletedMessages > amount) return;
        if (mustBeFrom == null) {
          msg.delete();
        } else {
          if (msg.author.id == mustBeFrom) {
            msg.delete();
          }
        }
        deletedMessages++;
      });
    });
  },
};
