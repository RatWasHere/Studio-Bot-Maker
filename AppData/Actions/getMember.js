module.exports = {
    data: {"name": "Get Member", "memberFrom":"ID*", "member":"", "storesAs":""},
    UI: {"compatibleWith": ["Text", "Slash"],
    "text": "Get Member",

    "sepbar":"",
    
    "btext": "Get Member Via",
    "menuBar": {choices: ["ID*", "Name*", "Command Author"], storeAs: "memberFrom", extraField:"member"},

    "sepbar0":"",

    "btext0":"Store As",
    "input!*":"storesAs",

    "variableSettings": {
        "member": {
            "ID*": "indirect",
            "Name*": "indirect",
            "Command Author": "novars"
        }
    },

    preview: "memberFrom", previewName: "Via"},
    async run(values, message, uID, fs, client, actionContextBridge) {
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'));
        let varTools = require(`../Toolkit/variableTools.js`);

        let guild = actionContextBridge.guild;

        if (values.memberFrom == "Command Author") {
            const member = guild.getMember(message.author.id); 
            tempVars[uID][values.storesAs] = member
        }
        if (values.memberFrom == "Name*") {
            const member = guild.members.find(m => m.nick === varTools.transf(values.member, uID, tempVars)); 
            tempVars[uID][values.storesAs] = member
        }
        if (values.memberFrom == "ID*") {
            const member = guild.getMember(varTools.transf(values.member, uID, tempVars)); 
            tempVars[uID][values.storesAs] = member
        }

        await fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

    }
}
