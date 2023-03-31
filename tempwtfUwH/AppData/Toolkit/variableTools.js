// VariableTools V1 By Rat Running on Studio API 0 
// Check out ratapp.rf.gd/StudioBotToolkit or ./AppData/HelpMe/Toolkits.txt for information regarding toolkits and creating them
module.exports = {
    tempVariables: require('./tempVars.json'),
    newVariable(name, value, uIDs, cdata) {
        if (cdata != undefined) {
            console.log('cdata')
            console.log(cdata)
            const tempVars = cdata;
            tempVars[uIDs] = {
                ...tempVars[uIDs],
                [name]: value
              };            console.log(tempVars)
        return `${JSON.stringify(tempVars)}`;
        } else {
            const fs = require('fs');
            let tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'));
            tempVars[uIDs] = { [`${name}`]: value }
        return `${JSON.stringify(tempVars)}`;
        }

    },
    deleteVariable(name, uIDs) {
        const fs = require('fs');
        let tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'));
            delete tempVars[uIDs][name];
            return JSON.stringify(tempVars);
    },
    transf(text, uID, tmpVar) {
        console.log(text, 'text')
        console.log(uID, 'uID')
        let tempccc = JSON.stringify(tmpVar, null, 2)
        var tempVars = JSON.parse(tempccc)
        console.log(tempVars[uID], 'tvUID')
        console.log(JSON.parse(JSON.stringify(tempVars)))
        const tempVar = (variable) => {
            return tempVars[uID][variable];
          };
          let fext = text;
          if (fext.split('').includes('`')) {
            fext = text.replace(/`/g, "\\`");

          }
        return eval("`" + fext + "`");
    },
    getVariable(name, uID) {
            let tempVars = require(`../Toolkit/tempVars.json`);
            console.log(tempVars[uID][name])
            return tempVars[uID][name];

    },

}