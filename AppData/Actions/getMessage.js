module.exports = {
    data: {"name": "Get Message",
    "storeAs":"",
    "messageFrom":"Command Message",
    "messageID":""
},
    UI: {"compatibleWith": ["Text"],
    "text1":"Get Message", "sepbar001":"",
     "btextMenubr":"Get Message From", 
     "menuBar":{"choices":["Command Message", "Message ID*"], storeAs:"messageFrom", extraField: "messageID"},
       "sepbar91201":"","btext566": "Store As", 
       "variableSettings": {
        "messageID": {
            "Message ID*": "indirect"
        }
       },
       
       "input666!*":"storeAs", previewName: "Get", preview: "messageFrom"},
    run(values, message, uID, fs, client) {
        var msg;
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
            const varTools = require(`../Toolkit/variableTools.js`)


    switch(values.messageFrom) {
            case 'Message ID*':
                tempVars[uID][values.storeAs] = client.messages.cache.get(varTools.transf(values.messageID, uID, tempVars))
            break
            case 'Command Message':
                tempVars[uID][values.storeAs] = message
            break 
        } 

        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

    }
}