module.exports = {
    data: {"name":"Check If List Includes",
    "ListName":"", "checkFor":"Text*", 
    "runIfTrue": {}, "runIfFalse": {}
     },


    UI: {"compatibleWith":["Any"], 

    "text": "Check If List Includes", 
    "sepbar":"", 
    "btext":"List Name", "input":"ListName", 
    "sepbar0":"",
    "btext1":"Check If List Includes:",
    "menuBar": {
        "choices": ["Text*", "Variable*"],
        "storeAs":"checkFor", "extraField":"toCheck"
    },

    "sepbar1":"",
    "btext2":"If True",
    "actions": "runIfTrue",

    "sepbar2":"",

    "btext3":"If False",
    "actions0": "runIfFalse",
    
    "variableSettings": {
        "toCheck": {
            "Text*": "indirect",
            "Variable*": "direct"
        }
    },
   
    "preview":"checkFor", "previewName":"Check For"},
    
    async run(values, $, uID, fs, client, actionRunner) { 
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
            actionRunner(values.runIfTrue, message, client, tempVars[uID], true);
        } else {
            actionRunner(values.runIfFalse, message, client, tempVars[uID], true);
        }
    }
}
