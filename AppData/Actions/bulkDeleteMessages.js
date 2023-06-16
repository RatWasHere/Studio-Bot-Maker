module.exports = {
    data: {"name": "Bulk Delete", "channelVariable":"",
     "channelFrom":"Message Channel", 
     "user":"Anybody", "fromWho":"", "mustInclude":"Nothing", "toInclude":"",
     "amount":"Custom*", "quantity":""
    },

    UI: {"compatibleWith": ["Text"], "text":"Bulk Delete", "sepbar":"",
    "btext":"Get Channel From",
    "menuBar": {"choices": ["Message Channel", "Variable*"], "storeAs":"channelFrom", "extraField":"channelVariable"},
    "sepbar0":"",
    "btext0":"Message Must Include",
    "menuBar0": {"choices": ["Nothing", "Word(s)*"], "storeAs":"mustInclude", "extraField":"toInclude"},
    "sepbar1":"", "btext1":"Amount",
    "menuBar1":{"choices": ["Custom*", "Max"], "storeAs":"amount", "extraField":"quantity"},
    "sepbar2":"", "btext2":"Must Be Sent By",
    "menuBar2": {"choices": ["Message Author", "User*", "Anybody"], "storeAs":"user", "extraField":"fromWho"},
    "invisible":"",
    "variableSettings": {
        "channelVariable": {
            "Variable*": "direct"
        },
        "toInclude": {
            "Word(s)*": "indirect"
        }, 
        "quantity": {
            "Custom*": "indirect"
        },
        "fromWho": {
            "User*": "direct"
        }

    },                          
     previewName: "From", preview: "channelFrom"},

    run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var msg;
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'));

        let channel;
        if (values.channelFrom == 'Message Channel') {
            channel = message.channel
        } else {
            const channelID = tempVars[uID][varTools.transf(values.channelVariable, uID, tempVars)].id;
            channel = client.channels.cache.get(channelID);
        }

        const timestamp = new Date().getTime() - (1000 * 60 * 60 * 24 * 13)
        
        let mustInclude = ''
        if (values.mustInclude == 'Word(s)*') {
            mustInclude = varTools.transf(values.toInclude, uID, tempVars)
        }

        let mustBeFrom = null;
        if (values.user == 'Message Author') {
            mustBeFrom = message.author.id;
        }
        if (values.user == 'User*') {
            mustBeFrom = client.users.cache.get(tempVars[uID][varTools.transf(values.fromWho, uID, tempVars)].id).id;
        }

        let amount = 100;
        if (values.amount == 'Custom*') {
            amount = parseFloat(varTools.transf(values.quantity, uID, tempVars))
        }
        if (amount > 99) {
            console.log('Bulk Delete >>> Troublesome Amount')
        }


        let checkFor = m => m.createdTimestamp > timestamp && m.content.toLowerCase().includes(mustInclude.toLowerCase())
        var deletedMessages = 0;
        channel.messages.fetch({limit: 100}).then(messages => {
            messages.filter(checkFor).forEach( msg => {
                if (deletedMessages > amount) return
                if (mustBeFrom == null) {
                    msg.delete()
                } else {
                    if (msg.author.id == mustBeFrom) {
                        msg.delete()
                    }
                }
                deletedMessages++
            })
            })

}
}