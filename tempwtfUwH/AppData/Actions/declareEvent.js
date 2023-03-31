module.exports = {
    data: {"name":"Declare Event", "paramName":"", "storeAs":"", "button": "String", "choice":"Message Create"},
    UI: {"compatibleWith":["Event"], "text": "Declare Event","sepbar":"sbar", "btext69":"Store As", "input777*":"storeAs", "sepbar422":"sepbar", "menuBar": {choices: ["Message Create", "Message Delete", "Message Update", "Bot Ready", "Channel Create", "Channel Delete", "Channel Update", "Bot Joins Guild", "Bot Leaves Guild", "User Update", "Member Leave", "Member Join", "Member Ban", "Member Kick", "Member Timeout", "Member Add Role", "Member Remove Role", "Role Create", "Role Delete", "Role Edit"], storeAs: "choice"}, "preview":"choice", "previewName":"Event"},
    async run(values, interaction, uID, fs) { 
        let varTools = require(`../Toolkit/variableTools.js`)
        let tempVars = require(`../Toolkit/tempVars.json`);
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', varTools.newVariable(values.storeAs, interaction, uID), 'utf8')
}
}
// ??