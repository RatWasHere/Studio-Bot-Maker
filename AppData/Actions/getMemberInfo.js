module.exports = {
    data: {"name": "Get Member Info","desc": "", "varble": "", "vrble":"", "vrb":"", "button":"Command Message", "ExtraData":"", "datainfo":"Member Nickname", "memberVariable":"", "memberChoice":"Message Author"},
    UI: {"compatibleWith": ["Text", "Slash"], "text1":"Get Member Info", "sepbar2":"sepber","btext33333333":"Get Member From", "menuBar1":{"choices": ["Message Author", "Variable*"], storeAs:"memberChoice", extraField:"memberVariable"}, "sepbarbutton":"", "btextwhatto":"Get", "menuBar2":{"choices":["Member Nickname", "Member Name", "Member Discriminator", "Member Profile Picture (URL)"], storeAs:"datainfo"}, "sepbarbtext":"","btext566": "Store As", "input666":"varble", previewName: "Get", preview: "datainfo"},
    run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        var user;
        if (values.memberChoice == 'Message Author') {
            user = message.member
        } else {
        const guild = client.guilds.cache.get(varTools.transf(tempVars[uID][values.memberVariable].guildId, uID, tempVars));
        user = guild.members.cache.get(varTools.transf(tempVars[uID][values.memberVariable].userId, uID, tempVars));
    }
    switch(values.datainfo) {
            case 'Member Nickname':
                tempVars[uID][values.varble] = user.nickname
            break
            case 'Member Name':
                tempVars[uID][values.varble] = user.user.username
            break
            case 'Member Discriminator':
                tempVars[uID][values.varble] = client.users.cache.get(varTools.transf(user.userId, uID, tempVars)).discriminator
            break 
            case 'Member Profile Picture (URL)': 
                tempVars[uID][values.varble] = user.displayAvatarURL()
            break
        } 
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

    }
}
// message.guild.members.cache.get(userId)