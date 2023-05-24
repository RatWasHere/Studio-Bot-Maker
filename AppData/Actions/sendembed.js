module.exports = {
    data: {"messageContent": "", "storeAs":"", "button": "Message Channel", "name": "Send Embed", "ExtraData": "", "sendTo":"", "ButtonRow":"", "ActionRow":"", "embedVar":"", "actionRowElements":[]},
    UI: {"compatibleWith": ["Text", "Slash"], 
    "text": "Send Embed","sepbar44423":"sepbar",
     "btextEmbVar":"Embed Variable",
      "inputEmbVar_direct*":"embedVar",
      "sepbarEmbVar":"", 
      "btext55553333334546426":"Send To", 
      "ButtonBar": {"buttons": ["Message Channel", "Channel*", "User*"], storeAs: "sendTo",

    }, 
    ButtonBarChoices: {
      "Channel*": "direct",
      "User*": "direct"
   },
    preview: "embedVar", previewName: "Embed"},
     async run(values, message, uID, fs, client) {
        const interactionTools = require('../Toolkit/interactionTools.js')
        const tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'));
        const varTools = require(`../Toolkit/variableTools.js`);
        if (values.button === "Message Channel") {
          const emped = tempVars[uID][values.embedVar]
           await message.channel.send({ embeds: [emped], components: interactionTools.getButtons(values.actionRowElements)}).then((embed) => {
            delete tempVars[uID][values.embedVar]
            tempVars[uID][values.embedVar] = embed
          })
        }
        if (values.button === "Channel*") {
          const channelID = tempVars[uID][values.ExtraData].id;
          const emped = tempVars[uID][values.embedVar]
          const channel = client.channels.cache.get(channelID);
          await channel.send({ embeds: [emped], components: interactionTools.getButtons(values.actionRowElements)}).then((embed) => {
            delete tempVars[uID][values.embedVar]

            tempVars[uID][values.embedVar] = embed
          })
        }
        if (values.button == "User*") {
          const channelID = tempVars[uID][values.ExtraData].id;
          const emped = tempVars[uID][values.embedVar]
          const channel = client.users.cache.get(channelID);
          await channel.send({ embeds: [emped], components: interactionTools.getButtons(values.actionRowElements)}).then((embed) => {
            delete tempVars[uID][values.embedVar]

            tempVars[uID][values.embedVar] = embed
          })
          ;
        }
       await fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
      }

    };
    
    
    
    
