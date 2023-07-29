module.exports = {
  data: { name: "Wait", amountOfTime: "Seconds*", time: "" },
  UI: {
    compatibleWith: ["Any"],
    text: "Wait",
    sepbar: "",
    btext: "Amount Of Time",
    menuBar: {
      choices: ["Minutes*", "Hours*", "Seconds*"],
      storeAs: "amountOfTime",
      extraField: "time",
    },
    previewName: "Units",
    preview: "amountOfTime",
    variableSettings: {
      time: {
        "Minutes*": "default",
        "Hours*": "default",
        "Seconds*": "default",
      },
    },
  },
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
