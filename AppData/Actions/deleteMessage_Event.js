module.exports = {
    data: {"name": "Delete Message", "messageVariable": ""},
    UI: {"compatibleWith": ["Event", "Slash"],"text1":"Delete Message", "sepbar2":"sepber",
    "btext33333333":"Message Variable",
    "input4_direct": "messageVariable", 
     previewName: "Message Var", preview: "messageVariable"},

    run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var msg;
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
            msg = client.messages.cache.get(tempVars[uID][values.messageVariable].id)

        msg.delete()
    }
}