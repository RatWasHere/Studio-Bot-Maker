module.exports = {
    data: {"name":"Delete List Element", "ListName":"", "elementPosition":""},

    UI: {"compatibleWith":["Any"], 
    "text": "Delete List Element", 
    "sepbar":"", 
    "btext":"List Name", "input*":"ListName", 
    "sepbar0":"",
    "btext1":"Element Position", "input1*":"elementPosition",
    "preview":"toAdd", "previewName":"Value"},
    
    async run(values, interaction, uID, fs, actionRunner) { 
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        let list = tempVars[uID][varTools.transf(values.ListName)]

        list.push(varTools.transf(values.toAdd, uID, tempVars));
        tempVars[uID][varTools.transf(values.storeAs, uID, tempVars)].splice(varTools.transf(elementPosition, uID, tempVars), 1)

        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
    }
}
// ??