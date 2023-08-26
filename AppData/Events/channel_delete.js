module.exports = {
  name: "Channel Delete",
  nameSchemes: ["Store Channel As"],
  inputSchemes: 1,
  run(UI, client, fs, actionRunner, atWhat) {
    client.on("channelDelete", (channel) => {
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
