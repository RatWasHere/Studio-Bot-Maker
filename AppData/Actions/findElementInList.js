module.exports = {
    data: {"name":"Find Object In List", "ListName":"", "searchedType":"Numeric Position*", "search":"", "storeAs":""},


    UI: {"compatibleWith":["Any"], 

    "text": "Find Object In List", 
    "sepbar":"", 
    "btext":"List Name", "input":"ListName", 

    "sepbar1":"",

    "btext1":"Search Object Via",
    "menuBar": {
        "choices": ["Numeric Position*", "Object Value*", "Variable*"],
        "storeAs":"searchedType",
        "extraField":"search"
    }, 
    "sepbar2":"",
    "btext2":"Store Object As", "input0!*":"storeAs",
    "variableSettings": {
        "search": {
            "Object Value*":"indirect",
            "Variable*": "direct",
            "Numeric Position*": "indirect"
        }
    },

    "preview":"searchedType", "previewName":"Via"},
    
    async run(values, interaction, uID, fs, actionRunner) { 
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        let list = tempVars[uID][varTools.transf(values.ListName)]
        let toCheckFor;
        if (values.whatToDo == values.whatNotToDo) {
            console.log("Check If List Includes >>> Invalid Options")
        }
        if (values.checkFor == 'Text*') {
            toCheckFor = varTools.transf(values.toCheck, uID, tempVars)
        } else {
            toCheckFor = tempVars[uID][varTools.transf(values.toCheck, uID, tempVars)]
        }

        if (list.includes(toCheckFor)) {
            if (values.whatToDo == 'Run Action Group*') {
                const interactionTools = require(`../Toolkit/interactionTools.js`)
                await interactionTools.runCommand(values.toRun, actionRunner, uID, client, inter, fs)
            } else {
                tempVars[uID][`ACTIONARRAY_stop`] = true;
                fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
            }
        } else {
            if (values.whatNotToDo == 'Run Action Group*') {
                const interactionTools = require(`../Toolkit/interactionTools.js`)
                await interactionTools.runCommand(values.notToRun, actionRunner, uID, client, inter, fs)
            } else {
                tempVars[uID][`ACTIONARRAY_stop`] = true;
                fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
            }
        }
    }
}
// ??