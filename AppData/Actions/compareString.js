module.exports = {
    data: {"name": "Compare", "button":"=", "firstInput":"", "secondInput":"", "runIfTrue": {}, "runIfFalse": {}},
    UI: {"compatibleWith": ["Any"],

    text:"Compare", "sepbar":"", 

    "btext":"Compare",
    "input*":"firstInput",

    "sepbar":"",
    "ButtonBar":{"buttons":[">", "=", "!=", "<" ]},
    "sepbar0":"", 

    "btext0":"Compare To", 
    "input0*":"secondInput",

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

        let firstValue = `${varTools.transf(values.firstinput, uID, tempVars).toLowerCase()}`
        let secondValue = `${varTools.transf(values.secondInput, uID, tempVars).toLowerCase()}`

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