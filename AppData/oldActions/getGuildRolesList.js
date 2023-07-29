module.exports = {
  data: { name: "Get Guild Roles List", storeAs: "", get: "IDs" },

  UI: {
    compatibleWith: ["Text", "Slash"],
    text: "Get Guild Roles List",

    sepbar: "",

    btext: "Get List Of Roles':",
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

    for (let [id, role] of bridge.guild.roles) {
      if (values.get == "IDs") {
        output.push(id);
      } else if (values.get == "Variables") {
        output.push(role);
      } else {
        output.push(role.name);
      }
    }

    bridge.variables[varTools.transf(values.storeAs, bridge.variables)] =
      output;
  },
};
