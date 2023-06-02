module.exports = {
    data: {"name": "Check If Member Has Role",
    "roleVariable":"",
    "whatToRun": "Nothing", "whatNotToRun": "End Action Array", "whatTo": "", "whatNot": "", "memberVariable":"", "memberChoice":"Message Author"},
    UI: {"compatibleWith": ["Text", "Slash"], 
    
    "text1":"Check If Member Has Role",
     "sepbar2":"sepber", 
     "btext33333333":"Get Member From",
      "menuBar1":{"choices": ["Message Author", "Variable*"], storeAs:"memberChoice", extraField:"memberVariable"},
        "sepbarbutton":"",
         "btextwhatto":"Role Variable", 
            "input_direct":"roleVariable",
         "sepbarbutton2132": "",


        "btextwhatToRun":"If Member Has Role",
          "menuBarwhattoddo": {
            choices: ["End Action Array", "Run Action Group*", "Nothing"],
            storeAs: "whatToRun",
            extraField: "whatTo"
          },

          "sepbarbutton21332": "",

          "btextwhattoddo":"If Member Doesn't Have Role",
          "menuBarwhadfDttodo": {
            choices: ["End Action Array", "Run Action Group*", "Nothing"],
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
        previewName: "Role Variable", preview: "roleVariable",
        "variableSettings": {
            "whatNot": {
                "Run Action Group*": "actionGroup"
            },
            "whatTo": {
                "Run Action Group*": "actionGroup"
            }
        }
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
        let hasRole = false

        if (member.roles.cache.has(tempVars[uID][varTools.transf(values.roleVariable)].id)) {
            hasRole = true
        }
    if (hasRole == true) {
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
