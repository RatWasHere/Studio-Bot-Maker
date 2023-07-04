module.exports = {
    data: {"name": "Delete Variable", "variableName": ""},
    UI: {"compatibleWith": ["Any"],
    "text": "Delete Variable", "sepbar":"",
    "btext":"Variable Name", "input_direct*":"variableName", 
    previewName: "Variable", preview: "variableName"},

    run(values, interaction, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))

        delete tempVars[uID][varTools.transf(values.variableName, uID, tempVars)]

        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
    }
}