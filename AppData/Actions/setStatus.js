module.exports = {
    data: {"messageContent": "", "button": "Variable*", "name": "Set Client Status", "status":"", 
    "statusActivity":"Playing",
    "statusType":"Online"
},
    UI: {"compatibleWith": ["Any"], "text": "Set Client Status Nickname","sepbarEmbVar":"",
    "btext03":"Status Text",
    "input03":"status",
    "sepbarText":"",
    "btext034":"Status Activity",
    "menuBar1": {
        "choices": ["Playing", "Listening To", "Watching", "Streaming"],
        "storeAs":"statusActivity"
    },
    "sepbaract":"",
    "btext033":"Status Type",
    "menuBar0": {
        "choices": ["Online", "Do Not Disturb", "Idle"],
        "storeAs":"statusType"
    },
    preview: "statusActivity", previewName: "Activity"},
    run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        let guild;
        let type;
        let status;
        const { ActivityType, Activity, PresenceUpdateStatus } = require('discord.js');

        switch (values.statusActivity) {
            case 'Playing': 
                status = ActivityType.Playing
            break
            
            case 'Listening To': 
                status = ActivityType.Listening
            break

            case 'Watching': 
                status = ActivityType.Watching
            break

            case 'Streaming': 
            status = ActivityType.Streaming
            break
        }
        switch (values.statusType) {
            case 'Online':
                type =  PresenceUpdateStatus.Online
            break

            case 'Do Not Disturb':
                type =  PresenceUpdateStatus.DoNotDisturb
            break

            case 'Idle':
                type = PresenceUpdateStatus.Idle
            break
        }
        client.user.setPresence({
            activities: [{ name: values.status, type: status }],
            status: type,
          });
    }
}