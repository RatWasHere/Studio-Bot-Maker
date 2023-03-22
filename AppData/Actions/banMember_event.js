module.exports = {
    data: {"messageContent": "", "button": "Variable*", "name": "Ban Member", "ExtraData": "", "sendTo":"", "ButtonRow":"", "ActionRow":"", "embedVar":"", "guild":"Message Guild", "guildField":"", "reason":""},
    UI: {"compatibleWith": ["Event"], "text": "Ban Member","sepbarEmbVar":"", "btextmember":"Member Variable", "input13*":"ExtraData", "sepbarmenus":"sepbar", "btextmenus":"Guild Variable", "inputguild*":"guildfield", "sepbarguildidk":"", "btextreason":"Reason", "inputreason":"reason", preview: "ExtraField", previewName: "Ban"},
    run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        let guild;
            guild = client.guilds.cache.get(tempVars[uID][varTools.transf(values.guildField, uID, tempVars)].id)
        let member;
            member = guild.members.cache.get(tempVars[uID][varTools.transf(values.ExtraData, uID, tempVars)].id)

        if (values.reason == '') {
            member.ban()
        } else {
            member.ban(varTools.transf(values.reason, uID, tempVars))
        }
    

    }
}
