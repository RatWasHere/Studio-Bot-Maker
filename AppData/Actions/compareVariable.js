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
    "sepbar2":"e",
    "btext2":"If False",
    "actions0": "runIfFalse",

    "preview":"firstInput", "previewName":"Compare"
},
    async run(values, message, uID, fs, client, actionRunner) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))

        let matchesCriteria = false;

        let firstValue = tempVars[uID][varTools.transf(values.secondInput, uID, tempVars)]
        let secondValue = tempVars[uID][varTools.transf(values.secondInput, uID, tempVars)]

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
            actionRunner(values.runIfTrue, message, client, tempVars[uID], true);
        } else {
            actionRunner(values.runIfFalse, message, client, tempVars[uID], true);
        } 
        
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
    }
}