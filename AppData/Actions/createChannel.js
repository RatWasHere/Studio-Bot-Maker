module.exports = {
    data: {"name":"Create Text Channel", "channelName":"", "button": "✕", "guild":"Message Guild", "guildVariable":"", "storeChannelAs":""},
    UI: {"compatibleWith":["Text", "Slash"], 
    "text": "Create Channel", "sepbar":"", 
    
    "btext":"Channel Name", "input!*":"channelName", 
    "sepbar0":"",
    "btext0":"Private?",
    "ButtonBar": {"buttons": ["✓", "✕"]},
    "sepbar1":"",
    "btext1":"Guild",
    "menuBar": {choices: ["Message Guild", "Variable*"], storeAs: "guild", extraField: "guildVariable"},
    "sepbar2":"",
    "btext2":"Store Channel As", "input0": "storeChannelAs",

    "variableSettings": {
        "guildVariable": {
            "Variable*": "direct"
        }
    },

    "preview":"channelName", "previewName":"Name"},
    
    async run(values, message, uID, fs, actionRunner) { 
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        const { ChannelType } = require('discord.js')
        let guild = message.guild;


        if (values.guild == 'Variable*') {
            guild = client.guilds.cache.get(tempVars[uID][varTools.transf(values.ExtraData, uID, tempVars)])
        }
    
        const channel = guild.channels.create({
            name: varTools.transf(values.channelName, uID, tempVars),
            type: ChannelType.GuildText
        })

        if (values.button == '✓') {
            channel.overwritePermissions([
                {
                  id: guild.roles.everyone,
                  deny: ['VIEW_CHANNEL'],
                },
              ]);
        }
    }
}
// ??