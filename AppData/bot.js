try {
    const Discord = require('discord.js');
    const fs  = require('fs');
    const client = new Discord.Client({  intents: 3276799 })
    const { SlashCommandBuilder, ApplicationCommandOptionType } = require('discord.js');
    const { REST } = require('@discordjs/rest');
    const { Routes } = require('discord-api-types/v9');
    let data = JSON.parse(fs.readFileSync('./AppData/data.json'))
    let msgFunction;
    fs.writeFileSync('./AppData/Toolkit/tempVars.json', '{}')

    client.on('ready', () => {
        console.log('Studio Bot Maker V0.0.1 Project, started successfully!');
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', '{}')
    });
    
    const runActionArray =  (at, msg, client, actionBridge) => {
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        var date1 = new Date();
        var uniq = new Date(date1.getTime());            
        tempVars[uniq] = actionBridge
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars))

        for (let action in data.commands[at].actions) {

        if (tempVars[uniq][`ACTIONARRAY_stop`] == true) {
                if (data.commands[at].actions[data.commands[at].count] == data.commands[at].actions[action]) {
                setTimeout(
                    () => {
                delete tempVars[uniq]
                fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars))
                    }, 15
                )
            }
        } else {
            let acfile = require(`./AppData/Actions/${data.commands[at].actions[action].file}`)
             require(`./AppData/Actions/${data.commands[at].actions[action].file}`).run(data.commands[at].actions[action].data, msg, uniq, fs, client)
                if (data.commands[at].actions[data.commands[at].count] == data.commands[at].actions[action]) {
                setTimeout(
                    () => {
                delete tempVars[uniq]
                fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars))
                    }, 15
                )

            }
        }
    }

    /* END RUN ARRAY FUNCTION */
}
    client.on('messageCreate',  msg => {
        if (msg.author.bot) return
        for (let i in data.commands) {
            if (data.commands[i].type == 'action') {
                var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
                if (data.commands[i].trigger === 'textCommand') {
    
    
            let message = msg.content.split(data.prefix)[1]
            let dcn = data.commands[i].name.toString()
            let mstl = `${msg.content}`;
            if (`${data.prefix}${dcn}`.toLowerCase() == `${msg.content}`.toLowerCase().split(' ')[0]) {
    
                let tvars = require('./AppData/Toolkit/tempVars.json');
                var date1 = new Date();
                var uniq = new Date(date1.getTime());            tvars[uniq] = {}
                fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tvars))
                for (let action in data.commands[i].actions) {
                    var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))

                    if (tempVars[uniq][`ACTIONARRAY_stop`] == true) {
                            if (data.commands[i].actions[data.commands[i].count] == data.commands[i].actions[action]) {
                            setTimeout(
                                () => {
                            delete tvars[uniq]
                            fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tvars))
                                }, 15
                            )
        
                        }
                        break
                    } else {
                        let acfile = require(`./AppData/Actions/${data.commands[i].actions[action].file}`)
                         require(`./AppData/Actions/${data.commands[i].actions[action].file}`).run(data.commands[i].actions[action].data, msg, uniq, fs, client)
                            if (data.commands[i].actions[data.commands[i].count] == data.commands[i].actions[action]) {
                            setTimeout(
                                () => {
                            delete tvars[uniq]
                            fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tvars))
                                }, 15
                            )
        
                        }
                    }
                    delete tempVars
                }
            }
                } else { 
                    if (data.commands[i].trigger == 'messageContent') {

                        if (data.commands[i].trigger) {
                        let mstl = `${msg.content}`;
                        let dcn = data.commands[i].name.toString()
                        if (`${dcn}`.toLowerCase().startsWith(`${msg.content}`.toLowerCase()) && `${msg.content}`.toLowerCase().startsWith(data.prefix) == false) {
                            let tvars = require('./AppData/Toolkit/tempVars.json');
                            var date1 = new Date();
                            var uniq = new Date(date1.getTime());
                            tvars[uniq] = {}
                            fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tvars))
                            var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
                            for (let action in data.commands[i].actions) {
                                var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))

                                if (tempVars[uniq][`ACTIONARRAY_stop`] == true) {
                                        if (data.commands[i].actions[data.commands[i].count] == data.commands[i].actions[action]) {
                                        setTimeout(
                                            () => {
                                        delete tvars[uniq]
                                        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tvars))
                                            }, 15
                                        )
                    
                                    }
                                    break
                                } else {
                                    let acfile = require(`./AppData/Actions/${data.commands[i].actions[action].file}`)
                                     require(`./AppData/Actions/${data.commands[i].actions[action].file}`).run(data.commands[i].actions[action].data, msg, uniq, fs, client)
                                        if (data.commands[i].actions[data.commands[i].count] == data.commands[i].actions[action]) {
                                        setTimeout(
                                            () => {
                                        delete tvars[uniq]
                                        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tvars))
                                            }, 15
                                        )
                    
                                    }
                                }
                                delete tempVars
                            }; 
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
                                    bl = true
                                } else {
                                    bl = false
                                }
                                let newCmd = {
                                    "name": data.commands[i].parameters[param].name.toLowerCase(),
                                    "type": sw,
                                    "required": bl,
                                    "description": data.commands[i].parameters[param].description
                                }
                                params.push(newCmd)            
            }
                    for (let action in data.commands[i].actions) {
                        if (data.commands[i].actions[action].name == 'Create Parameter') {
                                
                        }
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
            let process = require('process').cwd()

            let tvars = require('./AppData/Toolkit/tempVars.json');
            var date1 = new Date();
            var uniq = new Date(date1.getTime());
            tvars[uniq] = {}
            fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tvars))
            var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))

                /* RUN ARRAY FUNCTION */

                        /* ENDED RUN ARRAY FUNCTION */



            let eventFile = require(`./AppData/Events/${data.commands[i].eventFile}`);

            eventFile.run(data.commands[i].eventData, client, fs, runActionArray, i)  
    }
    client.on(Events.InteractionCreate, interaction => {
        if (!interaction.isChatInputCommand()) return;
        for (let i in data.commands) {
            if (data.commands[i].trigger == 'slashCommand' && data.commands[i].type == 'action' && interaction.commandName.toLowerCase() == data.commands[i].name.toLowerCase()) {
                let tvars = require('./AppData/Toolkit/tempVars.json');

                var date1 = new Date();
                var uniq = new Date(date1.getTime());        
                tvars[uniq] = {}
                fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tvars))

                for (let action in data.commands[i].actions) {

                    require(`./AppData/Actions/${data.commands[i].actions[action].file}`).run(data.commands[i].actions[action].data, interaction, uniq, fs, client)
        }}
    }
    });
    const rest = new REST({ version: '9' }).setToken(data.btk);
    rest.put(Routes.applicationCommands(data.clientID), { body: commands })
        .then(() => console.log('Successfully registered slash commands.'))
        .catch(console.error);
    
    client.login(data.btk);
    }} catch (err) {
console.log('oops! Studio Bot Maker just got run over by an error, here\'s more about it so you can report it: ', err)    }