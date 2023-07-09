module.exports = {
    data: {"firstNumber":"", "secondNumber":"", "storeAs":"", "name": "Randomize Number"},
    UI: {"compatibleWith": ["Any"], "text": "Randomize Number","sepbar":"", 
    "btext":"From",
    "input*":"firstNumber",
    "sepbar0":"E",
    "btext0":"To",
    "input0*":"secondNumber",
    "sepbar1":"noice, 69!",
    "btext1":"Store As",
    "input!":"storeAs",
    preview: "firstNumber", previewName: "Max Value"},
    run(values, message, uID, fs, client, runner, bridge)  {
        let varTools = require(`../Toolkit/variableTools.js`)

        let first = parseFloat(varTools.transf(values.firstNumber, bridge.variables))
        let second = parseFloat(varTools.transf(values.secondNumber, bridge.variables))

        let randomNumber = Math.floor(Math.random() * (second - first + 1)) + first
        
        bridge.variables[varTools.transf(values.storeAs, bridge.variables)] = randomNumber
    }
}
