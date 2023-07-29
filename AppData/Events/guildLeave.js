module.exports = {
  name: "Bot Leave Guild",
  nameSchemes: ["Store Guild As"],
  inputSchemes: 1,
  run(UI, client, fs, actionRunner, atWhat) {
    client.on(
      "guildDelete",
      (msg) => {
        actionRunner(atWhat, msg, client, {
          [UI[0]]: msg,
        });
      },
      true,
    );
  },
};
