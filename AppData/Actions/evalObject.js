module.exports = {
    data: {"toEval": "", "name":"Evaluate", "storeAs": "",},
    UI: {"compatibleWith": ["Text", "Slash", "Event", "Any"], 
    "text": "Evaluate Code (JS)", 
    "sepbar":"",
    "btext":"Code",
    "largeInput": "toEval", 
    "sepbar0":"",

    "btext0":"Store As",
    "input!*":"storeAs",
    preview: "storeAs",
    previewName: "Store As"
    },
    run(values, message, uID, fs, client, runner, bridge)  {
        let varTools = require(`../Toolkit/variableTools.js`)
        let result = eval(varTools.transf(values.toEval, bridge))
        bridge.variables[values.storeAs] = result
    }
}
