module.exports = {
    data: {"name":"Get Parameter", "paramName":"", "storeAs":"", "button": "String", "choice":"String"},
    UI: {"compatibleWith": ["Slash"],"text": "Get Parameter","sepbar":"sbar", "btext1":"Parameter Name", "input43":"paramName", "btext69":"Store As", "input777":"storeAs", "sepbar422":"sepbar", "btext03":"Parameter Type", "menuBar": {choices: ["String", "Boolean", "Channel", "User", "Integer"], storeAs: "choice"}, "sepbar534":"","btext":"<b>Note!</b> <br> - Inserting the wrong parameter type will return nothing <br> - If a parameter is not required, it will return 'undefined', use <span style='background-color: #00000060; padding: 3px; border-radius: 4px;'>Compare Variable</span> to see if an optional parameter has been used!", "preview":"paramName", "previewName":"Name"},
    run(values, interaction, uID, fs, client) { 
        var param;
        switch(values.choice) {
            case 'String':
                 param = interaction.options.getString(values.paramName)
            break
            case 'Boolean': 
                 param = interaction.options.getBoolean(values.paramName)
            break
            case 'User':
                 param = interaction.options.getUser(values.paramName)
            break
            case 'Channel':
                 param = interaction.options.getChannel(values.paramName)
            break
            case 'Integer':
                 param = interaction.options.getInteger(values.paramName)
            break
        }

  // do something with the parameter value
  let varTools = require(`../Toolkit/variableTools.js`)
  let tempVar = varTools.tempVar
  let vls = values.storeAs
  var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
     tempVars[uID] = {
          ...tempVars[uID],
          [vls]: param
     }

     fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
}
}
// ??