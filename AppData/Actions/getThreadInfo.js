module.exports = {
  data: { name: "Get Thread Info", thread: "", get: "", storeAs: "" },

  UI: {
    compatibleWith: ["Any"],

    text: "Get Thread Info",
    sepbar: "",

    btext: "Thread Variable",
    "input_direct": "thread",

    sepbar0:"",

    btext0: "Get",
    menuBar: {
      choices: ["Thread Member Count", "Thread Owner", "Parent Channel", "Thread Total Messages Sent", "Thread Messages List"],
      storeAs: "get"
    },
    
    btext1: "Store As",
    "input!": "storeAs"
  },

  subtitle: "Thread Variable: $[listName]$ - Get: $[get]$ - Store As: $[storeAs]$",
  
  async run(values, message, client, bridge) {
    let transferVariables = require(`../Toolkit/variableTools.js`).transf;

    const transf = (value) => {
      return transferVariables(value, bridge.variables);
    };

    let thread = bridge.variables[transf(values.thread)]

    let result;

    switch (values.get) {
      case 'Thread Member Count':
        result = thread.memberCount;
        break
      case 'Thread Owner':
        result = thread.owner;
        break
      case 'Thread Parent Channel':
        result = thread.memberCount;
        break
      case 'Thread Member Count':
        result = thread.memberCount;
        break
      case 'Thread Member Count':
        result = thread.memberCount;
        break
      case 'Thread Member Count':
        result = thread.memberCount;
        break
  
    }


    bridge.variables[transf(values.storeAs)] = result;
  },
};
