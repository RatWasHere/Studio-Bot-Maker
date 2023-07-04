module.exports = {
    data: {"name": "Get Channel Info", "channelVia":"Variable*", "channelFrom":"", "get":"Channel Name"},
    UI: {"compatibleWith": ["Event"], 
    "text":"Get Channel Info", "sepbar":"",

    "btext":"Get Channel Via", 
    "menuBar": {choices: ["Variable*", "Channel ID*"], storeAs: "channelVia", extraField: "channelFrom"},

    "sepbar0":"",

    "btext0":"Get",
    "menuBar0": {choices: ["Channel Name", "Channel ID", "Channel Guild", "Channel Description", "Channel Topic", "Channel URL", "Channel Server"]},
    
    "sepbar1":"",
    "btext1":"Store As",
    "input!*":"storeAs",

    variableSettings: {
        "channelFrom": {
            "Variable*": "direct"
        }
    },
    previewName: "Get", preview: "get"},
    async run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        let channel;
        if (values.channelVia == 'Variable*') {
            channel = tempVars[uID][varTools.transf(values.channelFrom, uID, tempVars)];
        }
        if (values.channelVia == 'Channel ID*') {
            channel = client.channels.get(varTools.transf(values.channelFrom, uID, tempVars))
        }

        let output;
        switch(values.get) {
            case 'Channel Name':
                output = channel.name;
            break
            case 'Channel Topic':
                output = channel.topic;
            break 
            case 'Channel URL': 
            if (channel.guild) {
                output = `https://discord.com/channels/${channel.guild.id}/${channel.id}`;
            } else {
                output = `https://discord.com/channels/@me/${channel.recipient.id}`
            }
            break
            case 'Channel Topic':
                output = channel.topic || '-';
            break
            case 'Channel Server':
                output = channel.server;
            break
            case 'Channel ID': 
                output = channel.id;
            break
            case 'Channel Guild': 
            output = channel.guild || '-';
            break
        }

        tempVars[uID][varTools.transf(values.storeAs, uID, tempVars)] = output;

        await fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

    
    }
}
