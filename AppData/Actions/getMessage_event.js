module.exports = {
    data: {"name": "Get Message",
    "storeAs":"",
    "messageID":"",
    "messageChannel":"",
    "channelFrom":"ID*",
    "channel":""
    },
    UI: {"compatibleWith": ["Text", "Slash", "DM"],

    "text": "Get Message",
    
    "sepbar":"",

    "bext":"Message ID",
    "input":"messageID",

    "sepbar0":"",

    "btext0":"Get Message Channel Via",
    "menuBar": {choices: ["ID*", "Variable*"], storeAs: "channelFrom", extraField: "channel"},

    "sepbar1":"",
    
    "btext1":"Store As",
    "input!":"storeAs",
    
    variableSettings: {
        "channel": {
            "Variable*": "direct"
        }
    },

    previewName: "Store As", preview: "storeAs"
    },
    async run(values, message, uID, fs, client, runner, bridge)  {
        const varTools = require(`../Toolkit/variableTools.js`)

        let channel;
        if (values.channelFrom == 'ID*') {
            channel = client.getChannel(varTools.transf(values.messageID, bridge.variables))
        } 
        if (values.channelFrom == 'Variable*') {
            channel = bridge.variables[varTools.transf(values.messageID, bridge.variables)]
        }
        bridge.variables[varTools.transf(values.storeAs, bridge.variables)] = channel.getMessage(varTools.transf(values.messageID, bridge.variables))
    }
}