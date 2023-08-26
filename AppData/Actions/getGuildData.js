module.exports = {
    data: {"name":"Get Guild Data", 
    "dataName":"",
    "storeAs":"",
    "guildFrom":"Command Author",
    "guild":""},
     
    UI: {"compatibleWith":["Any"],

    "text":"Get Guild Data", 
    
    "sepbar":"", 

    "btext":"Get Guild Via",
    "menuBar":{"choices":["Command Guild", "ID*", "Variable*"], storeAs:"guildFrom", extraField:"guild"},

    "sepbar1":"",  

    "btext0":"Data Name", 
    "input*":"dataName",

    "sepbar0":"",

    "btext1":"Store As", 
    "input!":"storeAs",

    "variableSettings":{
        "guild": {
            "Variable*": "direct", 
            "Command Author": "novars"
        }
    }
    },
    subtitle: "Guild: $[guildFrom]$ - Data Name: $[dataName]$ - Store As: $[storeAs]$",
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

        let guildData = undefined;

        try {
            guildData =  storedData.guilds[guild.id][varTools.transf(values.dataName, bridge.variables)];
        } catch (error) {
            guildData = ''
            storedData.guilds[guild.id] = {}
            bridge.data.IO.write(storedData)
        }

        bridge.variables[varTools.transf(values.storeAs, bridge.variables)] = guildData
    }
}