module.exports = {
    data: {"messageContent": "", "button": "Command Guild", "name": "Get User", "userID":"", "storesAs":""},
    UI: {"compatibleWith": ["Event", "DM"], "text": "Get User", "sepbar":"", "btext": "User ID", "input*":"userID", "sepbar0":"", "btext0":"Store As", "input!*":"storesAs",

        "variableSettings": {
            "userID": {
                "Command Author": "novars",
                "id*": "indirect"
            }
        },
    
    preview: "userID", previewName: "ID"},
    async run(values, message, uID, fs, client, runner, bridge)  {
        let varTools = require(`../Toolkit/variableTools.js`)

        const member = client.users.get(varTools.transf(values.userID, bridge.variables)); 
        bridge.variables[values.storesAs] = member
    }
}
