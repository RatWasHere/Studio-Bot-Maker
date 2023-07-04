module.exports = {
    data: {"name": "Edit Button Label", "newLabel": "", "messageVariable":"", "customId": ""},
    UI: {"compatibleWith": ["Any"],
    "text":"Edit Button Label",
    "sepbar":"",
    "btext":"Message Variable", "input_direct*":"messageVariable", 
    "sepbar1":"",
    "btext1":"Button Custom ID", "input1*":"customId", 
    "sepbar2":"",
    "btext2": "Button New Label", "input2*":"newLabel",
        
        previewName: "New Label", preview: "newLabel"},
    run(values, interaction, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'));
        let message = client.getChannel(tempVars[uID][values.messageVariable].channelId).messages.get(tempVars[uID][values.messageVariable].id);

                    let buttonID = varTools.transf(values.customId, uID, tempVars)
                    let button;
            for (const component of message.components) {
                for (const subcomponent of component.components) {
                    if (subcomponent.customId == buttonID) {
                        button = subcomponent;
                        break;
                    }
                }
                if (button) {
                    break;
                }
            }

            // Edit the label of the button
            button.setLabel(varTools.transf(values.newLabel, uID, tempVars));
        }
}