module.exports = {
    data: {"name":"Get Mentioned User", "messageVariable":"", "button":"First", "ExtraData":"5", 
"storeAs":""},
    UI: {"compatibleWith": ["Event", "Slash", "DM"], "text": "Get Message Mention","sepbarEmbVar":"", 
    
    "btextmember":"Message Variable", "inputd_direct*":"messageVariable", 
    "sepbarmenus":"sepbar",
    "btext00":"Mention Number",
    "ButtonBar": {"buttons":["First", "Second", "Third", "Custom*"]},
    "sepbar5131":"",
    "btextstoreas":"Store As",
    "inputstoreas!*":"storeAs",
    "btext":"<b>Note!</b> <br> If you're using \"Custom\", you need to insert the number, not ordinal numbers!",
    
    preview: "button", previewName: "Mention"},
    run(values, message, uID, fs, client, runner, bridge)  {
        let varTools = require(`../Toolkit/variableTools.js`)
        let msg;
            msg = bridge.variables[values.messageVariable]
            let mentions = msg.mentions.users
            switch (values.button) {
                case 'First':
                    mentions = mentions[0]
                break
                case 'Second':
                    mentions = mentions[1]
                break
                case 'Third':
                    mentions = mentions[2]
                break
                case 'Custom':
                    mentions = mentions[parseFloat(varTools.transf(values.ExtraField, bridge.variables))]
                break
            }
            
            bridge.variables = {
                ...bridge.variables,
                [values.storeAs]: mention || '-'
            }
    }
}
