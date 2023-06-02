module.exports = {
    data: {"name":"Check If String Starts With",
     "string":"", "start":"", "ifTrue":"Run Action Group*", "actionGroup":""},
    UI: {"compatibleWith":["Any"], 
    
    "text": "Check If String Starts With","sepbar":"sbar",

    "btext1":"String", 
    "input*":"string",
    
    "sepbar03":"",

    "btext2":"Check if it begins with...",
    "input1*":"start",
    "sepbar0349":"",
    "btext3043":"If True",
    "preview":"start", "previewName":"With",
    "menuBar": {
        "choices":["Run Action Group*", "Stop Execution", "Nothing"], 
    "storeAs":"ifTrue", "extraField":"actionGroup"},
    "sepbar9":"sepbar",
    "btextnote":"<b>NOTE:</b> <br> Selecting <span style='background-color: #FFFFFF15; border-bottom: 1px solid #FFFFFF40; border-top-left-radius: 4px; border-top-right-radius: 4px; padding: 3px; padding-top: 1px; padding-bottom: 1px;'>Run Action Group*</span> will pass on all variables to the new action group & The action group will run before the next action, if any!",
    "variableSettings": {
        "actionGroup": {
            "Run Action Group*": "actionGroup"
        }
    }
}
,
    async run(values, message, uID, fs, client, runActionArray) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        let toCompare = varTools.transf(values.string, uID, tempVars)
        let toStart = varTools.transf(values.start, uID, tempVars)
        if (toCompare.startsWith(toStart)) {
            if (values.ifTrue == 'Stop Execution') {
                tempVars[uID] = {
                    ...tempVars[uID],
                    [`ACTIONARRAY_stop`]: true
                  }; 
               } 
               if (values.ifTrue == "Stop Execution") {
                const interactionTools = require(`../Toolkit/interactionTools.js`)
                await interactionTools.runCommand(values.actionGroup, runActionArray, uID, client, message, fs)
            }
        }
    }
}