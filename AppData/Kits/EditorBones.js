let version = 3
const { app, ipcRenderer } = require('electron');
let selectedGroupType = 'text'
function editAction() {
    let variables = []
    let actionType = 'text'
    if (botData.commands[lastObj].type == 'event') {
        actionType = 'event'
        try {
            if (require('./AppData/Events/' + botData.commands[lastObj].eventFile).inputSchemes == 2) {
                variables.push(botData.commands[lastObj].eventData[0]);
                variables.push(botData.commands[lastObj].eventData[1]);
            } else {
                variables.push(botData.commands[lastObj].eventData[0])
            }
        } catch(err) {null}
    } else {
        if (botData.commands[lastObj].trigger == 'slashCommand') {
            actionType = 'slash'
            if (botData.commands[lastObj].parameters) {
            for (let parameter of botData.commands[lastObj].parameters) {
                variables.push(parameter.storeAs)
            }
            }

        }
    }

    for (let action in botData.commands[lastObj].actions) {
        try {
            let actionUI = require(`./AppData/Actions/${botData.commands[lastObj].actions[action].file}`).UI
            for (let UIelement in actionUI) {
                if (UIelement.startsWith('input')) {
                    if (UIelement.endsWith(`!*`) || UIelement.endsWith('!')) {
                        variables.push(botData.commands[lastObj].actions[action].data[actionUI[UIelement]])
                    }
                }
            }
        } catch (err) {}
    }
    // document.body.style.opacity = '80%'

    ipcRenderer.send('editAction', {
        action: lastAct,
        actions: botData.commands[lastObj].actions,
        variables: variables,
        actionType: actionType
    })
}
ipcRenderer.on('childSave', (event, data) => {
    console.log(data)
    botData.commands[lastObj].actions[lastAct] = data;
    wast()
    refreshActions()
})

ipcRenderer.on('childClose', () => {
    document.body.style.opacity = '100%'
})

let lastMenuOption;
let lastHovered;
let customHTMLdfs;
let customHTMLreturn;
let lastDraggedRow;
let menu = null;
let errorPending = false;
const fs = require('fs');
const processPath = require('process').cwd();
const path = require('path')
var botData = JSON.parse(fs.readFileSync(processPath +'/AppData/data.json'))
let lastType = 0 // 0 = Command; 1 = Actions;
let lastObj = "1"
let lastAct = "1"
let lastParam;
let lastHighlighted;
let themeColor = botData.color
document.body.style.background = `linear-gradient(45deg, ${themeColor} 0%, #121212 170%)`
document.onkeydown=function(event){handleKeybind(event)};
    document.documentElement.style.setProperty('--highlight-color', botData.color);

    if (botData.reset == true) {
    try {
    if (fs.readFileSync('C:\\ProgramData\\studiodata.json')) {
    botData = JSON.parse(fs.readFileSync('C:\\ProgramData\\studiodata.json'))
    botData.reset = false;
    fs.writeFileSync('C:\\ProgramData\\studiodata.json', JSON.stringify(botData, null, 2))
    fs.writeFileSync(processPath +'/AppData/data.json', JSON.stringify(botData, null, 2));
    } else {
    botData.reset = false;
    fs.writeFileSync('C:\\ProgramData\\studiodata.json', JSON.stringify(botData, null, 2))
    }} catch (err) {
    botData.reset = false;
    fs.writeFileSync('C:\\ProgramData\\studiodata.json', JSON.stringify(botData, null, 2))}}

    function refreshActions() {
        var delay = 0;
        document.getElementById('actionbar').innerHTML = ''
        let endHTML = ``
        if (botData.commands[lastObj].actions.includes(undefined) || botData.commands[lastObj].actions.includes(null)) {
            botData.commands[lastObj].actions = botData.commands[lastObj].actions.filter(e => e != undefined || e != null);
            wast()
        }
        for (let action in botData.commands[lastObj].actions) {
            let quickie = '';
            delay++;
            let actionUI;
            let previewCharacters;
            let borderType;
            if (botData.commands[lastObj].actions[parseFloat(action) - 1] == undefined) {
              borderType = 'borderbottom';
            } else if (botData.commands[lastObj].actions[parseFloat(action) + 1] == undefined) {
              borderType = 'bordertop';
            } else {
              borderType = 'bordercentere';
            }
            let actionFile;
            try {
            actionFile = require(`./AppData/Actions/${botData.commands[lastObj].actions[action].file}`);

                try {
                let characterCount = 0;
                actionUI = actionFile.UI;
                previewCharacters = botData.commands[lastObj].actions[action].data[actionUI.preview].split('');
                if (previewCharacters.length > 22) {
                    for (let character in previewCharacters) {
                        if (characterCount != 23) {
                            const opacity = 100 - (characterCount - 15) * 10;
                            quickie = `${quickie}<span style="opacity: ${opacity}%;">${previewCharacters[character]}</span>`;
                            characterCount++;
                        }
                    }
                } else {
                    quickie = botData.commands[lastObj].actions[action].data[actionUI.preview]
                }
                } catch (err) {
                    quickie = `Error`
                }

            endHTML += `
            <div id="Action${action}" onmouseenter="lastHovered = this" draggable="true" ondragleave="handleActionDragEnd(this)" ondragend="handleActionDrop()" ondragover="actionDragOverHandle(event, this)" ondragstart="handleActionDrag(this)" onmouseleave="lastHovered = null;" class="action textToLeft ${borderType}" style="animation-delay: ${delay * 3}0ms" ondblclick="editAction(this)" onclick="highlight(this)">
            ${botData.commands[lastObj].actions[action].name}
            <div style="opacity: 50%; margin-left: 7px;">${`${actionUI.previewName}`}: ${quickie}</div>
            <div class="deleteActionButton" onclick="deleteObject(this)">✕</div></div>`;
        } catch (err) {
            if (!botData.commands[lastObj].actions[action] || actionFile == undefined) {
                endHTML += `
                <div id="Action${action}" onmouseenter="lastHovered = this" draggable="true" ondragleave="handleActionDragEnd(this)" ondragend="handleActionDrop()" ondragover="actionDragOverHandle(event, this)" ondragstart="handleActionDrag(this)" onmouseleave="lastHovered = null;" class="action textToLeft ${borderType}" style="animation-delay: ${delay * 3}0ms" ondblclick="editAction(this)" onclick="highlight(this)">
                Error
                <div style="opacity: 50%; margin-left: 7px;"> - Action Missing</div>
                <div class="deleteActionButton" onclick="deleteObject(this)">✕</div></div>`;
            }
        }
    }

    document.getElementById('actionbar').innerHTML = endHTML
    }

    function refreshGroups() {
        var delay = 0;
        document.getElementById('commandbar').innerHTML = ''
        let wasGroupHighlighted = false;
        let firstCompatibleGroup;
        for (let cmd in botData.commands) {
            try {
            if (botData.commands[cmd].actions.includes(undefined) || botData.commands[cmd].actions.includes(null)) {
                botData.commands[cmd].actions = botData.commands[cmd].actions.filter(e => e != undefined || e != null);
                wast()
            }
            } catch (err) {}

            let groupType = botData.commands[cmd].type;
            let groupTrigger = botData.commands[cmd].trigger;
            let endType;
            if (groupType == 'action') {
                if (groupTrigger == 'textCommand' || groupTrigger == 'messageContent') {
                    endType = 'text'
                }
                if (groupTrigger == 'slashCommand') {
                    endType = 'slash'
                }
            } else {
                endType = 'event'
            }
            if (endType == selectedGroupType) {
                if (!firstCompatibleGroup) firstCompatibleGroup = cmd
                delay++
                document.getElementById('commandbar').innerHTML += `<div class="${botData.commands[cmd].color != undefined ? 'coloredAction' : 'action'} textToLeft" draggable="true" onmouseenter="lastHovered = this" ondragleave="handleGroupDragEnd(this)" ondragend="handleGroupDrop()" ondragover="groupDragOverHandle(event, this)" ondragstart="handleGroupDrag(this)" onmouseleave="lastHovered = null;" id="Group${parseFloat(cmd)}" style="animation-delay: ${delay * 3}5ms;" onclick="highlight(this)"><div id="${cmd}Groupname">${botData.commands[cmd].name}</div> <div style="opacity: 50%; margin-left: 7px;"> | <span id="${cmd}Groupcount">${botData.commands[cmd].actions.length}</span> Actions </div> <div class="deleteActionButton forceRounded" style="border-radius: 124px;" onclick="deleteObject(this)">✕</div> `
                if (botData.commands[cmd].color != undefined) {
                    let groupColor = botData.commands[cmd].color.split(')')[0]
                    try {
                        if (document.getElementById(`Group${cmd}`) != undefined) {
                        setTimeout(() => {
                            document.getElementById(`Group${cmd}`).addEventListener('mouseover', () => {
                                document.getElementById(`Group${cmd}`).style.backgroundColor = groupColor + `, 0.20)`
                            })
                            
                            document.getElementById(`Group${cmd}`).addEventListener('mouseout', () => {
                                if (lastObj != cmd) {
                                    document.getElementById(`Group${cmd}`).style.backgroundColor = groupColor + ', 0.09)'
                                } else {
                                    document.getElementById(`Group${cmd}`).style.backgroundColor = groupColor + ', 0.15)'
                                }
                            })
                        }, 100)
                    }
                    } catch (err) {}
    
                    document.getElementById(`Group${cmd}`).style.backgroundColor =  botData.commands[cmd].color.split(')') + ' 0.09)'
                }
                if (cmd == lastObj) {
                    setTimeout(() => {
                        try {
                            highlight(document.getElementById(`Group${cmd}`), true, true)
                            wasGroupHighlighted = true;
                        } catch (err) {}
                    }, 50)
                }
            }

        }
        closeCommand()
        if (!wasGroupHighlighted) {
            setTimeout(() => {
                highlight(document.getElementById(`Group${firstCompatibleGroup}`))
            }, 150)
        }
    }

    let commandParameters = document.getElementById('commandParameters')
    let groupOptions = document.getElementById('commandOptions')
    let groupEvents = document.getElementById('groupEvents')
    function resetElements() {
        groupOptions.style.width = ``
        groupOptions.style.opacity = ``
        groupOptions.style.padding = ``
        
        groupEvents.style.padding = '0px'
        groupEvents.style.opacity = '0%'
        groupEvents.style.width = '0%'
        groupEvents.innerHTML = ``

        commandParameters.style.padding = ``
        commandParameters.style.width = ``
        commandParameters.style.marginRight = ``
        commandParameters.style.opacity = ``
    }

    function prioritizeCommandOptions() {
        resetElements()
        commandParameters.style.width = `0%`
        commandParameters.style.padding = `0px`
        commandParameters.style.opacity = `0%`
        commandParameters.style.marginRight = '0%'
        
        groupOptions.style.width = '90%'
    }

    function prioritizeEvents() {
        resetElements()
        groupOptions.style.width = `0%`
        groupOptions.style.padding = `0px`
        groupOptions.style.opacity = `0%`
        commandParameters.style.width = `0%`
        commandParameters.style.padding = `0px`
        commandParameters.style.opacity = `0%`
        commandParameters.style.marginRight = '0%'

        groupEvents.style.padding = ''
        groupEvents.style.width = '90%'
        groupEvents.style.opacity = ''
        try {
            groupEvents.innerHTML = `<div style="margin: auto; margin-left: 1vw;">Triggered By: ${require('./AppData/Events/' + botData.commands[lastObj].eventFile).name}</div><div class="image openExternally"></div>`
        } catch (err) {
            groupEvents.innerHTML = `<div style="margin: auto; margin-left: 1vw;">Triggered By: Nothing</div><div class="image openExternally"></div>`
        }

    }

    function returnToNormal() {
        resetElements()
    }

    function highlight(element) {
        try {
        if (element.id.startsWith('Group') == true) {
            try {
                if (botData.commands[lastObj].color != undefined) {
                    document.getElementById(`Group${lastObj}`).style.backgroundColor =  botData.commands[lastObj].color.split(')') + ' 0.09)'
                } else {
                    document.getElementById(`Group${lastObj}`).style.backgroundColor = '#FFFFFF15';
                }
            } catch(err) {console.log(err)}
            
            element.style.backgroundColor = '#FFFFFF25';
            lastObj = element.id.split('Group')[1]

            document.getElementById('Command_Name').innerText = botData.commands[lastObj].name;

            document.getElementById('actionsOf').innerHTML = `Actions Of ${element.innerText.split('|')[0]}`

            if (botData.commands[lastObj].color != undefined) {
                document.getElementById('colorToggler').style.backgroundColor = botData.commands[lastObj].color.split(')') + ' 0.15)'
                element.style.backgroundColor =  botData.commands[lastObj].color.split(')') + ' 0.15)'
            } else {
                document.getElementById('colorToggler').style.backgroundColor = ''
            }

            refreshActions();
            let groupType, extraGroupInformation;
            if (botData.commands[lastObj].type == 'action') {
                let group = botData.commands[lastObj]
              switch(botData.commands[lastObj].trigger) {
                case 'slashCommand':
                    var permissions = ''
                    groupType = 'Slash Command'
                    let endParameters = 'No'
                    if (group.parameters && group.parameters.length > 0) {
                        endParameters = Object.keys(group.parameters).length
                    }
                    if (group.boundary) {
                        if (group.boundary.worksIn == 'guild') {
                            permissions = '• Guild Only'
                        } else if (group.boundary.worksIn == 'dm') {
                            permissions = '• DMs Only'
                        } else {
                            permissions = '• Works Anywhere'
                        }
                    } else {
                        permissions = '• Guild Only'
                    }
                    extraGroupInformation = `${endParameters} Parameters ${permissions}`
                    resetElements()
                break
                case 'textCommand':
                    groupType = 'Text Command'
                    var permissions = 'None'
                    if (group.boundary && group.boundary.limits.length != 0) {
                        permissions = `${group.boundary.limits.length} Permission Limits `
                    } else if (group.boundary.permissions) {
                        if (group.boundary.worksIn == 'guild') {
                            permissions += '• Guild Only'
                        } else if (group.boundary.worksIn == 'dm') {
                            permissions += '• DMs Only'
                        } else {
                            permissions += '• Works Anywhere'
                        }
                    } else {
                        permissions = 'Guild Only' 
                    }
                    extraGroupInformation = permissions
                    prioritizeCommandOptions()
                    
                break
                case 'messageContent':
                    groupType = 'Message'
              }
    
            document.getElementById('botData.commands[lastObj].actions').innerHTML = `${groupType} • ${extraGroupInformation}`  
            } else {
                prioritizeEvents()
                document.getElementById('botData.commands[lastObj].actions').innerHTML = `Event`
            }
            botData.commands[lastObj].actions = botData.commands[lastObj].actions

            checkErrors()
            let lastCheckedAction = null;
            for (let action in botData.commands[lastObj].actions) {
                lastCheckedAction = action;
            }
            botData.commands[lastObj].actions[lastAct] = botData.commands[lastObj].actions[lastAct]
        } else {
            try {
            document.getElementById(`Action${lastAct}`).style.backgroundColor = '#FFFFFF15';
            } catch(err) {}
            element.style.backgroundColor = '#FFFFFF25';
            lastAct = element.id.split('Action')[1]
        }
    } catch (err) {}
    }

    function openBar(iftr) {
        let bottombar = document.getElementById('bottombar')
        bottombar.style.animationDuration = ''
        bottombar.style.animationName = '';
        bottombar.style.animationDuration = '0.5s'
        bottombar.style.animationName = 'expandFrom';
        bottombar.style.height = '30%'
        bottombar.style.width = '40%'
        bottombar.style.backdropFilter = 'blur(22px)'
        bottombar.style.border = '#00000030 solid 2px'
        bottombar.style.marginTop = '-90vh'
        bottombar.style.zIndex = '50'
        bottombar.style.marginLeft = '30%'
        bottombar.style.borderRadius = '22px'
        bottombar.style.backgroundColor = '#3d3d3d40'
        bottombar.style.boxShadow = '#00000050 0px 0px 12px'
        if (!iftr) {bottombar.onclick = () => {unmodify()}}
        setTimeout( () => {bottombar.style.animationName = ''; bottombar.style.animationDuration = ''}, 500);
    } 
    
    function modifyBar() {
        let bottombar = document.getElementById('bottombar')
        bottombar.style.animationDuration = ''
        bottombar.style.animationName = '';
        bottombar.style.animationDuration = '0.5s'
        bottombar.style.animationName = 'expandFrom';
        bottombar.style.height = '30%'
        bottombar.style.width = '40%'
        bottombar.style.backdropFilter = 'blur(22px)'
        bottombar.style.border = '#00000030 solid 2px'
        bottombar.style.marginTop = '-90vh'
        bottombar.style.zIndex = '50'
        bottombar.style.marginLeft = '30%'
        bottombar.style.borderRadius = '22px'
        bottombar.style.backgroundColor = '#3d3d3d40'
        bottombar.style.boxShadow = '#00000050 0px 0px 12px'
        bottombar.onclick=()=>{unmodify()}
        setTimeout( () => {
        bottombar.innerHTML += `
        <div class="flexbox" style="height: 100%; justify-content: center; align-items: center; margin-top: -24px;">
        <div class="flexbox" style="width: 98%; margin-left: auto; margin-top: auto; margin-right: auto; height: 20%; justify-content: center; margin-bottom: 2vh;">
        <div class="barbutton borderrightbottom" onclick="savePrj()"><div class="barbuttontexta">Save</div></div>
        <div class="barbutton bordercenter" onclick="modcolor(this)"><div class="barbuttontexta">Color</div></div>
        <div class="barbutton borderleftbottom" onclick="sltPrj()"><div class="barbuttontexta">Select Project</div></div>
        </div>
        <div class="flexbox" style="width: 98%; margin-bottom: auto; margin-left: auto; margin-right: auto; height: 20%; justify-content: center; animation-duration: 0.8s;">
        <div class="barbutton borderrighttop" style="animation-duration: 0.6s" onclick="toggleBot()"><div class="barbuttontexta">Toggle Bot</div></div>
        <div class="barbutton bordercenter" onclick="exportProject()" style="animation-duration: 0.6s"><div class="barbuttontexta">Export Project</div></div>
        <div class="barbutton borderlefttop" onclick="settoken(this)" style="animation-duration: 0.6s"><div class="barbuttontexta">Bot Data</div></div>
            </div>
        </div>`
        bottombar.style.animationName = ''
        bottombar.style.animationDuration = ''
    }, 500)}
    function unmodify() {
        let bottombar = document.getElementById('bottombar')
        bottombar.style.animationDuration = '0.4s'
        bottombar.style.animationName = 'fromExpand';
        bottombar.style.height = ''
        bottombar.style.width = ''
        bottombar.style.backdropFilter = ''
        bottombar.style.marginTop = ''
        bottombar.style.border = ''
        bottombar.style.marginLeft = ''
        bottombar.style.borderRadius = ''
        bottombar.style.backgroundColor = ''
        bottombar.style.padding = ''
        bottombar.style.paddingTop = ''
        bottombar.style.paddingBottom = ''
        bottombar.style.overflowY = ''
        bottombar.style.overflow = 'none'
        bottombar.style.textOverflow = 'none'
        bottombar.onclick = () => {modifyBar()}
        setTimeout(() => {
            bottombar.innerHTML = '•••'
            bottombar.style.animationName = ''
            bottombar.style.animationDuration = ''
        }, 400)
    }

    function sltTxt() {
        botData.commands[lastObj].trigger = 'textCommand'
        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(botData, null, 2));
        checkErrors()
    }
    function tSlsh() {
        botData.commands[lastObj].trigger = 'slashCommand'
        fs.writeFileSync(processPath +'\\AppData\\data.json', JSON.stringify(botData, null, 2));
        checkErrors()
    }
    function sltMsg() {
        botData.commands[lastObj].trigger = 'messageContent'
        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(botData, null, 2));
        checkErrors()
    }

    let sidebarcontent = document.getElementById('sidebar').innerHTML

    function modcolor() {
        let sidebar = document.getElementById('sidebar');
        sidebar.style.width = '0vw'
        sidebar.style.overflowY = 'auto'
        setTimeout(() => {
            sidebar.style.width = '40vw'
            sidebar.innerHTML = `
            <br>
            <div class="sidebartext" style="font-size: 20px;">Editor Theme & Colors</div>
            <div class="colorTile" onclick="setColor(this)" style="background-color: #000000;"><div class="colorTileText">Lights Off</div></div>
            <div class="colorTile" onclick="setColor(this)" style="background-color: #0b0014;"><div class="colorTileText">Ultraviolet</div></div>
            <div class="colorTile" onclick="setColor(this)" style="background-color: #170011;"><div class="colorTileText">Soothing Cherry</div></div>
            <div class="colorTile" onclick="setColor(this)" style="background-color: #170006;"><div class="colorTileText">Strawberry</div></div>
            <div class="colorTile" onclick="setColor(this)" style="background-color: #170000;"><div class="colorTileText">Bloodshot Pink</div></div>

            <div class="colorTile" onclick="setColor(this)" style="background-color: #170701;"><div class="colorTileText">Wood</div></div>
            <div class="colorTile" onclick="setColor(this)" style="background-color: #361d1d;"><div class="colorTileText">Salmon</div></div>
            <div class="colorTile" onclick="setColor(this)" style="background-color: #170f00;"><div class="colorTileText">Golden Apple</div></div>
            <div class="colorTile" onclick="setColor(this)" style="background-color: #262626;"><div class="colorTileText">Smoke</div></div>
            <div class="colorTile" onclick="setColor(this)" style="background-color: #24121d;"><div class="colorTileText">Lilac</div></div>
            <div class="colorTile" onclick="setColor(this)" style="background-color: #122324;"><div class="colorTileText">Shiny Forest</div></div>
            <div class="colorTile" onclick="setColor(this)" style="background-color: #000814;"><div class="colorTileText">Navy Blue</div></div>
            <div class="colorTile" onclick="setColor(this)" style="background-color: #071314;"><div class="colorTileText">Forest Green</div></div>
            <div class="colorTile" onclick="setColor(this)" style="background-color: #001417;"><div class="colorTileText">Aquamarine</div></div>
            <div class="colorTile" onclick="setColor(this)" style="background-color: #000f17;"><div class="colorTileText">Moody Blue</div></div>
            <div class="colorTile" onclick="setColor(this)" style="background-color: #141414;"><div class="colorTileText">Gray</div></div>
            <div class="colorTile" onclick="setColor(this)" style="background-color: #12241e;"><div class="colorTileText">Mint</div></div>
            <div class="colorTile" onclick="setColor(this)" style="background-color: #241212;"><div class="colorTileText">Anger</div></div>
            </div>
            `
            sidebar.onmouseleave = () => {
                sidebar.style.width = '0vw'
                setTimeout(() => {
                    sidebar.style.width = '';
                    sidebar.innerHTML = sidebarcontent;
                    sidebar.style.overflowY = '';
                    sidebar.onmouseleave = () => {};
                 }, 300)
            }
        }, 300)

    }
    function settoken() {
        let sidebar = document.getElementById('sidebar');
        sidebar.style.width = '0vw'
        setTimeout(() => {
            sidebar.style.width = '40vw'
            sidebar.innerHTML = `
            <br>
            <div class="sidebartext" style="font-size: 20px;">Bot Data</div>
            <div class="sepbars"></div>
            <div class="flexbox" style="height: 30vh;">

            <div class="barbuttontexta">Bot Prefix</div>
            <br>
            <input class="input" oninput="botData.prefix = this.value; wast()" value="${botData.prefix}">
            <br>
            <br>

            <div class="barbuttontexta">Bot Token</div>
            <br>
            <input class="input" type="password" style="overflow-y: auto; overflow-x: hidden;" oninput="botData.btk = this.value; wast()" value="${botData.btk}">
            <br>
            <br>

            <div class="barbuttontexta">Client ID</div>
            <br>
            <input class="input" type="number" oninput="botData.clientID = this.value; wast()" value="${botData.clientID}">
            <div class="barbuttontexta" style="margin-bottom: 2vh !important; margin-top: 67vh !important;">Stop Hovering The Sidebar To Close This</div>

            </div>
            `
            sidebar.onmouseleave = () => {
                sidebar.style.width = '0vw'
                setTimeout(() => {
                    sidebar.style.width = ''
                    sidebar.innerHTML = sidebarcontent
                    sidebar.onmouseleave = () => {}
                 }, 300)
            }
        }, 300)
   }
   function brd() {
    let bottombar = document.getElementById('bottombar')

    bottombar.onclick = () => {
        document.getElementById('wedf').onclick = () => {switchGroups()}
        unmodify()
    }
   }
    function storetoken(what) {
        botData.btk = what
        fs.writeFileSync(processPath +'\\AppData\\data.json', JSON.stringify(botData, null, 2));
    }
    function storeprefix(what) {
        botData.prefix = what
        fs.writeFileSync(processPath +'\\AppData\\data.json', JSON.stringify(botData, null, 2));
    }
    function storeclientid(what) {
        botData.clientID = what
        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(botData, null, 2));
    }
    function setColor(color) {
        let themeColor = color.style.backgroundColor
        document.body.style.backgroundImage = `linear-gradient(45deg, ${themeColor} 0%, #121212 170%)`
        botData.color = themeColor
        fs.writeFileSync(processPath +'\\AppData\\data.json', JSON.stringify(botData, null, 2));
    }
    function duplicate() {
        return
    }
    function setCmd() {
            botData.commands[lastObj].type = 'action'
            if (botData.commands[lastObj].eventFile) {
                delete botData.commands[lastObj].eventFile
            }
        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(botData, null, 2));
        checkErrors()
    }
    function setEvt() {
        botData.commands[lastObj].type = 'event'
        botData.commands[lastObj] = {
            ...botData.commands[lastObj],
            eventFile: 'update_message.js',
            event: 'Message Update'
        }
        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(botData, null, 2));
        checkErrors()
    }
    var intervalCheck = 210;
    setInterval(() => {
        const time = new Date().getTime()
        delete botData

        var botData = JSON.parse(JSON.stringify(JSON.parse(fs.readFileSync(processPath + '\\AppData\\data.json'))));
        const time1 = new Date().getTime()
        if (time1 - time > 30) {
            intervalCheck = 240
        } 
        if (time1 - time < 30) {
            intervalCheck = 150
        }
        if (time1 - time > 100) {
            intervalCheck = 350
        }
    }, intervalCheck)

 
        function saveField(fieldId, sa) {
            let field = document.getElementById(fieldId) 
            botData.commands[lastObj].actions[lastAct].data[fieldId] = field.innerText;
            fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(botData, null, 2))
        }

        Element.prototype.appendBefore = function (element) {
            element.parentNode.insertBefore(this, element);
          },false;
          Element.prototype.appendAfter = function (element) {
            element.parentNode.insertBefore(this, element.nextSibling);
          },false;

        function checkErrors() {
            return
        } 
        


        function sltPrj() {
            const ipcRenderer = require('electron').ipcRenderer;

            ipcRenderer.send('selectDirectory');
            
            ipcRenderer.on('selectedDirectory', function (event, dir) {
                if (dir[0] == undefined) {
                    location.reload()

                } else {
              console.log(dir);
              let di = fs.readFileSync(dir[0] + '\\AppData\\data.json') 
              console.log('di' + di)
              botData = JSON.parse(di)
              document.getElementById('opentext').innerHTML = `Opening Project <span style="color: #FFFFFF50">${JSON.parse(di).name}</span> <br> <div style="color: #FFFFFF50">Contains ${JSON.parse(di).count} action groups</div>`
              setTimeout (() => {
                              fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(botData, null, 2))
              location.reload()
              }, 5000)

            }});
            let commandDisplay = document.getElementById('animationArea');
            commandDisplay.style.animationName = 'moveToTheRight'
            commandDisplay.style.animationDuration = '0.35s'
            commandDisplay.style.marginLeft = '-100vw'

            let editorOptions = document.getElementById('edutor')
            editorOptions.style.animationName = 'moveToTheLeft'
            editorOptions.style.animationDuration = '0.35s'
            editorOptions.style.marginRight = '-100vw'

            document.body.innerHTML += '<div class="barbuttontexta" id="opentext" style="margin-top: -10vh; position: relative; z-index: 50; text-align: center;">The editor will reload after you select your project</div>'
        }
        let exportFolder;
         function exportProject() {
            let commandDisplay = document.getElementById('animationArea');
            commandDisplay.style.animationName = 'moveToTheRight'
            commandDisplay.style.animationDuration = '0.35s'
            commandDisplay.style.marginLeft = '100vw'
            commandDisplay.style.marginRight = '-100vw'

            let editorOptions = document.getElementById('edutor')
            editorOptions.style.animationName = 'moveToTheLeft'
            editorOptions.style.animationDuration = '0.35s'
            editorOptions.style.marginRight = '100vw'
            editorOptions.style.marginLeft = '-100vw'
            document.body.innerHTML += `
            <div class="actbar" style="margin-top: -95vh; padding: 0px; margin-left: auto; margin-right: auto; position: relative; background: linear-gradient(45deg, #FFFFFF15 0%, #FFFFFF01 150%); box-shadow: #00000035 0px 0px 12px;">
            <div class="barbuttone" style="margin-left: 1vw; margin-top: 1vw; width: 7vw;" onclick="unexportBot(this)"><div class="barbuttontexta">Cancel</div></div>

            <div class="barbuttontext" style="margin-top: 3vh; text-align: center;">Export Project</div>
            <div class="sepbars"></div>

            <br>
            <div class="flexbox" style="height: 8%;">
            <div class="barbuttontexta">Project Name</div>
            <div class="input" id="projectName" style="width: 85%;" contenteditable="true">${botData.name}</div>
            <div class="sepbars"></div>
            <div class="barbuttontexta">Export Folder</div>
            <div class="action" style="height: auto; width: 85%;" id="pathTo" onclick="selectFolder(this)">None Selected</div>
            <div class="sepbars"></div>
            <div class="barbutton" style="margin: auto;" onclick="exportBot(this)"><div class="barbuttontexta">Export</div></div>
            <br>
            <br>
            <br>
            <div style="width: 100%; margin-top: 4vh; align-items: center; justify-content: center; opacity: 95%;" class="flexbox">
            <a onclick="require('electron').shell.openExternal('https://l.linklyhq.com/l/1nohw')" style="background-color: #FFFFFF40; border-radius: 24px; margin: auto;"><img style="opacity: 80%; margin: auto; height: calc(187.25px + 2vh); cursor: pointer; width: calc(358.75px + 2vh); background-size: contain; background-clip: content-box; background-position: center; background-repeat: none;" src="https://github-production-user-asset-6210df.s3.amazonaws.com/100881234/242099266-b6439c2d-958b-47bf-b10d-13e78d9fe5cd.png"></a>
            </div>
            </div>

            `
            delete commandDisplay;
            delete editorOptions;
        }
        function unexportBot(elm) {
            elm.parentElement.remove()
            let commandDisplay = document.getElementById('animationArea');
            commandDisplay.style.animationName = 'comeToTheRight1'
            commandDisplay.style.animationDuration = '0.35s'
            commandDisplay.style.marginLeft = ''
            commandDisplay.style.marginRight = ''

            let editorOptions = document.getElementById('edutor')
            editorOptions.style.animationName = 'comeToTheLeft1'
            editorOptions.style.animationDuration = '0.35s'
            editorOptions.style.marginRight = ''
            editorOptions.style.marginLeft = ''
            setTimeout(() => {
                editorOptions.style.animationName = ''
                editorOptions.style.animationDuration = ''
                commandDisplay.style.animationName = ''
                commandDisplay.style.animationDuration = ''
                delete commandDisplay;
                delete editorOptions;
            }, 350)
        }
        function selectFolder(elm) {
            const ipcRenderer = require('electron').ipcRenderer;

            ipcRenderer.send('selectDirectory');
            
            ipcRenderer.on('selectedDirectory', function (event, dir) { 
                if (!dir || dir == null || dir == undefined) {
                    elm.innerHTML = 'Selection Cancelled. No Folder selected'
                } else {
                    elm.innerHTML = `${dir[0]}`
                    exportFolder = dir[0]
                }})
        }
        async function exportBot(elm) {
            elm.style.animationName = ''
            elm.style.animationDuration = '0s'
            if (exportFolder) {
                let globalSettings = JSON.parse(fs.readFileSync('C:/ProgramData/settings.json'))
                globalSettings.projects.push(exportFolder);
                fs.writeFileSync('C:/ProgramData/settings.json', JSON.stringify(globalSettings, null, 2));
                botData.name = document.getElementById('projectName').innerText
                botData.prjSrc = exportFolder
                fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(botData, null, 2))

                elm.parentNode.parentNode.innerHTML = `
                <div class="barbuttontexta" style="margin: auto; margin-top: 25%; text-align: center;" id="exprjt">Exporting Project!</div>
                `

                fs.writeFileSync(exportFolder + '\\bot.js', fs.readFileSync(processPath + '\\AppData\\bot.js'))
                try {
                fs.mkdirSync(exportFolder + '\\AppData')
                } catch (err) {
                    null
                }
                fs.writeFileSync(exportFolder + '\\AppData\\data.json', JSON.stringify(botData))

                fs.writeFileSync(exportFolder + '\\package.json', `
                {
                    "name": "Studio-Bot-Maker",
                    "main": "bot.js",
                    "author": "Studio Bot Maker, Rat#1111",
                    "description": "A discord bot created via Studio Bot Maker!",
                    "dependencies": {
                        "discord-api-types": "^0.37.34",
                        "@oceanicjs/builders": "^1.1.9",
                        "oceanic.js": "^1.7.1",
                        "fs": "^0.0.1-security",
                        "fs-extra": "^11.1.1",
                        "fse": "^4.0.1",
                        "oceanic-collectors": "^1.0.7",
                        "node-fetch": "^3.3.1",
                        "request": "^2.88.2"
                    },
                    "version": "69420"
                }
                `)
                try {
                fs.mkdirSync(exportFolder + '\\AppData\\Actions')
                } catch (err) {
                    null
                }  
                try {
                    fs.mkdirSync(exportFolder + '\\AppData\\Toolkit')
                    } catch (err) {
                        null
                    }  

                    try {
                        fs.mkdirSync(exportFolder + '\\AppData\\Events')
                        } catch (err) {
                            null
                        }  
                    let events = fs.readdirSync(processPath + '\\AppData\\Events')
                        
                    for (let event in events) {
                        setTimeout(() => {
                            fs.writeFileSync(exportFolder + '\\AppData\\Events\\' + events[event], fs.readFileSync(processPath + '\\AppData\\Events\\' + events[event]))
                        }, 1400)
                    }   
                fs.writeFileSync(exportFolder + '\\AppData\\Toolkit\\variableTools.js', fs.readFileSync(processPath + '\\AppData\\Toolkit\\variableTools.js'))
                fs.writeFileSync(exportFolder + '\\AppData\\Toolkit\\interactionTools.js', fs.readFileSync(processPath + '\\AppData\\Toolkit\\interactionTools.js'))
                    try {
                        fs.readFileSync(exportFolder + `\\AppData\\Toolkit\\storedData.json`)  
                    } catch(err) {
                        fs.writeFileSync(exportFolder + `\\AppData\\Toolkit\\storedData.json`, `
                        {
                            "users": {},
                            "guilds": {},
                            "members" : {},
                            "channels": {},
                            "lists": {}
                        }`)
                    }
                try {
                    fs.mkdirSync(exportFolder + '\\AppData\\Project')
                    } catch (err) {
                        null
                    }  
                    fs.writeFileSync(exportFolder + '\\AppData\\Project\\data.json', fs.readFileSync(processPath + '\\AppData\\Project\\data.json'))
                let actions = fs.readdirSync(processPath + '\\AppData\\Actions')
                document.getElementById('exprjt').innerHTML = '<div class="ring"></div> <br> Exporting Project!'
                    let acrnum = 0;


                    fs.writeFileSync(exportFolder + '\\AppData\\Actions\\' + actions[action], fs.readFileSync(processPath + '\\AppData\\Actions\\' + actions[action]))
                    document.getElementById('exprjt').innerHTML = '<div class="ring"></div> <br> Project Exported! <br>' + counnt + ' Actions Exported To  <span style="opacity:50%"> ' + botData.name + '</span><br>' + `
                    <div class="sepbar"></div>
                    <div class="barbuttontexta">Project Summary</div>
                    <br>
                    <span style="opacity:50%">${Object.keys(botData.commands).length}</span> Action Groups In Total
                    <div></div>
                    <br>
                    `
                setTimeout(() => {
                    location.reload()
                }, 14000)
            } else {
                elm.style.animationName = 'glowTwice'
                elm.style.animationDuration = '1s'

                setTimeout(() => {
                    elm.style.animationName = ''
                    elm.style.animationDuration = ''
                }, 1000)
            }
        }
        
        function savePrj() {
            if (botData.prjSrc != '') {
                fs.writeFileSync(botData.prjSrc + '\\AppData\\data.json', JSON.stringify(botData, null, 2))
                fs.writeFileSync('C:\\ProgramData\\studiodata.json', JSON.stringify(botData, null, 2));
            } else {
                fs.writeFileSync('C:\\ProgramData\\studiodata.json', JSON.stringify(botData, null, 2));
            }
        }
        setInterval(() => {
            let elm = document.createElement('div')
            elm.className = 'issue'
            elm.id = 'saveProjectnotif'
            elm.style.backdropFilter = 'blur(10px)'
            elm.style.zIndex = '10'
            elm.style.width = '23vw'
            elm.style.marginRight = '3vw'
            elm.style.position = 'relative'
            elm.style.marginTop = '-90vh'
            elm.style.animationName = 'fadeoutspfload'
            elm.style.animationDuration = '3.1s'
            elm.style.height = '5.5vh'
            elm.style.padding = '1vh'
            elm.innerHTML = `
            <div class="flexbox" style="margin: auto;">
            <div class="ring" style="animation-duration: 1s; width: 3.5vw; height: 3.5vw; margin: auto;"></div>
            <div class="barbuttontexta">Saving your project..</div>
            </div>
            `
            
            document.body.appendChild(elm)
            
        try {
        setTimeout(() => {
            elm.remove()
            }, 3000)
        savePrj()
        } catch(err) {
            console.log(err)
            elm.innerHTML = `
            <div class="flexbox" style="margin: auto; align-items: center; justify-content: center; height: auto; padding: 6px;">
            <div class="barbuttontexta">No project output</div>
            <div class="barbuttonshift" onclick="exportProject(); this.parentElement.parentElement.remove()" style="margin: auto;">
            <div class="barbuttontexta">Fix</div>
            </div>
            </div>
            `
            setTimeout(() => {
                elm.remove()
            }, 10000)
        }
        }, 95000)

        function closeCommand() {
            return;
        }
        function modifyActElm() {
            openBar(true)

            setTimeout(() => {
                let bottombar = document.getElementById('bottombar')
                bottombar.style.animationDuration = ''
                bottombar.style.animationName = '';
                bottombar.style.animationDuration = '0.3s'
                bottombar.style.animationName = 'expnd';
                bottombar.style.height = '100vh'
                bottombar.style.width = '100vw'
                bottombar.style.backdropFilter = 'blur(22px)'
                bottombar.style.border = '#00000030 solid 2px'
                bottombar.style.marginTop = '-97.5vh'
                bottombar.style.borderRadius = '0px'
                bottombar.style.overflow = 'auto'
                bottombar.style.zIndex = '50'
                bottombar.style.marginLeft = '-1.8vw'
                bottombar.style.backgroundColor = '#3d3d3d40'
                bottombar.style.boxShadow = '#00000050 0px 0px 12px'
                setTimeout(() => {
                    showHome()
                    setTimeout(() => {
                        bottombar.onclick = () => null
                 }, 100)
            }, 300)
 
            }, 500)
        }
        const axios = require('axios')
        function showHome() {
            let bottombar = document.getElementById('bottombar')

            bottombar.innerHTML = `
            <div class="flexbox" id="toolbar" style="animation-name: appearfadenmt; animation-duration: 0.6s; margin: auto; align-items: center; justify-content: center;">
            <div class="flexbox" style="background-color: #00000060; width: 95%; padding: 9px; margin-left: auto; margin-right: auto; border-radius: 12px; margin-top: 2vh;">
            
            <div class="barbutton" onclick="showButtons()" style="margin-top: auto; margin-bottom: auto;"><div class="barbuttontexta">Buttons</div></div>
            <div class="barbutton" onclick="showActionRows()" style="margin-top: auto; margin-bottom: auto;"><div class="barbuttontexta">Select Menus (BETA)</div></div>
            <div class="barbutton" style="margin-top: auto; margin-bottom: auto;"><div class="barbuttontexta">Errors (Unavailable)</div></div>

            </div>
            <div class="sepbar"></div>

            <div id="actElmsig" style="width: 95%; padding: 9px; margin-left: auto; margin-right: auto; height: 100%; border-radius: 12px; margin-top: 2vh;">
            <div class="barbuttontext texttoleft" style="margin-left: 5vw;">Home</div>
            <br>
            <div class="flexbox">
            <div style="background-color: #00000060; width: 45vw; margin-right: 2vw; height: 35vh; border-radius: 12px; padding: 10px;">
            <div class="barbuttontexta texttoleft" style="margin-left: 1vw;">Project Overview</div>
            <div class="sepbars"></div>
            <div class="barbuttontexta texttoleft">Name</div>

            <div class="input" contenteditable="true" onkeyup="setProjectName(this)">${botData.name}</div>
            <div class="sepbars"></div>
            <div class="barbuttontexta texttoleft">Data</div>
            
            <div class="flexbox" style="align-items: center; justify-content: center;">
            <div class="barbuttone hoverable borderrightz" onclick="closeMenu(); setTimeout(() => {settoken()}, 100)">
            <div class="barbuttontexta">Bot Credentials</div>
            </div>
            <div class="barbuttone hoverable bordercenter" style="margin: 0px; border-radius: 2px !important;" onclick="showHosting()"> 
            <div class="barbuttontexta">Phantom Hosting</div>
            </div>
            <div class="barbuttone hoverable borderleftz" onclick="location.reload()">
            <div class="barbuttontexta">Restart</div>
            </div>
            </div></div>
            <div style="background-color: #00000060; width: 40vw; height: 35vh; border-radius: 12px; padding: 12px;" class="flexbox">
            <div class="barbuttontexta">
            <b>READ ME!</b>
            You're currently rocking Studio Bot Maker version V3.0.1 - Public Beta
            </div>
            <div class="barbuttontexta">
            <b>🏳️‍🌈 Happy Pride Month!</b>
            Documentation & Hosting reccomendations on Github/RatWasHere/Studio-Bot-Maker/docs
            - Lots of bugs were fixed, but some might still emerge. Please report them in the support guild! Fully stable version coming Soon™️
            </div>
            </div>
            </div>

            </div>
            </div>
            `
        }
        function switchToHome() {
            let view = document.getElementById('actElmsig')
            view.innerHTML = `
            <div class="barbuttontext texttoleft" style="margin-left: 5vw;">Home</div>
            <br>
            <div class="flexbox">
            <div style="background-color: #00000060; width: 45vw; margin-right: 2vw; height: 35vh; border-radius: 12px; padding: 10px;">
            <div class="barbuttontexta texttoleft" style="margin-left: 1vw;">Project Overview</div>
            <div class="sepbars"></div>
            <div class="barbuttontexta texttoleft">Name</div>

            <div class="input" contenteditable="true" onkeyup="setProjectName(this)">${botData.name}</div>
            <div class="sepbars"></div>
            <div class="barbuttontexta texttoleft">Data</div>
            
            <div class="flexbox" style="align-items: center; justify-content: center;">
            <div class="barbuttone hoverable borderrightz" onclick="closeMenu(); setTimeout(() => {settoken()}, 100)">
            <div class="barbuttontexta">Bot Credentials</div>
            </div>
            <div class="barbuttone hoverable bordercenter" style="margin: 0px; border-radius: 2px !important;" onclick="showHosting()"> 
            <div class="barbuttontexta">Phantom Hosting</div>
            </div>
            <div class="barbuttone hoverable borderleftz" onclick="viewJSON()">
            <div class="barbuttontexta">View JSON</div>
            </div>
            </div></div>
            <div style="background-color: #00000060; width: 40vw; height: 35vh; border-radius: 12px; padding: 12px;" class="flexbox">
            <div class="barbuttontexta">
            <b>READ ME!</b>
            You're currently rocking Studio Bot Maker version 2.3.1
            </div>
            <div class="barbuttontexta">
            Documentation & Hosting reccomendations on Github/RatWasHere/Studio-Bot-Maker/docs
            </div>
            </div>
            </div>`
        }
        function storeHostingServerID(elm) {
            botData.serverID = elm.innerText
            fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(botData, null, 2));
        }
        function storeHostingToken(elm) {
            botData.serverToken = elm.innerText
            fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(botData, null, 2));
        }

        function showHosting() {
            const axios = require('axios');

            if (!botData.serverToken) {
                showPhantomUnset()
            }
        const apiKey = botData.serverToken;


        const baseURL = 'https://game.phantom-hosting.net/api/client';

        try {
            const axiosInstance = axios.create({
                baseURL,
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                }
                })
            const getAccountInfo = async () => {
                const response = await axiosInstance.get('/account');
                return response.data;
            }
    getAccountInfo().then((data) => {
        let view = document.getElementById('actElmsig')
        view.innerHTML = `
        <div class="flexbox" style="margin-left: auto; margin-right: 12px;">
        <div class="text" style="text-align: center; margin-left: 26vw;">Phantom Hosting</div>

        <div class="barbuttond center borderrightz" onclick="switchToHome()" style="margin-left: auto; height: 3vh; width: 30px;">
        <div class="image backArrow">
        
        </div>
        </div>
        <div class="barbuttond center borderleftz" onclick="switchToHome()" style="width: 70px; height: 3vh; margin-right: 26vw; margin-left: 0.3vw;">
        <div class="barbuttontexta">
        Home
        </div>
        </div>
        </div>
        <br>
        <div style="background-color: #00000060; height: 50vh; width: 50%; padding: 12px; border-radius: 12px; margin: auto; align-items: center; align-content: center; justify-content: center;">
        <div class="barbuttontexta">Phantom API Token</div>
        <div class="input" contenteditable="true" onkeyup="storeHostingToken(this)">${botData.serverToken}</div>
        <div class="barbuttontexta">Phantom Server ID</div>
        <div class="input" contenteditable="true" onkeyup="storeHostingServerID(this)">${botData.serverID}</div>
        <div class="sepbars"> <br>
        <div class="barbuttontexta">Your Phantom Credentials</div>
        <div class="smalltext">Email: ${data.attributes.email} | Username: ${data.attributes.username} | Admin: ${data.attributes.admin}</div>
        <br><br>
        <div class="flexbox" style="align-items: center; justify-content: center">
        <div style="width: 30%; margin: auto;">
        <div style="width: 100%;" class="barbuttond" onclick="uploadDataToPhantom()" style="margin: auto; height: 4vh;">
        <div class="barbuttontexta">Upload Data</div>
        </div>
        </div>
        <div style="width: 30%; margin: auto;">
        <div class="smalltext" style="text-align: left; "><b>Uploading Your Data Will:</b>
        <br><br>
        - Modify your Git Repo Address<br>
        - Enable Auto Updating<br>
        - Update your data.json file
        </div>
        </div>
        </div>
        <div class="smalltext" style="margin-top: 13vh;">
        <div onclick="require('electron').shell.openExternal('https://phantom-hosting.net');" style="text-decoration: dashed;">https://phantom-hosting.net</div>
        This feature requires a Discord Bot Hosting Plan
        </div>
        </div>
        `

    }).catch(err, () => {
        if (!botData.serverToken) {
            showPhantomUnset()
        }
    })
    } catch (err) {
        console.log('err')
        showPhantomUnset()
    }
        }
        function showPhantomUnset() {
            let view = document.getElementById('actElmsig')
            view.innerHTML = `
            <div class="flexbox" style="margin-left: auto; margin-right: 12px;">
            <div class="text" style="text-align: center; margin-left: 26vw;">Phantom Hosting</div>
    
            <div class="barbuttond center borderrightz" onclick="switchToHome()" style="margin-left: auto; height: 3vh; width: 30px;">
            <div class="image backArrow">
            
            </div>
            </div>
            <div class="barbuttond center borderleftz" onclick="switchToHome()" style="width: 70px; height: 3vh; margin-right: 26vw; margin-left: 0.3vw;">
            <div class="barbuttontexta">
            Home
            </div>
            </div>
            </div>
            <br>
            <div style="background-color: #00000060; height: 50vh; width: 50%; padding: 12px; border-radius: 12px; margin: auto; align-items: center; align-content: center; justify-content: center;">
            <div class="barbuttontexta">Phantom API Token</div>
            <div class="input" contenteditable="true" onkeyup="storeHostingToken(this)">None</div>
            <div class="barbuttontexta">Phantom Server ID</div>
            <div class="input" contenteditable="true" onkeyup="storeHostingServerID(this)">Unset</div>
            <div class="sepbars"> <br>
            <div class="barbuttontexta">Your Phantom Credentials</div>
            <div class="smalltext">Email: Unset | Username: Unset | Admin: Unknown</div>
            <br><br>
            <div class="flexbox" style="align-items: center; justify-content: center">
            <div style="width: 30%; margin: auto;">
            <div style="width: 100%;" class="barbuttond" onclick="uploadDataToPhantom()" style="margin: auto; height: 4vh;">
            <div class="barbuttontexta">Upload Data</div>
            </div>
            </div>
            <div style="width: 30%; margin: auto;">
            <div class="smalltext" style="text-align: left; "><b>Uploading Your Data Will:</b>
            <br><br>
            - Modify your Git Repo Address<br>
            - Enable Auto Updating<br>
            - Update your data.json file
            </div>
            </div>
            </div>
            <div class="smalltext" style="margin-top: 13vh;">
            <div onclick="require('electron').shell.openExternal('https://phantom-hosting.net');" style="text-decoration: dashed;">https://phantom-hosting.net</div>
            This feature requires a Discord Bot Hosting Plan
            </div>
            </div>
            `
        }
        function uploadDataToPhantom() {
            if (botData.serverToken == undefined || botData.serverID == undefined) return
            let url1 = `https://game.phantom-hosting.net/api/client/servers/${botData.serverID}/files/write?file=%2FAppData/data.json`
           
            const headers1 = {
                "Accept": "application/text",
                "Content-Type": "application/text",
                "Authorization": `Bearer ${botData.serverToken}` // Users FULL API key
              };

            console.log(JSON.stringify(botData))
            axios.post(url1, botData, { headers1 })


            const filePath = path.join(processPath, 'AppData', 'bot.js');
            const fileContent = fs.readFileSync(filePath, 'utf8')
            
            const url = `https://game.phantom-hosting.net/api/client/servers/${botData.serverID}/files/write?file=%2Fbot.js`;
            const headers = {
              "Accept": "application/text",
              "Content-Type": "application/text",
              "Authorization": `Bearer ${botData.serverToken}` // Users FULL API key
            };
            
            axios.post(url, fileContent, { headers })
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.error(error);
              });
            
    axios({
    method: 'put',
    url: `https://game.phantom-hosting.net/api/client/servers/${botData.serverID}/startup/variable`,
    headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${botData.serverToken}` // Users FULL API key
    },
    data: {
        "key": "BOT_JS_FILE",
        "value": "bot.js"
    }
}).then((response) => {
    console.log(response.data);
}).catch((error) => {
    console.log(error);
})

axios({
    method: 'put',
    url: `https://game.phantom-hosting.net/api/client/servers/${botData.serverID}/startup/variable`,
    headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${botData.serverToken}` // Users FULL API key
    },
    data: {
        "key": "BRANCH",
        "value": "main"
    }
}).then((response) => {
    console.log(response.data);
}).catch((error) => {
    console.log(error);
})
axios({
    method: 'put',
    url: `https://game.phantom-hosting.net/api/client/servers/${botData.serverID}/startup/variable`,
    headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${botData.serverToken}` // Users FULL API key
    },
    data: {
        "key": "BRANCH",
        "value": "main"
    }
}).then((response) => {
    console.log(response.data);
}).catch((error) => {
    console.log(error);
})

    axios({
            method: 'put',
            url: `https://game.phantom-hosting.net/api/client/servers/${botData.serverID}/startup/variable`,
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${botData.serverToken}` // Users FULL API key
            },
            data: {
                "key": "GIT_ADDRESS",
                "value": "https://github.com/RatWasHere/Studio-Bot"
            }
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
        axios({
            method: 'put',
            url: `https://game.phantom-hosting.net/api/client/servers/${botData.serverID}/startup/variable`,
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${botData.serverToken}` // Users FULL API key
            },
            data: {
                "key": "AUTO_UPDATE",
                "value": "1"
            }
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })

        axios({
            method: 'put',
            url: `https://game.phantom-hosting.net/api/client/servers/${botData.serverID}/startup/variable`,
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${botData.serverToken}` // Users FULL API key
            },
            data: {
                "key": "USER_UPLOAD",
                "value": "1"
            }
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
        }
        function viewJSON() {
            let view = document.getElementById('actElmsig')
            view.innerHTML = `
            <div style="background-color: #00000060; overflow: auto; height: 50vh; width: 95%; padding: 9px; margin-left: auto; margin-right: auto; border-radius: 12px; margin-top: 2vh;">
            <div class="barbuttontexta" contenteditable="true">
            ${fs.readFileSync(processPath + '\\AppData\\data.json', 'utf8')}
            </div>
            </div>
            
            `
        }
    function elementContentChecker(element, values) {
        let maxLength = values.maxLength

        if (values.isCommandName == true) {
            let type = 'event'
            if (botData.commands[lastObj].type == 'action') {
                console.log(botData.commands[lastObj])
                    switch(botData.commands[lastObj].trigger) {
                case 'slashCommand':
                    type = 'slsh'
                    break
                case 'textCommand':
                    type = 'txt'
                break
                case 'messageContent':
                    type = 'msg'
            }
        }

    if (type == 'event') {   
        let text = element.innerText
        
        if (text.split('').length > maxLength) {
            let finalText = ''

            let count = 0

            for (let character in text) {
                    count++
                if (count < maxLength) {
                    finalText += text[character]
                }
            }
            element.innerHTML = finalText
            element.blur()
        }
     }

     if (type == 'txt') {
        let text = element.innerText

        if (text.split('').length > maxLength) {
            let finalText = ''

            let count = 0

            for (let character in text) {
                    count++
                if (count < maxLength) {
                    finalText += text[character]
                }
            }
            element.innerHTML = finalText
            element.blur()
        }
     }

     if (type == 'slsh') {
        let text = element.innerText

        if (text.split('').length > maxLength) {
            let finalText = ''

            let count = 0

            for (let character in text) {
                    count++
                if (count < maxLength) {
                    finalText += text[character]
                }
            }
            element.innerHTML = finalText
            element.blur()
        }
     }

    } else {
        if (values.noSpaces == true && values.fromBlur == true) {
            if (element.innerText.split('').includes(' ')) {
                element.innerHTML = element.innerText.replaceAll(' ', '')
            }
         }

         if (values.noCaps == true && values.fromBlur == true) {
                element.innerHTML = element.innerText.toLowerCase()
         }

         let text = element.innerText

         if (text.split('').length > maxLength) {
             let finalText = ''
 
             let count = 0
 
             for (let character in text) {
                     count++
                 if (count < maxLength) {
                     finalText += text[character]
                 }
             }
             element.innerHTML = finalText
             element.blur()
         }
    }
    }




function setProjectName(welm) {
    botData.name = welm.innerText
    wast()
}
    var lastButt;


function saveSelection() {
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            return sel.getRangeAt(0);
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }
    return null;
}


const { spawn } = require('child_process');

function openEvent() {
    try {
        ipcRenderer.send('editEvent', {
            name: require('./AppData/Events/' + botData.commands[lastObj].eventFile).name,
            event: botData.commands[lastObj].eventFile,
            data: botData.commands[lastObj].eventData
        })
    } catch (err) {
        ipcRenderer.send('editEvent', {
            name: 'Bot Ready',
            event: 'bot_ready.js',
            data: [""]
        })
    }
    
}

ipcRenderer.on('eventSave', (event, eventData) => {
    console.log(eventData)
    botData.commands[lastObj].eventFile = eventData.file
    botData.commands[lastObj].eventData = eventData.data
})

function openPermissionEditor() {
    ipcRenderer.send('openPerms', botData.commands[lastObj])
    ipcRenderer.once('boundaryData', (event, data) => {
        botData.commands[lastObj].boundary = data;
    }) 
}

function setGroupColor(elm) {
    if (elm == null) {
    botData.commands[lastObj].color = undefined;
    refreshGroups()
    return
    }
    let color = elm.style.backgroundColor;
    botData.commands[lastObj].color = color;
    refreshGroups()
}

function toggleColorsVisibility(button) {
    if (botData.colorsVisibility == undefined) {
        botData.colorsVisibility = false;
    }
    if (botData.colorsVisibility == true) {
        document.getElementById('colorsSelector').style.width = '0%'
        document.getElementById('colorsSelector').style.padding = '0px'
        document.getElementById('colorsSelector').style.marginLeft = '-5vh'
        setTimeout(() => {
            document.getElementById('colorsSelector').style.marginLeft = ''
        }, 250)
        botData.colorsVisibility = false;
    } else {
        document.getElementById('colorsSelector').style.marginLeft = ''
        document.getElementById('colorsSelector').style.width = '90%'
        document.getElementById('colorsSelector').style.padding = '5px'
        setTimeout(() => {
            document.getElementById('colorsSelector').style.width = '85%'
        }, 250)
        botData.colorsVisibility = true;
    }
    wast()
}

function openParameters() {
    ipcRenderer.send('editParameters', {parameters: botData.commands[lastObj].parameters || [], name: botData.commands[lastObj].name, description: botData.commands[lastObj].description || 'No Description'})
}

ipcRenderer.on('parameters', (event, parameters, description) => {
    botData.commands[lastObj].parameters = parameters;
    botData.commands[lastObj].description = description;
})

function wast() {
    fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(botData, null, 2));
}