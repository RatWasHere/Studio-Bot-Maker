module.exports = {
  name: "Channel Delete",
  nameSchemes: ["Store Channel As"],
  inputSchemes: 1,
  run(UI, client, fs, actionRunner, atWhat) {
    client.on("channelDelete", (msg) => {
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
