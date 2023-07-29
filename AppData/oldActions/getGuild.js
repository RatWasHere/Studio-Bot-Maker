module.exports = {
  data: {
    name: "Get Guild",
    desc: "",
    storeAs: "",
    guildID: "",
    ExtraData: "",
  },
  UI: {
    compatibleWith: ["Any"],
    text1: "Get Guild",
    sepbar2: "",
    btextbtn: "Guild ID",
    inputbutton: "guildID",
    sepbar14: "",
    btext566: "Store As",
    "input!*": "storeAs",
    previewName: "Content",
    preview: "desc",
  },
  run(values, message, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    bridge.variables = {
      ...bridge.variables,
      [varTools.transf(values.storeAs, bridge.variables)]: client.guilds.get(
        varTools.transf(values.guildID, bridge.variables),
      ),
    };
  },
};
