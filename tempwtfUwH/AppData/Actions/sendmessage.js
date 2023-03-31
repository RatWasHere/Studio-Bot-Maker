module.exports = {
    data: {"messageContent": "", "button": "Message Channel", "name": "Send Message", "ExtraData": "", "sendTo":""},
    UI: {"compatibleWith": ["Text", "Slash"], "text": "Message Content", "largeInput": "messageContent", "ButtonBar": {"buttons": ["Message Channel", "Channel*", "User*"], storeAs: "sendTo"}, preview: "messageContent", previewName: "Content"},
    run(values, message, uID, fs, client) {
        let tempVrz = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json'));
        console.log(tempVrz, 'tempVrz')
        let varTools = require(`../Toolkit/variableTools.js`)
        if (values.button == "Message Channel") {
            console.log(values.messageContent.uID)
            message.channel.send(varTools.transf(values.messageContent, uID, tempVrz))
        }
        if (values.button == "Channel*") {
            var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
            client.channels.cache.get(tempVars[uID][values.ExtraData].id).send(varTools.transf(values.messageContent, uID, tempVrz)) 
        }
        if (values.button == "Channel*") {
            var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
            client.users.cache.get(tempVars[uID][values.ExtraData].id).send(varTools.transf(values.messageContent, uID, tempVrz)) 
        }
    }
}
