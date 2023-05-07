module.exports = {
    data: {"name":"Get Guild Data", 
    "dataName":"",
    "dataValue": "",
     "storeAs":"",
     "memberAs":"Message Guild",
      "memberFrom":""},
     
    UI: {"compatibleWith":["Text", "Slash"], 
    "text":"Get Guild Data", 
    
    "sepbar3":"", 

     "btext00guild":"Get Guild From",
      "menuBar":{"choices":["Message Guild", "Variable*"], 
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
            "Message Author": "novars"
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
        var onArr = "guilds"

        if (values.memberAs == 'Message Guild') {
            user = message.guild.id
        } else {
                user = tempVars[uID][values.memberFrom].id
        }

        tempVars[uID][values.storeAs] = storedData[onArr][guild + user][firstValue + secondValue]

    await fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

}
}