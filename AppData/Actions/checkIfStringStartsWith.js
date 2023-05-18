module.exports = {
    data: {"name":"Check If String Starts With", "string":"", "start":"", "ifTrue":"Run Action Group*", "actionGroup":""},
    UI: {"compatibleWith":["Any"], 
    
    "text": "Modify Command","sepbar":"sbar",

    "btext1":"String", 
    "input*":"string",
    
    "sepbar03":"",

    "btext2":"Check if it begins with...",
    "input1*":"start",
    "sepbar0349":"",
    "btext3043":"If True",
    "preview":"start", "previewName":"With",
    "menuBar": {
        "choices":["Run Action Group*", "Stop Execution"], 
    "storeAs":"ifTrue", "extraField":"actionGroup"},
    "sepbar9":"sepbar",
    "btextnote":"<b>NOTE:</b> <br> Selecting <span style='background-color: #FFFFFF15; border-bottom: 1px solid #FFFFFF40; border-top-left-radius: 4px; border-top-right-radius: 4px; padding: 3px; padding-top: 1px; padding-bottom: 1px;'>Run Action Group*</span> will pass on all variables to the new action group & The action group will run before the next action, if any!",
},
    async run(values, message, uID, fs, client) {
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
               } else {
                let datjson = require('../data.json')
                for (let command in datjson.commands) {
                    
                    if (datjson.commands[command].name.toLowerCase() == values.actionGroup.toLowerCase()) {
                        let timesRun = 1
                        for (let action in datjson.commands[command].actions) {
                            if (timesRun <= datjson.commands[command].count) {
                            let actFile = require(`./${datjson.commands[command].actions[action].file}`)
                            let vls = datjson.commands[command].actions[action].data
                            await actFile.run(vls, message, uID, fs, client)
                            timesRun++
                        }}}}}}}
}