module.exports = {
    data: {"messageContent": "", "storeAs":"", "to": "", "actionRows":[], "name": "Reply To Interaction", "ExtraData": "", "sendTo":""},
    UI: {"compatibleWith": ["Slash"], "text": "Reply To Interaction", "sepbar": "",
    "btext": "Message Content", "largeInput": "messageContent",      
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
                    buttons: []
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
                    btext4: "<div style='margin-top: 2vh;'></div>",
                    variableSettings: {
                        "userVariable": {
                            "User Variable*": "direct"
                        }
                    }
                }
            },
            selectMenu: {
                name: "Select Menu",
                data: {"await": "60", options: [], button: "✕", maxSelectable: 1, minSelectable: 1, storeInteractionAs:"", placeholder: ""},
                UI: {
                    text: "Select Menu",
                    sepbar: "",
                    btext: "Stop Waiting After (Seconds)",
                    "input custom number <max>9999999999999999999</max> <min>1</min>": "await",
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
                    btext5: "Disabled?",
                    ButtonBar: {buttons: ["✓", "✕"]},
                    sepbar5: "",
                    btext6: "Placeholder",
                    input1: "placeholder",
                    btext4: "<div style='margin-top: 2vh;'></div>",
                    variableSettings: {
                        "userVariable": {
                            "User Variable*": "direct"
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
            data: {title: "", embedColor: "#FFFFFF", footerContent: "", imageURL:"", footerIconURL:"", thumbnailURL:"", authorName: "", authorIcon: "", description: "", fields: []},
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
                btext7: "Embed Thumbnail URL",
                input6: "thumbnailURL",
                btext8: "Embed Image URL",
                input7: "imageURL",
                sepbar4: "", 
                btext9: "Description", 
                largeInput: "description",
                sepbar5:"",
                customMenu: {
                    name: "Fields",
                    max: 25,
                    types: {
                        "field": "Field"
                    },
                    UItypes: {
                        field: {
                            name: "Field",
                            data: {title: "", value: "", inline: "Yes"},
                            UI: {
                                text: "Field",
                                sepbar: "",
                                btext: "Field Title",
                                input: "title",
                                sepbar0: "",
                                btext0: "Field Value",
                                largeInput: "value",
                                sepbar1: "",
                                btext1: "Make Field Inline?",
                                menuBar: {choices: ["Yes", "No"], storeAs: "inline"}
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
    "btext0": "Get Interaction To Reply To Via:",
    "menuBar": {"choices": ["Command Interaction", "Variable*"], storeAs: "sendTo", extraField: "to"},
    "sepbar3":"",
    "btext2":"Ephemeral?",
    "menuBar0": {choices: ["Yes", "No"], storeAs: "ephemeral"},
    "sepbar4":"",
    "btext1": "Store Message As",
    "input0!": "storeAs",
    variableSettings: {
        "to": {
            "Variable*": "direct"
        }
    },
    "preview": "messageContent",
    "previewName": "Content"
    },
    async run(values, message, uID, fs, client, actionRunner, bridge) {
        const {InteractionTypes, ComponentTypes, ButtonStyles} = require('oceanic.js')
        let varTools = require(`../Toolkit/variableTools.js`)
        const interactionTools = require('../Toolkit/interactionTools.js')
        let endComponents = []
        let lastComponentNo = 0;
        let lastOptionNo = 0;
        let highestTimeDenominator = 0;
        var componentConnections = {}
        let messageStorage;
        var componentStorage = {}
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
                                label: varTools.transf(button.data.label, bridge.variables),
                                style: style,
                                disabled: button.data.button == '✓',
                                customID: lastOptionNo
                            })
                            componentConnections[lastOptionNo] = button.data.actions;
                        } else {
                            buttons.push({
                                type: ComponentTypes.BUTTON,
                                label: varTools.transf(button.data.label, bridge.variables),
                                style: ButtonStyles.LINK,
                                link: varTools.transf(button.data.link, bridge.variables),
                                customID: lastOptionNo
                            })
                        }
                        componentStorage[lastOptionNo] = components.data.storeInteractionAs;
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
                            label: varTools.transf(option.data.label, bridge.variables) || "-",
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
                            placeholder: varTools.transf(components.data.placeholder, bridge.variables),
                            disabled: components.data.button == '✓',
                            options: menuOptions
                        }]
                    })
                    componentStorage[lastOptionNo] = components.data.storeInteractionAs;
                }
            }
        }
        let embeds = [];
        for (let embed of values.embeds) {
            let endEmbed = {author: {}, footer: {}, fields: []}
            if (embed.data.title != "") {
                endEmbed.title = varTools.transf(`${embed.data.title}`, bridge.variables)
            } else {
                console.log('Reply To Interaction >> Embed >> Unset Title, Error Will Occur')
            }
            if (embed.data.authorName != "") {
                endEmbed.author.name = varTools.transf(`${embed.data.authorName}`, bridge.variables)
            }
            if (embed.data.authorIcon != "") {
                endEmbed.author.iconURL = varTools.transf(`${embed.data.authorIcon}`, bridge.variables)
                if (embed.data.authorName.trim() == '') {
                    console.log('Reply To Interaction >> Embed >> Author Icon Set, Author Name Unset -> Author Icon Will Not Show Up')
                }
            }
            if (embed.data.embedColor != "") {
                endEmbed.color = parseInt(embed.data.embedColor.replace("#", ""), 16)
            } else {
                endEmbed.color = 0
            }
            if (embed.data.footerContent != "") {
                endEmbed.footer.text = varTools.transf(`${embed.data.footerContent}`, bridge.variables);
            }
            if (embed.data.footerIconURL != "") {
                endEmbed.footer.iconURL = varTools.transf(`${embed.data.footerIconURL}`, bridge.variables);
                if (embed.data.footerContent.trim() == '') {
                    console.log('Reply To Interaction >> Embed >> Footer Icon Set, Footer Text Unset -> Footer Icon Will Not Show Up')
                }
            }
            if (embed.data.description != "") {
                endEmbed.description = varTools.transf(`${embed.data.description}`, bridge.variables)
            }
            if (embed.data.imageURL != "") {
                endEmbed.image = {
                    url: varTools.transf(embed.data.imageURL, bridge.variables)
                }
            }
            if (embed.data.thumbnailURL != "") {
                endEmbed.thumbnail = {
                    url: varTools.transf(embed.data.thumbnailURL, bridge.variables)
                }
            }
            if (embed.data.fields != []) {
                for (let field of embed.data.fields) {
                    endEmbed.fields.push({
                        name: varTools.transf(field.data.title, bridge.variables),
                        value: varTools.transf(field.data.value, bridge.variables),
                        inline: field.data.inline == 'Yes'
                    })
                }
            }
            embeds.push(endEmbed)
        }
        const handleInteraction = (interaction) => {
            if (interaction.type == InteractionTypes.MESSAGE_COMPONENT && interaction.message.id == messageStorage.id) {
                if (interaction.data.values) {
                    interaction.data.values.raw.forEach(async value => {
                        actionRunner(componentConnections[value], message, client, {...bridge.variables, [varTools.transf(componentStorage[value], bridge.variables)]: interaction}, true)
                    })
                } else {
                    actionRunner(componentConnections[interaction.data.customID], message, client, {...bridge.variables, [varTools.transf(componentStorage[interaction.data.customID], bridge.variables)]: interaction}, true)
                }
            }
        }
        
        let interactionPendingReply;
        
        if (values.sendTo == 'Variable*') {
            interactionPendingReply = bridge.variables[varTools.transf(values.to, bridge.variables)]
        }
        if (values.sendTo == 'Command Interaction') {
            interactionPendingReply = message;
        }

        interactionPendingReply.createMessage({content: varTools.transf(values.messageContent, bridge.variables), embeds: embeds , components: endComponents, flags: values.ephemeral == 'Yes' ? 64 : null}).then(async inter => {
            let msg = await interactionPendingReply.getOriginal()
            if (values.storeAs != "") {
                bridge.variables[values.storeAs] = msg
            }
            messageStorage = msg;
            client.on('interactionCreate', handleInteraction)
            setTimeout(() => {
                client.off('interactionCreate', handleInteraction)
            }, highestTimeDenominator * 1000)
        })
    }
}