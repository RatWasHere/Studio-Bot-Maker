module.exports = {
    data: {"name":"Stop Typing", 
    "dataName":"",
    "dataValue": "",
     "storeAs":"",
     "typeIn":"Message Channel",
      "typeFrom":""},
     
    UI: {"compatibleWith":["Text", "Slash"], 
    "text":"Stop Typing", 
    
    "sepbar3":"", 

     "btext00guild":"Stop Typing In",
      "menuBar":{"choices":["Message Channel", "Variable*"], 
      storeAs:"typeIn", extraField:"typeFrom"},

      "sepbar134324121232":"",  
    "btext03412": "<b>Note</b><br> The bot won't stop typing 10 seconds after this action is ran. If the bot sends a message, the typing will stop instantly, without having to wait the 10 seconds.",
      "variableSettings":{
        "typeFrom": {
            "Variable*": "direct", 
            "Message Channel": "novars"
        }
    },

      "preview":"typeIn", 
      "previewName":"In"},

   async run(values, message, uID, fs, client) { 
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        var storedData = JSON.parse(fs.readFileSync('./AppData/Toolkit/storedData.json', 'utf8'))
 
        if (values.typeIn == 'Message Channel') {
            message.channel.sendTyping()
        } else { 
            let channelId = tempVars[uID][varTools.transf(values.typeFrom, uID, tempVars)].id
            client.channels.cache.get(channelId).sendTyping()
        }

}
}