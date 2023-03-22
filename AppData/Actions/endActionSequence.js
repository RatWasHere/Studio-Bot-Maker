module.exports = {
    data: {"name": "Stop Action Sequence", "end":"•"},
    UI: {"compatibleWith": ["Text"], "text":"Stop Action Sequence", "sepbar":"", "btext":"<b>Note</b> <br> Any action under this will not execute", "preview":"end", "previewName":"End"},
    run(values, message, uID, fs) {
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        tempVars[uID] = {
            ...tempVars[uID],
            [`ACTIONARRAY_stop`]: true
          };
          fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
    }
}