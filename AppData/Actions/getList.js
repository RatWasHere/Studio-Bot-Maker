module.exports = {
    data: {"name":"Get List", 
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

   async run(values, message, uID, fs, client) { 
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        var storedData = JSON.parse(fs.readFileSync('./AppData/Toolkit/storedData.json', 'utf8'))
            tempVars[uID][varTools.transf(values.storeAs, uID, tempVars)] = storedData.lists[varTools.transf(values.listName, uID, tempVars)]
        

    await fs.writeFileSync('./AppData/Toolkit/storedData.json', JSON.stringify(storedData), 'utf8')

}
}