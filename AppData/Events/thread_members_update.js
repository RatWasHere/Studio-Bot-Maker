module.exports = {
  name: "Thread Members Update",
  nameSchemes: ["Store Thread As", "Store Thread Added Members List As", "Store Thread Removed Members List As"],
  run(UI, client, fs, actionRunner, atWhat, globalEventStorage) {
    client.on("threadMembersUpdate", (thread, addedMembers, removedMembers) => {
      if (globalEventStorage["threadMembersUpdated" + thread.id]) { delete globalEventStorage["threadMembersUpdated" + thread.id]; return };
      actionRunner(
        atWhat,
        thread,
        client,
        {
          [UI[0]]: thread,
          [UI[1]]: addedMembers,
          [UI[2]]: removedMembers
        },
        true,
      );
      globalEventStorage["threadMembersUpdated" + thread.id] = true
    });
  },
};