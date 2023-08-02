module.exports = {
  name: "Thread Create",
  nameSchemes: ["Store Thread As", "Store Thread Owner As"],
  inputSchemes: 2,
  run(UI, client, fs, actionRunner, atWhat, globalEventStorage) {
    client.on("threadCreate", (thread) => {
      if (globalEventStorage["thread" + thread.id]) { delete globalEventStorage["thread" + thread.id]; return };
      actionRunner(
        atWhat,
        thread,
        client,
        {
          [UI[0]]: thread,
          [UI[1]]: thread.owner,
        },
        true,
      );
      globalEventStorage["thread" + thread.id] = true
    });
  },
};
