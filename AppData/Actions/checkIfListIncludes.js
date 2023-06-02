module.exports = {
    data: {"name":"Check If List Includes",
     "ListName":"", "checkFor":"Text*", 
     "toCheck":"", "whatToDo":"Run Action Group*", 
     "toRun":"", "whatNotToDo":"Stop Execution",
     "notToRun":""},


    UI: {"compatibleWith":["Any"], 

    "text": "Check If List Includes", 
    "sepbar":"", 
    "btext":"List Name", "input":"ListName", 
    "sepbar0":"",
    "btext1":"Check Method",
    "menuBar": {
        "choices": ["Text*", "Variable*"],
        "storeAs":"checkFor", "extraField":"toCheck"
    },

    "sepbar1":"",
    "btext2":"If True",
    "menuBar1": {
        "choices": ["Run Action Group*", "Stop Execution", "Nothing"],
        "storeAs":"whatToDo",
        "extraField":"toRun"
    },
    "sepbar2":"",
    "btext3":"If False",
    "menuBar2": {
        "choices": ["Run Action Group*", "Stop Execution", "Nothing"],
        "storeAs":"whatNotToDo",
        "extraField":"notToRun"
    },
    "invisible":"",
    "variableSettings": {
        "toCheck": {
            "Text*": "indirect",
            "Variable*": "direct"
        },
        "toRun": {
            "Run Action Group*": "actionGroup",
        },
        "notToRun": {
            "Run Action Group*": "actionGroup"
        }
    },
   
    "preview":"checkFor", "previewName":"Check For"},
    
    async run(values, interaction, uID, fs, client, actionRunner) { 
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))

        let list = tempVars[uID][varTools.transf(values.ListName, uID, tempVars)]
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
                await interactionTools.runCommand(values.toRun, actionRunner, uID, client, interaction, fs)
            } 
            if (values.whatToDo == 'Stop Execution') {
                tempVars[uID][`ACTIONARRAY_stop`] = true;
                fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
            }
        } else {
            if (values.whatNotToDo == 'Run Action Group*') {
                const interactionTools = require(`../Toolkit/interactionTools.js`)
                await interactionTools.runCommand(values.notToRun, actionRunner, uID, client, interaction, fs)
            } 
            if (values.whatNotToDo == 'Stop Execution') {
                tempVars[uID][`ACTIONARRAY_stop`] = true;
                fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
            }
        }
    }
}
// ??