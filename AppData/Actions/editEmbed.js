module.exports = {
    data: {"messageContent": "", "button": "Edit Embed", "newEmbedVar":"", "name": "Edit Embed", "ExtraData": "", "sendTo":"", "ButtonRow":"", "ActionRow":"", "embedVar":""},
    UI: {"compatibleWith": ["Text", "Slash"], 
    "text": "Edit Embed","sepbar44423":"sepbar",
     "btextEmbVar":"Embed Variable", "inputEmbVar*":"embedVar",
    "sepbar333235":"",
    "btextEmbVar2":"New Embed Variable", "inputEmbVaer*":"newEmbedVar",
    "sepbarcauseisayso":"",
    "btextcauseisaysoaswell":"<b>Note!</b><br> The second embed will entirely replace the new one, make sure to set the title!",
    preview: "newEmbedVar", previewName: "New Embed"},
    async run(values, message, uID, fs, client) {
        const tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'));
        const varTools = require(`../Toolkit/variableTools.js`);
      let embed = client.messages.cache.get(tempVars[uID][values.embedVar].id)
      embed.edit({embeds: [tempVars[uID][values.newEmbedVar]]})
      }
    };