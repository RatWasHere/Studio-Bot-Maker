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

    "sepbar1":"",  

    "btext0":"Data Name", 
    "input*":"dataName",

    "sepbar0":"",

    "btext1":"Store As", 
    "input!":"storeAs",

    "variableSettings":{
        "user": {
            "Variable*": "direct", 
            "Command Author": "novars"
        }
    }
    },
    subtitle: "User: $[userFrom]$ - Data Name: $[dataName]$ - Store As: $[storeAs]$",
   async run(values, message, client, bridge) { 
        let varTools = require(`../Toolkit/variableTools.js`)

        var storedData = bridge.data.IO.get()
        if (values.userFrom == 'Command Author') {
            user = message.author
        } 
        if (values.userFrom == 'Variable*') {
            user = bridge.variables[varTools.transf(values.user, bridge.variables)]
        }
        if (values.userFrom == 'ID*') {
            user = client.users.get(varTools.transf(values.user, bridge.variables))
        }

        let userData = undefined;

        try {
            userData =  storedData.users[user.id][varTools.transf(values.dataName, bridge.variables)];
        } catch (error) {
            userData = ''
            storedData.users[user.id] = {}
            bridge.data.IO.write(storedData)
        }

        bridge.variables[varTools.transf(values.storeAs, bridge.variables)] = userData
    }
}