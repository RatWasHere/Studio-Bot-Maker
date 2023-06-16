module.exports = {
    data: {"name": "Get User Info","desc": "", "storeAs": "", "toGet":"User ID", "memberVariable":"", "memberChoice":"Message Author"},
    UI: {"compatibleWith": ["Text", "Slash"],
     "text":"Get User Info", "sepbar":"","btext":"Get User From",
      "menuBar":{"choices": ["Message Author", "Variable*"], storeAs:"memberChoice", extraField:"memberVariable"}
      , "sepbar1":"", "btext1":"Get", "menuBar0":{"choices":["User Name", "User ID",
       "User Profile Picture (URL)"], storeAs:"toGet"}, "sepbar2":"","btext2": "Store As", 
       "input!*":"storeAs",
    "variableSettings": {
        "memberVariable": {
            "Message Author": "novars",
            "Variable*": "direct"
        }
    },
    previewName: "Get", preview: "toGet"},
    async run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        let user = message.author;
        if (values.memberChoice == 'Message Author') {
            null
        } else {
            user = client.users.cache.get(tempVars[uID][varTools.transf(values.memberVariable, uID, tempVars)].id, uID, tempVars);
        }
    switch(values.toGet) {
            case 'User Name':
                tempVars[uID][values.storeAs] = user.username
            break
            case 'User Discriminator':
                tempVars[uID][values.storeAs] = user.discriminator
            break 
            case 'User Profile Picture (URL)': 
                tempVars[uID][values.storeAs] = user.displayAvatarURL()
            break
            case 'User ID':
                tempVars[uID][values.storeAs] = user.id
            break
        } 
        await fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
    }
}
