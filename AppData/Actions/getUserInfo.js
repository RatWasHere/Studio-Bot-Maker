module.exports = {
    data: {"name": "Get User Info", "storeAs": "", "get":"User ID", "user":"", "userFrom":"Command Author"},
    UI: {"compatibleWith": ["Text", "Slash", "DM"],
    "text":"Get User Info",

    "sepbar":"",

    "btext":"Get User Via",
    "menuBar":{"choices": ["Command Author", "Variable*", "User ID*"], storeAs:"userFrom", extraField:"user"}, 

    "sepbar1":"",
    
    "btext1":"Get",
    "menuBar0":{"choices":["User Name", "User ID", "User Display Name", "User Profile Picture (URL)", "User Discriminator", "User Accent Color"], storeAs:"get"}, 

    "sepbar2":"",
    
    "btext2": "Store As", 
    "input!*":"storeAs",

    "variableSettings": {
        "user": {
            "Command Author": "novars",
            "Variable*": "direct"
        }
    },
    previewName: "Get", preview: "get"},
    async run(values, message, uID, fs, client, runner, bridge)  {
        let varTools = require(`../Toolkit/variableTools.js`);
        let user;
        if (values.userFrom == 'Command Author') {
            user = message.author;
        } 
        if (values.userFrom == 'Variable*') {
            user = bridge.variables[varTools.transf(values.user, bridge.variables)];
        }
        if (values.userFrom == 'User ID*') {
            user = client.users.get(varTools.transf(values.user, bridge.variables));
        }
    switch(values.get) {
            case 'User Name':
                bridge.variables[values.storeAs] = user.username
            break
            
            case 'User Discriminator':
                bridge.variables[values.storeAs] = user.discriminator 
            break 

            case 'User Profile Picture (URL)': 
                bridge.variables[values.storeAs] = user.avatarURL()
            break

            case 'User ID':
                bridge.variables[values.storeAs] = user.id
            break

            case 'User Accent Color':
                bridge.variables[values.storeAs] = user.accentColor || '-'
            break

            case 'User Display Name': 
                bridge.variables[values.storeAs] = user.globalName || '-'
            break
        }
    }
}
