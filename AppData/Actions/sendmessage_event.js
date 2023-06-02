module.exports = {
    data: {"messageContent": "", "storeAs":"", "button": "Channel*", "name": "Send Message", "ExtraData": "", "sendTo":"",  "actionRowElements":[]},
    UI: {"compatibleWith": ["Event"], "text": "Send Message", "sepbar": "",
    "btext": "Message Content", "largeInput": "messageContent",      "sepbar0":"",

    "btext0": "Send To",
    "ButtonBar": {"buttons": ["Channel*", "User*"], storeAs: "sendTo"},
     preview: "messageContent", previewName: "Content",
     ButtonBarChoices: {
        "Channel*": "direct",
        "User*": "direct"
     }, 
     "sepbar1":"",
     "btext1": "Store Message As",
     "input0!": "storeAs"
    },
    run(values, message, uID, fs, client) {
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))

        let tempVrz = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json'));
        let varTools = require(`../Toolkit/variableTools.js`)
        const interactionTools = require('../Toolkit/interactionTools.js')

        if (values.button == "Channel*") {
            client.channels.cache.get(tempVars[uID][values.ExtraData].id).send({content: varTools.transf(values.messageContent, uID, tempVrz), components: interactionTools.getButtons(values.actionRowElements)}).then(msg => {
                if (values.storeAs != "") {
                    tempVars[uID][values.storeAs] = msg
                    fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
                }
            }) 
        }
        if (values.button == "User*") {
            client.users.cache.get(tempVars[uID][values.ExtraData].id).send({content: varTools.transf(values.messageContent, uID, tempVrz), components: interactionTools.getButtons(values.actionRowElements)}).then(msg => {
                if (values.storeAs != "") {
                    tempVars[uID][values.storeAs] = msg
                    fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
                }
            })
        }
    }
}
