module.exports = {
    data: {"messageContent": "", "button": "✓", "name": "Reply To Interaction", "ExtraData": "", "sendTo":"", "ButtonRow":"", "elementAs":"Message*","ActionRow":"", "embedVar":"", "guild":"Message Guild", "guildField":""},
    UI: {"compatibleWith": ["Slash"], "text": "Interaction Reply","sepbar44423":"sepbar", "btextEmbVar":"Send", "menuBar1": {"choices": ["Message*", "Embed*"], storeAs: "elementAs", extraField: "ExtraData"}, "sepbarmenus":"sepbar", "btextmenus":"Ephemeral?", "ButtonBar":{"buttons": ["✓", "✕"]}, preview: "elementAs", previewName: "Send"},
    run(values, message, uID, fs, client) {
        if (values.elementAs == 'Message*') {
            let ephemeral;
            if (values.Button == '✓') {
                ephemeral = true
            } else {
                ephemeral = false
            }
            message.reply({content: values.ExtraData, ephemeral: ephemeral});
        } else {
            var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
            const emped = tempVars[uID][values.ExtraData]
            message.channel.send({ embeds: [emped] });
        }
    }
}
