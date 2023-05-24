module.exports = {
"name": "Role Create", 
    nameSchemes: ["Store Role As"],
    inputSchemes: 1,
    run(UI, client, fs, actionRunner, atWhat) {
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))

        client.on('roleCreate', (role) => {
            actionRunner(atWhat, msg, client, {
                [UI[0]]: role
            }, true)
        })
    }
    
}