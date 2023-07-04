module.exports = {
    data: {"name": "Get Channel","desc": "", "storeAs": "", "channelID":"",  "ExtraData":""},
    UI: {"compatibleWith": ["Any"],
    "text":"Get Channel", 
    
    "sepbar":"", 

    "btext":"Channel ID",
    "input*":"channelID",

    "sepbar0":"",

    "btext1": "Store As", 
    "input!*":"storeAs",

    previewName: "ID", preview: "channelID"},
    run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        
        tempVars[uID][varTools.transf(values.storeAs, uID, tempVars)] = client.getChannel(varTools.transf(values.channelID, uID, tempVars))
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
    }
}