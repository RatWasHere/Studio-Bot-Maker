module.exports = {
  name: "Set Interval",
  nameSchemes: ["Call Every ? Seconds", "Emulated Guild ID"],
  preventStorage: ["Call Every ? Seconds"],
  run(UI, client, fs, actionRunner, atWhat) {
  setInterval(() => {
      actionRunner(atWhat, {guild: client.guilds.get(UI[1])}, client, {});
    },
    parseFloat(UI[0])
  );
  },
};