module.exports = {
    data: {"name":"Get User Data", 
    "dataName":"",
    "storeAs":"",
    "userFrom":"Command Author",
    "user":""},
     
    UI: {"compatibleWith":["Text", "Slash", "DM"],

    "text":"Get User Data", 
    
    "sepbar":"", 

    "btext":"Get User Via",
    "menuBar":{"choices":["Command Author", "ID*", "Variable*"], storeAs:"userFrom", extraField:"user"},

    "sepbar":"",  

    "btext0":"Data Name",
    "input*":"dataName",

    "sepbar0":"",

    "btext1": "Store As", 
    "input0!": "storeAs",

    "variableSettings":{
        "user": {
            "Variable*": "direct", 
            "Command Author": "novars"
        }
    },

    "preview":"userFrom", 
    "previewName":"User"
    },

   async run(values, message, uID, fs, client, runner, bridge) { 
        let varTools = require(`../Toolkit/variableTools.js`)

        var storedData = JSON.parse(fs.readFileSync('./AppData/Toolkit/storedData.json', 'utf8'))

        if (values.userFrom == 'Command Author') {
            user = message.author
        } 
        if (values.userFrom == 'Variable*') {
            user = bridge.variables[varTools.transf(values.user, bridge.variables)]
        }
        if (values.userFrom == 'ID*') {
            user = client.users.get(varTools.transf(values.user, bridge.variables))
        }

        varTools.transf(values.storeAs, bridge.variables) = storedData.users[user.id][varTools.transf(values.dataName, bridge.variables)]
    }
}