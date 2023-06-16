module.exports = {
    data: {"name": "Get Channel Info", "channelVia":"Message Channel", "channelFrom":"", "get":"Channel Name"},
    UI: {"compatibleWith": ["Text", "Slash"], 
    "text":"Get Channel Info", "sepbar":"",

    "btext":"Get Channel Via", 
    "menuBar": {choices: ["Message Channel", "Variable*"], storeAs: "channelVia", extraField: "channelFrom"},

    "sepbar0":"",

    "btext0":"Get",
    "menuBar0": {choices: ["Channel Name", "Channel ID", "Channel Description", "Channel Topic", "Channel URL", "Channel Server"]},

    previewName: "Get", preview: "datainfo"},
    async run(values, message, uID, fs, client) {

        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        let channel = message.channel;
        if (values.channelVia == 'Message Channel') {
            null
        } else {
            channel = client.channels.cache.get(tempVars[uID][varTools.transf(values.channelFrom, uID, tempVars)]);
        }

        let output;
    switch(values.datainfo) {
            case 'Channel Name':
                output = channel.name
            break
            case 'Channel Topic':
                output = channel.topic
            break 
            case 'Channel URL': 
                output = `https://discord.com/channels/${channel.guild.id}/${channel.id}.`
            break
            case 'Channel Topic':
                output = channel.topic
            break
            case 'Channel Server':
                output = channel.server;
            break
            case 'Channel ID': 
                output = channel.id
            break
        }
    
        await fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

    
    }
}
