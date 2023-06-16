module.exports = {
    data: {"name": "Wait", "amountOfTime":"Seconds*", "time":""},
    UI: {"compatibleWith": ["Any"], "text1":"Wait", "sepbar2setwait":"", 
    "btext00":"Amount Of Time", "menuBar":{"choices": ["Minutes*", "Hours*", "Seconds*"], 
    "storeAs":"amountOfTime", "extraField":"time"}, "sepbar120":"",
     "btext0256":"<b>Note!</b> <br> Attempting to cancel the action array after this might not work in special cases!", 
     previewName: "Units", preview: "amountOfTime",
     
     "variableSettings":{
        "time": {
            "Minutes*": "novars", 
            "Hours*": "novars",
            "Seconds*": "novars"
        }
    }
    },
    run(values, message, uID, fs, client) {
        const variableTools = require('../Toolkit/variableTools')
        let tempVars = require('../Toolkit/tempVars.json')
        var timeAmount = parseFloat(variableTools.transf(values.time, uID))
        let time;
        switch(values.amountOfTime) {
            case 'Seconds*': 
            time = 1000 * timeAmount
            break
            case 'Minutes*': 
            time = 1000 * 60 * timeAmount
            break
            case 'Hours*': 
            time = 1000 * 60 * 60 * timeAmount
            break
        }
        const delayPromise = new Promise((resolve) => {
            setTimeout(resolve, time);
          });
          
          delayPromise
    }
}