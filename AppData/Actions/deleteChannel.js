module.exports = {
  data: {
    name: "Delete Channel",
    channel: "",
    channelFrom: "Command channel",
    threadName: "",
    autoArchive: "",
    storeAs: "",
  },
  UI: {
    compatibleWith: ["Text", "Slash"],
    text: "Delete Channel",
    sepbar:"",

    btext: "Get Channel Via",
    menuBar: {choices: ["Command Channel", "Variable*", "ID*"], storeAs: "channelFrom", extraField: "channel"},

    variableSettings: {
      channel: {
        "Variable*": "direct"
      }
    }
  },
  subtitle: "Get Channel Via: $[channelFrom]$",
  async run(values, message, client, bridge) {
    let transferVariables = require(`../Toolkit/variableTools.js`).transf;

    const transf = (value) => {
      return transferVariables(value, bridge.variables);
    };
    
    let channel;

    if (values.channelFrom == 'Command Channel') {
      channel = message.channel;
    }
    if (values.channelFrom == 'Variable*') {
      let chan = bridge.variables[transf(values.channel)]
        channel = chan.channel || client.getChannel(chan.id)
    }
    if (values.channelFrom == 'ID*') {
      channel = client.getChannel(transf(values.channel))
    }

    channel.delete()
  },
};
