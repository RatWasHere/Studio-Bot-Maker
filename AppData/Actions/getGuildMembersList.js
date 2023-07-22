module.exports = {
    data: {"name":"Get Guild Members List",
    "storeAs":"",
    "get": "IDs"
},
     
    UI: {"compatibleWith":["None"], 
    "text":"Get Guild Members List", 

    "sepbar":"",

    "btext": "Get List Of Members':",
    "menuBar": {
        choices: ["IDs", "Variables", "Usernames"]
    },

    "sepbar0":"",

    "btext0":"Store List As",
    "input":"storeAs",

    "preview":"storeAs", 
    "previewName":"Store As"},

   async run(values, message, uID, fs, client, runner, bridge)  { 
        let varTools = require(`../Toolkit/variableTools.js`)

        for (let member of bridge.guild.members) {
            console.log(member)
        }
    }
}