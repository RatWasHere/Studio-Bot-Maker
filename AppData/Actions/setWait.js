module.exports = {
    data: {"name": "Wait","desc": "", "varble": "", "amountOfTime":"Seconds*", "time":"", "actionRowElements":[]},
    UI: {"compatibleWith": ["Any"], "text1":"Wait", "sepbar2setwait":"", "btext00":"Amount Of Time", "menuBar":{"choices": ["Minutes*", "Hours*", "Seconds*"], "storeAs":"amountOfTime", "extraField":"time"}, "sepbar120":"", "btext0256":"<b>Note!</b> <br> Attempting to cancel the action array after this might not work in special cases!", previewName: "Units", preview: "amountOfTime"},
    run(values, message, uID, fs, client) {
        let time;
        switch(values.amountOfTime) {
            case 'Seconds*': 
            time = 1000 * parseFloat(values.time)
            break
            case 'Minutes*': 
            time = 1000 * 60 * parseFloat(values.time)
            break
            case 'Hours*': 
            time = 1000 * 60 * 60 * parseFloat(values.time)
            break
        }
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))

        tempVars[uID] = {
            ...tempVars[uID],
            [`ACTIONARRAY_stop`]: true
          };
          fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
        setTimeout(() => {

    
            tempVars[uID] = {
                ...tempVars[uID],
                [`ACTIONARRAY_stop`]: false
              };
              fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
              let datjson = require('../data.json')
              
                for (let command in datjson.commands) {
                    if (datjson.commands[command].name.toLowerCase() == values.actionGroup.toLowerCase()) {
                        for (let action in datjson.commands[command].actions) {
                            let actFile = require(`./${datjson.commands[command].actions[action].file}`)
                            let vls = datjson.commands[command].actions[action].data
                            actFile.run(vls, message, uID, fs, client)
                        }
                    }
                }
        }, time)


    }
}