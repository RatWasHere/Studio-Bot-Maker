module.exports = {
  name: "Channel Create",
  nameSchemes: ["Store Channel As"],
  inputSchemes: 1,
  run(UI, client, fs, actionRunner, atWhat) {
    client.on("channelCreate", (channel) => {
      actionRunner(
        atWhat,
        channel,
        client,
        {
          [UI[0]]: channel,
        },
        true,
      );
    });
  },
};
