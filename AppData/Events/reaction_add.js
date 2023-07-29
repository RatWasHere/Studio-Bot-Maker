module.exports = {
  name: "Reaction Add",
  nameSchemes: ["Store Message As", "Store Author As"],
  inputSchemes: 2,
  run(UI, client, fs, actionRunner, atWhat) {
    client.on("messageReactionAdd", (reaction_origin, author) => {
      actionRunner(
        atWhat,
        msg1,
        client,
        {
          [UI[0]]: reaction_origin,
          [UI[1]]: author,
        },
        true,
      );
    });
  },
};
