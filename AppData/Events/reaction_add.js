module.exports = {
    "name": "Reaction Add", 
    nameSchemes: ["Message", "Author"],
    inputSchemes: 2,
    run(UI, client, fs, actionRunner, atWhat) {
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))

        client.on('messageReactionAdd', (reaction_origin, author) => {
            actionRunner(atWhat, msg1, client, {
                [UI[0]]: reaction_origin,
                [UI[1]]: author
            }, true)
        })
    }
    
}