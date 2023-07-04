module.exports = {
    data: {"name":"Remove Role", "storeAs":"", "removeFrom":"Command Author", "reason":"", "member":"", "roleFrom": "Variable*", "role": ""},
    UI: {"compatibleWith":["Text", "Slash"], 
    "text":"Remove Role", "sepbar":"", 
    "btext":"Get Role Via",
    "menuBar": {choices: ["Role ID*", "Variable*"], storeAs: "roleFrom", extraField: "role"},

    "sepbar0":"",
    
    "btext0":"Get Member To Remove Role From Via",
    "menuBar0":{"choices":["Command Author", "Member*", "Member ID*"], storeAs: "removeFrom", extraField:"member"}, 

    "sepbar1":"",

    "btext1":"Reason",
    "input":"reason",

    "preview":"role", "previewName":"Via",
    "variableSettings":{
        "member": {
            "Member*": "direct", 
            "Member ID*": "indirect"
        },
        "role": {
            "Variable*": "direct", 
            "Role ID*": "indirect"
        }
    }
},

    run(values, message, uID, fs, client, actionContextBridge) { 
    let varTools = require(`../Toolkit/variableTools.js`);
    var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'));

    let guild = actionContextBridge.guild;

    let role;
    if (values.roleFrom == 'Variable*') {
        guild = client.guilds.get(tempVars[uID][varTools.transf(values.role, uID, tempVars)].guildID)
        role = guild.roles.get(tempVars[uID][varTools.transf(values.role, uID, tempVars)].id).id;
    }
    if (values.roleFrom == 'Role ID*') {
        role = guild.roles.get(varTools.transf(values.role, uID, tempVariables)).id;
    }

    var member;
    if (values.removeFrom == 'Command Author') {
        member = guild.getMember(message.member.id)
    } 
    if (values.removeFrom == 'Member*') {
        member = guild.getMember(tempVars[uID][varTools.transf(values.member, uID, tempVars)].id)
    }
    if (values.removeFrom == 'Member ID*') {
        member = guild.getMember(varTools.transf(values.member, uID, tempVars))
    }

    member.removeRole(role, varTools.transf(values.reason, uID, tempVars));
    }
}