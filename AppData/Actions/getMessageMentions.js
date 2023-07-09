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
    run(values, message, uID, fs, client, runner, bridge)  {
        let varTools = require(`../Toolkit/variableTools.js`)
        let msg;
            

        if (values.messageObject == 'Command Message') {
            msg = message;
        } else {
            msg = client.getChannel(bridge.variables[values.messageVariable].channelId).messages.get(bridge.variables[values.messageVariable].id)
        }

        let mentions = msg.mentions.users
        switch (values.button) {
            case 'First':
                mentions = mentions[0]
            break
            case 'Second':
                mentions = mentions[1]
            break
            case 'Third':
                mentions = mentions[2]
            break
            case 'Custom':
                mentions = mentions[parseFloat(varTools.transf(values.ExtraField, bridge.variables))]
            break
        }
        
        bridge.variables = {
            ...bridge.variables,
            [values.storeAs]: mention || '-'
        }
    }
}
