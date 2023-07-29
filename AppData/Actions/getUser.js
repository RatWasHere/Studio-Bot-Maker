const variableTools = require("../Toolkit/variableTools.js");

module.exports = {
  data: { name: "Get User", from: "User ID*", userID: "", storeAs: "" },

  UI: {
    compatibleWith: ["Text", "Slash"],

    text: "Get User",
    sepbar: "",

    btext: "Get User From",
    menuBar: {
      choices: ["User ID*", "Command Author"],
      storeAs: "from",
      extraField: "userID",
    },
    sepbar0: "",
    btext0: "Store As",
    "input!": "storeAs",

    variableSettings: { userID: {} },

    preview: "from",
    previewName: "From",
  },
  subtitle: "From: $[from]$ $[userID]$ - Store As $[storeAs]$",
  async run(values, message, uID, fs, client, runner, bridge) {
    let transferVariables = require(`../Toolkit/variableTools.js`).transf;

    const transf = (value) => {
      return transferVariables(value, bridge.variables);
    };
    let result;
    if (values.from == "User ID*") {
      result = client.users.get(transf(values.userID));
      if (result == undefined)
        result = await client.rest.users.get(transf(values.userID));
    } else {
      result = message.author;
    }
    bridge.variables[transf(values.storeAs)] = result;
  },
};
