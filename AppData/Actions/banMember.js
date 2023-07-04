module.exports = {
    data: {"messageContent": "", "memberFrom": "Variable*", "name": "Ban Member", "memberVariable": "", "reason":""},
    UI: {"compatibleWith": ["Text", "Slash"],

     "text": "Ban Member", "sepbar":"",

      "btext":"Get Member Via",
       "menuBar": {"choices": ["Command Author", "Variable*", "Member ID*"], storeAs: "memberFrom", extraField: "memberVariable"}, 

       "sepbar1":"sepbar",

        "sepbar2":"", "btext2":"Reason", 
        "input":"reason", 
        preview: "memberFrom", previewName: "Ban",
        "variableSettings": {
            "memberVariable": {
                "Variable*":"direct"
            }
        }

},
    run(values, message, uID, fs, client, actionContextBridge) {
        let varTools = require(`../Toolkit/variableTools.js`);
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'));

        let guild = actionContextBridge.guild;
        let member;
        if (values.memberFrom == 'Command Author') {
            member = guild.getMember(message.author.id)
        } 
        if (values.memberFrom == 'Variable*') {
            member = guild.getMember(tempVars[uID][varTools.transf(values.memberVariable, uID, tempVars)].id)
        }
        if (values.memberFrom == 'Member ID*') {
            member = guild.getMember(varTools.transf(values.memberVariable, uID, tempVars))
        }

        if (values.reason == '') {
            member.ban()
        } else {
            member.ban({reason: varTools.transf(values.reason, uID, tempVars)})
        }
    }
}
