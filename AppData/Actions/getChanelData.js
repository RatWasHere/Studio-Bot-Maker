module.exports = {
    data: {"name":"Get Channel Data", 
    "dataName":"",
    "dataValue": "",
     "storeAs":"",
     "memberAs":"Command Channel",
      "memberFrom":""},
     
    UI: {"compatibleWith":["Text", "Slash"], 
    "text":"Get Channel Data", 
    
    "sepbar3":"", 

     "btext00guild":"Get Channel From",
      "menuBar":{"choices":["Command Channel", "Variable*"], 
      storeAs:"memberAs", extraField:"memberFrom"},

      "sepbar134324121232":"",  

      "btext33333333":"Data Name", 
      "input1*":"dataName",
       "sepbar12345":"", 
       "btext3333ds3333":"Store Data As", 
       "input341!*":"storeAs",

      "variableSettings":{
        "memberFrom": {
            "Variable*": "direct", 
            "Command Channel": "novars"
        }
    },

      "preview":"memberAs", 
      "previewName":"Member"},

   async run(values, message, uID, fs, client) { 
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        var storedData = JSON.parse(fs.readFileSync('./AppData/Toolkit/storedData.json', 'utf8'))
        let guild = ''
        var firstValue = ``
        let secondValue = varTools.transf(values.dataName, uID, tempVars)
        var onArr = "channel"

        if (values.memberAs == 'Command Channel') {
            user = message.channel.id
        } else {
                user = tempVars[uID][values.memberFrom].id
        }

    await fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

}
}