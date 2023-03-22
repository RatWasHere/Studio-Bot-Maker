module.exports = {
    data: {"name": "Split Variable","desc": "", "varble": "", "vrble":"", "vrb":""},
    UI: {"compatibleWith": ["Any"], "text1":"Split Variable ", "sepbar2":"sepber", "btext1":"Variable Name", "input333":"varble", "btext556":"First Output", "input666":"vrble","btext552334":"Second Output", "input232424":"vrb", previewName: "Splitting", preview: "varble"},
    run(values, message, uID, fs) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        console.log('tvars')
        let opt1 = tempVars[uID][values.varble][0]
        let opt2 = tempVars[uID][values.varble][1]
        console.log(opt1, 'opt1')
        console.log(opt2, 'opt2')
        tempVars[uID][values.vrble] = opt1 
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
        const vt2 = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        vt2[uID][values.vrb] = opt2
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(vt2, null, 2), 'utf8')
    }
}