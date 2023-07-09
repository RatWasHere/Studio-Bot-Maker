module.exports = {
    data: {"messageContent": "", "memberFrom": "Variable*", "name": "Ban Member", 
    "memberVariable": "",
    "guild":"Variable*", "guildField":"", "reason":""},
    UI: {"compatibleWith": ["DM", "Event"],

     "text": "Ban Member", "sepbar":"",

      "btext":"Get Member Via",
       "menuBar": {"choices": ["Variable*", "Member ID*"], storeAs: "memberFrom", extraField: "memberVariable"}, 

       "sepbar1":"sepbar",

        "btext1":"Get Guild From", "menuBar1":{"choices": ["Variable*", "Guild ID*"],
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
    run(values, message, uID, fs, client, runner, bridge) {
        let varTools = require(`../Toolkit/variableTools.js`);

        let guild;
        if (values.guild == 'Variable*') {
            guild = client.guilds.get(bridge.variables[varTools.transf(values.guildField, bridge.variables)].id)
        }
        if (values.guild == 'Guild ID*') {
            guild = client.guilds.get(varTools.transf(values.guildField, bridge.variables))
        }

        let member;
        if (values.memberFrom == 'Command Author') {
            member = guild.getMember(message.author.id)
        } 
        if (values.memberFrom == 'Variable*') {
            member = guild.getMember(bridge.variables[varTools.transf(values.memberVariable, bridge.variables)].id)
        }
        if (values.memberFrom == 'Member ID*') {
            member = guild.getMember(varTools.transf(values.memberVariable, bridge.variables))
        }

        if (values.reason == '') {
            member.ban()
        } else {
            member.ban({reason: varTools.transf(values.reason, bridge.variables)})
        }
    }
}
