module.exports = {
    data: {"name": "Find Channel", "storeAs":"", "button": "Command Guild", "ExtraData":"", "findVia":"Channel Name*", "via":""},
    UI: {"compatibleWith": ["Event", "DM"],"text1":"Get Channel", "sepbar2":"sepber", 
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
    async run(values, message, uID, fs, client, runner, bridge)  {
        let varTools = require(`../Toolkit/variableTools.js`)
        let guild;
        if (values.button == 'Command Guild') {
            guild = message.guild
        } else {
            guild = client.guilds.get(bridge.variables[varTools.transf(values.guildVariable, bridge.variables)])
        }
        let filter;
        if (values.findVia == 'Channel Name*') {
            filter = m.name.includes(varTools.transf(values.via, bridge.variables))
        } else {
            filter = m => m.id == varTools.transf(values.via, bridge.variables)
        }
        bridge.variables[varTools.transf(values.storeAs, bridge.variables)] = await guild.channels.find(filter)
}
}