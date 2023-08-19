module.exports = {
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
