module.exports = {
    data: {"messageContent": "", "storeAs":"", "sendTo":"Command Channel", "to": "", "actionRows":[], "name": "Send Message", "ExtraData": "", "sendTo":""},
    UI: {"compatibleWith": ["Text", "Slash", "DM"], "text": "Send Message", "sepbar": "",
    "btext": "Reply", "largeInput": "messageContent",
    "sepbar0":"",
    "customMenu": {
        name: "Components",
        max: 5,
        "types": {
            "buttons": "Button Row",
            "selectMenu": "Select Menu"
        },
        "UItypes": {
            buttons: {
                name: "Button Row",
                data: {
                    stopAwaitingAfter: "5",
                    buttons: [],
                    interactionLimit: "Command Author",
                    userVariable: ""
                },
                UI: {
                    text:"Button Row",
                    sepbar: "",
                    "btext temp": "Stop Awaiting Button Press After (Seconds)",
                    "input custom number <min>1</min> <max>99999999</max>": "stopAwaitingAfter",
                    sepbar0:"",
                    btext2: "Store Interaction As",
                    "input!": "storeInteractionAs",
                    sepbar1:"",
                    customMenu: {
                        name: "Buttons",
                        max: 5,
                        types: {
                            "normal": "Basic Button",
                            "link": "Link Button"
                        },
                        UItypes: {
                            "normal": {
                                name: "Button",
                                data: {label: "Button", color: "Default", actions: {}, button: "✕"},
                                UI: {
                                text: "Button",
                                sepbar: "",
                                btext: "Button Label",
                                input: "label",
                                sepbar0: "",
                                btext0: "Button Style",
                                menuBar: {choices: ["Default", "Success", "Danger", "Neutral"], storeAs: "color"},
                                sepbar1:"",
                                btext1: "Disabled?",
                                ButtonBar: {buttons: ["✓", "✕"]},
                                sepbar2: "",
                                btext2: "Once Clicked, Run",
                                actions: "actions"
                                }
                            },
                            "link": {
                                name: "Button",
                                data: {label: "Button", link: "", actions: {}},
                                UI: {
                                text: "Button",
                                sepbar: "",
                                btext: "Button Label",
                                input: "label",
                                sepbar0: "",
                                btext0: "Button Link",
                                input0: "link",
                                sepbar1: "",
                                btext1: "Once Clicked, Run",
                                actions: "actions"
                                }
                            }
                        },
                        storeAs: "buttons"
                    },
                    sepbar2:"",
                    btext3: "Usable By:",
                    menuBar: {choices: ["Command Author", "User*", "Anybody"], storeAs: "interactionLimit", extraField: "userVariable"},
                    invisible:"",
                    btext4: "<div style='margin-top: 2vh;'></div>",
                    variableSettings: {
                        "userVariable": {
                            "User*": "direct"
                        }
                    }
                }
            },
            selectMenu: {
                name: "Select Menu",
                data: {"await": "60", options: [], button: "✕", maxSelectable: 1, minSelectable: 1, storeInteractionAs:"", interactionLimit: "", userVariable:"", placeholder: ""},
                UI: {
                    text: "Select Menu",
                    sepbar: "",
                    btext: "Stop Waiting After (Seconds)",
                    input: "await",
                    sepbar0: "",
                    btext0: "Max Selectable",
                    "input custom number <max>25</max> <min>1</min>": "maxSelectable",
                    btext1: "Min Selectable",
                    "input custom number <min>1</min> <max>25</max>": "minSelectable",
                    sepbar1:"",
                    btext2: "Store Interaction As",
                    "input!": "storeInteractionAs",
                    sepbar2: "",
                    customMenu: {
                        max: 25,
                        name: "Options",
                        types: {
                            selectMenu: "Select Menu"
                        },
                        UItypes: {
                            selectMenu: {
                                name: "Select Menu Option",
                                data: {"actions": {}, label: "", button: "✕"},
                                UI: {
                                    text: "Select Menu Option",
                                    sepbar: "",
                                    btext: "Label",
                                    input: "label",
                                    sepbar0: "",
                                    btext0: "If selected, Run:",
                                    actions: "actions",
                                    sepbar1: "",
                                    btext1: "Disabled?",
                                    ButtonBar: {buttons: ["✓", "✕"]},
                                }
                            }
                        },
                        storeAs: "options"
                    },
                    sepbar3: "",
                    btext3: "Usable By:",
                    menuBar: {choices: ["Command Author", "User*", "Anybody"], storeAs: "interactionLimit", extraField: "userVariable"},
                    sepbar4:"",
                    btext5: "Disabled?",
                    ButtonBar: {buttons: ["✓", "✕"]},
                    sepbar5: "",
                    btext6: "Placeholder",
                    input1: "placeholder",
                    btext4: "<div style='margin-top: 2vh;'></div>",
                    variableSettings: {
                        "userVariable": {
                            "User*": "direct"
                        }
                    }
                }
            }
        },
        storeAs: "actionRows"
    },
    "sepbar1":"",
    "customMenu0": {
        name: 'Embeds',
        max: 10,
        types: {
            "embed": "Embed"
        },
        UItypes: {
            embed: {
            name: "Embed",
            data: {title: "", embedColor: "#FFFFFF", footerContent: "", footerIconURL:"", authorName: "", authorIcon: "", description: "", fields: []},
                UI: {
                text: "Embed",
                sepbar: "",
                btext: "Embed Title",
                input: "title",
                sepbar0:"",
                btext1: "Color",
                input1: "embedColor", 
                sepbar1: "",
                btext2: "Footer Content", 
                input2: "footerContent", 
                btext3: "Footer Icon URL",
                input3: "footerIconURL",
                sepbar2: "", 
                btext4: "Author Name", 
                input4: "authorName", 
                btext5: "Author Icon URL",
                input5: "authorIcon", 
                sepbar3: "", 
                btext6: "Description", 
                largeInput: "description",
                sepbar4: "",
                customMenu: {
                    name: "Fields",
                    max: 25,
                    types: {
                        "field": "Field"
                    },
                    UItypes: {
                        field: {
                            name: "Field",
                            data: {title: "", value: ""},
                            UI: {
                                text: "Field",
                                sepbar: "",
                                btext: "Field Title",
                                input: "title",
                                sepbar0: "",
                                btext0: "Field Value",
                                largeInput: "value" 
                            }
                        }
                    },
                    storeAs: "fields"
                }
            }
            }
        },
        storeAs: "embeds"
    },
    "sepbar2":"",
    "btext0": "Get Object To Reply To Via:",
    "menuBar": {"choices": ["Command Message", "Message*", "Message ID*", "Interaction*"], storeAs: "sendTo", extraField: "to"},
    "sepbar3":"",
    "btext1": "Store Message As",
    "input0!": "storeAs",
    variableSettings: {
        "to": {
            "Message*": "direct",
            "Interaction*": "direct"
        }
    },
    "preview": "messageContent",
    "previewName": "Content"
    },
    async run(values, message, uID, fs, client, actionRunner) {
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        const {InteractionTypes, ComponentTypes, ButtonStyles} = require('oceanic.js')
        let tempVrz = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json'));
        let varTools = require(`../Toolkit/variableTools.js`)
        const interactionTools = require('../Toolkit/interactionTools.js')
        let endComponents = []
        let lastComponentNo = 0;
        let lastOptionNo = 0;
        let highestTimeDenominator = 0;
        var componentConnections = {}
        if (typeof values.actionRows == 'object' && values.actionRows != []) {
            for (let components of values.actionRows) {
                if (components.type == 'buttons') {
                    if (components.data.stopAwaitingAfter > highestTimeDenominator) {
                        highestTimeDenominator = components.data.stopAwaitingAfter
                    }
                    lastOptionNo++
                    let buttons = []
                    for (let button of components.data.buttons) {
                        lastOptionNo++
                        if (button.type == 'normal') {
                            let style;
                            switch (button.data.color) {
                                case 'Default':
                                    style = ButtonStyles.PRIMARY
                                break
                                case 'Success': 
                                    style = ButtonStyles.SUCCESS
                                break
                                case 'Danger':
                                    style = ButtonStyles.DANGER
                                break
                                case 'Neutral':
                                    style = ButtonStyles.SECONDARY
                                break
                            }
                            buttons.push({
                                type: ComponentTypes.BUTTON,
                                label: varTools.transf(button.data.label, uID, tempVars),
                                style: style,
                                disabled: button.data.button == '✓',
                                customID: lastOptionNo
                            })
                            componentConnections[lastOptionNo] = button.data.actions;
                        } else {
                            buttons.push({
                                type: ComponentTypes.BUTTON,
                                label: varTools.transf(button.data.label, uID, tempVars),
                                style: ButtonStyles.LINK,
                                link: varTools.transf(button.data.link, uID, tempVars),
                                customID: lastOptionNo
                            })
                        }
                    }
                    endComponents.push({
                        type: ComponentTypes.ACTION_ROW,
                        components: buttons
                    })
                } else {
                    if (components.data.await > highestTimeDenominator) {
                        highestTimeDenominator = components.data.await
                    }
                    lastComponentNo++
                    let menuOptions = []
                    for (let option of components.data.options) {
                        lastOptionNo++
                        componentConnections[`${lastOptionNo}`] = option.data.actions;
                        menuOptions.push({
                            label: varTools.transf(option.data.label, uID, tempVars) || "-",
                            value: `${lastOptionNo}`,
                            disabled: option.data.button == '✓'
                        })
                    }
                    endComponents.push({
                        type: ComponentTypes.ACTION_ROW,
                        disabled: components.data.button == '✓',
                        components: [{
                            type: ComponentTypes.STRING_SELECT,
                            customID: `${lastComponentNo}`,
                            minValues: components.data.minSelectable,
                            maxValues: components.data.maxSelectable,
                            placeholder: varTools.transf(components.data.placeholder, uID, tempVars),
                            disabled: components.data.button == '✓',
                            options: menuOptions
                        }]
                    })
                }
            }
        }
        let embeds = [];
        for (let embed of values.embeds) {
            let endEmbed = {author: {}, footer: {}, fields: []}
            if (embed.data.title != "") {
                endEmbed.title = varTools.transf(`${embed.data.title}`, uID, tempVars)
            } else {
                console.log('Send Message >> Embed >> Unset Title, Error Will Occur')
            }
            if (embed.data.authorName != "") {
                endEmbed.author.name = varTools.transf(`${embed.data.authorName}`, uID, tempVars)
            }
            if (embed.data.authorIcon != "") {
                endEmbed.author.icon_url = varTools.transf(`${embed.data.authorIcon}`, uID, tempVars)
                if (embed.data.authorName.trim() == '') {
                    console.log('Send Message >> Embed >> Author Icon Set, Author Name Unset -> Author Icon Will Not Show Up')
                }
            }
            if (embed.data.embedColor != "") {
                endEmbed.color = parseInt(embed.data.embedColor.replace("#", ""), 16)
            } else {
                endEmbed.color = 0
            }
            if (embed.data.footerContent != "") {
                endEmbed.footer.text = varTools.transf(`${embed.data.footerContent}`, uID, tempVars);
            }
            if (embed.data.footerIconURL != "") {
                endEmbed.footer.iconURL = varTools.transf(`${embed.data.footerIconURL}`, uID, tempVars);
                if (embed.data.footerContent.trim() == '') {
                    console.log('Send Message >> Embed >> Footer Icon Set, Footer Text Unset -> Footer Icon Will Not Show Up')
                }
            }
            if (embed.data.description != "") {
                endEmbed.description = varTools.transf(`${embed.data.description}`, uID, tempVars)
            }
            console.log(embed.data)
            if (embed.data.fields != []) {
                for (let field of embed.data.fields) {
                    endEmbed.fields.push({
                        name: varTools.transf(field.data.title, uID, tempVars),
                        value: varTools.transf(field.data.value, uID, tempVars)
                    })
                }
            }
            embeds.push(endEmbed)
        }
        const handleInteraction = (interaction, msg) => {
            if (interaction.type == InteractionTypes.MESSAGE_COMPONENT && interaction.message.id == msg.id) {
                if (interaction.data.values) {
                    interaction.data.values.raw.forEach(async value => {
                        actionRunner(componentConnections[value], message, client, tempVars[uID], true)
                    })
                } else {
                    actionRunner(componentConnections[interaction.data.customID], message, client, tempVars[uID], true)
                }
            }
        }

        let replyTarget;
        let replyTargetID;
        if (values.sendTo == 'Command') {
            replyTarget = message.channel;
            replyTargetID = message.id;
        }
        if (values.sendTo == 'Message*') {
            replyTarget = client.getChannel(tempVars[uID][varTools.transf(values.to, uID, tempVars)].channel.id).getMessage(tempVars[uID][varTools.transf(values.to, uID, tempVars)].id).channel
            replyTargetID = message.id
        }

        replyTarget.createMessage({content: varTools.transf(values.messageContent, uID, tempVrz), embeds: embeds , components: endComponents, messageReference: {messageId: tempVars[uID][varTools.transf(values.to, uID, tempVars)].id,}}).then(msg => {
            if (values.storeAs != "") {
                tempVars[uID][values.storeAs] = msg
                fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
            }
            client.on('interactionCreate', handleInteraction(interaction, msg))
            setTimeout(() => {
                client.off('interactionCreate', handleInteraction(interaction, msg))
            }, highestTimeDenominator * 1000)
        })
    }
}

