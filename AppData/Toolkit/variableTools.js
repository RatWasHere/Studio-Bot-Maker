// VariableTools V1 By Rat Running on Studio API 0 
// Check out ratapp.rf.gd/StudioBotToolkit or ./AppData/HelpMe/Toolkits.txt for information regarding toolkits and creating them
module.exports = {
    tempVariables: require('./tempVars.json'),
    newVariable(name, value, uIDs, cdata) {
        if (cdata != undefined) {
            const tempVars = cdata;
            tempVars[uIDs] = {
                ...tempVars[uIDs],
                [name]: value
              };            
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
    transf(text, uID, tempVar) {
        // const tempVar = JSON.parse(JSON.stringify(tmpVar, null, 2));

        const getTempVariable = (variable) => {
          return tempVar[uID][variable];
        };
      
        let formattedText = text;
        if (formattedText.includes('`')) {
          formattedText = formattedText.replace(/`/g, "\\`");
        }
      
        const evaluatedText = eval("`" + formattedText + "`");
        return evaluatedText;
    },
    getVariable(name, uID) {
            let tempVars = require(`../Toolkit/tempVars.json`);
            return tempVars[uID][name];
    },

}