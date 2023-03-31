// interactionTools V0 By Rat Running on Studio API 1 

const fs = require('fs')
module.exports = {
    studio: {"API": "0", "Version": "1"},
    
    stopExecution(uID) {
        var tempVars = JSON.parse(fs.readFileSync('./tempVars.json', 'utf8'))
        console.log(tempVars)
        console.log(uID)
        tempVars[uID][`${uID}_stop`] = true;
        fs.writeFileSync('./tempVars.json', JSON.stringify(tempVars))
    }
}