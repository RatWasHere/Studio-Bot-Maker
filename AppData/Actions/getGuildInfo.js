module.exports = {
    data: {"name": "Get Guild Info",
        "storeAs":"", 
     "toGet":"Guild Name", "guildVariable":"", "guildFrom":"Command Guild"},
    UI: {"compatibleWith": ["Text", "Slash"], "text":"Get Member Info", 
    "variableSettings": {
        "memberVariable": {
            "Message Author": "novars",
            "Variable*": "direct"
        }
    },
    
    "sepbar":"","btext":"Get Guild From", 

    "menuBar":{"choices": ["Command Guild", "Variable*"],
     storeAs:"guildFrom", extraField:"guildVariable"},
      "sepbar0":"", "btext0":"Get", 
      "menuBar0":{"choices":["Guild Name", "Guild Icon URL", "Guild Members List", "Guild Member Count", "Guild Owner"],
       storeAs:"toGet"}, 
       "sepbar1":"", "btext1": "Store As", 
       "input!*":"storeAs", previewName: "Get", preview: "toGet",

        "variableSettings": {
            "guildVariable": {
                "Variable*": "direct"
            }
        }
    },
    run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        var guild;
        if (values.guildFrom == 'Command Guild') {
            guild = message.guild
        } else {
         guild = client.guilds.get(varTools.transf(tempVars[uID][values.guildVariable].id, uID, tempVars));
    }
    switch(values.toGet) {
            case 'Guild Name':
                tempVars[uID][values.storeAs] = guild.name
            break
            case 'Guild Icon URL':
                tempVars[uID][values.storeAs] = guild.iconURL()
            break
            case 'Guild Members List':
                tempVars[uID][values.storeAs] = guild.members
            break
            case 'Guild Member Count':
                tempVars[uID][values.storeAs] = guild.members.map(m => m.id).length
            break
            case 'Guild Owner': 
                tempVars[uID][values.storeAs] = guild.fetchOwner()
            break
        } 
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

    }
}