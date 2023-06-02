module.exports = {
    data: {"name":"Store User Data", 
    "dataName":"",
    "dataValue": "",
     "storeAs":"",
     "userAs":"Message Author",
      "userFrom":""},
     
    UI: {"compatibleWith":["Text", "Slash"], 
    "text":"Store User Data", 
    
    "sepbar3":"", 

     "btext00guild":"Get User From",
      "menuBar":{"choices":["Message Author", "Variable*"], 
      storeAs:"userAs", extraField:"userFrom"},

      "sepbar134324121232":"",  

      "btext33333333":"Data Name", 
      "input1*":"dataName",
       "sepbar12345":"", 
       "btext3333ds3333":"Data Value", 
       "input341*":"dataValue",

      "variableSettings":{
        "userFrom": {
            "Variable*": "direct", 
            "Message Author": "novars"
        }
    },

      "preview":"userAs", 
      "previewName":"User"},

   async run(values, message, uID, fs, client) { 
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        var storedData = JSON.parse(fs.readFileSync('./AppData/Toolkit/storedData.json', 'utf8'))
        let guild = ''
        var firstValue = ``
        let secondValue = varTools.transf(values.dataName, uID, tempVars)
        var onArr = "users"

        if (values.userAs == 'Message Author') {
            user = message.author.id
        } else {
                guild = ''
                user = tempVars[uID][values.userFrom].id
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