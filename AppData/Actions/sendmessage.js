module.exports = {
    data: {"messageContent": "", "button": "Message Channel", "name": "Send Message", "ExtraData": "", "sendTo":"",  "actionRowElements":[]},
    UI: {"compatibleWith": ["Text", "Slash"], "text": "Message Content", "largeInput": "messageContent", "ButtonBar": {"buttons": ["Message Channel", "Channel*", "User*"], storeAs: "sendTo"}, preview: "messageContent", previewName: "Content"},
    run(values, message, uID, fs, client) {
        let tempVrz = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json'));
        let varTools = require(`../Toolkit/variableTools.js`)
        const interactionTools = require('../Toolkit/interactionTools.js')

        if (values.button == "Message Channel") {
            console.log(values.messageContent.uID)
            message.channel.send(varTools.transf(values.messageContent, uID, tempVrz))
        }
        if (values.button == "Channel*") {
            var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
            client.channels.cache.get(tempVars[uID][values.ExtraData].id).send({content: varTools.transf(values.messageContent, uID, tempVrz), components: interactionTools.getButtons(values.actionRowElements)}) 
        }
        if (values.button == "Channel*") {
            var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
            client.users.cache.get(tempVars[uID][values.ExtraData].id).send({content: varTools.transf(values.messageContent, uID, tempVrz), components: interactionTools.getButtons(values.actionRowElements)}) 
        }
    }
}
