module.exports = {
  data: { name: "Any", somedata:"Yeah", rando:""},

  UI: {
    compatibleWith: ["None"],

    text: "Any",
    sepbar: "",
    "menuBar": {choices: ["Yeah", "Noah"], storeAs: "somedata"},
    "input":"rando",
    "btext":"yeah",
    script: (API) => {
      console.log(API)
      if (API.getData().somedata == 'Yeah') {
        API.hideElement('rando')
      } else {
        API.showElement('rando')
      }
      console.log('script')
    },
    preview: "preview",
    previewName: "preview",
  },

  async run(values, message, client, bridge) {
    let transferVariables = require(`../Toolkit/variableTools.js`).transf;

    const transf = (value) => {
      return transferVariables(value, bridge.variables);
    };
  },
};
