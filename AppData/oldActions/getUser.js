module.exports = {
    data: {"messageContent": "", "button": "Command Guild", "name": "Get User", "userFrom":"ID*", "memberValue":"", "storeAs":""},
    UI: {"compatibleWith": ["Text", "Slash"], "text": "Get User", "sepbar":"", "btext": "Get User Via", "menuBar": {choices: ["ID*", "Command Author"], storeAs: "userFrom", extraField:"memberValue"}, 
    "sepbar0":"", "btext0":"Store As", 
    "input!*":"storeAs",

    "variableSettings": {
        "memberValue": {
                "Command Author": "novars",
                "id*": "indirect"
        }
    },
    
    preview: "userFrom", previewName: "Via"},
    async run(values, message, uID, fs, client, runner, bridge)  {
        let varTools = require(`../Toolkit/variableTools.js`)

        if (values.userFrom == "Command Author") {
            const member = client.users.get(message.author.id); 
            bridge.variables[values.storeAs] = member
        }
        if (values.userFrom == "ID*") {
            const member = client.users.get(varTools.transf(values.memberValue, bridge.variables)); 
            bridge.variables[values.storeAs] = member
        }
    }
}
