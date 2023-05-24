module.exports = {
    data: {"name":"Loop Through List", "ListName":"", "whatToRun":"", "storeAs":""},


    UI: {"compatibleWith":["Any"], 

    "text": "Check If List Includes", 
    "sepbar":"", 
    "btext":"List Name", "input":"ListName", 
    "sepbar0":"",
    "btext1":"Store Iterated Object Position As", "input1":"storeAs",
    "sepbar1":"",
    "btext2":"For Every Iteration, Run Action Group", "input2_actionGroup":"whatToRun",
    "preview":"ListName", "previewName":"List Name"},
    
    async run(values, interaction, uID, fs, actionRunner) { 
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        let list = tempVars[uID][varTools.transf(values.ListName)]
        let toCheckFor;

        for (let element in list) {
            tempVars[uID][varTools.transf(values.storeAs, uID, tempVars)] = element
            const interactionTools = require(`../Toolkit/interactionTools.js`)
            await interactionTools.runCommand(values.whatToRun, actionRunner, uID, client, inter, fs)
        }

    }
}
// ??