module.exports = {
    data: {"name":"Loop Through List", "ListName":"", "actions":{}, "storeAs":""},

    UI: {"compatibleWith":["Any"], 

    "text": "Loop Through List",

    "sepbar":"",

    "btext":"List Name", "input_direct*":"ListName",

    "sepbar0":"",

    "btext1":"Store Iterated Object Position As", "input!":"storeAs",

    "sepbar1":"",

    "btext2":"For Every Iteration, Run",
    "actions":"actions",

    "preview":"ListName", "previewName":"List Name"},
    
    async run(values, interaction, uID, fs, client, actionRunner, bridge) { 
        let varTools = require(`../Toolkit/variableTools.js`)
        let list = bridge.variables[varTools.transf(values.ListName)] ? bridge.variables[varTools.transf(values.ListName)] : []
        for (let element in list) {
            actionRunner(values.actions, interaction, client, {...bridge.variables, [varTools.transf(values.storeAs, bridge.variables)]: element}, true)
        }
    }
}
