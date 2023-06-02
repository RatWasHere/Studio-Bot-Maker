module.exports = {
    data: {"name":"Add Role", "memberChoice":"", "storeAs":"", "addTo":"Message Author", "efadd":""},
    UI: {"compatibleWith":["Text", "Slash"], 
    "text":"Add Role", "sepbar3":"", 
    "btext33333333":"Role Variable",
     "input1_direct*":"memberChoice",
      "sepbar12":"", "btext2":"Add To",
       "menuBar":{"choices":["Message Author", "Member*"], storeAs: "addTo", extraField:"efadd"}, 
        "sepbar0":"", "preview":"memberChoice", "previewName":"Role",
    "variableSettings":{
            "efadd": {
                "Member*": "direct", 
                "Message Author": "novars"
            }}
},

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
       member.roles.add(role) 
    }
}