module.exports = {
    data: {"name":"Get Role", "memberChoice":"", "storeAs":"", "guildAs":"Message Guild", "guildS":""},
    UI: {"compatibleWith":["Text", "Slash"], "text":"Get Role", "sepbar3":"", "btext33333333":"Role ID", "input1*":"memberChoice", "sepbar12":"", "btext00guild":"Get Role From", "menuBar":{"choices":["Message Guild", "Guild*"], storeAs:"guildAs", extraField:"guildS"},"btext2*":"Store As", "inputsa":"storeAs", "preview":"memberChoice", "previewName":"ID"},

    run(values, message, uID, fs, client) { 
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        var user;
        let guild; 
            if (values.guildAs == 'Message Guild') {
                guild = message.guild
            } else {
                guild = client.guilds.cache.get(tempVars[uID][varTools.transf(values.guildS, uID, tempVars)])
            }
        tempVars[uID] = {
            ...tempVars[uID],
            [values.storeAs]: guild.roles.cache.get(varTools.transf(values.memberChoice, uID, tempVars))
    }
    fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

}
}