module.exports = {
    data: {"name": "Check If Member Has Role",
    "roleVariable":"",
    "runIfTrue": {}, "runIfFalse": {},
    "memberVariable":"", "memberChoice":"Command Author"},
    UI: {"compatibleWith": ["Text", "Slash"], 
    
    "text":"Check If Member Has Role",
    "sepbar":"sepber", 
    "btext":"Get Member From",
    "menuBar":{"choices": ["Command Author", "Variable*", "Member ID*"], storeAs:"memberChoice", extraField:"memberVariable"},
    "sepbar0":"",
    "btext0":"Role Variable", 
    "input_direct":"roleVariable",

    "sepbar1": "",

    "btext1":"If Member Has Role, Run",
    "actions": "runIfTrue",

    "sepbar2": "",

    "btext2":"If Member Doesn't Have Role, Run",
    "actions0": "runIfFalse",


    "variableSettings": {
        "memberVariable": {
            "Variable*": "direct"
        }
    },

    previewName: "Role Variable", preview: "roleVariable",
    },

    async run(values, message, uID, fs, client, actionRunner, actionContextBridge) {
        let varTools = require(`../Toolkit/variableTools.js`);
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'));
        let guild = actionContextBridge.guild;
        var user = message.member
        if (values.memberChoice == 'Variable*') {
            user = guild.getMember(varTools.transf(tempVars[uID][values.memberVariable].id, uID, tempVars));
        }
        if (values.memberChoice == 'Member ID*') {
            user = guild.getMember(varTools.transf(values.memberVariable, uID, tempVars));
        }

        let hasRole = false;
        if (member.roles.has(tempVars[uID][varTools.transf(values.roleVariable)].id)) {
            hasRole = true
        }

        if (hasRole == true) {
            actionRunner(values.runIfTrue, message, client, tempVars[uID], true);
        } else {
            actionRunner(values.runIfFalse, message, client, tempVars[uID], true);
        }
    }
}
