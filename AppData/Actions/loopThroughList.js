module.exports = {
    data: {"name":"Loop Through List", "ListName":"", "actions":{}, "storeAs":""},

    UI: {"compatibleWith":["Any"], 

    "text": "Check If List Includes",

    "sepbar":"",

    "btext":"List Name", "input":"ListName",

    "sepbar0":"",

    "btext1":"Store Iterated Object Position As", "input1!":"storeAs",

    "sepbar1":"",

    "btext2":"For Every Iteration, Run",
    "actions":"actions",
    "preview":"ListName", "previewName":"List Name"},
    
    async run(values, interaction, uID, fs, actionRunner) { 
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        let list = tempVars[uID][varTools.transf(values.ListName)]

        for (let element in list) {
            tempVars[uID][varTools.transf(values.storeAs, uID, tempVars)] = element;
            fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
    
            actionRunner(values.actions, message, client, tempVars[uID], true)
        }

    }
}
