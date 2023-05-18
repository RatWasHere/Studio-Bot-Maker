module.exports = {
    data: {"toEval": "", "name":"Evaluate", "storeAs": "",},
    UI: {"compatibleWith": ["Text", "Slash", "Event", "Any"], 
    "text": "Evaluate Code (JS)", 
    "sepbar4":"",
    "btext03":"Code",
    "largeInput": "toEval", 
    "sepbar":"",

    "btext33":"Store As",
    "input!*":"storeAs",
    preview: "storeAs",
    previewName: "Store As"
    },
    run(values, message, uID, fs, client) {

        let tempVrz = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json'));
        let varTools = require(`../Toolkit/variableTools.js`)
        const interactionTools = require('../Toolkit/interactionTools.js')
        try {
            let evalD = eval(varTools.transf(values.toEval, uID, tempVrz))
        tempVrz[uID][values.storeAs] = evalD
    } catch (err) {
        console.log('>>> Error When Evaluating >>> Evaluate Code (JS) <<< Evaluation Issue')
        console.log(err)
    }
        
    }
}
