try {
    const Discord = require('discord.js');
    const fs  = require('fs');
    const client = new Discord.Client({  intents: 3276799 })
    const { SlashCommandBuilder } = require('discord.js');
    const { REST } = require('@discordjs/rest');
    const { Routes } = require('discord-api-types/v9');
    let data = require('./AppData/data.json')
    let msgFunction;
    ``
    client.on('ready', () => {
        console.log('Studio Bot Maker V0.0.1 Project, started successfully!');
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', '{}')
    });
    
    client.on('messageCreate', msg => {
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
                console.log('passed')
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

                                console.log(tempVars[uniq], 'tvuniq')
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
                // For Loop
                    for (let action in data.commands[i].actions) {
                        if (data.commands[i].actions[action].name == 'Modify Command') {
                            description = data.commands[i].actions[action].data.description
                        }
                        if (data.commands[i].actions[action].name == 'Create Parameter') {
                                let sw; 
                                let bl;
                                switch (data.commands[i].actions[action].data.choice) {
                                    case 'String':
                                        sw = 3
                                        break; 
                                    case 'Boolean':
                                        sw = 5;
                                        break
                                    case 'User':
                                        sw = 6
                                        break
                                    case 'Channel': 
                                        sw = 7
                                    break;
                                    case 'Integer':
                                        sw = 3
                                    break
                                }
                                if (data.commands[i].actions[action].data.button == '✕') {
                                    bl = false
                                } else {
                                    bl = true
                                }
                                let newCmd = {
                                    "name": data.commands[i].actions[action].data.paramName.toLowerCase(),
                                    "type": sw,
                                    "required": bl,
                                    "description": data.commands[i].actions[action].data.paramDesc
                                }
                                params.push(newCmd)            
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
              console.log(command, 'single, no params')
            }
            console.log(commands)
    
    
            //new SlashCommandBuilder()
            //.setName(data.commands[i].name)
            //.setDescription(description);
        }
    
        if (data.commands[i].type == 'event') {
            for (let act in data.commands[i].actions) {
                if (data.commands[i].actions[act].name == 'Declare Event') {
                    switch(data.commands[i].actions[act].data.choice) {
                        case 'Message Create':
                            client.on('messageCreate', (msg) => {
                                if (msg.author.bot) return
                                let tvars = require('./AppData/Toolkit/tempVars.json');
                            var date1 = new Date();
                            var uniq = new Date(date1.getTime());
                            tvars[uniq] = {}
                            fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tvars))
                for (let action in data.commands[i].actions) {
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
    
                }
                            })
                        break
                        case 'Message Delete': 
                        client.on('messageDelete', (msg) => {
                            let tvars = require('./AppData/Toolkit/tempVars.json');
                            var date1 = new Date();
    var uniq = new Date(date1.getTime());
                            tvars[uniq] = {}
                            fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tvars))
                for (let action in data.commands[i].actions) {
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
    
                }
                        })
                        break
                        case 'Message Update':
                            console.log('message update registered')
                            client.on('messageUpdate', async (msg1, msg2) => {
                                const msg = [msg1, msg2]
    
                                let tvars = require('./AppData/Toolkit/tempVars.json');
                                var date1 = new Date();
                                var uniq = new Date(date1.getTime());            tvars[uniq] = {}
                                fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tvars))
                                for (let action in data.commands[i].actions) {
                                    let acfile = require(`./AppData/Actions/${data.commands[i].actions[action].file}`)
                                    require(`./AppData/Actions/${data.commands[i].actions[action].file}`).run(data.commands[i].actions[action].data, msg, uniq, fs, client)
                                    if (data.commands[i].actions[data.commands[i].count] == data.commands[i].actions[action]) {
                                        setTimeout(
                                            () => {
                                                null
                                        //delete tvars[uniq]
                                        //fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tvars))
                                            }, 
                                        )
                                    }
                                }
                            })
                        break
                        case 'Bot Ready': 
                        client.on('ready', () => {
                            let tvars = require('./AppData/Toolkit/tempVars.json');
                            var date1 = new Date();
                            var uniq = new Date(date1.getTime());
                            tvars[uniq] = {}
                            fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tvars))
                for (let action in data.commands[i].actions) {
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
    
                }
                        })
                    break
                        case 'Channel Create': 
                        client.on('channelCreate', (msg) => {
                            let tvars = require('./AppData/Toolkit/tempVars.json');
                            var date1 = new Date();
                            var uniq = new Date(date1.getTime());
                            tvars[uniq] = {}
                            fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tvars))
                for (let action in data.commands[i].actions) {
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
    
                }
                        }) 
                        break
                        case 'Channel Update': 
                        client.on('channelUpdate', (msg1, msg2) => {
                            const msg = [msg1, msg2]
                            let tvars = require('./AppData/Toolkit/tempVars.json');
                            var date1 = new Date();
                            var uniq = new Date(date1.getTime());
                            tvars[uniq] = {}
                            fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tvars))
                for (let action in data.commands[i].actions) {
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
    
                }
                        })
                        break
                        case 'Channel Delete': 
                            client.on('channelDelete', (msg) => {
                                let tvars = require('./AppData/Toolkit/tempVars.json');
                                var date1 = new Date();
                                var uniq = new Date(date1.getTime());
                                tvars[uniq] = {}
                                fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tvars))
                                for (let action in data.commands[i].actions) {
                                    let acfile = require(`./AppData/Actions/${data.commands[i].actions[action].file}`)
                                    require(`./AppData/Actions/${data.commands[i].actions[action].file}`).run(data.commands[i].actions[action].data, msg, uniq, fs, client)
                                    if (data.commands[i].actions[data.commands[i].count] == data.commands[i].actions[action]) {
                                        setTimeout(
                                            () => {
                                        delete tvars[uniq]
                                        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tvars))
                                            }, 150
                                        )
                                    }
                                }
                            })
                        break
                        case 'Member Leave': 
                        client.on('guildMemberRemove', (msg) => {
                            let tvars = require('./AppData/Toolkit/tempVars.json');
                            var date1 = new Date();
                            var uniq = new Date(date1.getTime());
                            tvars[uniq] = {}
                            fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tvars))
                for (let action in data.commands[i].actions) {
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
    
                }
                        })
                        break
                        case 'Member Join': 
                        client.on('guildMemberAdd', (msg) => {
                            let tvars = require('./AppData/Toolkit/tempVars.json');
                            var date1 = new Date();
                            var uniq = new Date(date1.getTime());
                            tvars[uniq] = {}
                            fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tvars))
                            for (let action in data.commands[i].actions) {
                                let acfile = require(`./AppData/Actions/${data.commands[i].actions[action].file}`)
                                require(`./AppData/Actions/${data.commands[i].actions[action].file}`).run(data.commands[i].actions[action].data, msg, uniq, fs, client)
                                if (data.commands[i].actions[data.commands[i].count] == data.commands[i].actions[action]) {
                                    setTimeout(
                                        () => {
                                    delete tvars[uniq]
                                    fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tvars))
                                        }, 1444444444444450
                                    )
                                }
                            }
                        })
                        break
                    }
                }
            }
        }
    }
    client.on(Events.InteractionCreate, interaction => {
        if (!interaction.isChatInputCommand()) return;
        for (let i in data.commands) {
            if (data.commands[i].trigger == 'slashCommand' && data.commands[i].type == 'action' && interaction.commandName.toLowerCase() == data.commands[i].name.toLowerCase()) {
                for (let action in data.commands[i].actions) {
                    var date1 = new Date();
                    var uniq = new Date(date1.getTime());        require(`./AppData/Actions/${data.commands[i].actions[action].file}`).run(data.commands[i].actions[action].data, interaction, uniq, fs, client)
        }}
    }
    });
    const rest = new REST({ version: '9' }).setToken(data.btk);
    rest.put(Routes.applicationCommands(data.clientID), { body: commands })
        .then(() => console.log('Successfully registered slash commands.'))
        .catch(console.error);
    
    client.login(data.btk);
    } catch (err) {
null    }