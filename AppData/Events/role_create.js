module.exports = {
    "name": "Bot Ready", 
    nameSchemes: ["Store Client As"],
    inputSchemes: 1,
    run(UI, client, fs, actionRunner, atWhat) {
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))

        client.on('roleCreate', () => {
            actionRunner(atWhat, msg, client, {
                [UI[0]]: client
            })
        })
    }
    
}