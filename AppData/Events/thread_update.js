module.exports = {
  name: "Thread Update",
  nameSchemes: ["Store Thread Before Update As", "Store Thread After Update As"],
  run(UI, client, fs, actionRunner, atWhat, globalEventStorage) {
    client.on("threadUpdate", (thread, oldThread) => {
      if (globalEventStorage["threadUpdate" + thread.id]) { delete globalEventStorage["threadUpdate" + thread.id]; return };
      actionRunner(
        atWhat,
        thread,
        client,
        {
          [UI[0]]: thread,
          [UI[1]]: oldThread
        },
        true,
      );
      globalEventStorage["threadUpdate" + thread.id] = true
    });
  },
};