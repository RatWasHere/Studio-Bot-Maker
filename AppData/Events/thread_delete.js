module.exports = {
  name: "Thread Delete",
  nameSchemes: ["Store Thread As"],
  run(UI, client, fs, actionRunner, atWhat, globalEventStorage) {
    client.on("threadDelete", (thread) => {
      if (globalEventStorage["threadDeleted" + thread.id]) { delete globalEventStorage["threadDeleted" + thread.id]; return };
      actionRunner(
        atWhat,
        thread,
        client,
        {
          [UI[0]]: thread
        },
        true,
      );
      globalEventStorage["threadDeleted" + thread.id] = true
    });
  },
};