module.exports = {
  name: "Channel Create",
  nameSchemes: ["Store Channel As"],
  inputSchemes: 1,
  run(UI, client, fs, actionRunner, atWhat) {
    client.on("channelCreate", (msg) => {
      actionRunner(
        atWhat,
        msg,
        client,
        {
          [UI[0]]: msg,
        },
        true,
      );
    });
  },
};
