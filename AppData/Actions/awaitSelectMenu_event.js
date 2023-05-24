module.exports = {
    data: {"name":"Await Select Menu", 
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
    "postAction":"Acknowledge Interaction"
},

    UI: {"compatibleWith":["Text", "Slash"], 
    "text":"Await Select Menu", "sepbar3":"",
     "btext33333333":"Select Menu Custom ID",
      "input1_novars":"customID",
       "sepbar12":"",
        "btext5034":"Message/Embed Variable",
        "input5034_direct*":"messageVariable",
        "sepbar423032":"",
     "btext2":"Await Interaction From", 
     "menuBar":{"choices":["Event"],
      storeAs: "awaitFrom", extraField:"fromWho"},  

      "sepbar0":"", 
    "btext34423531":"Once Submit, Run Action Group", 
    "input42_actionGroup*":"runAfter",
    "sepbarstopwaitingafter":"",
    "btextstopwaitingafter":"Stop Waiting After (seconds)",
    "inputstopwaitingafter_novars*":"stopAfter",
    "sepbarwaitonceithink":"",
    "btext0033": "Post-Interaction",
    "menuBar2":{"choices":["Acknowledge Interaction", "Do Nothing"],

    storeAs: "postAction", extraField:"postActionField"
},
"sepbarsstoreinteractionsas":"",
    "btextfinakly":"Store Selected Options List As",
    "inputfinakly_novars!":"storeAs",



      "preview":"awaitFrom",
       "previewName":"From",


       "variableSettings":{
        "fromWho": {
            "User*": "direct", 
            "Anybody": "novars",
            "Message Author": "novars"
        },
        "postActionField": {
            "Acknowledge Interaction":  "novars",
            "Do Nothing": "novars"
        }
    },
    "sepbar4":"",
    "btext5":"If stored as a list, the labels of the options the user selected will be all lowercase and contain no emojis.",

    },

    async run(values, inter, uID, fs, client, runActionArray) { 
        const tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'));
        const varTools = require(`../Toolkit/variableTools.js`)
        const { ComponentType } = require('discord.js')
      let message = client.channels.cache.get(tempVars[uID][values.messageVariable].channelId).messages.cache.get(tempVars[uID][values.messageVariable].id)
      const collector = message.createMessageComponentCollector({
        componentType: ComponentType.StringSelect,
        time: parseFloat(values.stopAfter) * 1000,
    });
            var collectedAt = []
            let finishedRunning = false;

        let timesRan = 0;
        collector.on('collect', async (interaction) => {
            console.log('collected')
            if (interaction.customId == values.customID) {
            let isAuthor = false;
            switch (values.awaitFrom) {
                case "Anybody":
                    isAuthor = true;
                    break;
                case "Message Author":
                    isAuthor = interaction.user.id == inter.author.id;
                    break;
                case "User*":
                    let user = client.users.cache.get(tempVars[uID][varTools.transf(values.fromWho, uID, tempVars)].id)
                    isAuthor = interaction.user.id == user.id;
                    break;
            }
            let foundCommand = false;
            if (isAuthor == true && collectedAt.includes(interaction.createdTimestamp) == false) {
                collectedAt.push(interaction.createdTimestamp)

                let datjson = require('../data.json') 
                
                const interactionTools = require(`../Toolkit/interactionTools.js`)
                await interactionTools.runCommand(values.runAfter, runActionArray, uID, client, inter, fs)



                            if (values.postAction == "Acknowledge Interaction") {
                                interaction.deferUpdate()
                            }

                            if (values.storeAs != "") {
                                tempVars[uID] = {
                                    ...tempVars[uID],
                                    [values.storeAs]: interaction.values
                                }

                                fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
                            }
                            return Promise.resolve(null).then(() => null);
            }}
        });

        setTimeout(() => {
            delete collectedAt
        }, values.stopAfter * 1000)
}}