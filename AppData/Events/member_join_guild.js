module.exports = {
  name: "Member Join Guild",
  nameSchemes: ["Store Guild As", "Store Member As"],
  inputSchemes: 2,
  run(UI, client, fs, actionRunner, atWhat) {
    client.on("guildMemberAdd", (member) => {
      actionRunner(
        atWhat,
        member,
        client,
        {
          [UI[0]]: member.guild,
          [UI[1]]: member,
        },
        true,
      );
    });
  },
};
