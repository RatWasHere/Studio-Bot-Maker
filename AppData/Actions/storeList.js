module.exports = {
    data: {"name":"Store List", 
    "listName":"",
     "storeAs":"",
},
     
    UI: {"compatibleWith":["Any"], 
    "text":"Store List", 
    
    "sepbar3":"", 
      "btext33333333":"List Name", 
      "input1*":"listName",
       "sepbar12345":"", 
       "btext3333ds3333":"Store List As", 
       "input341*":"storeAs",


      "preview":"storeAs", 
      "previewName":"Store As"},

   async run(values, message, uID, fs, client) { 
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        var storedData = JSON.parse(fs.readFileSync('./AppData/Toolkit/storedData.json', 'utf8'))
        if (storedData.lists != undefined) {
            storedData.lists[varTools.transf(values.storeAs, uID, tempVars)] = tempVars[uID][varTools.transf(values.listName, uID, tempVars)]
        } else {
            storedData.lists = {}
            storedData.lists[varTools.transf(values.storeAs, uID, tempVars)] = tempVars[uID][varTools.transf(values.listName, uID, tempVars)]

        }
        

    await fs.writeFileSync('./AppData/Toolkit/storedData.json', JSON.stringify(storedData), 'utf8')

}
}