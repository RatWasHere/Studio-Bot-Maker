module.exports = {
    data: {"name": "Get Message Info", "storeAs": "", "messageFrom":"Command Message", "toGet":"Message Content"},
    UI: {"compatibleWith": ["Event", "Slash", "DM"],
    "text":"Get Message Info",
    "sebpar":"",

    "btext":"Get Message Via",
    "menuBar": {
        choices: ["Variable*", "Command Message"],
        storeAs: ""
    },

    "sepbar0":"",

    "btext0":"Get", 
    "menuBar0":{"choices":["Message Content", "Message ID", "Message Channel", "Message Author", "Message Timestamp", "Message Guild"], storeAs:"toGet"}, 
    
    "sepbar1":"",

    "btext": "Store As", "input!*":"storeAs", 

    previewName: "Get", preview: "toGet"},
    run(values, message, uID, fs, client) {
        var msg;
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        msg = tempVars[uID][values.ExtraData]
        switch(values.toGet) {
                case 'Message Content':
                    tempVars[uID][values.storeAs] = msg.content
                break
                case 'Message Channel':
                    tempVars[uID][values.storeAs] = client.getChannel(msg.channelID);
                break
                case 'Message Guild': 
                    tempVars[uID][values.storeAs] = client.guilds.get(msg.guildID)
                break
                case 'Message Author':
                    tempVars[uID][values.storeAs] = client.users.get(msg.author.id);
                break 
                case 'Message ID': 
                    tempVars[uID][values.storeAs] = msg.id
                break
            }
            fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
        }
}