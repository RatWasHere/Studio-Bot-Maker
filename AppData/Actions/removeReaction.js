module.exports = {
    data: {"name":"Remove Reaction", 
    "storeAs":"", 
    "messageVariable":"",
     "emoji":"",
},

    UI: {"compatibleWith":["None"], 
    "text":"Remove Reaction", "sepbar":"",
    "btext":"Reaction Emoji",
    "input custom emoji *": "emoji",
    "sepbar0":"",
    "btext0":"Message Variable",
    "input_direct*":"messageVariable",


    "preview":"awaitFrom",
    "previewName":"From",

       "sepbarsstoreinteractionsas":"",
       "btextfinakly":"Store Reaction As",
       "inputfinakly_novars!":"storeAs",
       "preview":"emoji",
       "previewName":"Emoji"

    },

    async run(values, inter, uID, fs, client) { 
        const tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'));
        const varTools = require(`../Toolkit/variableTools.js`)
      let message = client.getChannel(tempVars[uID][values.messageVariable].channelId).messages.get(tempVars[uID][values.messageVariable].id)
        await message.react(values.emoji).then(async reaction => {
            if (values.storeAs != "") {
                tempVars[uID] = {
                    ...tempVars[uID],
                    [values.storeAs]: reaction
                }
                console.log(tempVars)
                await fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
            }
        })
    }}