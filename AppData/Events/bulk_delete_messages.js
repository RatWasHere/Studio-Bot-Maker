module.exports = {
  name: "Messages Bulk Delete",
  nameSchemes: ["Store Deleted Messages List As"],
  inputSchemes: 1,
  run(UI, client, fs, actionRunner, atWhat) {
    client.on("messageDeleteBulk", (msg) => {
      actionRunner(
        atWhat,
        msg[0],
        client,
        {
          [UI[0]]: msg,
        },
        true,
      );
    });
  },
};