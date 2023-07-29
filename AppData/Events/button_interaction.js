module.exports = {
  name: "Button Interaction",
  nameSchemes: ["Store Interaction As"],
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
