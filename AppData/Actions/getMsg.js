module.exports = {
    data: {"name": "Get Message",
    "storeAs":"",
    "messageID":"",
    "messageChannel":"",
    "channelFrom":"Auto"
},
    UI: {"compatibleWith": ["Text", "Slash", "Event", "Any"],
    "text":"Get Message", "sepbar001":"",
       "btext66": "Message ID", 
       "input66!*":"messageID",
       "sepbar91201":"",

       "btext566D": "Message Channel", 
       "menuBar3":{
        "choices": ["Auto", "Variable*"],
        storeAs: "channelFrom",
        extraField: "messageChannel"
       },
       "variableSettings": {
        "messageChannel": {
            "Auto": "novars",
            "Variable*": "direct"
        }
       },
       "sepbar33":"",
       "btext566": "Store As", 
       "input666!*":"storeAs",
       
       "btext034note":"<b>Note!</b><br> Automatic channel finding can cause performance issues, especially if your bot is in more than 20 guilds. ",
       previewName: "Store As", preview: "storeAs"},
    async run(values, mesg, uID, fs, client) {
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        const varTools = require(`../Toolkit/variableTools.js`)


        var msg;
   
        if (values.channelFrom == 'Variable*') {
            msg = client.channels.cache.get(tempVars[uID][varTools.transf(values.messageChannel, uID, tempVars)]).messages.cache.get(varTools.transf(values.messageID, uID, tempVars))
        } else {
            const channels = client.channels.cache;
            let message;
    
            for (const [channelID, channel] of channels) {
            try {
                message = await channel.messages.fetch('message_id');
                break;
            } catch (error) {
                null
            }
            }
        }

        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

    }
}