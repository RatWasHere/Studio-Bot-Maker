module.exports = {
    data: {"name": "Control Variable", "variableName": "", "variableValue": ""},
    UI: {"compatibleWith": ["Any"],
    "text": "Control Variable", "sepbar":"",
    "btext":"Variable Name", "input*":"variableName", 
    "sepbar":"",
    "btext0": "Variable New Value",
    "input": "variableValue",
    previewName: "Name", preview: "variableName"},

    run(values, interaction, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))

        tempVars[uID][varTools.transf(values.variableName, uID, tempVars)] = varTools.transf(values.variableValue, uID, tempVars)

        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
    }
}