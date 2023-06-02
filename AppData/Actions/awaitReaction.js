module.exports = {
    data: {"name":"Await Reaction", 
    "customID":"", 
    "storeAs":"", 
    "messageVariable":"",
    "runAfter":"",
    "buttonCustomId":"",
    "fromWho":"",
    "awaitFrom": "Anybody",
    "stopAfter":"60",
    "button": "✓",
    "postAction": "Do Nothing",
    "postActionField": "",
    "postAction":"Acknowledge Interaction",
    "emojiType":"Any",
    "emoji":"",
},

    UI: {"compatibleWith":["Text", "Slash"], 
    "text":"Await Reaction", "sepbar3":"",
     "btext33333333":"Reaction Emoji",
      "menuBar34": {
        "choices": [
            "Any",
            "Custom*"
        ],
        storeAs: "emojiType",
        extraField: "emoji"
      },
       "sepbar12":"",
        "btext5034":"Message/Embed Variable",
        "input5034_direct*":"messageVariable",
        "sepbar423032":"",
     "btext2":"Await Reaction From", 
     "menuBar44":{"choices":["Anybody", "Message Author", "User*"],
      storeAs: "awaitFrom", extraField:"fromWho"},  

      "sepbar0":"", 
    "btext34423531":"Once Reacted, Run Action Group", 
    "input42_actionGroup*":"runAfter",
    "sepbarstopwaitingafter":"",
    "btextstopwaitingafter":"Stop Waiting After (seconds)",
    "inputstopwaitingafter_novars*":"stopAfter",

"sepbarsstoreinteractionsas":"",
    "btextfinakly":"Store Reaction As",
    "inputfinakly_novars!":"storeAs",



      "preview":"awaitFrom",
       "previewName":"From",


       "variableSettings":{
        "fromWho": {
            "User*": "direct", 
            "Anybody": "novars",
            "Message Author": "novars"
        },
        "emoji": {
            "Any": "novars",
            "Custom*": "novars"
        }
    }

    },

    async run(values, inter, uID, fs, client, runActionArray) { 
        const tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'));
        const varTools = require(`../Toolkit/variableTools.js`)
      let message = client.channels.cache.get(tempVars[uID][values.messageVariable].channelId).messages.cache.get(tempVars[uID][values.messageVariable].id)
        const collector = message.createReactionCollector({ max: 1, time: parseFloat(values.stopAfter) * 1000 });
        var collectedAt = []
        let timesRan = 0;

        let toolkit = require('../Toolkit/interactionTools.js');
        let toolKey = toolkit.preventDeletion(uID);
        collector.on('collect', async (interaction, interactionAuthor) => {
            
            let trueEmoji = false;
            if (values.emojiType == "Any") {
                trueEmoji = true;
            }
            if (values.emojiType == "Custom*") {
                trueEmoji = interaction.emoji.name == values.emoji
            }

            let isAuthor = false;
            switch (values.awaitFrom) {
                case "Anybody":
                    isAuthor = true;
                    break;
                case "Message Author":
                    isAuthor = interactionAuthor.id == inter.author.id;
                    break;
                case "User*":
                    let user = client.users.cache.get(tempVars[uID][varTools.transf(values.fromWho, uID, tempVars)].id)
                    isAuthor = interactionAuthor.id == user.id;
                    break;
            }
            let foundCommand = false;
            if (isAuthor == true && collectedAt.includes(interaction.createdTimestamp) == false && trueEmoji == true) {
                collectedAt.push(interaction.createdTimestamp)

                let datjson = require('../data.json')
                const interactionTools = require(`../Toolkit/interactionTools.js`)
                await interactionTools.runCommand(values.runAfter, runActionArray, uID, client, inter, fs)


                            if (values.storeAs != "") {
                                tempVars[uID] = {
                                    ...tempVars[uID],
                                    [values.storeAs]: interaction.values
                                }

                                fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
                            }
                        }
        });

        setTimeout(() => {
            delete collectedAt;
            toolkit.leak(uID, toolKey)

        }, values.stopAfter * 1000)
}}