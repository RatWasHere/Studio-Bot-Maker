module.exports = {
  data: {
    name: "Set Client Status",
    activityName: "",
    activity: "Playing",
    type: "Online",
  },
  UI: {
    compatibleWith: ["Any"],
    text: "Set Client Status",

    sepbar: "",

    btext: "Status Activity",
    menuBar: {
      choices: ["Playing*", "Listening To*", "Watching*", "Streaming*", "None"],
      storeAs: "activity",
      extraField: "activityName",
    },

    sepbar0: "",

    btext0: "Status Type",
    menuBar0: {
      choices: ["Online", "Do Not Disturb", "Idle", "Invisible"],
      storeAs: "type",
    },

    variableSettings: { activityName: {} },

    preview: "activity",
    previewName: "Activity",
  },
  subtitle: "Activity: $[activity]$ $[activityName]$ - Type: $[type]$",
  run(values, message, uID, fs, client, runner, bridge) {
    let varTools = require(`../Toolkit/variableTools.js`);
    let guild;
    const { ActivityTypes, Presence } = require("oceanic.js");

    let activity;
    switch (values.activity) {
      case "Playing":
        activity = ActivityTypes.GAME;
        break;

      case "Listening To":
        activity = ActivityTypes.LISTENING;
        break;

      case "Watching":
        activity = ActivityTypes.WATCHING;
        break;

      case "Streaming":
        activity = ActivityTypes.STREAMING;
        break;
      case "None":
        activity = null;
        break;
    }

    let type;
    switch (values.type) {
      case "Online":
        type = "online";
        break;

      case "Do Not Disturb":
        type = "dnd";
        break;

      case "Idle":
        type = "idle";
        break;

      case "Invisible":
        type = "invisible";
        break;
    }

    if (activity != null) {
      client.editStatus({
        activities: [
          {
            type: activity,
            name: varTools.transf(values.activityName, bridge.variables),
          },
        ],
        status: type,
      });
    } else {
      client.editStatus({
        status: type,
      });
    }
  },
};
