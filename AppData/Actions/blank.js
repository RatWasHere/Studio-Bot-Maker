module.exports = {
    data: {"name":"Any", },
     
    UI: {"compatibleWith":["None"],

    "text":"Any",
    "sepbar":"", 


    "preview":"preview", 
    "previewName":"preview"},

    async run(values, message, uID, fs, client, runner, bridge)  { 
        let transferVariables = require(`../Toolkit/variableTools.js`).transf
      
        const transf = (value) => {
          return transferVariables(value, bridge.variables)
        }
    }
}