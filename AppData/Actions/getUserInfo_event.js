module.exports = {
    data: {"name": "Get User Info", "storeAs": "", "get":"User ID", "user":"", "userFrom":"User ID*"},
    UI: {"compatibleWith": ["Event"],
    "text":"Get User Info",

    "sepbar":"",

    "btext":"Get User Via",
    "menuBar":{"choices": ["Variable*", "User ID*"], storeAs:"userFrom", extraField:"user"}, 

    "sepbar1":"",
    
    "btext1":"Get",
    "menuBar0":{"choices":["User Name", "User ID", "User Display Name", "User Profile Picture (URL)", "User Discriminator", "User Accent Color"], storeAs:"get"}, 

    "sepbar2":"",
    
    "btext2": "Store As", 
    "input!*":"storeAs",

    "variableSettings": {
        "user": {
            "Variable*": "direct"
        }
    },
    previewName: "Get", preview: "get"},
    async run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        let user;
        if (values.userFrom == 'Variable*') {
            user = tempVars[uID][varTools.transf(values.user, uID, tempVars)];
        }
        if (values.userFrom == 'User ID*') {
            user = client.users.get(tempVars[uID][varTools.transf(values.user, uID, tempVars)])
        }
    switch(values.get) {
            case 'User Name':
                tempVars[uID][values.storeAs] = user.username
            break
            case 'User Discriminator':
                tempVars[uID][values.storeAs] = user.discriminator 
            break 
            case 'User Profile Picture (URL)': 
                tempVars[uID][values.storeAs] = user.avatarURL()
            break
            case 'User ID':
                tempVars[uID][values.storeAs] = user.id
            break
            case 'User Accent Color':
                tempVars[uID][values.storeAs] = user.accentColor || '-'
            break
            case 'User Display Name': 
                tempVars[uID][values.storeAs] = user.globalName || '-'
            break
        } 
        await fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
    }
}