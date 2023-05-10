module.exports = {
    data: {"name":"Get Mentioned User", "messageObject":"Command Message", "messageVariable":"", 
    "storeAs":"",
    "button":"First", "ExtraData":"5"},
    UI: {"compatibleWith": ["Text"], "text": "Get Message Mention","sepbarEmbVar":"", 
    
    "btextmember":"Message", "menuBar1": {"choices": ["Command Message", "Variable*"],
     storeAs: "messageObject", extraField: "messageVariable"}, 
    "sepbarmenus":"sepbar",
    "btext00":"Mention Number",
    "ButtonBar": {"buttons":["First", "Second", "Third", "Custom*"]},
    "sepbar5131":"",
    "btextstoreas":"Store As",
    "inputstoreas!*":"storeAs",
    "btext":"<b>Note!</b> <br> If you're using \"Custom\", you need to insert the number, not ordinal numbers!",
    "variableSettings": {
        "messageVariable": {
            "Variable*": "direct"
        }
    },
    preview: "button", previewName: "Mention"},
    run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        let msg;
            

        if (values.messageObject == 'Command Message') {
            msg = message;
        } else {
            msg = client.channels.cache.get(tempVars[uID][values.messageVariable].channelId).messages.cache.get(tempVars[uID][values.messageVariable].id)
        } 
        if (values.button == 'First') {
            mention = msg.mentions.users.first()

            tempVars[uID] = {
                ...tempVars[uID],
                [values.storeAs]: mention
            }
            fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

        } else {
            let ment = msg.mentions.users.array;
            let mention; 
            switch (values.button) {
                case 'Second':
                    mention = ment[1]
                break
                case 'Third':
                    mention = ment[2]
                break
                case 'Custom':
                    mention = ment[parseFloat(varTools.transf(values.ExtraField, uID, tempVars))]
                break
            }

            tempVars[uID] = {
                ...tempVars[uID],
                [values.storeAs]: mention
            }
            fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

         }
    }
}
