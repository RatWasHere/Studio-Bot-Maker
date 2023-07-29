module.exports = {
  name: "Bot Join Guild",
  nameSchemes: ["Store Guild As"],
  inputSchemes: 1,
  run(UI, client, fs, actionRunner, atWhat) {
    client.on(
      "guildCreate",
      (msg) => {
        actionRunner(atWhat, msg, client, {
          [UI[0]]: msg,
        });
      },
      true,
    );
  },
};
