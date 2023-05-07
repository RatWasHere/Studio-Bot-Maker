module.exports = {
    data: {"messageContent": "", "button": "Command Guild", "name": "Get Member", "ExtraData": "", "sendTo":"", "choice":"ID*", "memberValue":"", "storesAs":""},
    UI: {"compatibleWith": ["Text", "Slash"], "text": "Get Member", "sepbar33235":"", "btextchoices": "Get Member Via", "menuBar": {choices: ["ID*", "Name*", "Command Author"], storeAs: "choice", extraField:"memberValue"}, "sepbarchoice":"","btext63555":"Get Member Of","ButtonBar":{"buttons": ["Command Guild", "Guild*"]}, "sepbarButtons":"sepbar","btextStoreAs":"Store As",
    "variableSettings": {
        "memberValue": {
            "ID*": "indirect",
            "Name*": "indirect",
            "Command Author": "novars"
        }
    },
    "inputstoreas!*":"storesAs", preview: "choice", previewName: "From"},
    async run(values, message, uID, fs, client) {
        let tempVrz = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json'));
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        let varTools = require(`../Toolkit/variableTools.js`)
        let guild;
        if(values.button = 'Command Guild') {
            guild = message.guild
        } else {
            guild = client.guilds.cache.get(varTools.transf(values.ExtraData, uID, tempVars));
        }
        if (values.choice == "Command Author") {
            const member = guild.members.cache.get(message.author.id); 
            tempVars[uID][values.storesAs] = member
        }
        if (values.choice == "Name*") {
            const member = guild.members.cache.find(m => m.user.username === varTools.transf(values.memberValue, uID, tempVars)); 
            tempVars[uID][values.storesAs] = member
        }
        if (values.choice == "ID*") {
            const member = guild.members.cache.get(varTools.transf(values.memberValue, uID, tempVars)); 
            tempVars[uID][values.storesAs] = member
        }
        await fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

    }
}
