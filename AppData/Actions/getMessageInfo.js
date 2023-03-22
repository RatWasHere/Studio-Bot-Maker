module.exports = {
    data: {"name": "Get Message Info","desc": "", "varble": "", "vrble":"", "vrb":"", "button":"Command Message", "ExtraData":"", "datainfo":"Message Content"},
    UI: {"compatibleWith": ["Text"],"text1":"Get Message Info", "sepbar2":"sepber","btext33333333":"Get Message Via", "ButtonBar": {"buttons": ["Command Message", "Variable*"]}, "menuBar":{"choices":["Message Content", "Message Channel", "Message Author", "Message Timestamp", "Message Guild"], storeAs:"datainfo"} ,"btext566": "Store As", "input666":"varble", previewName: "Get", preview: "datainfo"},
    run(values, message, uID, fs, client) {
        console.log(uID, 'msginfouid')
        let varTools = require(`../Toolkit/variableTools.js`)
        var msg;
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))

        if (values.button == 'Command Message') {
            msg = message
        } else {
            msg = client.messages.cache.get(tempVars[uID][values.ExtraData].id)
        }

    switch(values.datainfo) {
            case 'Message Content':
                tempVars[uID][values.varble] = msg.content
            break
            case 'Message Channel':
                console.log(msg)
                tempVars[uID][values.varble] = client.channels.cache.get(msg.channelId);
            break
            case 'Message Guild': 
            tempVars[uID][values.varble] = client.guilds.cache.get(msg.guild.id)
            break
            case 'Message Author':
                tempVars[uID][values.varble] = client.guilds.cache.get(msg.guildId).members.cache.get(msg.authorId);
            break 
            console.log(tempVars)
        } 
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

    }
}