module.exports = {
  data: { name: "Get Guild Channels List", storeAs: "", get: "IDs" },

  UI: {
    compatibleWith: ["Text", "Slash"],
    text: "Get Guild Channels List",

    sepbar: "",

    btext: "Get List Of Channels':",
    menuBar: {
      choices: ["IDs", "Variables", "Names"],
      storeAs: "get",
    },

    sepbar0: "",

    btext0: "Store List As",
    "input!": "storeAs",

    preview: "storeAs",
    previewName: "Store As",
  },

  async run(values, message, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);

    let output = [];

    for (let [id, channel] of bridge.guild.channels) {
      if (channel.parent) {
        if (values.get == "IDs") {
          output.push(id);
        } else if (values.get == "Variables") {
          output.push(channel);
        } else {
          output.push(channel.name);
        }
      }
    }

    bridge.variables[varTools.transf(values.storeAs, bridge.variables)] =
      output;
  },
};
