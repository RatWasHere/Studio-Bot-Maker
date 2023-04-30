module.exports = {
    data: {"name":"Remove Role", "memberChoice":"", "storeAs":"", "addTo":"Message Author", "efadd":""},
    UI: {"compatibleWith":["Text", "Slash"], "text":"Remove Role", "sepbar3":"", "btext33333333":"Role Variable", "input1":"memberChoice", "sepbar12":"", "btext2":"Remove From", "menuBar":{"choices":["Message Author", "Member*"], storeAs: "addTo", extraField:"efadd"},  "sepbar0":"", "preview":"memberChoice", "previewName":"Role"},

    run(values, message, uID, fs, client) { 
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        var user;
        if (values.addTo == 'Message Author') {
            user = message.author.id
        } else {
            user = tempVars[uID][values.efadd].userId
        }
       let role = client.guilds.cache.get(tempVars[uID][values.memberChoice].guild).roles.cache.get(tempVars[uID][values.memberChoice].id) 
       let member = client.guilds.cache.get(tempVars[uID][values.memberChoice].guild).members.cache.get(user) 
       member.roles.remove(role) 
    }
}