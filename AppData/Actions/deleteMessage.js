module.exports = {
    data: {"name": "Delete Message", "messageVariable": "", "messageFrom":"Command Message"},
    UI: {"compatibleWith": ["Text"],"text1":"Delete Message", "sepbar2":"sepber",
    "btext33333333":"Get Message Via",
    "menuBar4": {"choices": ["Command Message", "Variable*"], storeAs:"messageFrom", extraField: "messageVariable"}, 
    "btext12":" ",              

    "variableSettings": {
        "messageVariable": {
            "Variable*": "direct"
        }
    },                          
     previewName: "Message Via", preview: "messageFrom"},

    run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var msg;
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))

        if (values.messageFrom == 'Command Message') {
            msg = message
        } else {
            msg = client.messages.get(tempVars[uID][values.messageVariable].id)
        }

        msg.delete()
    }
}