module.exports = {
    data: {"name": "Get User Info","desc": "", "varble": "", "vrble":"", "vrb":"", "button":"Command Message", "ExtraData":"", "datainfo":"User ID", "memberVariable":"", "memberChoice":"Message Author"},
    UI: {"compatibleWith": ["Event"], "text1":"Get User Info", "sepbar2":"sepber","btext33333333*":"User Variable", "inputmemberVariable_direct*":"memberVariable", "sepbarbutton":"", "btextwhatto":"Get", "menuBar2":{"choices":["User Name", "User ID", "User Profile Picture (URL)"], storeAs:"datainfo"}, "sepbarbtext":"","btext566": "Store As", "input666!*":"varble", previewName: "Get", preview: "datainfo"},
    async run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        var user;
            user = message.author
        const guild = client.guilds.cache.get(varTools.transf(tempVars[uID][values.memberVariable].guildId, uID, tempVars));
        user = guild.members.cache.get(varTools.transf(tempVars[uID][values.memberVariable].userId, uID, tempVars));
    switch(values.datainfo) {
        case 'User Name':
            tempVars[uID][values.varble] = user.username
        break
        case 'User Discriminator':
            tempVars[uID][values.varble] = user.discriminator
        break 
        case 'User Profile Picture (URL)': 
            tempVars[uID][values.varble] = user.avatarURL()
        break
        case 'User ID':
            tempVars[uID][values.varble] = user.id
        break
        } 
        await fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

    }
}
// message.guild.members.cache.get(userId)