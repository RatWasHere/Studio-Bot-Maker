module.exports = {
    data: {"name": "Get Message Info","desc": "", "varble": "", "vrble":"", "vrb":"", "button":"Command Message", "ExtraData":"", "datainfo":"Message Content"},
    UI: {"compatibleWith": ["Event", "Slash"],"text1":"Get Message Info",
     "sepbar001":"","btext33333333":"Message Variable", "input0001_direct*":"ExtraData",
      "sepbar0560":"", "btextMenubr":"Get", "menuBar":{"choices":["Message Content", 
      "Message ID",
      "Message URL",
      "Message Channel", "Message Author", "Message Timestamp", "Message Guild"], storeAs:"datainfo"}, "sepbar91201":"","btext566": "Store As", "input666!*":"varble", previewName: "Get", preview: "datainfo"},
    run(values, message, uID, fs, client) {
        var msg;
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
            msg = tempVars[uID][values.ExtraData]

    switch(values.datainfo) {
            case 'Message Content':
                tempVars[uID][values.varble] = msg.content
            break
            case 'Message Channel':
                tempVars[uID][values.varble] = client.channels.cache.get(msg.channelId);
            break
            case 'Message Guild': 
                tempVars[uID][values.varble] = client.guilds.cache.get(msg.guild.id)
            break
            case 'Message Author':
                tempVars[uID][values.varble] = client.users.cache.get(msg.authorId);
            break 
            case 'Message ID': 
                tempVars[uID][values.varble] = msg.id
            break
            case 'Message URL': 
                tempVars[uID][values.varble] = msg.id
            break
        } 
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

    }
}