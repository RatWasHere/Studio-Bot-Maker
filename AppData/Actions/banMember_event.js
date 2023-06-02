module.exports = {
    data: {"messageContent": "", "memberFrom": "Variable*", "name": "Ban Member", 
    "memberVariable": "",
    "guild":"Message Guild", "guildVariable":"", "reason":""},
    UI: {"compatibleWith": ["Event"],

     "text": "Ban Member", "sepbar":"",

      "btext":"Member Variable",
       "input_direct*": "memberVariable", 

       "sepbar1":"sepbar",

        "btext1":"Guild Variable", "input1_direct*":"guildVariable",
        "sepbar2":"", "btext2":"Reason", 
        "input":"reason", 
        preview: "memberFrom", previewName: "Ban",
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
            member.ban()
        } else {
            member.ban({reason: varTools.transf(values.reason, uID, tempVars)})
        }
    }
}
