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

    async run(values, message, uID, fs, client, actionRunner, bridge) {
        let varTools = require(`../Toolkit/variableTools.js`);
        
        let guild = bridge.guild;
        var user = message.member
        if (values.memberChoice == 'Variable*') {
            user = guild.getMember(varTools.transf(bridge.variables[values.memberVariable].id, bridge.variables));
        }
        if (values.memberChoice == 'Member ID*') {
            user = guild.getMember(varTools.transf(values.memberVariable, bridge.variables));
        }

        let hasRole = false;
        if (member.roles.has(bridge.variables[varTools.transf(values.roleVariable)].id)) {
            hasRole = true
        }

        if (hasRole == true) {
            actionRunner(values.runIfTrue, message, client, bridge.variables, true);
        } else {
            actionRunner(values.runIfFalse, message, client, bridge.variables, true);
        }
    }
}
