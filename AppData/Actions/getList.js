module.exports = {
    data: {"name":"Get List From Storage", 
    "listName":"",
     "storeAs":"",
},
     
    UI: {"compatibleWith":["Any"], 
    "text":"Get List", 
    
    "sepbar3":"", 
      "btext33333333":"Stored List Name", 
      "input1*":"listName",
       "sepbar12345":"", 
       "btext3333ds3333":"Store List As", 
       "input341!*":"storeAs",


      "preview":"listName", 
      "previewName":"List Name"},

   async run(values, message, uID, fs, client, runner, bridge)  { 
        let varTools = require(`../Toolkit/variableTools.js`)
        var storedData = JSON.parse(fs.readFileSync('./AppData/Toolkit/storedData.json', 'utf8'))
        if (storedData.lists) {
            bridge.variables[varTools.transf(values.storeAs, bridge.variables)] = storedData.lists[varTools.transf(values.listName, bridge.variables)] || []
        } else {
            bridge.variables[varTools.transf(values.storeAs, bridge.variables)] = []
        }
    }
}