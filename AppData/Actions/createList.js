module.exports = {
    data: {"name":"Create List", "ListName":""},
    UI: {"compatibleWith":["Any"], 
    "text": "Create List", "sepbar":"", "btext":"List Name", "input!*":"ListName", "preview":"ListName", "previewName":"Name"},
    
    async run(values, interaction, uID, fs, actionRunner) { 
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        tempVars[uID][varTools.transf(values.ListName)] = []
    }
}
// ??