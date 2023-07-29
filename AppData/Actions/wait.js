module.exports = {
  data: { name: "Wait", amountOfTime: "Seconds*", time: "" },
  UI: {
    compatibleWith: ["Any"],
    text: "Wait",

    sepbar: "",

    btext: "Time Unit",
    menuBar: {
      choices: ["Minutes", "Hours", "Seconds"],
      storeAs: "amountOfTime",
    },

    btext0: "Wait",
    "input custom number <min>1</min><max>99999999999999</max>": "time",
  },
  subtitle: "Amount Of Time: $[time]$ $[amountOfTime]$",
  async run(values, message, uID, fs, client, runner, bridge) {
    function wait(seconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
      });
    }
    const varTools = require("../Toolkit/variableTools.js");
    var timeAmount = parseFloat(varTools.transf(values.time, bridge.variables));
    let time;
    switch (values.amountOfTime) {
      case "Seconds*":
        time = 1000 * timeAmount;
        break;
      case "Minutes*":
        time = 1000 * 60 * timeAmount;
        break;
      case "Hours*":
        time = 1000 * 60 * 60 * timeAmount;
        break;
    }

    function wait(seconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
      });
    }

    await wait(time);
  },
};
