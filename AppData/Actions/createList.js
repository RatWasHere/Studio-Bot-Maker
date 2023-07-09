module.exports = {
    data: {"name":"Create List", "ListName":""},
    UI: {"compatibleWith":["Any"], 
    "text": "Create List", "sepbar":"", "btext":"List Name", "input!*":"ListName", "preview":"ListName", "previewName":"Name"},
    
    async run(values, interaction, uID, fs, actionRunner, bridge) { 
        let varTools = require(`../Toolkit/variableTools.js`)
        bridge.variables[varTools.transf(values.ListName, bridge)] = []
    }
}