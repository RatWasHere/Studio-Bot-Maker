module.exports = {
    "name": "Member Join Guild", 
    nameSchemes: ["Guild", "Member"],
    inputSchemes: 2,
    run(UI, client, fs, actionRunner, atWhat) {
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))

        client.on('guildMemberAdd', (member) => {
            actionRunner(atWhat, member, client, {
                [UI[0]]: member.guild,
                [UI[1]]: member
            }, true)
        })
    }
    
}