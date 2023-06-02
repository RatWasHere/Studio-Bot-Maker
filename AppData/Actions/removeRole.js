module.exports = {
    data: {"name":"Remove Role", "memberChoice":"", "storeAs":"", "addTo":"Message Author", "memberVariable":""},
    UI: {"compatibleWith":["Text", "Slash"], "text":"Remove Role",
     "sepbar3":"", "btext":"Role Variable", 
     "input1_direct*":"memberChoice", "sepbar12":"", 
     "btext1":"Remove From",
      "menuBar":{"choices":["Message Author", "Member*"], 
      storeAs: "addTo", extraField:"memberVariable"}, 
     "sepbar0":"", "preview":"memberChoice", "previewName":"Role",
     "variableSettings": [
        {
            "memberVariable": {
                "Member*": "direct", 
                "Message Author": "novars"
            }
        }
    ]
    },

    run(values, message, uID, fs, client) { 
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        var user;
        if (values.addTo == 'Message Author') {
            user = message.author.id
        } else {
            user = tempVars[uID][values.memberVariable].userId
        }
       let role = client.guilds.cache.get(tempVars[uID][values.memberChoice].guild).roles.cache.get(tempVars[uID][values.memberChoice].id) 
       let member = client.guilds.cache.get(tempVars[uID][values.memberChoice].guild).members.cache.get(user) 
       member.roles.remove(role) 
    }
}