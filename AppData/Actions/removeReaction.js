module.exports = {
    data: {"name":"Remove Reaction", 
    "storeAs":"", 
    "messageVariable":"",
     "emoji":"",
     "author":"Command Author",
     "authorVar":""
},

    UI: {"compatibleWith":["Text", "Slash"], 
    "text":"Remove Reaction", "sepbar3":"",
     "btext33333333":"Reaction Emoji",
    "input03_novars*": "emoji",
       "sepbar12":"",
        "btext5034":"Message/Embed Variable",
        "input5034_direct*":"messageVariable",

        "btextnmes":"Reaction Author",
        "menuBar": {
            choices: ["Command Author", "Variable*"],
            storeAs: "author",
            extraField: "authorVar"
        },

        "variableSettings": {
            "authorVar": {
                "Variable*": "direct"
            }
        },

      "preview":"awaitFrom",
       "previewName":"From",

       "sepbarsstoreinteractionsas":"",

    },

    async run(values, inter, uID, fs, client) { 
        const tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'));
        const varTools = require(`../Toolkit/variableTools.js`)
      let message = client.channels.cache.get(tempVars[uID][values.messageVariable].channelId).messages.cache.get(tempVars[uID][values.messageVariable].id)
      
      if (values.author == 'Command Author') {
        user = message.member
    } else {
        user = guild.members.cache.get(varTools.transf(tempVars[uID][values.authorVar].userId, uID, tempVars));
    }
    message.reactions.cache.find(reaction => reaction.emoji.name == values.emoji).users.remove(user.userId);

    }}