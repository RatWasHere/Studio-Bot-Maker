module.exports = {
    data: {"name":"Get Role", "memberChoice":"", "storeAs":""},
    UI: {"compatibleWith":["Text", "Slash"], "text":"Get Role", "sepbar3":"", "btext33333333":"Role ID", "input1*":"memberChoice", "sepbar12":"", "btext2*":"Store As", "inputsa":"storeAs", "preview":"memberChoice", "previewName":"ID"},

    run(values, message, uID, fs, client) { 
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        var user;
        let guild; 
        
        tempVars[uID] = {
            ...tempVars[uID],
            [values.storeAs]: client.guilds.cache.get(message.guild.id).roles.cache.get(values.memberChoice)
    }
    fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

}
}