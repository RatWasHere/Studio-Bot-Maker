try {
    const Discord = require('discord.js');
    const fs  = require('fs');
    const client = new Discord.Client({  intents: 3276799 })
    const { SlashCommandBuilder, ApplicationCommandOptionType } = require('discord.js');
    const { REST } = require('@discordjs/rest');
    const { Routes } = require('discord-api-types/v9');
    let data = JSON.parse(fs.readFileSync('./AppData/data.json'))
    let msgFunction;
    try {
    fs.writeFileSync('./AppData/Toolkit/tempVars.json', '{}')
} catch(err) {
    null
}
    client.on('ready', () => {
        console.log('Studio Bot Maker V2.4.1 Project, started successfully!');
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', '{}')
    });
    
    const runActionArray = async (at, msg, client, actionBridge, tf) => {
        try {
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
    } catch (err) {
        null
    }   
    var date1 = new Date();
    var uniq = new Date(date1.getTime());       
    console.log(tempVars)
    if (!tf) {
        if (!actionBridge) {
            tempVars[uniq] = {}
        } else {
            tempVars[uniq] = JSON.parse(JSON.stringify(tempVars[actionBridge]))
        }
    } else {
        tempVars[uniq] = actionBridge
    }
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars, null, 2))

        for (let action in data.commands[at].actions) {
            let keepGoing = true;
            try {
        if (tempVars[uniq][`ACTIONARRAY_stop`] && tempVars[uniq][`ACTIONARRAY_stop`] == true) {
                if (data.commands[at].actions[data.commands[at].count] == data.commands[at].actions[action]) {
                    keepGoing = false;

                        if (tf) {
                            delete tempVars[uniq]
                            fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars, null, 2))
                        } else {
                            if (actionBridge) {
                                delete tempVars[actionBridge]
                            }
                            delete tempVars[uniq]
                            fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars, null, 2))
                        }

            }
        } } catch (err) {}

        if (keepGoing == true) {
              await require(`./AppData/Actions/${data.commands[at].actions[action].file}`).run(data.commands[at].actions[action].data, msg, uniq, fs, client, runActionArray)
        }
    }
    if (!tf) {
        delete tempVars[actionBridge]
        delete tempVars[uniq]
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars, null, 2))
    } else {
        delete tempVars[uniq];
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars, null, 2))
    }


    }


    /* END RUN ARRAY FUNCTION */








    client.on('messageCreate', async  msg => {
        if (msg.author.bot) return


        for (let i in data.commands) {

            if (data.commands[i].type == 'action') {

                var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
                if (data.commands[i].trigger === 'textCommand') {

            let message = msg.content.split(data.prefix)[1]
            let dcn = data.commands[i].name.toString()
            let mstl = `${msg.content}`;
            if (`${data.prefix}${dcn}`.toLowerCase() == `${msg.content}`.toLowerCase().split(' ')[0]) {

                runActionArray(i, msg, client)

            }} else { 
                    if (data.commands[i].trigger == 'messageContent') {

                        if (data.commands[i].trigger) {
                        let mstl = `${msg.content}`;
                        let dcn = data.commands[i].name.toString()``
                        if (mstl.toLowerCase().split(' ').includes(data.commands[i].name.toLowerCase()) && `${msg.content}`.toLowerCase().startsWith(data.prefix) == false) {

                            runActionArray(i, msg, client)

                        }}
                    }
                }
    
        }
            let tvars = require('./AppData/Toolkit/tempVars.json');
        }
    });
    const {Events} = require('discord.js')

    let commands = []

    for (let i in data.commands) {
        if (data.commands[i].trigger == 'slashCommand' && data.commands[i].type == 'action') {
            let description = 'No Description'
            let params = []
            let endParams = []

            description = data.commands[i].description
            if (description == undefined || description == null ) {
                hm = 'No Description!'
            }
            for (let param in data.commands[i].parameters) {
                let sw; 
                                let bl;
                                switch (data.commands[i].parameters[param].type) {
                                    case 'String':
                                        sw = ApplicationCommandOptionType.String
                                        break; 
                                    case 'Boolean':
                                        sw = ApplicationCommandOptionType.Boolean
                                        break
                                    case 'User':
                                        sw = ApplicationCommandOptionType.User
                                        break
                                    case 'Channel': 
                                        sw = ApplicationCommandOptionType.Channel
                                    break
                                    case 'Integer':
                                        sw = ApplicationCommandOptionType.Integer
                                    break
                                    case 'Role':
                                        sw = ApplicationCommandOptionType.Role
                                    break
                                    case 'Mentionable':
                                        sw = ApplicationCommandOptionType.Mentionable
                                    break
                                }
                                if (data.commands[i].parameters[param].required == true) {
                                    bl = false
                                } else {
                                    bl = true
                                }
                                let newCmd = {
                                    "name": data.commands[i].parameters[param].name.toLowerCase(),
                                    "type": sw,
                                    "required": bl,
                                    "description": data.commands[i].parameters[param].description
                                }
                                params.push(newCmd)            
            }
                
            if (params != [] && params[0]) {
                let cmdNm = data.commands[i].name.toLowerCase()
                const command = {
                    name: cmdNm,
                    description: description,
                    options: params
                  };
                
                  commands.push(command);
            } else {
                let cmdNm = data.commands[i].name.toLowerCase()  
                const command = {
                name: cmdNm,
                description: description
                };
            
              commands.push(command);  
            }
    
    
            //new SlashCommandBuilder()
            //.setName(data.commands[i].name)
            //.setDescription(description);
        }



            if (data.commands[i].type == 'event') {    
                let eventFile = require(`./AppData/Events/${data.commands[i].eventFile}`);
                  eventFile.run(data.commands[i].eventData, client, fs, runActionArray, i)
        }}

    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;
        console.log('interaction ran!')
        let startingPoint = null;
        for (let i in data.commands) {
            if (data.commands[i].trigger == 'slashCommand' && data.commands[i].type == 'action' && interaction.commandName == data.commands[i].name) {

                if (data.commands[i].parameters != undefined && data.commands[i].parameters[0] != undefined) {
                    for (let e in data.commands[i].parameters) {

                    let parameterTypes = data.commands[i].parameters[e].type
                    let values = data.commands[i].parameters[e].name
                    switch(parameterTypes) {
                        case 'String':
                             param = interaction.options.getString(values)
                        break
                        case 'Boolean': 
                             param = interaction.options.getBoolean(values)
                        break
                        case 'User':
                             param = interaction.options.getUser(values)
                        break
                        case 'Role':
                            param = interaction.options.getRole(values)
                       break
                        case 'Channel':
                             param = interaction.options.getChannel(values)
                        break
                        case 'Integer':
                             param = interaction.options.getInteger(values)
                        break
                        case 'Mentionable':
                            param = interaction.options.getMentionable(values)
                       break
                    }
                    if (data.commands[i].parameters[e].storeAs != undefined) {
                        startingPoint[data.commands[i].parameters[e].storeAs] = param
                    }
                     }
                    }
                fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tvars))


                runActionArray(i, message, client, startingPoint, true)
    }
    }
});

    const rest = new REST({ version: '9' }).setToken(data.btk);
    rest.put(Routes.applicationCommands(data.clientID), { body: commands })
        .then(() => console.log('Successfully registered slash commands.'))
        .catch(console.error);
    
    client.login(data.btk);
    } catch (err) {
console.log('oops! Studio Bot Maker just got run over by an error, here\'s more about it so you can report it: ', err)   
}