module.exports = {
    data: {"name":"Find Object In List", "ListName":"", "elementIndex":"", "storeAs":""},


    UI: {"compatibleWith":["Any"], 

    "text": "Find Object In List", 
    "sepbar":"", 

    "btext":"List Name", "input":"ListName", 

    "sepbar1":"",

    "btext1":"Object Numeric Position",
    "input0": "elementIndex",

    "sepbar2":"",
    "btext2":"Store Object Value As", "input!*":"storeAs",
    "variableSettings": {
        "search": {
            "Object Value*":"indirect",
            "Variable*": "direct",
            "Numeric Position*": "indirect"
        }
    },

    "preview":"elementIndex", "previewName":"Position #"},
    
    async run(values, interaction, uID, fs, actionRunner) { 
        let varTools = require(`../Toolkit/variableTools.js`);
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'));

        let list = tempVars[uID][varTools.transf(values.ListName)];
        let toCheckFor = list[parseFloat(varTools.transf(values.elementIndex, uID, tempVars))];

        tempVars[uID][varTools.transf(values.storeAs, uID, tempVars)] = toCheckFor;
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8');
    }
}
