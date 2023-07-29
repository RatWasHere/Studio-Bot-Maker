module.exports = {
  name: "Role Create",
  nameSchemes: ["Store Role As"],
  inputSchemes: 1,
  run(UI, client, fs, actionRunner, atWhat) {
    client.on("roleCreate", (role) => {
      actionRunner(
        atWhat,
        msg,
        client,
        {
          [UI[0]]: role,
        },
        true,
      );
    });
  },
};
