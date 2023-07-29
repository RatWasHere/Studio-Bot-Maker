module.exports = {
  name: "Thread Create",
  nameSchemes: ["Store Thread As", "Store Thread Creator ID As"],
  inputSchemes: 2,
  run(UI, client, fs, actionRunner, atWhat) {
    client.on("threadCreate", (thread) => {
      console.log(thread);
      actionRunner(
        atWhat,
        msg1,
        client,
        {
          [UI[0]]: thread,
          [UI[1]]: "unset",
        },
        true,
      );
    });
  },
};
