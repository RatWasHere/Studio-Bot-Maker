module.exports = {
    data: {"messageContent": "", "memberFrom": "Variable*", "name": "Kick Member", 
    "memberVariable": "",
    "guild":"Message Guild", "guildVariable":"", "reason":""},
    UI: {"compatibleWith": ["Event"],

     "text": "Kick Member", "sepbar":"",

      "btext":"Member Variable",
       "input_direct*": "memberVariable", 

       "sepbar1":"sepbar",

        "btext1":"Guild Variable", "input1_direct*":"guildVariable",
        "sepbar2":"", "btext2":"Reason", 
        "input":"reason", 
        preview: "memberFrom", previewName: "Kick",
        "variableSettings": {
            "memberVariable": {
                "Variable*":"direct"
            },
            "guildVariable": {
                "Variable*": "direct"
            }
        }

},
    run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        let guild = client.guilds.cache.get(tempVars[uID][varTools.transf(values.guildVariable, uID, tempVars)].id)
        let member = guild.members.cache.get(tempVars[uID][varTools.transf(values.memberVariable, uID, tempVars)].userId)


        if (values.reason == '') {
            member.kick()
        } else {
            member.kick({reason: varTools.transf(values.reason, uID, tempVars)})
        }
    }
}
