module.exports = {
    data: {"messageContent": "", "button": "Variable*", "name": "Timeout Member", "ExtraData": "", "sendTo":"", "ButtonRow":"", "ActionRow":"", "embedVar":"", "guild":"Message Guild", "guildField":"", "reason":"", "duration":"Minute(s)*", "howMuch":""},
    UI: {"compatibleWith": ["Text", "Slash"], "text": "Timeout Member","sepbarEmbVar":"", "btextmember":"Member", "menuBar1": {"choices": ["Message Author", "Variable*"], storeAs: "button", extraField: "ExtraData"}, "sepbarmenus":"sepbar", "btextmenus":"Guild", "menuBar2":{"choices": ["Message Guild", "Variable*"], storeAs: "guild", extraField: "guildField"}, "sepbarguildidk":"","btextdurationtime": "Duration" ,"menuBarduration":{"choices": ["Day(s)*", "Hour(s)*", "Minute(s)*", "Second(s)*"], "storeAs":"duration", "extraField":"howMuch"} ,"sepbarguilddk":"","btextreason":"Reason", "inputreason":"reason", preview: "button", previewName: "Member"},
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
        let duration;
        switch (values.duration) {
            case 'Minute(s)*':
                duration = parseFloat(values.howMuch) * 60 * 1000 
                break
                case 'Second(s)*':
                    duration = parseFloat(values.howMuch) * 1000 
                    break
                    case 'Hour(s)*':
                        duration = parseFloat(values.howMuch) * 60 * 60 * 1000 
                        break
                        case 'Day(s)*':
                            duration = parseFloat(values.howMuch) * 60 * 60 * 24 * 1000 
                            break
        }

        if (values.reason == '') {
            member.timeout(duration)
        } else {
            member.timeout(duration, varTools.transf(values.reason, uID, tempVars))
        }
    

    }
}
