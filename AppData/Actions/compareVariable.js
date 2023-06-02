module.exports = {
    data: {"name": "Compare Variable", "end":"C", "button":"=", "firstInput":"", "secondInput":"", "ifTrue":"Run Action Group*", "actionGroup":"", "group":"", "ifFalse":"Nothing"},
    UI: {"compatibleWith": ["Any"], text:"Compare Variable", "sepbar1":"sepbar", "btext":"Variable Name", "inputfirst_direct*":"firstInput", "sepbar2":"", "ButtonBar":{"buttons":[">", "=", "!=", "<" ]}, "sepbar3":"", "btextsecondparameter":"Compare To", "inputScnd*":"secondInput",  "sepbar7":"", 
    "btextstoreoutputas":"If True",    
    "menuBar": {"choices":["Run Action Group*", "Stop Execution", "Nothing"], "storeAs":"ifTrue", "extraField":"actionGroup"},
    "sepbars33":"e",
    "btext01":"If False",
    "menuBar1": {"choices": ["Run Action Group*", "Stop Execution", "Nothing"], "storeAs": "ifFalse", "extraField": "group"},
    "sepbar9":"sepbar",
    "btextnote":"<b>NOTE:</b> <br> Selecting <span style='background-color: #FFFFFF15; border-bottom: 1px solid #FFFFFF40; border-top-left-radius: 4px; border-top-right-radius: 4px; padding: 3px; padding-top: 1px; padding-bottom: 1px;'>Run Action Group*</span> will pass on all variables to the new action group & The action group will run before the next action, if any!",
    "preview":"firstInput", "previewName":"Compare",
    "variableSettings":{
        "actionGroup": {
            "Run Action Group*": "actionGroup"
        },
        "group": {
            "Run Action Group*": "actionGroup"
        }
    }
},
    async run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        tempVars[uID][values.firstInput]
        tempVars[uID][values.firstInput]
        let matchesCriteria = false;
        if (values.button == '!=') {

            if (`${tempVars[uID][values.firstInput].toLowerCase()}` != `${varTools.transf(values.secondInput, uID, tempVars).toLowerCase()}`) {
                matchesCriteria = true
            } else {
                matchesCriteria = false
            }
        } 
        if (values.button == '<') {
            if (`${tempVars[uID][values.firstInput]}` <= `${varTools.transf(values.secondInput, uID, tempVars)}`) {
                matchesCriteria = true
            } else {
                matchesCriteria = false
            }
        }
        if (values.button == '>') {
            if (`${tempVars[uID][values.firstInput]}` >= `${varTools.transf(values.secondInput, uID, tempVars)}`) {
                matchesCriteria = true
            } else {
                matchesCriteria = false
            }
        }
        if (values.button == '=') {
            if (`${tempVars[uID][values.firstInput]}`.toLowerCase() == `${varTools.transf(values.secondInput, uID, tempVars)}`.toLowerCase()) {
                matchesCriteria = true
            } else {
                matchesCriteria = false
            }
        }
        
        if (matchesCriteria == true) {
            if (values.ifTrue == 'Stop Execution') {
             tempVars[uID] = {
                 ...tempVars[uID],
                 [`ACTIONARRAY_stop`]: true
               }; 
            } 
            if (values.ifTrue == 'Run Action Group*') {
             const interactionTools = require(`../Toolkit/interactionTools.js`)
             await interactionTools.runCommand(values.actionGroup, runActionArray, uID, client, message, fs)
            }
         } else {
             if (values.ifFalse == 'Stop Execution') {
                 tempVars[uID] = {
                     ...tempVars[uID],
                     [`ACTIONARRAY_stop`]: true
                   }; 
                } 
                if (values.ifFalse == 'Run Action Group*') {
                 const interactionTools = require(`../Toolkit/interactionTools.js`)
                 await interactionTools.runCommand(values.group, runActionArray, uID, client, message, fs)
                }
         } 
          fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

    }
}