module.exports = {
    data: {"name":"Get Channel Data", 
    "dataName":"",
    "storeAs":"",
    "channelFrom":"Command Author",
    "channel":""},
     
    UI: {"compatibleWith":["Text", "Slash", "DM"],

    "text":"Get Channel Data", 
    
    "sepbar":"", 

    "btext":"Get Channel Via",
    "menuBar":{"choices":["Command Channel", "ID*", "Variable*"], storeAs:"channelFrom", extraField:"channel"},

    "sepbar":"",  

    "btext0":"Data Name",
    "input*":"dataName",

    "sepbar0":"",

    "btext1": "Store As", 
    "input0!": "storeAs",

    "variableSettings":{
        "channel": {
            "Variable*": "direct", 
            "Command Author": "novars"
        }
    },

    "preview":"channelFrom", 
    "previewName":"Channel"
    },

   async run(values, message, uID, fs, client, runner, bridge) { 
        let varTools = require(`../Toolkit/variableTools.js`)

        var storedData = JSON.parse(fs.readFileSync('./AppData/Toolkit/storedData.json', 'utf8'))

        if (values.channelFrom == 'Command Channel') {
            channel = message.channel
        } 
        if (values.channelFrom == 'Variable*') {
            channel = bridge.variables[varTools.transf(values.channel, bridge.variables)]
        }
        if (values.channelFrom == 'ID*') {
            channel = client.channels.get(varTools.transf(values.channel, bridge.variables))
        }

        varTools.transf(values.storeAs, bridge.variables) = storedData.channels[channel.id][varTools.transf(values.dataName, bridge.variables)]
    }
}