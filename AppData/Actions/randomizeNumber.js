module.exports = {
    data: {"messageContent": "", "button": "Variable*", "firstNumber":"", "secondNumber":"", "storeAs":"", "name": "Randomize Number", "ExtraData": "", "sendTo":"", "ButtonRow":"", "ActionRow":"", "embedVar":"", "guild":"Message Guild", "guildField":"", "reason":""},
    UI: {"compatibleWith": ["Any"], "text": "Randomize Number","sepbarEmbVar":"", 
    "btextF":"From",
    "input023*":"firstNumber",
    "sepbar23":"E",
    "btextD":"To",
    "input069*":"secondNumber",
    "sepbar2369":"noice, 69!",
    "btextEHH":"Store As",
    "inputEH*":"storeAs",
    preview: "firstNumber", previewName: "Maximum Value"},
    run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))

        let first = parseFloat(varTools.transf(values.firstNumber, uID, tempVars))
        let second = parseFloat(varTools.transf(values.secondNumber, uID, tempVars))

        let randomNumber = Math.floor(Math.random() * (second - first + 1)) + first
        tempVars[uID] = {
            ...tempVars[uID],
            [values.storeAs]: randomNumber
        }
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

    }
}
