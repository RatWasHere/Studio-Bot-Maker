module.exports = {
    data: {"name": "Check Member Permission","desc": "", 
    "varble": "", "vrble":"", "vrb":"", 
    "ExtraData":"",
    "whatToDo": "Nothing",
    "whatNotToDo": "End Action Array",
    "whatTo": "",
    "whatNot": "",
     "datainfo":"Admin", 
     "memberVariable":"", "memberChoice":"Message Author"},
    UI: {"compatibleWith": ["Text", "Slash"], 
    "variableSettings": {
        "memberVariable": {
            "Message Author": "novars",
            "Variable*": "direct"
        },
        "whatNot": {
            "Run Action Array*": "indirect"
        },
        "whatTo": {
            "Run Action Array*": "indirect"
        }
    },
    
    "text1":"Check Member Permission",
     "sepbar2":"sepber", 
     "btext33333333":"Get Member From",
      "menuBar1":{"choices": ["Message Author", "Variable*"],
       storeAs:"memberChoice", extraField:"memberVariable"},
        "sepbarbutton":"",
         "btextwhatto":"Check Permission", 
         "menuBar2":{"choices":["Admin", "Booster", "Kick", "Ban", "Timeout", "Deafen", "Manage Roles", "Manage Channels"], storeAs:"datainfo"},
        "sepbarbutton2132": "",
        "btextwhattodo":"If Member Has Permission",
          "menuBarwhattoddo": {
            choices: ["End Action Array", "Run Action Array*", "Nothing"],
            storeAs: "whatToDo",
            extraData: "whatTo"
          },
          "sepbarbutton21332": "",
          "btextwhattoddo":"If Member Doesn't Have Permission",
          "menuBarwhadfttodo": {
            choices: ["End Action Array", "Run Action Array*", "Nothing"],
            storeAs: "whatNotToDo",
            extraData: "whatNot"
          },
           previewName: "Check For", preview: "datainfo"},

    async run(values, message, uID, fs, client, runActionArray) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        var user;
        if (values.memberChoice == 'Message Author') {
            user = message.member
        } else {
        const guild = client.guilds.cache.get(varTools.transf(tempVars[uID][values.memberVariable].guildId, uID, tempVars));
        user = guild.members.cache.get(varTools.transf(tempVars[uID][values.memberVariable].userId, uID, tempVars));
    }
    let isTrue = false
    switch(values.datainfo) {
        case 'Admin': 
            if (user.hasPermission('ADMINISTRATOR')) {
                isTrue = true
            }
        break
        case 'Booster': 
            if (user.premiumSince) {
                isTrue = true
            }
        break
        case 'Kick':
            if (user.hasPermission('KICK_MEMBERS')) {
                isTrue = true
            }
        break
        case 'Ban':
            if (user.hasPermission('BAN_MEMBERS')) {
                isTrue = true
            }
        break
        case 'Timeout':
            if (user.hasPermission('TIMEOUT_MEMBERS')) {
                isTrue = true
            }
        break
        case 'Deafen':
            if (user.hasPermission('DEAFEN_MEMBERS')) {
                isTrue = true
            }
            break
            
        case 'Manage Roles':
            if (user.hasPermission('MANAGE_ROLES')) {
                isTrue = true
            }
            break
            
        case 'Manage Channels':
            if (user.hasPermission('MANAGE_CHANNELS')) {
                isTrue = true
            }
            break

    }
    let data = JSON.parse(fs.readFileSync('./AppData/data.json'))
    if (isTrue == true) {
        if (values.whatToDo == 'Run Action Array*') {
        for (let command in data.commands) {
            if (data.commands[command].name == values.whatTo) {
                runActionArray(command, message, client, uID)
            }
            if (values.whatToDo == 'Nothing') {
                return
            }
            if (values.whatToDo == 'End Action Array') {
                tempVars[uID][`ACTIONARRAY_stop`] = true
                await fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

            }
            
        }
    }
} else {
        if (values.whatNotToDo == 'Run Action Array*') {
                for (let command in data.commands) {
                    if (data.commands[command].name == values.whatNot) {
                        runActionArray(command, message, client, uID)
                    }
            }
        }
        if (values.whatNotToDo == 'Nothing') {
            return
        }
        if (values.whatNotToDo == 'End Action Array') {
            tempVars[uID][`ACTIONARRAY_stop`] = true
            await fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

        }

}}}
