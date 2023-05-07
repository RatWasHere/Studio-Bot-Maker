module.exports = {
    data: {"name":"Add Reaction", 
    "storeAs":"", 
    "messageVariable":"",
     "emoji":"",
},

    UI: {"compatibleWith":["Text", "Slash"], 
    "text":"Add Reaction", "sepbar3":"",
     "btext33333333":"Reaction Emoji",
    "input03_novars*": "emoji",
       "sepbar12":"",
        "btext5034":"Message/Embed Variable",
        "input5034_direct*":"messageVariable",


      "preview":"awaitFrom",
       "previewName":"From",

       "sepbarsstoreinteractionsas":"",
       "btextfinakly":"Store Reaction As",
       "inputfinakly_novars!":"storeAs"

    },

    async run(values, inter, uID, fs, client) { 
        const tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'));
        const varTools = require(`../Toolkit/variableTools.js`)
      let message = client.channels.cache.get(tempVars[uID][values.messageVariable].channelId).messages.cache.get(tempVars[uID][values.messageVariable].id)
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