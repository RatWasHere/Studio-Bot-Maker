module.exports = {
    data: {"name": "Find Channel", "storeAs":"", "button": "Command Guild", "ExtraData":"", "findVia":"Channel Name*", "via":""},
    UI: {"compatibleWith": ["Event"],"text1":"Get Channel", "sepbar2":"sepber", 
    "btext0134":"Find Channel Via",
    "menuBar": {
        choices: ["Channel Name*", "Channel ID*"],
        storeAs: "findVia",
        extraField: "via"
    },
    "sepbar021":"",
    "btext0":"Guild",
    "ButtonBar": {"buttons": ["Message Guild", "Variable*"]},
    ButtonBarChoices: {
        "Variable*": "direct",
     },
     "variableSettings": {
        "via": {
            "Channel Name*": 'indirect',
            "Channel ID*": 'indirect'
        }
     },
     "sepbar32":"",
    "btext566": "Store As", "input666_novars!*":"storeAs", previewName: "Via", preview: "vrb"},
    async run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        let guild;
        if (values.button == 'Command Guild') {
            guild = message.guild
        } else {
            guild = client.guilds.cache.get(tempVars[uID][varTools.transf(values.guildVariable, uID, tempVars)])
        }
        let filter;
        if (values.findVia == 'Channel Name*') {
            filter = m => m.name == varTools.transf(values.via, uID, tempVars)
        } else {
            filter = m => m.id == varTools.transf(values.via, uID, tempVars)
        }
        tempVars[uID][varTools.transf(values.storeAs, uID, tempVars)] = await guild.channels.find(filter)
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
}
}