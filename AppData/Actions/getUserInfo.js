module.exports = {
    data: {"name": "Get User Info","desc": "", "varble": "", "vrble":"", "vrb":"", "button":"Command Message", "ExtraData":"", "datainfo":"User ID", "memberVariable":"", "memberChoice":"Message Author"},
    UI: {"compatibleWith": ["Text", "Slash"], "text1":"Get User Info", "sepbar2":"sepber","btext33333333":"Get User From", "menuBar1":{"choices": ["Message Author", "Variable*"], storeAs:"memberChoice", extraField:"memberVariable"}, "sepbarbutton":"", "btextwhatto":"Get", "menuBar2":{"choices":["User Name", "User ID", "User Profile Picture (URL)"], storeAs:"datainfo"}, "sepbarbtext":"","btext566": "Store As", "input666!*":"varble",
    "variableSettings": {
        "memberVariable": {
            "Message Author": "novars",
            "Variable*": "direct"
        }
    },
    previewName: "Get", preview: "datainfo"},
    async run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        let user = message.user;
        if (values.memberChoice == 'Message Author') {
            null
        } else {
            user = client.users.cache.get(varTools.transf(tempVars[uID][values.memberVariable].id, uID, tempVars));
        }
    switch(values.datainfo) {
            case 'User Name':
                tempVars[uID][values.varble] = user.username
            break
            case 'User Discriminator':
                tempVars[uID][values.varble] = user.discriminator
            break 
            case 'User Profile Picture (URL)': 
                tempVars[uID][values.varble] = user.displayAvatarURL()
            break
            case 'User ID':
                tempVars[uID][values.varble] = user.id
            break
        } 
        await fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
    }
}
