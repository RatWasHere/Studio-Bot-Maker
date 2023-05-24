module.exports = {
    data: {"name": "Check Member Permission",
    "whatToRun": "Nothing", "whatNotToRun": "End Action Array", "whatTo": "", "whatNot": "", "permission":"Admin", "memberVariable":"", "memberChoice":"Message Author"},
    UI: {"compatibleWith": ["Text", "Slash"], 
    "variableSettings": {
        "memberVariable": {
            "Message Author": "novars",
            "Variable*": "direct"
        },
        "whatNot": {
            "Run Action Array*": "actionGroup"
        },
        "whatTo": {
            "Run Action Array*": "actionGroup"
        }
    },
    
    "text1":"Check Member Permission",
     "sepbar2":"sepber", 
     "btext33333333":"Get Member From",
      "menuBar1":{"choices": ["Message Author", "Variable*"], storeAs:"memberChoice", extraField:"memberVariable"},
        "sepbarbutton":"",
         "btextwhatto":"Check Permission", 
         "menuBar2":{"choices":["Admin", "Booster", "Kick", "Ban", "Timeout", "Deafen", "Manage Roles", "Manage Channels"], storeAs:"permission"},
       
         "sepbarbutton2132": "",


        "btextwhatToRun":"If Member Has Permission",
          "menuBarwhattoddo": {
            choices: ["End Action Array", "Run Action Array*", "Nothing"],
            storeAs: "whatToRun",
            extraField: "whatTo"
          },

          "sepbarbutton21332": "",

          "btextwhattoddo":"If Member Doesn't Have Permission",
          "menuBarwhadfDttodo": {
            choices: ["End Action Array", "Run Action Array*", "Nothing"],
            storeAs: "whatNotToRun",
            extraField: "whatNot"
          },
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
        previewName: "Check For", preview: "whatToRun",

        },

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
    let hasPermission = false

    switch(values.permission) {
        case 'Admin': 
            if (user.hasPermission('ADMINISTRATOR')) {
                hasPermission = true
            }
        break
        case 'Booster': 
            if (user.premiumSince) {
                hasPermission = true
            }
        break
        case 'Kick':
            if (user.hasPermission('KICK_MEMBERS')) {
                hasPermission = true
            }
        break
        case 'Ban':
            if (user.hasPermission('BAN_MEMBERS')) {
                hasPermission = true
            }
        break
        case 'Timeout':
            if (user.hasPermission('TIMEOUT_MEMBERS')) {
                hasPermission = true
            }
        break
        case 'Deafen':
            if (user.hasPermission('DEAFEN_MEMBERS')) {
                hasPermission = true
            }
            break
            
        case 'Manage Roles':
            if (user.hasPermission('MANAGE_ROLES')) {
                hasPermission = true
            }
            break
            
        case 'Manage Channels':
            if (user.hasPermission('MANAGE_CHANNELS')) {
                hasPermission = true
            }
            break

    }

    if (hasPermission == true) {
        if (values.whatToRun == 'Run Action Array*') {
                const interactionTools = require(`../Toolkit/interactionTools.js`)
                await interactionTools.runCommand(values.whatTo, runActionArray, uID, client, message, fs)
            }

            
        
                if (values.whatToRun == 'Nothing') {
                return
                }
            if (values.whatToRun == 'End Action Array') {
                tempVars[uID][`ACTIONARRAY_stop`] = true
                await fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

            }
    } else {

        if (values.whatNotToRun == 'Run Action Array*') {
            const interactionTools = require(`../Toolkit/interactionTools.js`)
            await interactionTools.runCommand(values.whatNot, runActionArray, uID, client, message, fs)
        }
        if (values.whatNotToRun == 'Nothing') {
            return
        }
        if (values.whatNotToRun == 'End Action Array') {
            tempVars[uID][`ACTIONARRAY_stop`] = true
            await fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

        }

}}}
