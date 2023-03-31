module.exports = {
    data: {"name": "Get Channel","desc": "", "varble": "", "vrble":"", "vrb":"",  "ExtraData":""},
    UI: {"compatibleWith": ["Any"],"text1":"Get Channel", "sepbar2":"sepber", 
    "btext0134":"Channel ID",
    "input001**":"vrb",
    "sepbar001":"",
    "btext566": "Store As", "input666*":"varble", previewName: "Content", preview: "desc"},
    run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        
        tempVars[uID] = {
            ...tempVars[uID],
            [varTools.transf(values.varble, uID, tempVars)]: client.channels.cache.get(varTools.transf(values.vrb, uID, tempVars))
        }
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

}
}