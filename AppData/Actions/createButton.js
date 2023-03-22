module.exports = {
    data: {"name":"Create Button", "paramName":"", "storeAs":"", "button": "String", "choice":"Message Create"},
    UI: {"compatibleWith":["Slash"], "text": "Create Button","sepbar":"sbar", "btext69":"Store As", "input777":"storeAs", "preview":"storeAs", "previewName":"Name"},
    async run(values, interaction, uID, fs) { 
        let varTools = require(`../Toolkit/variableTools.js`)
        let tempVars = require(`../Toolkit/tempVars.json`);
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', varTools.newVariable(values.storeAs, {"type":1, components: []}, uID), 'utf8')
}
}
// ??