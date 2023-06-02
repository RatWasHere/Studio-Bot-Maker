module.exports = {
    data: {"name": "Get Message Info","desc": "", "storeAs": "", "messageFrom":"Command Message", "messageVariable":"", "datainfo":"Message Content"},
    UI: {"compatibleWith": ["Text"],"text1":"Get Message Info", "sepbar2":"sepber",
    "btext33333333":"Get Message Via",
    "variableSettings": {
        "messageVariable": {
            "Command Message": "novars",
            "Variable*": "direct"
        }
    },
    "menuBar4": {"choices": ["Command Message", "Variable*"], storeAs:"messageFrom", extraField: "messageVariable"}, 
    "sepbar232":"",
    "btextget":"Get",
    "menuBar":{"choices":["Message Content",
    "Message ID",
    "Message URL",
    "Message Channel", "Message Author", "Message Timestamp", "Message Guild"], storeAs:"datainfo"} ,
    "sepbar324get":"",
    "variableSettings": {
        "messageVariable": {
            "Variable*": "direct"
        }
    },
    "btext566": "Store As", "input666!*":"storeAs", previewName: "Get", preview: "datainfo"},
    run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var msg;
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))

        if (values.messageFrom == 'Command Message') {
            msg = message
        } else {
            msg = client.messages.cache.get(tempVars[uID][values.messageVariable].id)
        }

    switch(values.datainfo) {
            case 'Message Content':
                tempVars[uID][values.storeAs] = msg.content
            break
            case 'Message Channel':
                console.log(msg)
                tempVars[uID][values.storeAs] = client.channels.cache.get(msg.channelId);
            break
            case 'Message Guild': 
            tempVars[uID][values.storeAs] = client.guilds.cache.get(msg.guild.id)
            break
            case 'Message Author':
                tempVars[uID][values.storeAs] = client.guilds.cache.get(msg.guildId).members.cache.get(msg.authorId);
            break 
            case 'Message ID': 
                tempVars[uID][values.storeAs] = msg.id
            break
            case 'Message URL': 
                tempVars[uID][values.storeAs] = msg.id
            break
        } 
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

    }
}