module.exports = {
  name: "Channel Update",
  nameSchemes: ["Store Before As", "Store After As"],
  inputSchemes: 2,
  run(UI, client, fs, actionRunner, atWhat) {
    client.on("channelUpdate", (msg1, msg2) => {
      actionRunner(
        atWhat,
        msg1,
        client,
        {
          [UI[0]]: msg1,
          [UI[1]]: msg2,
        },
        true,
      );
    });
  },
};
