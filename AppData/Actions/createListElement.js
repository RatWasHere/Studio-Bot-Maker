module.exports = {
    data: {"name":"Create List Element", "ListName":"", "checkFor":"Text*", "toAdd":"", "storeAs":""},

    UI: {"compatibleWith":["Any"], 
    "text": "Create List Element", 
    "sepbar":"", 
    "btext":"List Name", "input":"ListName", 
    "sepbar0":"",
    "btext1":"Element Value", "input1":"toAdd",
    "sepbar1":"",
    "btext2":"Store Element Position As", "input2":"storeAs",
    "preview":"toAdd", "previewName":"Value"},
    
    async run(values, interaction, uID, fs, actionRunner) { 
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        let list = tempVars[uID][varTools.transf(values.ListName)]

        list.push(varTools.transf(values.toAdd, uID, tempVars));
        tempVars[uID][varTools.transf(values.storeAs, uID, tempVars)] = list.length - 1

        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
    }
}
// ??