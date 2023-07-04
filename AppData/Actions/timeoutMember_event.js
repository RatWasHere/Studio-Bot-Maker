module.exports = {
    data: {"button": "Variable*", 
    "name": "Timeout Member", "member": "", "guild":"", "memberFrom": "Member ID*", "guildFrom":"Guild ID*", "reason":"", "duration":"Minute(s)*", "howMuch":""},

    UI: {"compatibleWith": ["Event", "DM"],
    "text": "Timeout Member",

    "sepbar":"",

    "btext":"Get Member From",
    "menuBar": {"choices": ["Variable*", "Member ID*"], storeAs: "memberFrom", extraField: "member"},    
    
    "sepbar0":"",

    "btext0":"Get Guild From",
    "menuBar0": {choices: ["Guild ID*", "Variable*"], storeAs: "guildFrom", extraField: "guild"},

    "sepbarguildidk":"","btextdurationtime": "Duration" ,
    "menuBarduration":{"choices": ["Day(s)*", "Hour(s)*", "Minute(s)*", "Second(s)*"], "storeAs":"duration", "extraField":"howMuch"} ,"sepbarguilddk":"","btextreason":"Reason", 
    "inputreason":"reason", preview: "member", previewName: "Member Var",
    "variableSettings":{
        "howMuch": {
            "Day(s)*": "novars",
            "Hour(s)*": "novars",
            "Minute(s)*": "novars",
            "Second(s)": "novars"
        },
        "guild": {
            "Variable*": "direct",
            "Guild ID*": "indirect"
        }
    }
    },
    run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'));
        let guild;
        if (values.guildFrom == 'Variable*') {
            guild = tempVars[uID][varTools.transf(values.guild, uID, tempVars)]
        } 
        if (values.guildFrom == 'Guild ID*') {
            guild = client.guilds.get(varTools.transf(values.guild, uID, tempVars))
        }

        let member;
        if (values.memberFrom == 'Variable*') {
            guild.getMember(tempVars[uID][varTools.transf(values.guild, uID, tempVars)].id)
        } 
        if (values.guildFrom == 'Member ID*') {
            guild.getMember(varTools.transf(values.guild, uID, tempVars))
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
