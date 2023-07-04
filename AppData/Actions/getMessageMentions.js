module.exports = {
    data: {"name":"Get Mentioned User", "messageObject":"Command Message", "messageVariable":"", 
    "storeAs":"",
    "button":"First", "ExtraData":"4"},
    UI: {"compatibleWith": ["Text", "DM"],
    "text": "Get Message Mention",

    "sepbar":"", 
    
    "btext":"Message", "menuBar": {"choices": ["Command Message", "Variable*"], storeAs: "messageObject", extraField: "messageVariable"}, 
    "sepbar0":"sepbar",
    "btext0":"Mention Number",
    "ButtonBar": {"buttons":["First", "Second", "Third", "Custom*"]},
    "sepbar1":"",
    "btext1":"Store As",
    "input!*":"storeAs",
    "btext2":"<b>Note!</b> <br> If you're using \"Custom\", you need to insert the number, not ordinal numbers!",
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
            msg = client.getChannel(tempVars[uID][values.messageVariable].channelId).messages.get(tempVars[uID][values.messageVariable].id)
        } 
        if (values.button == 'First') {
            mention = msg.mentions.users.first()

            tempVars[uID] = {
                ...tempVars[uID],
                [values.storeAs]: mention
            }
            fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

        } else {
            let mentions = msg.mentions.users.array;
            let mention; 
            switch (values.button) {
                case 'Second':
                    mention = mentions[1]
                break
                case 'Third':
                    mention = mentions[2]
                break
                case 'Custom':
                    mention = mentions[parseFloat(varTools.transf(values.ExtraField, uID, tempVars))]
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
