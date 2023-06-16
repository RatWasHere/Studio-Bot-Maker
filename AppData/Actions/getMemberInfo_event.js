module.exports = {
    data: {"name": "Get Member Info", "storeAs": "", "toGet":"Member Nickname", "memberVariable":"", "memberChoice":"Message Author"},
    UI: {"compatibleWith": ["Event"], "text1":"Get Member Info", "sepbar2":"sepber","btext33333333*":"Member Variable", "inputmemberVariable":"memberVariable", "sepbarbutton":"", "btextwhatto":"Get", "menuBar2":{"choices":["Member Nickname", "Member Guild", "Member ID", "Member Name", "Member Profile Picture (URL)", ], storeAs:"toGet"}, "sepbarbtext":"","btext566": "Store As", "input666!*":"storeAs", previewName: "Get", preview: "toGet"},
    run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        var user;
            user = message.member
        const guild = client.guilds.cache.get(varTools.transf(tempVars[uID][values.memberVariable].guildId, uID, tempVars));
        user = guild.members.cache.get(varTools.transf(tempVars[uID][values.memberVariable].userId, uID, tempVars));
    switch(values.toGet) {
            case 'Member Nickname':
                tempVars[uID][values.storeAs] = user.nickname
            break
            case 'Member Name':
                tempVars[uID][values.storeAs] = user.user.username
            break
            case 'Member Discriminator':
                tempVars[uID][values.storeAs] = client.users.cache.get(varTools.transf(user.userId, uID, tempVars)).discriminator
            break 
            case 'Member Profile Picture (URL)': 
                tempVars[uID][values.storeAs] = user.displayAvatarURL()
            break
            case 'Member Guild': 
            tempVars[uID][values.storeAs] = user.guild
        break
        case 'Member ID':
            tempVars[uID][values.storeAs] = user.user.id
        break
        } 
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

    }
}
