module.exports = {
    data: {"name": "Get Member Info", "storeAs": "", "get":"Member Nickname", "member":"", "memberFrom":"Command Author"},
    UI: {"compatibleWith": ["Text", "Slash"],
    "text":"Get Member Info", 

    "sepbar":"",

    "btext":"Get Member Via",
    "menuBar":{"choices": ["Command Author", "Variable*", "Member ID*"], storeAs:"memberFrom", extraField:"member"},
    "sepbar0":"",
    "btext0":"Get",
    "menuBar0":{"choices":["Member Nickname", "Member Guild", "Member ID", "Member Name", "Member Profile Picture (URL)", "Timeout End Timestamp"], storeAs:"get"},
    "sepbar1":"",
    "btext1": "Store As",
    "input!*":"storeAs",

    "variableSettings": {
        "member": {
            "Command Author": "novars",
            "Variable*": "direct"
        }
    },

    previewName: "Get", preview: "get",
},
    run(values, message, uID, fs, client, actionContextBridge) {
    let varTools = require(`../Toolkit/variableTools.js`)
    var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
    let guild = actionContextBridge.guild;

    var member;
    if (values.memberFrom == 'Command Author') {
        member = message.member
    } 
    if (values.memberFrom == 'Variable*') {
        member = tempVars[uID][varTools.transf(values.member, uID, tempVars)];
    }
    if (values.memberFrom == 'Member ID*') {
        member = guild.getMember(varTools.transf(values.member, uID, tempVars));
    }

    switch(values.get) {
        case 'Member Nickname':
            tempVars[uID][values.storeAs] = member.nickname || member.username;
        break

        case 'Member Name':
            tempVars[uID][values.storeAs] = member.username
        break

        case 'Member Profile Picture (URL)': 
            tempVars[uID][values.storeAs] = member.avatarURL()
        break

        case 'Member Guild': 
            tempVars[uID][values.storeAs] = member.guild
        break

        case 'Member ID':
            tempVars[uID][values.storeAs] = member.id
        break

        case 'Timeout End Timestamp':
            tempVars[uID][values.storeAs] = Date.parse(member.communicationDisabledUntil) || '-'
        break
    }
    
    fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
    }
}