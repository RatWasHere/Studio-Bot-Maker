module.exports = {
  data: {
    name: "Get Channel",
    desc: "",
    storeAs: "",
    channelID: "",
    ExtraData: "",
  },
  UI: {
    compatibleWith: ["Any"],
    text: "Get Channel",

    sepbar: "",

    btext: "Channel ID",
    "input*": "channelID",

    sepbar0: "",

    btext1: "Store As",
    "input!*": "storeAs",

    previewName: "ID",
    preview: "channelID",
  },
  run(values, message, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    bridge.variables[varTools.transf(values.storeAs, bridge.variables)] =
      client.getChannel(varTools.transf(values.channelID, bridge.variables));
  },
};
