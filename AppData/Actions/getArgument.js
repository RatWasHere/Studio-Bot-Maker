module.exports = {
    data: {"messageContent": "", "button": "✓", "name": "Get Argument", "ExtraData": "", "sendTo":"", "ButtonRow":"", "message":"Command Message", "messageF":"", "firstArgument":"TEST", "secondArgument":"EST", "elementAs":"Message*","ActionRow":"None", "embedVar":"", "guild":"Message Guild", "guildField":"", "storesAs":""},
    UI: {"compatibleWith": ["Text"], "text": "Get Argument","sepbar44423":"sepbar", "btextmsg":"From", "menuBar1":{"choices":["Command Message", "Message*"], storeAs:"message", extraField:"messageF"}, "sepbarmsg":"sepb", "btextEmbVar":"From Argument #", "inputargument":"firstArgument", "sepbarargs":"", "btextArg":"To", "menuBar":{"choices":["None", "Argument #*", "End"], storeAs:"ActionRow", extraField:"guildField"}, "sepbarextrafield":"seb","btextstoreas":"Store As", "inputstoresas*":"storesAs", "preview":"storesAs", "previewName":"Store As"},
    run(values, message, uID, fs, client) {
        var output = ''
        if (values.message == 'Command Message') {
            if (values.ActionRow == 'None') {
                output = message.content.split(' ')[parseFloat(values.firstArgument)]
            } 
            if (values.ActionRow == 'Argument #*') {
                let fd =  message.content.split(' ')
                var argumentsParsed = 0
                for (let argument in fd) {
                    // if the argument is higher or equal to the first argument where it should begin
                    if (argument >= parseFloat(values.firstArgument)) {
                        argumentsParsed++ 
                        // increment the arguments parsed

                        // if the arguments parsed are smaller or equal to the end argument's number
                        if (argumentsParsed <= parseFloat(values.guildField)) {
                            output = `${output} ${fd[argument]}`
                        }
                    }
                }

            }
            if (values.ActionRow == 'End') {
                let specificIndex = parseFloat(values.firstArgument);
                let words = message.content.substring(specificIndex).split(" ").join(" ");

                // Get all words after the specific index
                output = message.content.split(" ").slice(specificIndex).join(" ");      
            }

            var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
            tempVars[uID] = {
                ...tempVars[uID],
                [values.storesAs]: output
              };
              fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

        }
    }
}
