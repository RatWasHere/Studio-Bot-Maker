module.exports = {
    data: {"name":"Delete Role", "roleVariable":"", "guild":"Command Guild", "storeAs":"", "guildVariable":""},
    UI: {"compatibleWith": ["Slash", "Text"], "text": "Delete Role","sepbar":"sbar", "preview":"roleVariable", 
    "btext4":"Guild", "previewName":"Variable",
    "menuBar": {choices: ["Command Guild", "Guild*"], storeAs: "guild", extraField:"guildVariable"}, 
    "sepbarrole01":"", 
    "btext1":"Role Variable", "input43_direct*":"roleVariable",
    "variableSettings":{
        "guildVariable": {
            "Guild*": "direct", 
            "Command Guild": "novars"
        }}
},
    run(values, message, uID, fs, client) {
        let guild;
        let varTools = require(`../Toolkit/variableTools.js`)

        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))

        if (values.guildAs == 'Command Guild') {
            guild = client.guilds.get(message.guild.id) 
        } else {
            guild = client.guilds.get(tempVars[uID][varTools.transf(values.guildVariable, uID, tempVars)])
        }
        let role = guild.roles.get(tempVars[uID][varTools.transf(values.roleVariable, uID, tempVars)]) 
        role.delete()
    }
}