module.exports = {
    data: {"name": "Delete Variable", "varble": "", "button": "✕"},
    UI: {"compatibleWith": ["Any"],"btext1":"Variable Name",  "input_direct*":"varble", "sepbar2":"sepber", "btext2": "Delete Parent Object?", "ButtonBar":{buttons: ["✓", "✕"]}, "sepbar":"", "btext":"<b>Note!</b><br><div style='opacity: 50%;'>Deleting the parent object will make every other variable used in this command unusable!</div>", previewName: "varble", preview: "varble"},
    run(values, interaction, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))

        if (values.button == '✓') {
            delete tempVars[uID]
        } else {
            delete tempVars[uID][values.varble]
        }
        
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
    }
}