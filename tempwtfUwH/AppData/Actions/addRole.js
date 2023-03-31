module.exports = {
    data: {"name":"Add Role", "memberChoice":"", "storeAs":"", "addTo":"Message Author", "efadd":""},
    UI: {"compatibleWith":["Text", "Slash"], "text":"Add Role", "sepbar3":"", "btext33333333":"Role Variable", "input1":"memberChoice", "sepbar12":"", "btext2":"Add To", "menuBar":{"choices":["Message Author", "Member*"], storeAs: "addTo", extraField:"efadd"},  "sepbar0":"", "preview":"memberChoice", "previewName":"Role"},

    run(values, message, uID, fs, client) { 
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        var user;
        if (values.addTo == 'Message Author') {
            user = message.author
        } else {
            user = client.users.cache.get(values.efadd)
        }
       let role = client.guilds.cache.get(message.guild.id).roles.cache.get(tempVars[uID][values.memberChoice].id) 
       console.log(user)
       let member = client.guilds.cache(message.guild.id).members.cache.get(user.id) 
       member.roles.add(role) 
    }
}