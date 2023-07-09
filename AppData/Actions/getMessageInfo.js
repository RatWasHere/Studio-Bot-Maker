module.exports = {
    data: {"name": "Get Message Info", "message":"", "messageFrom":"Command Message", "get": "Message Content", "storeAs":""},
    UI: {"compatibleWith": ["Text", "DM"],
        "text":"Get Message Info",
        
        "sepbar":"",

        "btext": "Get Message Via",
        "menuBar": {choices: ["Command Message", "Variable*"], storeAs: "messageFrom", extraField: "message"},

        "sepbar0":"",

        "btext0": "Get",
        "menuBar0": {choices: ["Message Content", "Message Channel", "Message Author", "Message ID", "Message Timestamp", "Message Jump Link"], storeAs: "get"},
    
        "sepbar1":"",

        "btext1": "Store As",
        "input!": "storeAs",

        variableSettings: {
            "message": {
                "Variable*": "direct"
            }
        },

        preview: 'get', previewName: 'Get'
    },
    run(values, message, uID, fs, client, runner, bridge)  {
        let varTools = require(`../Toolkit/variableTools.js`);

        let msg;
        if (values.messageFrom == 'Variable*') {
            msg = message;
        }
        if (values.messageFrom == 'Command Message') {
            msg = bridge.variables[varTools.transf(values.message, bridge.variables)]
        }

        let result;
        switch (values.get) {
            case 'Message Content':
                result = msg.content
            break
            case 'Message Channel':
                result = msg.channel
            break
            case 'Message Author':
                result = msg.author
            break
            case 'Message ID':
                result = msg.id
            break
            case 'Message Timestamp':
                result = msg.timestamp
            break
            case 'Message Jump Link':
                result = msg.jumpLink
            break
        }

        bridge.variables[varTools.transf(values.storeAs, bridge.variables)] = result;
    }
}