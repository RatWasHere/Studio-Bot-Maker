module.exports = {
    data: {"name": "Get Guild","desc": "", "varble": "", "vrble":"", "vrb":"", "button":"", "ExtraData":""},
    UI: {"compatibleWith": ["Any"],"text1":"Get Guild", "sepbar2":"sepber", "btextbtn":"Guild ID", "inputbutton":"button", "sepbar14":"", "btext566": "Store As", "input666*":"varble", previewName: "Content", preview: "desc"},
    run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        tempVars[uID] = {
            ...tempVars[uID],
            [varTools.transf(values.varble, uID, tempVars)]: client.guilds.cache.get(varTools.transf(values.button, uID, tempVars))
    }
    fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

}
}