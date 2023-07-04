module.exports = {
    data: {"messageContent": "", "button": "Variable*", "name": "Set Member Nickname", "ExtraData": "", "sendTo":"", "ButtonRow":"", "ActionRow":"", "embedVar":"", "guild":"Message Guild", "guildField":"", "reason":""},
    UI: {"compatibleWith": ["Text", "Slash"],
     "text": "Set Member Nickname","sepbarEmbVar":"",
      "btextmember":"Member",
       "menuBar1": {"choices": ["Message Author", "Variable*"],
        storeAs: "button", extraField: "ExtraData"},
         "sepbarmenus":"sepbar", "btextmenus":"Guild",
          "menuBar2":{"choices": ["Message Guild", "Variable*"], 
          storeAs: "guild", extraField: "guildField"},
           "sepbarguildidk":"", "btextreason":"New Nickname", 
           "inputreason":"reason", 
           preview: "reason", previewName: "Nickname",
           "variableSettings":{
            "guildField": {
                "Variable*": "direct", 
                "Message Guild": "novars"
            },
            "ExtraData": {
                "Message Author": "novars",
                "Variable*": "direct"
            }
        }
        },
    run(values, message, uID, fs, client, actionContextBridge) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        let guild = actionContextBridge.guild;
        
        let member;
        if (values.button == 'Message Author') {
            member = guild.getMember(message.author.id)
        } else {
            member = guild.getMember(tempVars[uID][varTools.transf(values.ExtraData, uID, tempVars)].id)
        }   

        if (values.reason == '') {
            member.setNickname('')
        } else {
            member.setNickname(varTools.transf(values.reason, uID, tempVars))
        }
    }
}
