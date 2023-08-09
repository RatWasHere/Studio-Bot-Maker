const variableTools = require("../Toolkit/variableTools.js");

module.exports = {
  data: { name: "Get User", userID: "", storeAs: "" },

  UI: {
    compatibleWith: ["Event"],

    text: "Get User",
    sepbar: "",

    btext: "User ID",
    input: 'userID',
    sepbar0: "",
    btext0: "Store As",
    "input!": "storeAs",

    variableSettings: { userID: {} },

    preview: "from",
    previewName: "From",
  },
  subtitle: "ID: $[userID]$ - Store As $[storeAs]$",
  async run(values, message, client, bridge) {
    let transferVariables = require(`../Toolkit/variableTools.js`).transf;

    const transf = (value) => {
      return transferVariables(value, bridge.variables);
    };
    let result;
      result = client.users.get(transf(values.userID));
      if (result == undefined) result = await client.rest.users.get(transf(values.userID));
    bridge.variables[transf(values.storeAs)] = result;
  },
};
