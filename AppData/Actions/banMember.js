module.exports = {
    data: {"messageContent": "", "memberFrom": "Variable*", "name": "Ban Member", 
    "memberVariable": "",
    "guild":"Message Guild", "guildField":"", "reason":""},
    UI: {"compatibleWith": ["Text", "Slash"],

     "text": "Ban Member", "sepbar":"",

      "btext":"Member",
       "menuBar": {"choices": ["Message Author", "Variable*"], storeAs: "memberFrom", extraField: "memberVariable"}, 

       "sepbar1":"sepbar",

        "btext1":"Guild", "menuBar1":{"choices": ["Message Guild", "Variable*"],
        storeAs: "guild", extraField: "guildField"}, 

        "sepbar2":"", "btext2":"Reason", 
        "input":"reason", 
        preview: "memberFrom", previewName: "Ban",
        "variableSettings": {
            "memberVariable": {
                "Variable*":"direct"
            },
            "guildField": {
                "Variable*": "direct"
            }
        }

},
    run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        let guild;

        if (values.guild == 'Message Guild') {
            guild = message.guild
        } else {
            guild = client.guilds.cache.get(tempVars[uID][varTools.transf(values.guildField, uID, tempVars)].id)
        }
        let member;
        if (values.memberFrom == 'Message Author') {
            member = guild.members.cache.get(message.author.id)
        } else {
            member = guild.members.cache.get(tempVars[uID][varTools.transf(values.memberVariable, uID, tempVars)].userId)
        }   

        if (values.reason == '') {
            member.ban()
        } else {
            member.ban({reason: varTools.transf(values.reason, uID, tempVars)})
        }
    

    }
}
