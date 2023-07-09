module.exports = {
    data: {"name": "Compare Variables", "button":"=", "firstInput":"", "secondInput":"", "runIfTrue": {}, "runIfFalse": {}},
    UI: {"compatibleWith": ["Any"],

    text:"Compare Variable", "sepbar":"", 

    "btext":"Variable",
    "input_direct*":"firstInput",

    "sepbar":"",
    "ButtonBar":{"buttons":[">", "=", "!=", "<" ]},
    "sepbar0":"", 

    "btext0":"Compare To Variable:", 
    "input0_direct*":"secondInput",

    "sepbar1":"",
    "btext1":"If True",
    "actions": "runIfTrue",
    
    "sepbar2":"",

    "btext2":"If False",
    "actions0": "runIfFalse",

    "preview":"firstInput", "previewName":"Compare"
},
    async run(values, message, uID, fs, client, actionRunner, bridge) {
        let varTools = require(`../Toolkit/variableTools.js`)

        let matchesCriteria = false;

        let firstValue = bridge.variables[varTools.transf(values.secondInput, bridge.variables)]
        let secondValue = bridge.variables[varTools.transf(values.secondInput, bridge.variables)]

        switch (values.button) {
            case '!=':
                if (firstValue != secondValue) {
                    matchesCriteria = true
                } else {
                    matchesCriteria = false
                }
            break

            case '=':
                if (firstValue == secondValue) {
                    matchesCriteria = true
                } else {
                    matchesCriteria = false
                }
            break

            case '>':
                if (firstValue > secondValue) {
                    matchesCriteria = true
                } else {
                    matchesCriteria = false
                }
            break

            case '<':
                if (firstValue < secondValue) {
                    matchesCriteria = true
                } else {
                    matchesCriteria = false
                }
            break
        }

        if (matchesCriteria == true) {
            actionRunner(values.runIfTrue, message, client, bridge.variables, true);
        } else {
            actionRunner(values.runIfFalse, message, client, bridge.variables, true);
        } 
        
    }
}