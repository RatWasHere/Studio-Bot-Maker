module.exports = {
  name: "Role Delete",
  nameSchemes: ["Store Role As"],
  inputSchemes: 1,
  run(UI, client, fs, actionRunner, atWhat) {
    client.on(
      "roleDelete",
      (role) => {
        actionRunner(atWhat, msg, client, {
          [UI[0]]: role,
        });
      },
      true,
    );
  },
};
