module.exports = {
    data: {"messageContent": "", "button": "Channel*", "name": "Send Embed", "ExtraData": "", "sendTo":"", "ButtonRow":"", "ActionRow":"", "embedVar":"",  "actionRowElements":[]},
    UI: {"compatibleWith": ["Event"], "text": "Send Embed","sepbar44423":"sepbar", 
    ButtonBarChoices: {
      "Channel*": "direct",
      "User*": "direct"
   },
    "btextEmbVar":"Embed Variable", "inputEmbVar":"embedVar", "sepbarEmbVar":"", "btext55553333334546426":"Send To", "ButtonBar": {"buttons": ["Channel*", "User*"], storeAs: "sendTo"}, preview: "embedVar", previewName: "Embed"},
    async run(values, message, uID, fs, client) {
        const tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'));
        const varTools = require(`../Toolkit/variableTools.js`);
        const interactionTools = require('../Toolkit/interactionTools.js')

        if (values.button === "Channel*") {
          console.log(tempVars[uID], tempVars[uID][values.ExtraData], uID, values.ExtraData)
          const channelID = tempVars[uID][values.ExtraData].id;
          const emped = tempVars[uID][values.embedVar]
          const channel = client.channels.cache.get(channelID);
          await channel.send({embeds: [emped], components: interactionTools.getButtons(values.actionRowElements)}).then((embed) => {
            tempVars[values.embedVar] = embed
          });
        }
        if (values.button == "User*") {
          const channelID = tempVars[uID][values.ExtraData].id;
          const emped = tempVars[uID][values.embedVar]
          const channel = client.users.cache.get(channelID);
          channel.send({embeds: [emped], components: interactionTools.getButtons(values.actionRowElements)}).then((embed) => {
            tempVars[values.embedVar] = embed
          }) ;
        }
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

      }
    };
    
    
    
    
