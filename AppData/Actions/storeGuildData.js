module.exports = {
    data: {"name":"Store Guild Data", 
    "dataName":"",
    "dataValue": "",
    "guildFrom":"Command Author",
    "guild":""},
     
    UI: {"compatibleWith":["Any"],

    "text":"Store Guild Data", 
    
    "sepbar":"", 

    "btext":"Get Guild Via",
    "menuBar":{"choices":["Command Guild", "ID*", "Variable*"], storeAs:"guildFrom", extraField:"guild"},

    "sepbar*":"",  

    "btext0":"Data Name", 
    "input*":"dataName",

    "sepbar0":"",

    "btext1":"Data Value", 
    "input0*":"dataValue",

    "variableSettings":{
        "guild": {
            "Variable*": "direct", 
            "Command Author": "novars"
        }
    }
    },
    subtitle: "Guild: $[guildFrom]$ - Data Name: $[dataName]$ - Store: $[dataValue]$",
   async run(values, message, client, bridge) { 
        let varTools = require(`../Toolkit/variableTools.js`)

        var storedData = bridge.data.IO.get()

        if (values.guildFrom == 'Command Guild') {
            guild = message.guild
        } 
        if (values.guildFrom == 'Variable*') {
            guild = bridge.variables[varTools.transf(values.guild, bridge.variables)]
        }
        if (values.guildFrom == 'ID*') {
            guild = client.guilds.get(varTools.transf(values.guild, bridge.variables))
        }

        if (!storedData.guilds[guild.id]) {
            storedData.guilds[guild.id] = {}
        }

        storedData.guilds[guild.id][varTools.transf(values.dataName, bridge.variables)] = varTools.transf(values.dataValue, bridge.variables) 

        bridge.data.IO.write(storedData)
    }
}