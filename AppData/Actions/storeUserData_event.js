module.exports = {
    data: {"name":"Store User Data", 
    "dataName":"",
    "dataValue": "",
    "userFrom":"Command Author",
    "user":""},
     
    UI: {"compatibleWith":["Event"],

    "text":"Store User Data", 
    
    "sepbar":"", 

    "btext":"Get User Via",
    "menuBar":{"choices":["ID*", "Variable*"], storeAs:"userFrom", extraField:"user"},

    "sepbar":"",  

    "btext0":"Data Name", 
    "input*":"dataName",

    "sepbar0":"",

    "btext1":"Data Value", 
    "input0*":"dataValue",

    "variableSettings":{
        "user": {
            "Variable*": "direct"
        }
    }
    },
    subtitle: "User: $[userFrom]$ - Data Name: $[dataName]$ - Store: $[dataValue]$",
   async run(values, message, client, bridge) { 
        let varTools = require(`../Toolkit/variableTools.js`)

        var storedData = bridge.data.IO.get()

        if (values.userFrom == 'Variable*') {
            user = bridge.variables[varTools.transf(values.user, bridge.variables)]
        }
        if (values.userFrom == 'ID*') {
            user = client.users.get(varTools.transf(values.user, bridge.variables))
        }

        if (!storedData.users[user.id]) {
            storedData.users[user.id] = {}
        }

        storedData.users[user.id][varTools.transf(values.dataName, bridge.variables)] = varTools.transf(values.dataValue, bridge.variables) 

        bridge.data.IO.write(storedData)
    }
}