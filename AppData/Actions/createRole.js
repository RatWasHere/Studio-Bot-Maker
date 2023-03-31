module.exports = {
    data: {"name":"Create Role", "roleName":"", "color":"#000000", "guild":"Command Guild",
    "button":"✕",
    "storeAs":"", "guildVariable":""},
    UI: {"compatibleWith": ["Slash", "Text"], "text": "Create Role","sepbar":"sbar", "preview":"roleName", 
    "btext4":"Guild", "previewName":"Guild",
     "menuBar": {choices: ["Command Guild", "Guild*"], storeAs: "guild", extraField:"guildVariable"}, 
    "sepbarrole01":"", 
    "btext1":"Role Name", "input43":"roleName",  
    "sepbarcolorname":"",
    "btextcolorname": "Role Color",
    "inputcolor":"color",
"sepbardisplayrole?":"",
    "btexthoist":"Display Role Separately?",
    "ButtonBar": {"buttons":["✓", "✕"]},
    "sepbarstoreas":"",
    "btextstoreas":"Store As",
    "inputstoreas":"storeAs"

},
    run(values, message, uID, fs, client) {
        let guild;
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))

        if (values.guildAs == 'Command Guild') {
            guild = client.guilds.cache.get(message.guild.id) 
        } else {
            guild = client.guilds.cache.get(tempVars[uID][varTools.transf(values.guildVariable, uID, tempVars)])
        }
        let hoist;
        if (values.button == '✕') {
            hoist = false;
        } else {
            hoist = true;
        }
        let role = {
            name: values.roleName,
            color: parseInt(values.color.replace("#", ""), 16),
            hoisted: hoist
        }
        guild.roles.create(roleOptions).then((role) => {
            if (values.storeAs != '') {


                tempVars[uID] = {
                    ...tempVars[uID], 
                    [values.storeAs]: role
                }


                fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

            } 
        })

    }
}