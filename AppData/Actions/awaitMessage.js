module.exports = {
    data: {"name":"Await Reaction", 
    "customID":"", 
    "storeReactionNameAs":"",
    "storeMessageAs": "",
    "storeReactionIdAs": "",
    "actions": {},
    "messageFrom": "Command Message",
    "fromWho":"",
    "targetUser": "Anybody",
    "stopAwaitingAfter":"60",
    "emojiFilter":"Any",
    "emoji":"",
},

    UI: {"compatibleWith":["Text", "Slash"], 
    "text":"Await Reaction",

    "sepbar":"",

    "btext":"Filter Reaction Emoji By",
    "menuBar": {"choices": ["Any", "Name*", "ID*", "Animated Only", "Non-Animated Only"], storeAs: "emojiFilter", extraField: "emoji"},

    "sepbar0":"",

    "btext0":"Get Message To Await The Reaction On Via:",
    "menuBar0": {"choices": ["Command Message", "Variable*", "Any Message In Command Channel"], storeAs: "messageFrom", extraField: "message"},

    "sepbar1":"",

    "btext1":"Get User To Await Reaction From Via:", 
    "menuBar1":{"choices":["Anybody", "Command Author", "User*", "User ID*"], storeAs: "targetUser", extraField:"fromWho"},  

    "sepbar2":"", 

    "btext2":"Once Reacted, Run", 

    "actions":"actions",

    "sepbar3":"",

    "btext3":"Stop Waiting After (seconds)",
    "input":"stopAwaitingAfter",

    "sepbar4":"",

    "btext4":"Store Reaction Name As",
    "input!":"storeReactionNameAs",

    "btext5":"Store Reaction ID As",
    "input0!":"storeReactionIdAs",

    "sepbar5":"",

    "btext6":"Store Message As",
    "input1!":"storeMessageAs",


    "preview":"targetUser",
    "previewName":"From",


        "variableSettings":{
            "fromWho": {
                "User*": "direct", 
                "Anybody": "novars",
                "Command Author": "novars"
            },
            "emoji": {
                "Custom*": "indirect"
            },
            "message": {
                "Variable*": "direct"
            }
        }
    },

    async run(values, inter, uID, fs, client, actionRunner) { 
        const tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'));
        const varTools = require(`../Toolkit/variableTools.js`);
    
        const handlemessage = (message, reactor, reaction) => {
            let matchesEmoji = false;
            let matchesTarget = false;
            let matchesMessage = false;

            switch (values.messageFrom) {
                case 'Command Message':
                    matchesMessage = message.id == inter.id
                break
                case 'Variable*':
                    matchesMessage = message.id == tempVars[uID][varTools.transf(values.message, uID, tempVars)].id
                break
                case 'Any Message In Command Channel':
                    matchesMessage = message.channel.id == tempVars[uID][varTools.transf(values.message, uID, tempVars)].channel.id
                break
            }

            switch (values.emojiFilter) {
                case 'Any':
                    matchesEmoji = true
                break
                case 'Name*':
                    matchesEmoji = varTools.transf(values.emoji, uID, tempVars) == reaction.name
                break
                case 'ID*':
                    matchesEmoji = varTools.transf(values.emoji, uID, tempVars) == reaction.id
                break
                case 'Animated Only':
                    matchesEmoji = true == reaction.animated
                break
                case 'Non-Animated Only':
                    matchesEmoji = false == reaction.animated
                break
            }

            switch (values.targetUser) {
                case 'Anybody':
                    matchesTarget = true
                break
                case 'Command Author':
                    matchesTarget = reactor.id == inter.author.id
                break
                case 'User*':
                    matchesTarget = reactor.id == tempVars[uID][varTools.transf(values.fromWho, uID, tempVars)].id
                break
                case 'User ID*':
                    matchesTarget = reactor.id == varTools.transf(values.fromWho, uID, tempVars)
                break
            }

            if (matchesTarget && matchesEmoji && matchesMessage) {
                actionRunner(values.actions, message, client, {...tempVars[uID], [varTools.transf(values.storeMessageAs, uID, tempVars)]: message, [varTools.transf(values.storeReactionNameAs, uID, tempVars)]: reaction.name,  [varTools.transf(values.storeReactionNameAs, uID, tempVars)]: reaction.id}, true);
            }
        }

        client.on('messageReactionAdd', handlemessage(message, reactor, reaction))

        if (values.stopAwaitingAfter != '') {
            setTimeout(() => {
                client.off('messageReactionAdd', handlemessage(message, reactor, reaction))
            }, parseFloat(values.stopAwaitingAfter) * 1000)
        }
    }
}