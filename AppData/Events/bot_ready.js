module.exports = {
  name: "Bot Ready",
  nameSchemes: [],
  run(UI, client, fs, actionRunner, atWhat) {
    client.on(
      "ready",
      () => {
        actionRunner(atWhat, null, client, {
          [UI[0]]: client,
        });
      },
      true,
    );
  },
};
