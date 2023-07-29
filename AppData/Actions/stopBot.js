module.exports = {
  data: {
    name: "Stop Bot",
    desc: "Any action below this won't run!",
    varble: "",
  },
  UI: {
    compatibleWith: ["None"],
    text1: "Set Description ",
    largeInput: "desc",
    previewName: "WARNING",
    preview: "desc",
  },
  run(values, message, uID, fs, client, runner, bridge) {
    client.destroy();
  },
};
