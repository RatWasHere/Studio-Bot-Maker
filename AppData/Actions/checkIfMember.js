module.exports = {
    data: {"name": "Check Member Permission",
    "runIfTrue": {}, "runIfFalse": {},
    "permission":"Admin", "memberVariable":"", "memberChoice":"Command Author"},

    UI: {"compatibleWith": ["Text", "Slash"], 
    
    "text":"Check Member Permission",
    "sepbar":"", 
    "btext":"Get Member From",
    "menuBar":{"choices": ["Command Author", "Variable*", "Member ID*"], storeAs:"memberChoice", extraField:"memberVariable"},
    
    "sepbar0":"",

    "btext0":"Check Permission", 
    "menuBar0":{"choices":["Admin", "Booster", "Kick", "Ban", "Timeout", "Deafen", "Manage Messages", "Manage Roles", "Manage Channels"], storeAs:"permission"},

    "sepbar1": "",

    "btext1":"If Member Has Permission, Run:",
    "actions": "runIfTrue",

    "sepbar2": "",

    "btextwhattoddo":"If Member Doesn't Have Permission, Run:",
    "actions0": "runIfFalse",
    "variableSettings": {
    "whatNot": {
        "Run Action Group*": "actionGroup"
    },
    "whatTo": {
        "Run Action Group*": "actionGroup"
    },
    "memberVariable": {
        "Variable*": "direct"
    },
},

        "invisible":"",
        previewName: "Check For", preview: "permission",

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
        
        let hasPermission = false;

        switch(values.permission) {
            case 'Admin': 
                if (user.permissions.has("ADMINISTRATOR")) {
                    hasPermission = true
                }
            break

            case 'Booster': 
                if (user.premiumSince) {
                    hasPermission = true
                }
            break

            case 'Kick':
                if (user.permissions.has("KICK_MEMBERS")) {
                    hasPermission = true
                }
            break

            case 'Ban':
                if (user.permissions.has("BAN_MEMBERS")) {
                    hasPermission = true
                }
            break

            case 'Timeout':
                if (user.permissions.has("MODERATE_MEMBERS")) {
                    hasPermission = true
                }
            break

            case 'Deafen':
                if (user.permissions.has("DEAFEN_MEMBERS")) {
                    hasPermission = true
                }
            break
                
            case 'Manage Roles':
                if (user.permissions.has("MANAGE_ROLES")) {
                    hasPermission = true
                }
            break
                
            case 'Manage Channels':
                if (user.permissions.has("MANAGE_CHANNELS")) {
                    hasPermission = true
                }
            break

            case 'Manage Messages': 
            if (user.permissions.has("MANAGE_MESSAGES")) {
                hasPermission = true
            }
            break
        }

        if (hasPermission == true) {
            actionRunner(values.runIfTrue, message, client, tempVars[uID], true);
        } else {
            actionRunner(values.runIfFalse, message, client, tempVars[uID], true);
        }
}}
