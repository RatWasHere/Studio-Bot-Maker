module.exports = {
  data: {
    name: "Start Thread",
    message: "",
    threadName: "",
    autoArchive: "",
    storeAs: "",
  },
  UI: {
    compatibleWith: ["Slash", "Event"],
    text: "Start Thread",
    sepbar:"",
    btext: "Parent Message Variable",
    "input_direct": "message",

    sepbar0:"",

    btext0: "Thread Name",
    input: "threadName",

    sepbar1: "",

    btext1: "Thread Auto-Archive Duration",
    menuBar0: {choices: ["1 Hour", "24 Hours", "3 Days", "1 Week"], storeAs: "autoArchive"},

    sepbar2:"",

    btext2: "Store Thread As",
    "input!":"storeAs",

    variableSettings: {
      message: {
        "Variable*": "direct"
      }
    }
  },
  subtitle: "Message: $[autoArchive]$ - Archive After: $[autoArchive]$",
  async run(values, message, client, bridge) {
    let transferVariables = require(`../Toolkit/variableTools.js`).transf;

    const transf = (value) => {
      return transferVariables(value, bridge.variables);
    };

    
    let threadName = transf(values.threadName)

    let autoArchive;

    switch(values.autoArchive) {
      case '1 Hour': 
        autoArchive = 60;
      break
      case '24 Hours':
        autoArchive = 1440
      break
      case '3 Days':
        autoArchive = 4320
      break
      case '1 Week':
        autoArchive = 10080
      break
    }

    let msg = bridge.variables[transf(values.message)]

    let thread = await msg.startThread({
      name: threadName,
      autoArchiveDuration: autoArchive
    })
      bridge.variables[transf(values.storeAs)] = thread
  },
};
