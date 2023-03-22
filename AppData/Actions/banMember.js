module.exports = {
    data: {"messageContent": "", "button": "Variable*", "name": "Ban Member", "ExtraData": "", "sendTo":"", "ButtonRow":"", "ActionRow":"", "embedVar":"", "guild":"Message Guild", "guildField":"", "reason":""},
    UI: {"compatibleWith": ["Text", "Slash"], "text": "Ban Member","sepbarEmbVar":"", "btextmember":"Member", "menuBar1": {"choices": ["Message Author", "Variable*"], storeAs: "button", extraField: "ExtraData"}, "sepbarmenus":"sepbar", "btextmenus":"Guild", "menuBar2":{"choices": ["Message Guild", "Variable*"], storeAs: "guild", extraField: "guildField"}, "sepbarguildidk":"", "btextreason":"Reason", "inputreason":"reason", preview: "button", previewName: "Ban"},
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
        if (values.button == 'Message Author') {
            member = guild.members.cache.get(message.author.id)
        } else {
            member = guild.members.cache.get(tempVars[uID][varTools.transf(values.ExtraData, uID, tempVars)].id)
        }   

        if (values.reason == '') {
            member.ban()
        } else {
            member.ban(varTools.transf(values.reason, uID, tempVars))
        }
    

    }
}
