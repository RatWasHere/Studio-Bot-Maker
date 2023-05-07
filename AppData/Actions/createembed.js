module.exports = {
    data: {"storeAs": "", "name": "Create Embed", "ExtraData": "", "sendTo":"", "title": "", "authorName": "", "authorIcon":"", "embedColor":"#000000", "footerContent":"", "description":""},
    UI: {"compatibleWith":["Any"], "texts": "Create Embed", "sepbar3":"sepbar", "btext9": "Embed Title", "input1*":"title","sepbarTitleColor":"", "btextColorText":"Color", "inputColor*":"embedColor","btextInputFooter":"Footer", "inputFooter":"footerContent", "sepbarEmbAuthor":"s", "btext1":"Author Name", "input7":"authorName", "btext4": "Author Icon URL", "input":"authorIcon", "sepbar44":"ddd", "btextdesctext":"Description", "largeInput":"description", "sepbarDescription":"", "btext4494":"Store As", "input44466!*": "storeAs", "preview": "storeAs", "previewName": "Store As"},
    run(values, message, uID, fs) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        let vals = {
            author: {}
        }
        if (values.title != "") {
            vals.title = varTools.transf(`${values.title}`, uID, tempVars)
        } else {
            console.log('Create Embed >> Empty title, proceeding to create the embed may become unstable')
        }
        if (values.authorName != "") {
            vals.author.name = varTools.transf(`${values.authorName}`, uID, tempVars)
        }
        if (values.authorIcon != "") {
            vals.author.icon_url = varTools.transf(`${values.authorIcon}`, uID, tempVars)
        }
        if (values.embedColor != "") {
            vals.color = parseInt(values.embedColor.replace("#", ""), 16)
        } else {
            vals.color = 0
        }
        if (values.footerContent != "") {
            vals.footer = {
                text: varTools.transf(`${values.footerContent}`, uID, tempVars)
            }
        }
        if (values.description != "") {
            vals.description = varTools.transf(`${values.description}`, uID, tempVars)
        }
        tempVars[uID] = {
            ...tempVars[uID],
            [values.storeAs]: vals
          };
        fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')
    }
}