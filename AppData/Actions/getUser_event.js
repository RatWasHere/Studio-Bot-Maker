module.exports = {
    data: {"messageContent": "", "button": "Command Guild", "name": "Get User", "ExtraData": "", "sendTo":"", "choice":"ID*", "memberValue":"", "storesAs":""},
    UI: {"compatibleWith": ["Event"], "text": "Get User", "sepbar33235":"", "btextchoices": "User ID", "inputmenuBar*":"memberValue", "sepbarchoice":"", "btextStoreAs":"Store As", 
    "inputstoreas!*":"storesAs",

        "variableSettings": {
            "memberValue": {
                "Command Author": "novars",
                "id*": "indirect"
            }
        },
    
    preview: "choice", previewName: "From"},
    async run(values, message, uID, fs, client) {
        let tempVrz = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json'));
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        let varTools = require(`../Toolkit/variableTools.js`)

            const member = client.users.cache.get(varTools.transf(values.memberValue, uID, tempVars)); 
            tempVars[uID][values.storesAs] = member
        await fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

    }
}
