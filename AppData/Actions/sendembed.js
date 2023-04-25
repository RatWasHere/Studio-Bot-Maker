module.exports = {
    data: {"messageContent": "", "storeAs":"", "button": "Message Channel", "name": "Send Embed", "ExtraData": "", "sendTo":"", "ButtonRow":"", "ActionRow":"", "embedVar":"", "actionRowElements":[]},
    UI: {"compatibleWith": ["Text", "Slash"], "text": "Send Embed","sepbar44423":"sepbar", "btextEmbVar":"Embed Variable", "inputEmbVar":"embedVar", "sepbarEmbVar":"", "btext55553333334546426":"Send To", "ButtonBar": {"buttons": ["Message Channel", "Channel*", "User*"], storeAs: "sendTo"}, "sepbar33235":"", "btext63555":"Button Row", "input":"ButtonRow", "btext6423":"Action Row", "input555533333":"ActionRow",
    "sepbar03storeas":"",
    "inputstoreasig":"storeAs",
    preview: "embedVar", previewName: "Embed"},
    async run(values, message, uID, fs, client) {
        const interactionTools = require('../Toolkit/interactionTools.js')
        const tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'));
        const varTools = require(`../Toolkit/variableTools.js`);
        if (values.button === "Message Channel") {
          const emped = tempVars[uID][values.embedVar]
          console.log(values.actionRowElements, 'barcomponents-------------------------------')
          console.log(JSON.stringify(interactionTools.getButtons(values.actionRowElements)), 'barcomponents-------------------------------')
          await message.channel.send({ embeds: [emped], components: interactionTools.getButtons(values.actionRowElements)}).then((embed) => {
            if (values.storeAs != '') {
              tempVars[uID] = {
                ...tempVars[uID],
                [values.storeAs]: embed
              }
          }
          })
        }
        if (values.button === "Channel*") {
          const channelID = tempVars[uID][values.ExtraData].id;
          const emped = tempVars[uID][values.embedVar]
          const channel = client.channels.cache.get(channelID);
          await channel.send({embeds: [emped]}).then((embed) => {
            if (values.storeAs != '') {
              tempVars[uID] = {
                ...tempVars[uID],
                [values.storeAs]: embed
              }
          }
          })
        }
        if (values.button == "User*") {
          const channelID = tempVars[uID][values.ExtraData].id;
          const emped = tempVars[uID][values.embedVar]
          const channel = client.users.cache.get(channelID);
          await channel.send({embeds: [emped]}).then((embed) => {
            if (values.storeAs != '') {
              tempVars[uID] = {
                ...tempVars[uID],
                [values.storeAs]: embed
              }
          }
          })
          ;
        }
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
      }

    };
    
    
    
    
