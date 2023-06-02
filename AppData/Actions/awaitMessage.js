module.exports = {
    data: {"name":"Await Message", 
    "storeAs":"", 
    "messageFrom":"Message Channel",
    "messageChannel":"",
    "runAfter":"",
    "fromWho":"",
    "awaitFrom": "Message Author",
    "stopAfter":"60",
    "button": "✓",
    "storeAs":""
},

    UI: {"compatibleWith":["Text", "Slash"], 
    "text":"Await Reaction", "sepbar3":"",
     "btext2":"Await Message From", 
     "menuBar44":{"choices":["Anybody", "Message Author", "User*"],
      storeAs: "awaitFrom", extraField:"fromWho"},  

      "sepbar0":"", 
      "btext12":"Await Message In",
      "menuBarchannel": {
        "choices": ["Message Channel", "Channel*"],
        "storeAs":"messageFrom",
        "extraField": "messageChannel"
      },
      "sepbar13":"",
    "btext34423531":"Once Message Was Sent, Run Action Group", 
    "input42_actionGroup*":"runAfter",

    "sepbarstopwaitingafter":"",
    "btextstopwaitingafter":"Stop Waiting After (seconds)",
    "inputstopwaitingafter_novars*":"stopAfter",

"sepbarsstoreinteractionsas":"",
    "btextfinakly":"Store Message As",
    "inputfinakly_novars!":"storeAs",



      "preview":"awaitFrom",
       "previewName":"From",


       "variableSettings":{
        "fromWho": {
            "User*": "direct", 
            "Anybody": "novars",
            "Message Author": "novars"
        },
        "messageChannel": {
            "Channel*": "actionGroup"
        }
    }

    },

    async run(values, inter, uID, fs, client, runActionArray) { 
        const tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'));
        const varTools = require(`../Toolkit/variableTools.js`)
      let channel;
      if (values.messageFrom == 'Message Channel') {
            channel = inter.channel;
      } else {
            channel = tempVars[uID][varTools.transf(values.messageChannel)]
      }
        const collector = channel.createMessageCollector({ max: 1, time: parseFloat(values.stopAfter) * 1000 });
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
                                    [values.storeAs]: interaction
                                }

                                fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
                            }
                        }
        });

        setTimeout(() => {
            delete collectedAt
            toolkit.leak(uID, toolKey)

        }, values.stopAfter * 1000)
}}