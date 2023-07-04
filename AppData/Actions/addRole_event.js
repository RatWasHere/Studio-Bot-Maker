module.exports = {
    data: {"name":"Add Role", "storeAs":"", "addTo":"Command Author", "guildFrom":"Guild ID*", "guild":"", "reason":"", "member":"", "roleFrom": "Variable*", "role": ""},
    UI: {"compatibleWith":["Event", "DM"], 
    "text":"Add Role", "sepbar":"", 
    "btext":"Get Role Via",
    "menuBar": {choices: ["Role ID*", "Variable*"], storeAs: "roleFrom", extraField: "role"},

    "sepbar0":"",
    
    "btext0":"Get Member To Add Role To Via",
    "menuBar0":{"choices":["Member*", "Member ID*"], storeAs: "addTo", extraField:"member"}, 

    "sepbar1":"",
    
    "btext1":"Get Role Guild Via",
    "menuBar": {choices: ["Guild ID*", "Guild Variable*"], storeAs: "guildFrom", extraField: "guild"},

    "sepbar2":"",

    "btext2":"Reason",
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
        },
        "guild": {
            "Guild Variable*": "direct",
            "Guild ID*": "indirect"
        }
    }
},

    run(values, message, uID, fs, client, actionContextBridge) { 
    let varTools = require(`../Toolkit/variableTools.js`);
    var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'));

    let guild;
    if (values.guildFrom == "Variable*") {
        guild = client.guilds.get(tempVars[uID][varTools.transf(values.guild, uID, tempVars)].id)
    }
    if (values.guildFrom == "Guild ID*") {
        guild = client.guilds.get(varTools.transf(values.guild, uID, tempVars))
    }

    let role;
    if (values.roleFrom == 'Variable*') {
        guild = client.guilds.get(tempVars[uID][varTools.transf(values.role, uID, tempVars)].guildID)
        role = guild.roles.get(tempVars[uID][varTools.transf(values.role, uID, tempVars)].id).id;
    }
    if (values.roleFrom == 'Role ID*') {
        role = guild.roles.get(varTools.transf(values.role, uID, tempVariables)).id;
    }

    var member;
    if (values.addTo == 'Command Author') {
        member = guild.getMember(message.member.id)
    } 
    if (values.addTo == 'Member*') {
        member = guild.getMember(tempVars[uID][varTools.transf(values.member, uID, tempVars)].id)
    }
    if (values.addTo == 'Member ID*') {
        member = guild.getMember(varTools.transf(values.member, uID, tempVars))
    }

    member.addRole(role, varTools.transf(values.reason, uID, tempVars));
    }
}