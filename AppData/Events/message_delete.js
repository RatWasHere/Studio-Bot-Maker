module.exports = {
    "name": "Message Delete", 
    nameSchemes: ["Store Message As"],
    inputSchemes: 1,
    run(UI, client, fs, actionRunner, atWhat) {
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))

        client.on('messageDelete', (msg) => {
            actionRunner(atWhat, msg, client, {
                [UI[0]]: msg
            }, true)
        })
    }
    
}