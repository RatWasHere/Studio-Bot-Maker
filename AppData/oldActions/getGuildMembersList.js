module.exports = {
  data: { name: "Get Guild Members List", storeAs: "", get: "IDs" },

  UI: {
    compatibleWith: ["Text", "Slash"],
    text: "Get Guild Members List",

    sepbar: "",

    btext: "Get List Of Members':",
    menuBar: {
      choices: ["IDs", "Variables", "Usernames"],
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

    for (let [id, member] of bridge.guild.members) {
      if (values.get == "IDs") {
        output.push(id);
      } else if (values.get == "Variables") {
        output.push(member);
      } else {
        output.push(member.globalName);
      }
    }

    bridge.variables[varTools.transf(values.storeAs, bridge.variables)] =
      output;
  },
};
