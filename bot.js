let colors = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",

  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m",
  FgCyan: "\x1b[36m",
  FgWhite: "\x1b[37m",
  FgGray: "\x1b[90m",

  BgBlack: "\x1b[40m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgYellow: "\x1b[43m",
  BgBlue: "\x1b[44m",
  BgMagenta: "\x1b[45m",
  BgCyan: "\x1b[46m",
  BgWhite: "\x1b[47m",
  BgGray: "\x1b[100m",
};
const fs = require("fs");

  /* The Data, We Need It! */ let data = JSON.parse(
    fs.readFileSync("./AppData/data.json"),
  );

try {
  const discord = require("oceanic.js");
  const {
    ApplicationCommandOptionTypes,
    ApplicationCommandTypes,
    InteractionTypes,
    CommandInteraction,
    PermissionNames,
  } = require("oceanic.js");
  const client = new discord.Client({
    auth: `Bot ${data.btk}`,
    gateway: {
      intents: ["ALL"],
    },
  });
  client.connect();
  let eventStorage = {}

  /* Project Startup */ console.log(
    `${colors.BgWhite}${colors.FgBlack}${data.name}${colors.Reset}${colors.FgCyan} is starting up...${colors.Reset}`,
  );
  client.on("ready", async () => {
    /* Project Start */ console.log(
      `${colors.FgGreen}Studio Bot Maker V3.1.1 Project, started successfully!${colors.Reset}`,
    );

    await client.application.bulkEditGlobalCommands([]);
    console.log(
      `${colors.BgGreen + colors.FgBlack}Purged All Slash Commands${
        colors.Reset
      }`,
    );

    registerCommands();
  });

  let IO /* In / Out */  = {
    write: (newIO) => { 
      try {
        let dir = data.prjSrc;
        fs.writeFileSync(`${dir}/AppData/Toolkit/storedData.json`, JSON.stringify(newIO))
      } catch (err) {
        console.log(`${colors.BgRed}${colors.FgWhite}Something Went Wrong Whilst Trying To Write To The Data System, Ensure You've Exported Your Bot!${colors.Reset}`)
      }
    },
    get: () => { 
      try {
        let dir = data.prjSrc;
        return JSON.parse(fs.readFileSync(`${dir}/AppData/Toolkit/storedData.json`, 'utf8'));
      } catch (err) {
        console.log(`${colors.BgRed}${colors.FgWhite}Something Went Wrong Whilst Trying To Access The Data System, Ensure You've Exported Your Bot!${colors.Reset}`)
      }
    }
  }

  /* Used For Running Action Arrays - Universal Action Array Runner */
  const runActionArray = async (at, interaction, client, actionBridge) => {
    new Promise(async (resolve) => {
      let cmdActions;
      let cmdName = "Inbuilt";
      let cmdAt = "Inbuilt";
      if (typeof at == "string") {
        cmdActions = data.commands[at].actions;
        cmdName = data.commands[at].name;
        cmdAt = at;
      } else {
        cmdActions = at;
      }
      let globalActionCache = {};
      if (typeof actionBridge == 'object' && !actionBridge.globalActionCache) {
        globalActionCache = {globalActionCache: {}}
      }
      let actionContextBridge = {
        guild: interaction.guild || null,
        stopActionRun: false,
        variables: typeof actionBridge == "object" ? {...actionBridge,  ...globalActionCache} : {globalActionCache: {}},
        data: {
          ranAt: cmdAt,
          nodeName: cmdName,
          allActions: cmdActions,
          IO: IO
        },
        runner: runActionArray,
        fs: fs,
        toMember: async (user, guild) => {
          if (user.guild) return user
          return await guild.getMember(user.id)
        },
        toUser: async (member) => {
          if (member.createDM) return member
          return client.users.get(member.id) || await client.rest.users.get(member.id)
        }
      };
      for (let action in cmdActions) {
        if (cmdActions[action] != undefined) {
        /* See If The Thing Is Meant To Keep Going! */
        if (actionContextBridge.stopActionRun == false) {
          try {
            /* Run The Action, Make It Happen! */
            await require(`./AppData/Actions/${cmdActions[action].file}`).run(
              cmdActions[action].data,
              interaction,
              client,
              actionContextBridge,
            );
          } catch (err) {
            /* Alert The User Of The Error */
            console.log(
              `${colors.BgRed}${colors.FgBlack}${cmdName} ${
                colors.FgBlack + colors.BgWhite
              }(@#${cmdAt})${
                colors.Reset + colors.BgRed + colors.FgBlack
              } >>> ${
                require(`./AppData/Actions/${cmdActions[action].file}`).data
                  .name
              } ${colors.FgBlack + colors.BgWhite}(@#${action})${
                colors.Reset + colors.BgRed + colors.FgBlack
              } >>> Error: ${err}${colors.Reset}`,
            );
            console.log(err);
          }
        } else {
          resolve();
          return;
        }
      }
    }
      resolve();
    });
  };
  client.on("messageCreate", async (msg) => {
    if (msg.author.bot) return;
    for (let i in data.commands) {
      if (data.commands[i].type == "action") {
        let command = data.commands[i];
        let commandName = data.commands[i].name;

        if (command.trigger == "textCommand") {
          if (`${data.prefix}${commandName}`.toLowerCase() == msg.content.split(" ")[0].toLowerCase()) {
            let matchesPermissions = true;  
            if (command.boundary) {
              if (command.boundary.worksIn == "guild") {
                if (!msg.guild) {
                  matchesPermissions = false;
                }
              }
              if (command.boundary.worksIn == "dms") {
                if (msg.guild) {matchesPermissions = false}
              }

              for (let permission in command.boundary.limits) {
                if (msg.member.permissions.has(command.boundary.limits[permission]) == false) {
                  matchesPermissions = false;
                }
              }
            }
            if (matchesPermissions == true) {
              runActionArray(i, msg, client);
            }
          }
        } else {
          if (command.trigger == "messageContent") {
            let messageContent = `${msg.content}`;
            if (messageContent.toLowerCase().split(" ").includes(command.name.toLowerCase()) &&`${msg.content}`.toLowerCase().startsWith(data.prefix) == false) {
              let matchesPermissions = true;
              if (command.boundary) {
                if (command.boundary.worksIn == "guild") {
                  if (!msg.guild) {
                    matchesPermissions = false;
                  }
                }
                if (command.boundary.worksIn == "dms") {
                  if (msg.guild) matchesPermissions = false;
                }

                for (let permission in command.boundary.limits) {
                  if (msg.member.permissions.has(command.boundary.limits[permission]) == false) {matchesPermissions = false;}
                }
              }
              if (matchesPermissions == true) {
                runActionArray(i, msg, client);
              }
            }
          }
        }
      }
    }
  });

  let commands = [];
  for (let i in data.commands) {
    if (
      data.commands[i].trigger == "slashCommand" &&
      data.commands[i].type == "action"
    ) {
      /* Soon To Be Added In V3 */
      let description = "No Description";
      /* Soon To Be Added In V3 */
      let parameterDefaultDescription = "No Description";
      let commandParameters = [];

      if (
        description == undefined ||
        description == null ||
        description.replace(/\s/g, "").length == 0
      ) {
        description = "No Description!";
      } else {
        description = data.commands[i].description;
      }
      for (let parameter of data.commands[i].parameters) {
        let parameterType;
        let isRequired;
        let parameterDescription = parameterDefaultDescription;
        switch (parameter.type.toLowerCase()) {
          case "string":
            parameterType = ApplicationCommandOptionTypes.STRING;
            break;
          case "boolean":
            parameterType = ApplicationCommandOptionTypes.BOOLEAN;
            break;
          case "user":
            parameterType = ApplicationCommandOptionTypes.USER;
            break;
          case "channel":
            parameterType = ApplicationCommandOptionTypes.CHANNEL;
            break;
          case "integer":
            parameterType = ApplicationCommandOptionTypes.INTEGER;
            break;
          case "role":
            parameterType = ApplicationCommandOptionTypes.ROLE;
            break;
        }

        if (parameter.description.trim() != "") {
          parameterDescription = parameter.description;
        }

        /* Create & Push The Parameter */
        let endParameter = {
          name: parameter.name.toLowerCase(),
          type: parameterType,
          required: parameter.required,
          description: parameter.description,
        };
        commandParameters.push(endParameter);
      }
      /* Moving On To The Command In Itself */
      if (commandParameters != [] && commandParameters[0]) {
        let commandName = data.commands[i].name.trim().toLowerCase();
        const command = {
          name: commandName,
          description: description,
          options: commandParameters,
        };
        commands.push(command);
      } else {
        let commandName = data.commands[i].name.trim().toLowerCase();
        const command = {
          name: commandName,
          description: description,
        };
        commands.push(command);
      }
    }
    if (data.commands[i].type == "event") {
      let event = require(`./AppData/Events/${data.commands[i].eventFile}`);
      /* Initialize The Event */
      // eventData: Array made of 2 elements; Based on the event, only one or two of them will be used.
      // client: client
      // fs: bot.js file system
      // runActionArray: action runner
      // i: where the command's at
      // eventStorage: shared event storage
      event.run(data.commands[i].eventData, client, fs, runActionArray, i, eventStorage);
    }
  }
  client.on("interactionCreate", async (interaction) => {
    /* Check If The Interaction Was A Slash Command Or Not */
    if (interaction.data.type != ApplicationCommandTypes.CHAT_INPUT) return;
    /* Ability To Change These Soon To Be Added In V3.1 */
    let defaultStringReturn = "-";
    let defaultBooleanReturn = false;
    let defaultUserReturn = null;
    let defaultRoleReturn = null;
    let defaultChannelReturn = null;
    let defaultIntegerReturn = 0;
    let defaultMentionableReturn = null;

    /* Storage For Parameters */
    let commandParametersStorage = {};
    for (let i in data.commands) {
      if (
        data.commands[i].trigger == "slashCommand" &&
        data.commands[i].type == "action" &&
        interaction.data.name == data.commands[i].name
      ) {
        if (
          data.commands[i].parameters != undefined &&
          data.commands[i].parameters[0] != undefined
        ) {
          for (let e in data.commands[i].parameters) {
            let parameterType = data.commands[i].parameters[e].type;
            let values = data.commands[i].parameters[e].name;
            let option;

            switch (parameterType) {
              case "string":
                option =
                  interaction.data.options.getString(values, false) ||
                  defaultStringReturn;
                break;
              case "boolean":
                option =
                  interaction.data.options.getBoolean(values, false) ||
                  defaultBooleanReturn;
                break;
              case "user":
                option =
                  interaction.data.options.getUser(values, false) ||
                  defaultUserReturn;
                break;
              case "role":
                option =
                  interaction.data.options.getRole(values, false) ||
                  defaultRoleReturn;
                break;
              case "channel":
                option =
                  interaction.data.options.getChannel(values, false) ||
                  defaultChannelReturn;
                break;
              case "integer":
                option =
                  interaction.data.options.getInteger(values, false) ||
                  defaultIntegerReturn;
                break;
            }
            commandParametersStorage[data.commands[i].parameters[e].storeAs] = option;
          }
        }
        let command = data.commands[i];
        let matchesPermissions = true;
        if (command.boundary) {
          if (command.boundary.worksIn == "guild") {
            if (!interaction.guild) {
              matchesPermissions = false;
            }
          }
          if (command.boundary.worksIn == "dms") {
            if (interaction.guild) matchesPermissions = false;
          }

          for (let permission in command.boundary.limits) {
            if (interaction.member.permissions.has(command.boundary.limits[permission]) == false) {matchesPermissions = false;}
          }
        }

        interaction.author = interaction.user;
        if (matchesPermissions) {
          runActionArray(i, interaction, client, commandParametersStorage);
        }
      }
    }
  });

  function registerCommands() {
    for (let command of commands) {
      if (!command.options) {
        client.application.createGlobalCommand({
          type: ApplicationCommandTypes.CHAT_INPUT,
          name: command.name,
          description: command.description || 'No Description',
          dmPermission: false
        });
      } else {
        client.application.createGlobalCommand({
          type: ApplicationCommandTypes.CHAT_INPUT,
          name: command.name,
          description: command.description || 'No Description',
          options: command.options,
          dmPermission: false
        });
      }
      console.log(
        `${colors.Dim}(Slash Commands)${colors.Reset} - ${colors.BgGreen}${command.name}${colors.Reset} Has Been Released Into The Open!`,
      );
    }
    console.log(
      `${colors.FgGreen}All Slash Commands Have Been Registered!${colors.Reset}`,
    );
  }
} catch (err) {
  console.log(
    colors.Reset,
    colors.FgRed,
    colors.Underscore,
    `Oops! An error has occured!`,
    err,
    colors.Reset,
  );
}
