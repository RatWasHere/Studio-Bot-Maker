module.exports = {
  name: "Bot Leave Guild",
  nameSchemes: ["Store Guild As"],
  inputSchemes: 1,
  run(UI, client, fs, actionRunner, atWhat) {
    client.on(
      "guildDelete",
      (guild) => {
        actionRunner(atWhat, {...guild, guild: guild}, client, {
          [UI[0]]: guild,
        });
      },
      true,
    );
  },
};
