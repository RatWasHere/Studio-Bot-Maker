// interactionTools V0 By Rat Running on Studio API 1
// tools to interact with UI elements originating from the editor, and converting them to valid
// discord.js objects, with ease!

module.exports = {
  studio: { API: "1", Version: "2" },

  stopExecution(uID) {
    var tempVars = JSON.parse(fs.readFileSync("./tempVars.json", "utf8"));

    tempVars[uID][`${uID}_stop`] = true;
    fs.writeFileSync("./tempVars.json", JSON.stringify(tempVars));
  },
  async runCommand(id, actionRunner, uID, client, message) {
    const datjson = require("../data.json");
    for (let command in datjson.commands) {
      if (datjson.commands[command].customId == id) {
        await actionRunner(command, message, client, uID);
      }
    }
  },
  preventDeletion(uID) {
    return;
  },
  leak(uID, customTimestamp) {
    return;
  },
};
