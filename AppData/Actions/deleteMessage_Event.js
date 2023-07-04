module.exports = {
    data: {"name": "Delete Message", "messageVariable": ""},
    UI: {"compatibleWith": ["Event", "Slash", "DM"],"text":"Delete Message", "sepbar":"",
    "btext":"Message Variable",
    "input_direct": "messageVariable", 
     previewName: "Message Var", preview: "messageVariable"},

    run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var msg;
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
            msg = client.getChannel(tempVars[uID][values.messageVariable].channel.id).messages.

        msg.delete()
    }
}