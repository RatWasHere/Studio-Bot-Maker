module.exports = {
    data: {"name": "Get Message",
    "storeAs":"",
    "messageID":""
},
    UI: {"compatibleWith": ["Event", "Slash"],
    "text1":"Get Message", "sepbar001":"",
     "btextMenubr":"Message ID", 
     "input03":"messageID",
       "input666!*":"storeAs", previewName: "ID", preview: "messageID"},
    run(values, message, uID, fs, client) {
        var msg;
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
            const varTools = require(`../Toolkit/variableTools.js`)


            tempVars[uID][values.storeAs] = client.messages.cache.get(varTools.transf(values.messageID, uID, tempVars))

        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

    }
}