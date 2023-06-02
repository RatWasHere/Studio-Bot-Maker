module.exports = {
    data: {"name": "Get Argument", "message":"Command Message", "messageFrom":"", "firstArgument":"", "secondArgument":"", "elementAs":"Variable*", "guild":"Message Guild", "argumentParameter":"", "storesAs":"", "ArgumentFrom":  "Argument #*"},
    UI: {"compatibleWith": ["Text"], "text": "Get Argument","sepbar44423":"sepbar", "btextmsg":"Get Message Via", "menuBar1":{"choices":["Command Message", "Variable*"], storeAs:"message", extraField:"messageFrom"}, "sepbarmsg":"sepb", "btextEmbVar":"From Argument #", "inputargument":"firstArgument", "sepbarargs":"", "btextArg":"To", "menuBar":{"choices":["None", "Argument #*", "End"], storeAs:"ArgumentFrom", extraField:"argumentParameter"}, "sepbarextrafield":"seb","btextstoreas":"Store As", "inputstoresas!*":"storesAs", "preview":"storesAs", "previewName":"Store As",
    "variableSettings":{
        "messageFrom": {
            "Variable*": "direct", 
            "Command Message": "novars",
        },
        "argumentParameter": { 
            "None": "novars",
            "Argument #*": "novars",
            "End": "novars"
        }
    }
},
    run(values, inter, uID, fs, client) {
        var output = ''
        let message;
        if (values.message == 'Command Message') {
            message = inter;
        } else {
            message = tempVars[uID][values.messageFrom]
        }
            if (values.ArgumentFrom == 'None') {
                output = message.content.split(' ')[parseFloat(values.firstArgument)]
            } 
            if (values.ArgumentFrom == 'Argument #*') {
                let fd =  message.content.split(' ')
                var argumentsParsed = 0
                for (let argument in fd) {
                    // if the argument is higher or equal to the first argument where it should begin
                    if (argument >= parseFloat(values.firstArgument)) {
                        argumentsParsed++ 
                        // increment the arguments parsed

                        // if the arguments parsed are smaller or equal to the end argument's number
                        if (argumentsParsed <= parseFloat(values.argumentParameter)) {
                            output = `${output} ${fd[argument]}`
                        }
                    }
                }

            }
            if (values.ArgumentFrom == 'End') {
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
