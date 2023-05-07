module.exports = {
    data: {"name":"Store Member Data", 
    "dataName":"",
    "dataValue": "",
     "storeAs":"",
     "memberAs":"Message Author",
      "memberFrom":""},
     
    UI: {"compatibleWith":["Text", "Slash"], 
    "text":"Store Member Data", 
    
    "sepbar3":"", 

     "btext00guild":"Get Member From",
      "menuBar":{"choices":["Message Author", "Variable*"], 
      storeAs:"memberAs", extraField:"memberFrom"},

      "sepbar134324121232":"",  

      "btext33333333":"Data Name", 
      "input1*":"dataName",
       "sepbar12345":"", 
       "btext3333ds3333":"Data Value", 
       "input341*":"dataValue",

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
        var onArr = "members"

        if (values.memberAs == 'Message Author') {
            user = message.author.id
            guild = message.guild.id
        } else {
                guild = tempVars[uID][values.memberFrom].guildId
                user = tempVars[uID][values.memberFrom].userId
        }
        if (storedData[onArr][guild + user]) {
            storedData[onArr][guild + user] = {
                ...storedData[onArr][guild + user],
                [firstValue + secondValue]: varTools.transf(values.dataValue, uID, tempVars)
            }
        } else {
            storedData[onArr] = {
                ...storedData[onArr],
                [guild + user]: {
                    [firstValue + secondValue]: varTools.transf(values.dataValue, uID, tempVars)
                }
            }
        }

    await fs.writeFileSync('./AppData/Toolkit/storedData.json', JSON.stringify(storedData), 'utf8')

}
}