module.exports = {
    data: {"name":"Store Channel Data", 
    "dataName":"",
    "dataValue": "",
     "storeAs":"",
     "memberAs":"Command Channel",
      "memberFrom":""},
     
    UI: {"compatibleWith":["Text", "Slash"], 
    "text":"Store Channel Data", 
    
    "sepbar3":"", 

     "btext00guild":"Get Channel From",
      "menuBar":{"choices":["Command Channel", "Variable*"], 
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
            "Command Channel": "novars"
        }
    },

      "preview":"memberAs", 
      "previewName":"From"},

   async run(values, message, uID, fs, client) { 
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        var storedData = JSON.parse(fs.readFileSync('./AppData/Toolkit/storedData.json', 'utf8'))
        let guild = ''
        var firstValue = ``
        let secondValue = varTools.transf(values.dataName, uID, tempVars)
        var onArr = "channels"

        if (values.memberAs == 'Command Channel') {
            user = message.channel.id
        } else {
                guild = ''
                user = tempVars[uID][values.memberFrom].id
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