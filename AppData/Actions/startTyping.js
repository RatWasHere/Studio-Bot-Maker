module.exports = {
    data: {"name":"Start Typing", 
    "dataName":"",
    "dataValue": "",
     "storeAs":"",
     "typeIn":"Message Channel",
      "typeFrom":""},
     
    UI: {"compatibleWith":["Text", "Slash"], 
    "text":"Start Typing", 
    
    "sepbar3":"", 

     "btext00guild":"Start Typing In",
      "menuBar":{"choices":["Message Channel", "Variable*"], 
      storeAs:"typeIn", extraField:"typeFrom"},

      "sepbar134324121232":"",  

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
            message.channel.startTyping()
        } else { 
            let channelId = tempVars[uID][varTools.transf(values.typeFrom, uID, tempVars)].id
            client.channels.cache.get(channelId).startTyping()
        }
        
        


}
}