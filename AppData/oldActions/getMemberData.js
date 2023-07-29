module.exports = {
  data: {
    name: "Get Member Data",
    dataName: "",
    dataValue: "",
    storeAs: "",
    memberAs: "Message Author",
    memberFrom: "",
  },

  UI: {
    compatibleWith: ["Text", "Slash"],
    text: "Get Member Data",

    sepbar3: "",

    btext00guild: "Get Member From",
    menuBar: {
      choices: ["Message Author", "Variable*"],
      storeAs: "memberAs",
      extraField: "memberFrom",
    },

    sepbar134324121232: "",

    btext33333333: "Data Name",
    "input1*": "dataName",
    sepbar12345: "",
    btext3333ds3333: "Store Data As",
    "input341!*": "storeAs",

    variableSettings: {
      memberFrom: {
        "Variable*": "direct",
        "Message Author": "novars",
      },
    },

    preview: "memberAs",
    previewName: "Member",
  },

  async run(values, message, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    var storedData = JSON.parse(
      fs.readFileSync("./AppData/Toolkit/storedData.json", "utf8"),
    );
    let guild = "";
    var firstValue = ``;
    let secondValue = varTools.transf(values.dataName, bridge.variables);
    var onArr = "members";

    if (values.memberAs == "Message Author") {
      user = message.author.id;
      guild = message.guild.id;
    } else {
      guild = bridge.variables[values.memberFrom].guildID;
      user = bridge.variables[values.memberFrom].id;
    }

    bridge.variables[values.storeAs] =
      storedData[onArr][guild + user][firstValue + secondValue];
  },
};
