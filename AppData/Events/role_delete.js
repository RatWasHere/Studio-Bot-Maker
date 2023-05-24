module.exports = {
    "name": "Role Delete", 
    nameSchemes: ["Store Role As"],
    inputSchemes: 1,
    run(UI, client, fs, actionRunner, atWhat) {
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))

        client.on('roleDelete', (role) => {
            actionRunner(atWhat, msg, client, {
                [UI[0]]: role
            })
        }, true)
    }
    
}