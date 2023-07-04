let version = 3
const { app, ipcRenderer } = require('electron');
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
            for (let parameter of botData.commands[lastObj].parameters) {
                variables.push(parameter.storeAs)
            }
        }
        if (botData.commands[lastObj].bounds) {
            if (botData.commands[lastObj].trigger == 'message' || botData.commands[lastObj].trigger == 'textCommand') {
                if (botData.commands[lastObj].bounds == 1) {
                    actionType = 'dm'
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

let isUpdating = false;
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

        for (let action in botData.commands[lastObj].actions) {
            let count = 0;
            let quickie = '';
            delay++;
            let quickdata;
            let dataquick;
            let extrf;
            if (botData.commands[lastObj].actions[parseFloat(action) - 1] == undefined) {
              extrf = 'borderbottom';
            } else if (botData.commands[lastObj].actions[parseFloat(action) + 1] == undefined) {
              extrf = 'bordertop';
            } else {
              extrf = 'bordercentere';
            }
            try {
            let actionFile = require(`./AppData/Actions/${botData.commands[lastObj].actions[action].file}`)
            try {
            quickdata = actionFile.UI;
            dataquick = botData.commands[lastObj].actions[action].data[quickdata.preview].split('');
                for (let character in dataquick) {
                    if (count != 23) {
                        const opacity = 100 - (count - 15) * 10;
                        quickie = `${quickie}<span style="opacity: ${opacity}%;">${dataquick[character]}</span>`;
                        count++;
                    }
                  }
            } catch (err) {
                quickie = `Error`
            }
        
            document.getElementById('actionbar').innerHTML += `
            <div id="Action${action}" onmouseenter="lastHovered = this" draggable="true" ondragleave="handleActionDragEnd(this)" ondragend="handleActionDrop()" ondragover="actionDragOverHandle(event, this)" ondragstart="handleActionDrag(this)" onmouseleave="lastHovered = null;" class="action textToLeft ${extrf}" style="animation-delay: ${delay * 3}0ms" ondblclick="editAction(this)" onclick="highlight(this)">
            ${botData.commands[lastObj].actions[action].name}
            <div style="opacity: 50%; margin-left: 7px;">${`${quickdata.previewName}`}: ${quickie}</div>
            <div class="deleteActionButton" onclick="deleteObject(this)">✕</div>`;
        } catch (err) {
            document.getElementById('actionbar').innerHTML += `
            <div id="Action${action}" onmouseenter="lastHovered = this" draggable="true" ondragleave="handleActionDragEnd(this)" ondragend="handleActionDrop()" ondragover="actionDragOverHandle(event, this)" ondragstart="handleActionDrag(this)" onmouseleave="lastHovered = null;" class="action textToLeft ${extrf}" style="animation-delay: ${delay * 3}0ms" ondblclick="editAction(this)" onclick="highlight(this)">
            Error
            <div style="opacity: 50%; margin-left: 7px;"> - Action Missing</div>
            <div class="deleteActionButton" onclick="deleteObject(this)">✕</div>`;
        }
        
            if (action === lastAct) {
              setTimeout(() => {
                highlight(document.getElementById('Action' + action));
            }, 50);
            }
        }
    }

    function refreshGroups() {
        var delay = 0;
        document.getElementById('commandbar').innerHTML = ''
        for (let cmd in botData.commands) {
            delay++
            document.getElementById('commandbar').innerHTML += `<div class="action textToLeft" onmouseenter="lastHovered = this" onmouseleave="lastHovered = null;" id="Group${parseFloat(cmd)}" style="animation-delay: ${delay * 3}5ms" onclick="highlight(this)"><div id="name">${botData.commands[cmd].name}</div> <div style="opacity: 50%; margin-left: 7px;"> | ${Object.keys(botData.commands[cmd].actions).length} Actions </div> <div class="deleteActionButton forceRounded" style="border-radius: 124px;" onclick="deleteObject(this)">✕</div> `
            if (cmd == lastObj) {
                setTimeout(() => {
                    highlight(document.getElementById(`Group${cmd}`), true, true)
                }, 50)
            }
        }
        closeCommand()
    }
    function highlight(element) {
        if (element.id.startsWith('Group') == true) {
            try {
            document.getElementById(`Group${lastObj}`).style.backgroundColor = '#FFFFFF15';
            } catch(err) {}
            element.style.backgroundColor = '#FFFFFF25';
            document.getElementById('Command_Name').value = element.innerText.split('|')[0];
            document.getElementById('actionsOf').innerHTML = `Actions Of ${element.innerText.split('|')[0]}`
            lastObj = element.id.split('Group')[1]
            refreshActions();
            
            if (botData.commands[lastObj].type == 'action') {
                console.log(botData.commands[lastObj])
                    switch(botData.commands[lastObj].trigger) {
                case 'slashCommand':
                    ddaf = 'Slash Command'
                    break
                case 'textCommand':
                    ddaf = 'Text Command'
                break
                case 'messageContent':
                    ddaf = 'Message'
            }
    
            document.getElementById('botData.commands[lastObj].actions').innerHTML = `Type: ${ddaf} • ${Object.keys(botData.commands[lastObj].actions).length} Actions Used`  
            } else {
                document.getElementById('botData.commands[lastObj].actions').innerHTML = `Event • ${Object.keys(botData.commands[lastObj].actions).length} Actions Used`
            }
            botData.commands[lastObj].actions = botData.commands[lastObj].actions

            checkErrors()
            closeCommand()
            let lastCheckedAction = null;
            for (let action in botData.commands[lastObj].actions) {
                lastCheckedAction = action;
            }
            if (botData.commands[lastObj].count != botData.commands[lastObj].actions.length || botData.commands[lastObj].count != lastCheckedAction) {
                console.log('fix, error')
                let filteredEntries = Object.entries(botData.commands[lastObj].actions);
                let newJson = {};
                let newCount = 0;
                for (let i = 0; i < filteredEntries.length; i++) {
                    newCount++
                  newJson[i + 1] = filteredEntries[i][1];
                }
                botData.commands[lastObj].count = newCount
                botData.commands[lastObj].actions = newJson;
                refreshActions()
                wast()

            }
            botData.commands[lastObj].actions[lastAct] = botData.commands[lastObj].actions[lastAct]
        } else {
            try {
            document.getElementById(`Action${lastAct}`).style.backgroundColor = '#FFFFFF15';
            } catch(err) {}
            element.style.backgroundColor = '#FFFFFF25';
            lastAct = element.id.split('Action')[1]
        }
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

    function switchGroups() {
            let bottombar = document.getElementById('bottombar')
            bottombar.style.animationDuration = ''
            bottombar.style.animationName = '';
            bottombar.style.animationDuration = '0.49s'
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
            bottombar.style.overflowY = 'none'
            bottombar.style.boxShadow = '#00000050 0px 0px 12px'
            document.getElementById('wedf').onclick = () => {unmodify()}

            bottombar.onclick = () => {
                document.getElementById('wedf').onclick = () => {switchGroups()}
                unmodify()
            }
            setTimeout( () => {
                bottombar.innerHTML = ''
                let datkd = ''
                if (botData.commands[lastObj].type == 'action') {
                    datkd = `
                    <div class="barbutton widerBB borderright" id="ttxtcmd" onmousedown="sltTxt()">
                    <div class="barbuttontexta">Text Command</div></div>

                    <div class="barbutton widerBB bordercenter" id="tslhscmd">
                    <div class="barbuttontexta" onclick="tSlsh()">Slash Command</div></div>
                     <div class="barbutton widerBB borderleft" id="ttxtmsgcmd" onmousedown="sltMsg()">
                     <div class="barbuttontexta">Message</div></div>`
                } else {
                    datkd = `<div class="textse">Click "Command Options" to select an event!</div>`
                }
            bottombar.innerHTML += `
            •••
            <div class="flexbox" style="justify-content: center; align-items: center; width: 100%; height: 100%; margin-top: -3.5%; margin-right: auto; margin-left: auto;">
            <div style="width: 100%;">
            <div class="flexbox" style="width: 98%; margin-left: auto; margin-right: auto; height: 20%; justify-content: center;">
            <div class="barbutton widerBB borderright" onmousedown="setCmd()"><div class="barbuttontexta">Command</div></div>
            <div class="barbutton widerBB borderleft" onmouseup="setEvt()"><div class="barbuttontexta">Event</div></div>
            </div>
            <div class="sepbar"></div>
            
            <div class="flexbox" style="width: 98%; margin-left: auto; margin-right: auto; height: 20%; justify-content: center;">
            ${datkd}

            </div>
            </div>

            </div>`
            bottombar.style.animationName = ''
            bottombar.style.animationDuration = ''
            if (botData.commands[lastObj].type == 'action') {
                switch (botData.commands[lastObj].trigger) {
                    case 'textCommand': 
                        document.getElementById('ttxtcmd').style.backgroundColor = '#FFFFFF20'
                    break
                    case 'slashCommand': 
                        document.getElementById('tslhscmd').style.backgroundColor = '#FFFFFF20'
                    break
                    case 'messageContent': 
                document.getElementById('ttxtmsgcmd').style.backgroundColor = '#FFFFFF20'
                    break
                }
            }
}, 490)
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


    function selectAction() {
        let kindOf;
        if (botData.commands[lastObj].type == 'action') {
            if (botData.commands[lastObj].trigger == 'textCommand' || botData.commands[lastObj].trigger == 'messageContent') {
                kindOf = 'Text'
            } else {
                kindOf = 'Slash'
            }
        } else {
            kindOf = 'Event'
        }

        let actionButton = document.getElementById('cakt')
        actionButton.style.animationDuration = '0.6s'
        actionButton.style.animationName = 'expande'
        setTimeout(() => {
            actionButton.style.overflowY = 'auto'
            let actons = fs.readdirSync(processPath + '\\AppData\\Actions')
            actionButton.innerHTML = `<div class="flexbox fwd" style="justify-content: center; width: 100%; align-items: center; margin-left: auto; margin-right: auto;">
            <div style="background-color: unset; opacity: 100%; padding: 6px; border-radius: 15px; width: 100%; position: sticky; top: 0; bottom: 3; backdrop-filter: blur(50px); z-index: 50;" class="flexbox blurbb">
            <div class="barbuttond" style="width: 20%; z-index: 3; margin: auto; background-color: #FFFFFF10" onclick="deselectAction(this)">
            
            <div style="line-height: auto; text-align: center !important; margin: auto;">Close</div></div>
            
            <div class="barbuttond" id="searchbar" contentEditable="true" onkeydown="searchFor(this)" style="width: 65%; margin: auto; background-color: #FFFFFF10 !important;"></div>
            </div>
            <div id="actarraypick" style="width: 95%; margin-left: auto; margin-right: auto; justify-content: center; align-items: center;" class="flexbox fwd"></div>`
            let actionBut = document.getElementById('actarraypick')
            let miss = 0;
            document.getElementById('searchbar').innerHTML = ' '
            actionBut.innerHTML += `<div class="action" id="misss"></div>`
            let dly = 0;
            for (let acte in actons) {
                dly++
                let actionFile = require(`./AppData/Actions/${actons[acte]}`);

                if (actionFile.UI.compatibleWith.includes(kindOf) || actionFile.UI.compatibleWith.includes("Any")) {

                let acten = actons[acte]
                let afile = require(`./AppData/Actions/${acten}`)
                actionBut.innerHTML += `<div class="action" style="animation-duration: 0.5s; animation-name: fdn; animation-delay: ${dly * 12}ms; z-index: 3; width: 45%; background-color: #FFFFFF10 !important;" onclick="openAction('${acten}');" id="${acten}">${afile.data.name}</div>`
                lastType = 1
                } else {
                    miss++
                }
            document.getElementById('misss').innerHTML = miss + ' Actions Hidden (Incompatible)'
        }}, 360)
        setTimeout(() => {
            actionButton.style.animationDuration = ''
            actionButton.style.animationName = ''
            actionButton.style.width = '90%'
            actionButton.style.display = 'block'
            actionButton.style.height = '50%'
            actionButton.style.maxHeight = '90%'
            actionButton.style.borderRadius = '20px'
            actionButton.onclick = () => {null}
        }, 585)
    }

    function deselectAction() {
        let elm = document.getElementById('cakt')
        elm.style.animationDuration = '0.7s'
        elm.style.animationName = 'inpande'
        setTimeout(() => {
            elm.innerHTML = 'Change Action'
        }, 100)
        setTimeout(() => {
            elm.style.animationDuration = ''
            elm.style.animationName = ''
            elm.style.width = '45%'
            elm.style.height = 'auto'
            elm.style.maxHeight = '90%'
            elm.style.borderRadius = '100px'
            elm.onclick = function() {selectAction()}
        }, 690)
    }
 
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
            let foundIssues = false;
            let issues = document.getElementById('issues');
            let status = document.getElementById('status');
            let tile = document.getElementById('tld')
            if (errorPending == false) {
            tile.style.animationName = 'degb'
            tile.style.animationDuration = '0.5s'
        }
            setTimeout ( () => {
                issues.innerHTML = ' '
            
            for (let action in botData.commands[lastObj].actions) {
                let UId = require(`./AppData/Actions/${botData.commands[lastObj].actions[action].file}`).data
                
                let UIdata = require(`./AppData/Actions/${botData.commands[lastObj].actions[action].file}`).UI
                let kindOf;
                for (let element in UIdata) {
                    if (element.endsWith('*') && botData.commands[lastObj].actions[action].data[UIdata[element]] == '') {
                        issues.innerHTML += `
                        <div class="issue">
                        <div class="flexbox">
                        <div class="barbuttontexta">${botData.commands[lastObj].actions[action].name} has an incomplete field</div>
                        <div class="barbuttond noanims" style="height: 30px;margin: auto; margin-right: 0px;" onclick="console.log('test123'); if(lastType == 0) {}; document.getElementById('Action${action}').style.backgroundColor = '#FFFFFF50'; editAction(document.getElementById('Action${action}')); setTimeout(() => { document.getElementById('${UIdata[element]}').style.animationName = 'glowTwice'; document.getElementById('${UIdata[element]}').style.animationDuration = '0.8s'; document.getElementById('${UIdata[element]}').focus();}, 1050)"><div class="image focuds"></div></div>
                        </div></div>
                        `
                        foundIssues = true
                    }
                    
                    if (element.startsWith('menuBar')) {
                        if (UIdata[element].extraField) {
                            if (botData.commands[lastObj].actions[action].data[UIdata[element].storeAs].endsWith('*')) {
                                if (botData.commands[lastObj].actions[action].data[UIdata[element].extraField] == '') {
                                    issues.innerHTML += `
                                    <div class="issue">
                                    <div class="flexbox">
                                    <div class="barbuttontexta">${botData.commands[lastObj].actions[action].name} has an empty input field</div>
                                    <div class="barbuttond noanims" style="height: 30px; margin: auto; margin-right: 0px;" onclick="document.getElementById('Action${action}').style.backgroundColor = '#FFFFFF50'; editAction(document.getElementById('Action${action}')); setTimeout(() => {document.getElementById('${UIdata[element].extraField}').style.animationName = 'glowTwice'; document.getElementById('${UIdata[element].extraField}').style.animationDuration = '1s'; document.getElementById('${UIdata[element].extraField}').focus()}, 1050)"><div class="image focuds"></div></div>
                                    </div></div>
                                    `
                                    foundIssues = true
                                }
                            }
                        }
                    }
                }
                if (botData.commands[lastObj].type == 'action') {
                    if (botData.commands[lastObj].trigger == 'textCommand' || botData.commands[lastObj].trigger == 'messageContent') {
                        kindOf = 'textCommand'
                    } else {
                        kindOf = 'slashCommand'
                    }
                } else {
                    kindOf = 'event'
                }
                if (UIdata.compatibleWith.includes("Any")) {
                    status.innerHTML = '✓ • You\'re good to go!'
                } else {
                    if (kindOf == 'event') {
                        console.log(UIdata.compatibleWith)
                        if (!UIdata.compatibleWith.includes("Event")) {

                            issues.innerHTML += `
                            <div class="issue">
                            <div class="flexbox">
                            <div class="barbuttontexta">${botData.commands[lastObj].actions[action].name} is not compatible</div>
                            <div class="barbutton noanims" onclick="setTimeout(() => {highlight('Action' + document.getElementById('Action${action}')); lastHighlighted.focus();}, 100);"><div class="barbuttontexta noanims">Highlight</div></div>
                            </div></div>
                            `
                            foundIssues = true
                        }
                    }
                    if (kindOf == 'textCommand') {
                        if (!UIdata.compatibleWith.includes("Text")) {

                            issues.innerHTML += `
                            <div class="issue">
                            <div class="flexbox">
                            <div class="barbuttontexta">${botData.commands[lastObj].actions[action].name} is not compatible</div>
                            <div class="barbutton noanims" onclick="setTimeout(() => {highlight('Action' + document.getElementById('Action${action}')); lastHighlighted.focus();}, 100); "><div class="barbuttontexta noanims">Highlight</div></div>
                            </div></div>
                            `
                            foundIssues = true;
                        }
                    }
                    if (kindOf == 'slashCommand') {
                        if (!UIdata.compatibleWith.includes("Slash")) {

                            issues.innerHTML += `
                            <div class="issue">
                            <div class="flexbox">
                            <div class="barbuttontexta">${botData.commands[lastObj].actions[action].name} is not compatible</div>
                            <div class="barbutton noanims"  onclick="setTimeout(() => {highlight('Action' + document.getElementById('Action${action}')); lastHighlighted.focus();}, 100); "><div class="barbuttontexta noanims">Highlight</div></div>
                            </div></div>
                            `
                            foundIssues = true;
                        }
                    }



                }
                console.log(kindOf)
            }
            if (foundIssues == true) {
                status.innerHTML = '✕ • Issues Found'
            } else {
                status.innerHTML = '✓ • No Issues Found'
            }

            let issueshtml = issues.innerHTML;
            let isht = issueshtml;
            if (errorPending == false) {
            issues.innerHTML = `<div class="ring" style="margin: auto; display: block; margin-top: 10vh; animation-name: ringifygo; animation-duration: 1s;"></div>`
        }
            setTimeout(() => {
                issues.innerHTML = isht;
                errorPending = false
            }, 990)
        }, 250)
        setTimeout(() => {
        tile.style.animationName = ''
        tile.style.animationDuration = ''
        }, 490)
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
                let counnt = 0;
                document.getElementById('exprjt').innerHTML = '<div class="ring"></div> <br> Exporting Project!'
                    let acrnum = 0;
                    for (let acf in botData.commands) {
                        acrnum = parseFloat(acrnum) + parseFloat(botData.commands[acf].count)
                    }

                for (let action in actions) {
                    counnt++
                        await fs.writeFileSync(exportFolder + '\\AppData\\Actions\\' + actions[action], fs.readFileSync(processPath + '\\AppData\\Actions\\' + actions[action]))
                    document.getElementById('exprjt').innerHTML = '<div class="ring"></div> <br> Project Exported! <br>' + counnt + ' Actions Exported To  <span style="opacity:50%"> ' + botData.name + '</span><br>' + `
                    <div class="sepbar"></div>
                    <div class="barbuttontexta">Project Summary</div>
                    <br>
                    <span style="opacity:50%">${Object.keys(botData.commands).length}</span> Action Groups In Total
                    <div></div>
                    <br>
                    `
                }
                setTimeout(() => {
                    location.reload()
                }, 14000)
            } else {
                elm.style.animationName = 'glowTwice'
                elm.style.animationDuration = '1s'
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
            setTimeout(() => {
                let spn = document.getElementById('saveProjectnotif')
                spn.remove()
             }, 3000)
            try {
            savePrj()
        } catch(err) {
            console.log(err)
            elm.innerHTML = `
            <div class="flexbox" style="margin: auto; align-items: center; justify-content: center; height: calc(100% - 12px); padding: 6px;">
            <div class="barbutton" onclick="exportProject(); this.remove()" style="margin: auto; animation-duration: 1s;">
            <div class="barbuttontexta">Fix</div>
            </div>
            <div class="barbuttontexta">No project output</div>
            </div>
            `
            setTimeout(() => {
                
            }, 5000)
        }

        }, 120000)
 /*
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
            savePrj()
        } catch(err) {
            null
        }
        setTimeout(() => {
           let spn = document.getElementById('saveProjectnotif')
           spn.remove()
        }, 3000)
*/
        function refreshParameters() {
            let parameters = botData.commands[lastObj].parameters
            let params = ''
            if (parameters != undefined) {
                let count = 0
                for (let parameter in parameters) {
                    count++
                    params = `${params}
                    <div class="barbuttone lessMarginBT" id="${parameters[parameter].paramPos}Param" onclick="parameterIfy(this)" style="width: 95%; height: auto; animation-name: appearfadenmt; font-size: 18px; overflow-x: auto; overflow-y: auto; margin-left: auto; margin-right: auto;  border-left: solid 0.5vw #FFFFFF15; padding-left: 0.5vw; padding-right: 0vw;">${botData.commands[lastObj].parameters[parameter].name} <div class="barbuttontexta" style="margin-right: 0.3vw !important;background-color: #00000030; border-radius: 4px; width: 3vw; cursor: pointer;" onclick="deleteParam(${parameter})"><b>x</b></div></div>`
                }
                document.getElementById('parameterTile').innerHTML = params
            } else {
                botData.commands[lastObj].parameters = []
                fs.writeFileSync(processPath +'/AppData/data.json', JSON.stringify(botData, null, 2));
            }
        }
        function commandOptions() {
            let commandOptions = document.getElementById('botData.commands[lastObj].actions')
            commandOptions.className = 'baction'
            commandOptions.style.maxHeight = '75vh';
            commandOptions.style.width = '96%';
            commandOptions.style.animationName = 'actionExpand'
            commandOptions.style.animationDuration = '0.5s'
            commandOptions.style.height = '45.5%';
            commandOptions.style.borderRadius = '15px'
            commandOptions.style.backgroundColor = '#FFFFFF15'
            commandOptions.style.paddingLeft = '5px'
            commandOptions.style.overflow = 'none'

            let inhf1 = commandOptions.innerHTML;
            let inh = inhf1;
            setTimeout(() => {
                if (botData.commands[lastObj].type != 'event') {
            switch(botData.commands[lastObj].trigger) {
                case 'slashCommand':
                let commandDescription = ''
                commandDescription = botData.commands[lastObj].description

                if (commandDescription == undefined || commandDescription == null ) {
                    commandDescription = ''
                }

                commandOptions.innerHTML = `
                <div class="btext">Command Description</div>
                <input class="input" style="padding: 12.5px;"
                onkeydown="if (event.key != 'Backspace') return this.value.split('').length < 32;" oninput="setDescription(this)" value="${commandDescription}">


                <div id="sepfx" class="flexbox" style="margin-left: calc(auto + 2.5px); margin-right: auto; width: 100%; height: 100%;">
                <div></div>
                    <div style="width: 40%; margin-left: auto; margin-right: 1%;">
                <div style="border-radius: 12px; border-bottom-left-radius: 2px; border-bottom-right-radius: 2px; margin-bottom: 1%; width: calc(100% - 12px); padding: 6px; padding-top: 1.5px; padding-bottom: 1.5px; background-color: #FFFFFF10;">                
                <div class="btext">Parameters</div>
                </div>
                <div class="hoverablez" onclick="newParam()" style="border-radius: 2px; margin-bottom: 1%; width: calc(100% - 12px); padding: 6px; padding-top: 1.5px; padding-bottom: 1.5px;">                
                <div class="flexbox"><div class="image add" style="width: 3vw; height: 3vh; margin-left: 0.3vw !important; animation-duration: 0s !important;"></div> <div class="barbuttontexta" style="margin-right: 1vw !important;">Add Parameter</div></div>
                </div>
                
                <div class="bordertopz" id="parameterTile" style="border-top-left-radius: 12px; border-bottom-right-radius: 2px !important; overflow-y: auto; border-bottom-left-radius: 12px; background-color: #00000040; padding: 12px; margin-left: auto; width: calc(100% - 24px); justify-content: center; align-items: center; height: calc(30vh - 24px - 1% - 26px);">
                
                </div>
            </div>

                <div id="plTile" class="flexbox" style="border-top-right-radius: 12px; border-top-left-radius: 12px; border-bottom-right-radius: 12px;background-color: #00000040; padding: 12px;margin-right: auto;width: calc(55% - 24px);height: 100%;align-items: center;overflow-y: auto; height: calc(30vh + 3vh - 19px);">
                    <div class="barbuttontexta flexbox" style="margin: auto;">⟨  <span style="margin-left: 6vw"></span> Select A Parameter!</div>
                </div>

                </div>
                <div class="barbuttontexta" onclick="closeCommand()" style="cursor: pointer;">Close</div>
                `

                refreshParameters()
                break

                case 'textCommand':
                    // bounds: 0 - none; 1 - dm only; 2 - server only;
                    if (!botData.commands[lastObj].bounds) {
                        botData.commands[lastObj].bounds = 2;
                        wast()
                    }
                    commandOptions.innerHTML = `
                    <div class="barbuttontexta" style="margin-bottom: 0.3vh; margin-top: 0.3vh;">Command Bounds</div>
                    
                    <div class="flexbox borderbottom" style="background-color: #00000040; padding: 6px;">
                    <div class="barbuttonshift borderright" onclick="botData.commands[lastObj].bounds = 1; wast(); completeBoundsType();" id="bounds-DM" style="width: 18%;">
                    <div class="barbuttontexta">DM-only</div>
                    </div>
                    <div class="barbuttonshift borderleft" onclick="botData.commands[lastObj].bounds = 2; wast(); completeBoundsType();" id="bounds-GUILD" style="width: 18%;">
                    <div class="barbuttontexta">Guild Only</div>
                    </div>
                    </div>

                    <div class="bordertop" style="background-color: #00000050; padding: 6px; padding-bottom: 1vh;" id="boundsCustomizer">
                    </div>
                    <div class="textse" style="margin-top: auto; cursor: pointer;" onclick="closeCommand()">Close</div>

                    `
                    completeBoundsType()

                break

                case 'messageContent':
                    commandOptions.innerHTML = `
                    <div class="barbuttontexta flexbox" margin: auto;>Nothing Available Yet For Text Commands</div>
                    <div class="barbuttone flexbox" onclick="closeCommand()"><div class="barbuttontexta">✕</div></div>
                    `
                break

            }
        } else {
            let events = fs.readdirSync(processPath + '\\AppData\\Events')


            commandOptions.innerHTML = `
            <div class="flexbox" style="height: 100%; align-items: center; justify-content: center;">
            <div id="evtpane" style="background-color: #00000030; border-radius: 12px; width: 49%; margin-right: 2%; height: 100%;">
            <div class="barbuttontexta">Type: ${botData.commands[lastObj].event}</div>
</div>
            <div id="aevts" style="background-color: #00000030; border-radius: 12px; width: 49%; padding-top: 5px; height: calc(100% - 5px); max-height: calc(100% - 5px); overflow: auto;">
            </div></div>`

                if (botData.commands[lastObj].eventData == undefined) {
                    botData.commands[lastObj] = {
                        ...botData.commands[lastObj],
                        eventData: [" ", " "]
                }}

            for (let event in events) {
                let efile = require(`./AppData/Events/${events[event]}`)
                let aev = document.getElementById('aevts')   
                let inp = ''
                let decor = '&'
                if (efile.inputSchemes > 1) {
                    for (let inpsch in efile.nameSchemes) {
                        if (!efile.nameSchemes[inpsch + 1]) {
                            decor = '' 
                        }
                        inp = inp + ' ' + efile.nameSchemes[inpsch] + decor
                    }
                } else {
                    inp = efile.nameSchemes[0]
                }
                aev.innerHTML += `
                <div onclick="epane('${events[event]}')" style="background-color: #00000030; margin-bottom: 5px; padding: 5px; width: 93%; border-radius: 10px; margin-left: auto; margin-right: auto;">
                <div class="zaction" style="margin-bottom: 5px;">${efile.name}</div>
                <div class="barbuttontexta">Includes ${efile.inputSchemes} Field(s)
                </div>

                </div>

                `    
            }
            epane(botData.commands[lastObj].eventFile)
        }
        }, 100)

        
        setTimeout(() => {
            commandOptions.style.animationName = ' '
            commandOptions.style.animationDuration = ' '

        }, 510)
        }    
        function completeBoundsType() {
            document.getElementById('bounds-DM').style.backgroundColor = ''
            document.getElementById('bounds-GUILD').style.backgroundColor = ''

            let bounds = document.getElementById('boundsCustomizer')
            bounds.style.transform = `scale(1)`
            bounds.style.marginTop = `0px`

            bounds.style.transition = 'all 0.2s ease'
            bounds.style.transform = `scale(0)`
            setTimeout(() => {

            if (botData.commands[lastObj].bounds == 0) {
                botData.commands[lastObj].bounds = 2;
                wast()
                completeBoundsType()
                return
            }
            if (botData.commands[lastObj].bounds == 1) {
                document.getElementById('bounds-DM').style.backgroundColor = '#FFFFFF17'

                bounds.innerHTML = `
                <div class="barbuttontexta noanims">
                <b>DMs only</b>
                </div>
                <div class="texta">
                This command can be used only by an user inside a bot's DMs - Uses are limited
                </div>
                `
            }
            if (botData.commands[lastObj].bounds == 2 || botData.commands[lastObj].bounds == 3) {
                document.getElementById('bounds-GUILD').style.backgroundColor = '#FFFFFF17'
                if (!botData.commands[lastObj].customRestrictions) {
                    botData.commands[lastObj].customRestrictions = {
                        position: {"none":""},
                        limitedTo: 0
                    };
                    wast()
                }
                bounds.innerHTML = `
                <div class="barbuttontexta noanims">
                <b>Server Only</b>
                </div>
                <div class="texta" style="padding-bottom: 1px; padding-top: 1px;">
                This command can be used only inside a guild!
                </div>
                <div class="sepbars"></div>
                <div class="textse">
                Required Permissions
                </div>
                <div class="flexbox" style="margin-bottom: 6px;">
                <div class="barbuttonshift borderrightbottom" id="position-ADMIN" onclick="boundsSetUser(this)"><div class="barbuttontexta">Admin</div></div>
                <div class="barbuttonshift bordercenter" id="position-BAN" onclick="boundsSetUser(this)"><div class="barbuttontexta">Ban</div></div>
                <div class="barbuttonshift borderleftbottom" id="position-KICK" onclick="boundsSetUser(this)"><div class="barbuttontexta">Kick</div></div>
            </div>
               <div class="flexbox">
                <div class="barbuttonshift borderrighttop" id="position-TIMEOUT" onclick="boundsSetUser(this)"><div class="barbuttontexta">Timeout</div></div>
                <div class="barbuttonshift bordercenter" id="position-MSG" onclick="boundsSetUser(this)"><div class="barbuttontexta">Manage Msg.</div></div>
                <div class="barbuttonshift borderlefttop" id="position-NONE" onclick="boundsSetUser(this)"><div class="barbuttontexta">None</div></div>
                
               </div> 
                `
            }        
            bounds.style.transform = `scale(1)`
            refreshRequiredPosition()
            }, 300)
            
        }
        function setCustomLimits(what) {
            if (what == 'none') {
                botData.commands[lastObj].customRestrictions.limitedTo = 0;
            }
            if (what == 'DMs') {
                botData.commands[lastObj].customRestrictions.limitedTo = 1;
            }
            if (what == 'SERVERS') {
                botData.commands[lastObj].customRestrictions.limitedTo = 2;
            }
            wast()
            refreshCustomLimits()
        }
        function refreshCustomLimits() {
            document.getElementById('boundsLimit-NONE').style.backgroundColor = ''
            document.getElementById('boundsLimit-DM').style.backgroundColor = ''
            document.getElementById('boundsLimit-SERVER').style.backgroundColor = ''
            let type = botData.commands[lastObj].customRestrictions.limitedTo;
            if (type == 0) {
                document.getElementById('boundsLimit-NONE').style.backgroundColor = '#FFFFFF18'
            }
            if (type == 1) {
                document.getElementById('boundsLimit-DM').style.backgroundColor = '#FFFFFF18'
            }
            if (type == 2) {
                document.getElementById('boundsLimit-SERVER').style.backgroundColor = '#FFFFFF18'
            }
        }
        function boundsSetUser(what) {
            let pending = what.id;
            if (what.id == 'position-ADMIN') {
                if (botData.commands[lastObj].customRestrictions.limitedTo['admin'] == undefined) {
                    botData.commands[lastObj].customRestrictions.limitedTo = {"admin":""}
                } else {
                    delete botData.commands[lastObj].customRestrictions.limitedTo['admin']
                }
            }
            if (what.id == 'position-KICK') {
                if (botData.commands[lastObj].customRestrictions.limitedTo['kick'] == undefined) {
                    botData.commands[lastObj].customRestrictions.limitedTo.kick = ''
                } else {
                    delete botData.commands[lastObj].customRestrictions.limitedTo['kick']
                }
            }
            if (what.id == 'position-BAN') {
                if (botData.commands[lastObj].customRestrictions.limitedTo['ban']  == undefined) {
                    botData.commands[lastObj].customRestrictions.limitedTo.ban = ''
                } else {
                    delete botData.commands[lastObj].customRestrictions.limitedTo['ban']
                }
            }
            if (what.id == 'position-TIMEOUT') {
                if (botData.commands[lastObj].customRestrictions.limitedTo['timeout'] == undefined) {
                    botData.commands[lastObj].customRestrictions.limitedTo.timeout = ''
                } else {
                    delete botData.commands[lastObj].customRestrictions.limitedTo['timeout']
                }
            }
            if (what.id == 'position-MSG') {
                if (botData.commands[lastObj].customRestrictions.limitedTo['msg'] == undefined) {
                    botData.commands[lastObj].customRestrictions.limitedTo.msg = ''
                } else {
                    delete botData.commands[lastObj].customRestrictions.limitedTo['msg']
                }
            }
            if (what.id == 'position-NONE') {
                if (botData.commands[lastObj].customRestrictions.limitedTo['none'] == undefined) {
                    botData.commands[lastObj].customRestrictions.limitedTo = {"none":""}
                } else {
                    delete botData.commands[lastObj].customRestrictions.limitedTo['none']
                }
        }
        if (botData.commands[lastObj].customRestrictions.limitedTo['admin'] != undefined && Object.keys(botData.commands[lastObj].customRestrictions.limitedTo).length != 1) {
            delete botData.commands[lastObj].customRestrictions.limitedTo['admin']
        }
        if (botData.commands[lastObj].customRestrictions.limitedTo['none'] != undefined && Object.keys(botData.commands[lastObj].customRestrictions.limitedTo).length != 1) {
            delete botData.commands[lastObj].customRestrictions.limitedTo['none']
        }
        if (Object.keys(botData.commands[lastObj].customRestrictions.limitedTo).length == 0) {
            botData.commands[lastObj].customRestrictions.limitedTo = {"none":""}
        }
        wast()
        refreshRequiredPosition()

    }
        function refreshRequiredPosition() {
            let posts = botData.commands[lastObj].customRestrictions.limitedTo

                document.getElementById('position-NONE').style.backgroundColor = ''
                document.getElementById('position-MSG').style.backgroundColor = ''
                document.getElementById('position-TIMEOUT').style.backgroundColor = ''
                document.getElementById('position-KICK').style.backgroundColor = ''
                document.getElementById('position-BAN').style.backgroundColor = ''
                document.getElementById('position-ADMIN').style.backgroundColor = ''

            if (posts['none'] != undefined) {
                document.getElementById('position-NONE').style.backgroundColor = '#FFFFFF18'
            }
            if (posts['msg'] != undefined) {
                document.getElementById('position-MSG').style.backgroundColor = '#FFFFFF18'
            }
            if (posts['timeout'] != undefined) {
                document.getElementById('position-TIMEOUT').style.backgroundColor = '#FFFFFF18'
            }
            if (posts['kick'] != undefined) {
                document.getElementById('position-KICK').style.backgroundColor = '#FFFFFF18'
            }
            if (posts['ban'] != undefined) {
                document.getElementById('position-BAN').style.backgroundColor = '#FFFFFF18'
            }
            if (posts['admin'] != undefined) {
                document.getElementById('position-ADMIN').style.backgroundColor = '#FFFFFF18'
            }
        }
        function epane(file) {
            let efile = require(`./AppData/Events/${file}`)
            let evtpane = document.getElementById('evtpane')
            botData.commands[lastObj].eventFile = file
            fs.writeFileSync(processPath +'/AppData/data.json', JSON.stringify(botData, null, 2));

            if (efile.inputSchemes > 1) {
                try {
                evtpane.innerHTML = `
                <div style="margin-top: 10px;"></div>
                <div class="btext">On ${efile.name}</div>
                <div class="sepbars"></div>
                    <div class="barbuttontexta">${efile.nameSchemes[0]}</div>
                    <div class="input" id="0EV" onblur="storeevfield(this)" style="height: 26px; text-align: left;" contenteditable="true">${botData.commands[lastObj].eventData[0]}</div>
                
                    <div class="sepbars"></div>
                    <div class="barbuttontexta">${efile.nameSchemes[1]}</div>
                    <div class="input" id="1EV" onblur="storeevfield(this)" style="height: 26px; text-align: left;" contenteditable="true">${botData.commands[lastObj].eventData[1]}</div>
                    
                    <div class="sepbars"></div>

                    <div class="barbutton" onclick="closeCommand()" style="height: auto; margin: auto;"><div class="barbuttontexta">Close</div></div>
                    `} catch(er) {null}
            } else {
                try {
                evtpane.innerHTML = `
                <div style="margin-top: 10px;"></div>
                <div class="btext">On ${efile.name}</div>
                <div class="sepbars"></div>
                    <div class="barbuttontexta">${efile.nameSchemes[0]}</div>
                    <div class="input" id="0EV" onblur="storeevfield(this)" style="height: 26px; text-align: left;" contenteditable="true">${botData.commands[lastObj].eventData[0]}</div>
                    <div class="sepbars"></div>

                    <div class="barbutton" onclick="closeCommand()" style="height: auto; margin: auto;"><div class="barbuttontexta">Close</div></div>  
                    `
            } catch(err) {null}
        }
        }
        function storeevfield(fr) {
            let id = fr.id.split('EV')[0]
            let nht = fr.innerHTML 

            botData.commands[lastObj].eventData[id] = nht
            wast()
        }

        function newParam() {
            let paramParent = document.getElementById('parameterTile')
            let f = 0;
            for (let parm in botData.commands[lastObj].parameters) {
                f++   
            }
            if (f > 20) return
            while (document.getElementById(f + 'Param')) {
                f++ 
            }
            let newParam = {
                "name":"prm" + f,
                "type": "String",
                "required": false,
                "description": "Parameter #" + f + " of this command!",
                "storeAs":"Param" + f,
                "paramPos": f
            }

            botData.commands[lastObj].parameters.push(newParam)
            fs.writeFileSync(processPath +'/AppData/data.json', JSON.stringify(botData, null, 2));

            refreshParameters()
        }
        function deleteParam(parameter) {
            botData.commands[lastObj].parameters.splice(parameter, 1)
            let count = 0
            let params = ''
            let position = 0;
            for (let parame in botData.commands[lastObj].parameters) {
                let prms = botData.commands[lastObj].parameters
                    botData.commands[lastObj].parameters[parame].paramPos = position
                    position++
            }

            refreshParameters()
            fs.writeFileSync(processPath +'/AppData/data.json', JSON.stringify(botData, null, 2));
        }
        function parameterIfy(what) {

            if (lastParam && document.getElementById(lastParam)) {
                try {
                document.getElementById(lastParam).style.backgroundColor = ''
            } catch(err) {

            }
            }
            lastParam = what.id 
            let spl = parseFloat(lastParam.split('Param')[0]);

            what.style.backgroundColor = '#FFFFFF25'

            let paramTile = document.getElementById('plTile')

            paramTile.innerHTML = `
            <div class="flexbox" style="width: 100%; margin-left: auto; margin-right: auto;background-color: #00000030; border-radius: 7px; align-items: center; justify-content:center; padding: 3px;">
            <div class="barbuttontexta textLefttextLeft">Name</div>
            <input class="input textLeft" oninput="storeParamName(this)" onkeydown="if (this.value.length > 16 && event.key !== 'Backspace' || event.key === ' ') return false;" style="margin: 0.5vw; margin-top: 0vw;" contenteditable="true" value="${botData.commands[lastObj].parameters[spl].name}">
            </div>

            <div class="flexbox" style="width: 100%; margin-left: auto; margin-top: 1vh; margin-right: auto;background-color: #00000030; border-radius: 7px; align-items: center; justify-content:center; padding: 3px;">
            <div class="barbuttontexta textLefttextLeft">Description</div>
            <input class="input textLeft" oninput="storeParamDesc(this)" onkeydown="if (event.key != 'Backspace') return this.value.split('').length < 32" style="margin: 0.5vw; margin-top: 0vw;" contenteditable="true" value="${botData.commands[lastObj].parameters[spl].description}">
            </div>
            <div class="sepbars"></div>
            <div class="flexbox" style="width: 100%; margin-left: auto; margin-right: auto;background-color: #00000030; border-radius: 7px; align-items: center; justify-content:center; padding: 3px;">
            <div class="barbuttontexta">Required?</div>
            <div onclick="setReq(true, this)" id="rft" class="barbuttone borderrightz">
            <div class="barbuttontexta">✓</div>
            </div>

            <div onclick="setReq(false, this)" id="rff" class="barbuttone borderleftz">
            <div class="barbuttontexta">✕</div>

            </div>
            </div>

            <div class="flexbox" style="margin-top: 0.8vh; overflow-y: auto; max-height: 13vh; height: 13vh; width: 100%; margin-left: auto; margin-right: auto;background-color: #00000030; border-radius: 7px; align-items: center; justify-content:center; padding: 3px;">
            <div class="zaction lessPadding" id="strng" onclick="setPrm(this)">String</div>
            <div class="zaction lessPadding" id="intgr" onclick="setPrm(this)">Integer</div>
            <div class="zaction lessPadding" id="blen" onclick="setPrm(this)">Boolean</div>
            <div class="zaction lessPadding" id="chnl" onclick="setPrm(this)">Channel</div>
            <div class="zaction lessPadding" id="usere" onclick="setPrm(this)">User</div>
            <div class="zaction lessPadding" id="rle" onclick="setPrm(this)">Role</div>
            <div class="zaction lessPadding" id="mentnable" onclick="setPrm(this)">Mentionable</div>
            </div>
            <div class="sepbars"></div>
            <div class="flexbox" style="width: 100%; margin-left: auto; margin-right: auto;background-color: #00000030; border-radius: 7px; align-items: center; justify-content:center; padding: 3px;">
            <div class="barbuttontexta textLeft">Store As</div>

            <div class="input textLeft" onblur="elementContentChecker(this, {fromBlur: true, noSpaces: true, maxLength: 16}); storeParamStored(this);" style="margin: 0.5vw; margin-top: 0vw;" contenteditable="true">${botData.commands[lastObj].parameters[spl].storeAs}</div>
            </div>
            `
            switch (botData.commands[lastObj].parameters[spl].type) {
                case 'String':
                    document.getElementById('strng').style.backgroundColor = '#FFFFFF20'
                    break; 
                case 'Boolean':
                    document.getElementById('blen').style.backgroundColor = '#FFFFFF20'
                    break
                case 'User':
                    document.getElementById('usere').style.backgroundColor = '#FFFFFF20'
                    break
                case 'Channel': 
                document.getElementById('chnl').style.backgroundColor = '#FFFFFF20'
                break
                case 'Integer':
                    document.getElementById('intgr').style.backgroundColor = '#FFFFFF20'
                break
                case 'Role':
                    document.getElementById('rle').style.backgroundColor = '#FFFFFF20'
                break
                case 'Mentionable':
                    document.getElementById('mentnable').style.backgroundColor = '#FFFFFF20'
                break
            }
            
            if (botData.commands[lastObj].parameters[lastParam.split('Param')[0]].required == true) {
                document.getElementById('rff').style.backgroundColor = '#FFFFFF25'

            } else {
                document.getElementById('rft').style.backgroundColor = '#FFFFFF25'
            }
        }

        function storeParamStored(wh) {
            botData.commands[lastObj].parameters[lastParam.split('Param')[0]].storeAs = wh.innerText
            wast()
        }
        function storeParamName(wh) {
            botData.commands[lastObj].parameters[lastParam.split('Param')[0]].name = wh.value
            wast()
            refreshParameters()
        }
        function storeParamDesc(wh) {
            botData.commands[lastObj].parameters[lastParam.split('Param')[0]].description = wh.value
            wast()
        }

        function setPrm(wut) {
            switch (botData.commands[lastObj].parameters[parseFloat(lastParam.split('Param')[0])].type) {
                case 'String':
                    document.getElementById('strng').style.backgroundColor = '#FFFFFF15'
                    break; 
                case 'Boolean':
                    document.getElementById('blen').style.backgroundColor = '#FFFFFF15'
                    break
                case 'User':
                    document.getElementById('usere').style.backgroundColor = '#FFFFFF15'
                    break
                case 'Channel': 
                document.getElementById('chnl').style.backgroundColor = '#FFFFFF15'
                break
                case 'Integer':
                    document.getElementById('intgr').style.backgroundColor = '#FFFFFF15'
                break
                case 'Role':
                    document.getElementById('rle').style.backgroundColor = '#FFFFFF15'
                break
                case 'Mentionable':
                    document.getElementById('mentnable').style.backgroundColor = '#FFFFFF15'
                break
            }

            botData.commands[lastObj].parameters[lastParam.split('Param')[0]].type = wut.innerHTML
            wast()
            wut.style.backgroundColor = '#FFFFFF20'
        }
        function paramify(what) {
            let paramPosition = what.id.split('Param')[0]
            botData.commands[lastObj].parameters[parseFloat(paramPosition)].name = what.value
            if (what.innerText == '') {
                what.value = ' '
                botData.commands[lastObj].parameters[parseFloat(paramPosition)].name = ' '
            }
            wast()
        }
        function setReq(bln, what) {
            let paramPosition = lastParam.split('Param')[0]
            console.log(paramPosition)
        botData.commands[lastObj].parameters[lastParam.split('Param')[0]].required = bln
            if (bln == true) {
                document.getElementById('rff').style.backgroundColor = ''
                document.getElementById('rft').style.backgroundColor = '#FFFFFF25'
                botData.commands[lastObj].parameters[parseFloat(paramPosition)].required = false
            } else {
                document.getElementById('rft').style.backgroundColor = ''
                document.getElementById('rff').style.backgroundColor = '#FFFFFF25'
                botData.commands[lastObj].parameters[parseFloat(paramPosition)].required = true
            }
            wast()
        }

        function setDescription(e) {
            if (botData.commands[lastObj].description) {
                botData.commands[lastObj].description = e.value
            } else {
                botData.commands[lastObj] = {
                    ...botData.commands[lastObj],
                    description: e.value
                }
            }
            wast()
        }

        function closeCommand() {
            let commandOptions = document.getElementById('botData.commands[lastObj].actions')
            commandOptions.style.animationName = 'actionUnexpand'
            commandOptions.style.animationDuration = '0.5s'
            commandOptions.style.height = ''
            commandOptions.style.width = '90%'
            setTimeout (() => {
                let ddaf;
                if (botData.commands[lastObj].type == 'action') {
                    console.log(botData.commands[lastObj])
                        switch(botData.commands[lastObj].trigger) {
                    case 'slashCommand':
                        ddaf = 'Slash Command'
                        break
                    case 'textCommand':
                        ddaf = 'Text Command'
                    break
                    case 'messageContent':
                        ddaf = 'Message'
                }
        
                document.getElementById('botData.commands[lastObj].actions').innerHTML = `Type: ${ddaf} • ${Object.keys(botData.commands[lastObj].actions).length} Actions Used`  
                } else {
                    document.getElementById('botData.commands[lastObj].actions').innerHTML = `Event • ${Object.keys(botData.commands[lastObj].actions).length} Actions Used`
                }
            }, 200)
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
function insertTextAtCaret(text) {
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode( document.createTextNode(text) );
        }
    } else if (document.selection && document.selection.createRange) {
        document.selection.createRange().text = text;
    }
}
function validateInput(event) {
    const div = event.target;
    const text = div.textContent;
    
    // Save the current cursor position
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const offset = range.startOffset;
  
    // Remove image tags
    const sanitizedText = text.replace(/<img\b[^>]*>/gi, '');
  
    // Update the content of the div with sanitized text
    div.innerHTML = sanitizedText;
    
    // Restore the cursor position
    const updatedRange = document.createRange();
    updatedRange.setStart(div.firstChild, offset);
    updatedRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(updatedRange);
}
 
function setVariableIn(elementId, type, varName) {
    let element = document.getElementById(elementId)
    
    if (type == 2) {
        let toRestoreTo1 = saveSelection();
        let toRestoreTo = toRestoreTo1
        insertTextAtCaret("${tempVars('" + varName + "')}")
        element.focus()
        element.blur()
        element.focus()
        element.blur()
        setTimeout(() => {
            element.focus()
            element.blur()
        }, 100)
    }
        
    if (type == 0) {
        element.blur()
        element.innerHTML = `${varName}`
        element.focus()
        element.blur()
        setTimeout(() => {
            element.focus()
            element.blur()
        }, 100)
    }
}   

function showReow(rowPosition) {
    lastRow = rowPosition; 
    document.getElementById('actElmsig').style.animationName = 'marginbounce'
    document.getElementById('actElmsig').style.animationDuration = '0.3s'
    document.getElementById('actElmsig').style.transition = 'opacity 0.3s ease'
    document.getElementById('actElmsig').style.opacity = '0%'

    let view = document.getElementById('actElmsig');
    let rows = botData.commands[lastObj].actions[lastAct].data.actionRows
    setTimeout(() => {
        document.getElementById('actElmsig').style.opacity = '100%'
        document.getElementById('actElmsig').style.animationName = ''
        document.getElementById('actElmsig').style.animationDuration = ''
        view.innerHTML = `
        <div class="flexbox" style="align-items: center; justify-content: center; margin-top: 4vh; margin-bottom: 0.5vh;">
        <div class="flexbox" style="margin-left: auto; margin-right: 12px;">
        <div class="barbuttond center" onclick="controlActionRows(true)" style="width: 30px;">
        <div class="barbuttontexta">
        ⟨
        </div>
        </div>
                    <div class="barbuttond center flexbox" style="width: 70px;" onclick="deleteRowBar(${rowPosition})">
                    <div class="barbuttontexta">
                    Delete
                    </div>
                    </div>
        </div>



        <div class="flexbox borderbottom" style="margin: auto; margin-top: 2vh; background-color: #FFFFFF08; width: calc(93vw - 24px) ; height: 40vh; padding: 12px; border-radius: 12px;">
        <div style="width: 45%; margin-left: auto; margin-right: 2.5%; height: 40vh" class="flexbox">
    <div style="width: 100%;">
    <div class="borderbottomz" style="width: 100%; background-color: #FFFFFF09; padding: 4px;">
        <div class="barbuttontexta">
        Row Name
        </div>
        <div class="input" contenteditable="true" style="height: 24px; margin-top: 0px;" onkeyup="elementContentChecker(this, {maxLength: 32}); botData.commands[lastObj].actions[lastAct].data.actionRows[${rowPosition}].name = this.innerText; wast();">${botData.commands[lastObj].actions[lastAct].data.actionRows[rowPosition].name}</div>
        </div>
        <div class="bordercenter" style="width: 100%; background-color: #FFFFFF09; padding: 4px; margin-top: 0.5vh; margin-bottom: 0.5vh;">

        <div class="barbuttontexta">
        Row Placeholder
        </div>
        <div class="input" contenteditable="true" style="height: 24px; margin-top: 0px;" onkeyup="elementContentChecker(this, {maxLength: 32}); botData.commands[lastObj].actions[lastAct].data.actionRows[${rowPosition}].placeholder = this.innerText; wast();">${botData.commands[lastObj].actions[lastAct].data.actionRows[rowPosition].placeholder}</div>
        </div>
        <div class="bordertopz" style="width: 100%; background-color: #FFFFFF09; padding: 4px;">

        <div class="barbuttontexta">
        Row Custom ID
        </div>
        <div class="input" contenteditable="true" style="height: 24px; margin-top: 0px;" onkeyup="elementContentChecker(this, {maxLength: 32}); botData.commands[lastObj].actions[lastAct].data.actionRows[${rowPosition}].customId = this.innerText; wast();">${botData.commands[lastObj].actions[lastAct].data.actionRows[rowPosition].customId}</div>
        </div>

        
        </div>
        
        
        <div style="margin-top: auto; justify-content: center; align-items: center;" class="flexbox"></div>
        <div style="margin-top: auto; margin-bottom: 2vh; width: 100%; height: auto;">

            <div class="flexbox borderbottomz" style="background-color: #FFFFFF10;  padding: 4px; margin-top: auto; margin-bottom: 0.5vh; border-radius: 12px;">
            <div class="barbuttontexta">Minimum Selectable Options</div>
            <div class="flexbox" style="background-color: none; border-radius: 9px; width: 9vw; padding: 4px;">
            <div class="barbuttontexta hoverablez" onclick="setLowerMinOpt()" style="margin-right: auto; margin-left: 0vw; width: 2vw; border-radius: 4px; padding: 3px; background-color: #FFFFFF10;">⟨</div>
            <div class="barbuttontexta" id="minSelectable">${rows[lastRow].minSelectable}</div>
            <div class="barbuttontexta hoverablez" onclick="setHigherMinOpt()" style="margin-left: auto; margin-right: 0vw; width: 2vw; border-radius: 4px; padding: 3px; background-color: #FFFFFF10;">⟩</div>
            </div>
            </div> 


            <div class="flexbox bordertopz" style="background-color: #FFFFFF10; padding: 4px;">
            <div class="barbuttontexta">Maximum Selectable Options</div>
            <div class="flexbox" style="background-color: none; border-radius: 9px; width: 9vw; padding: 4px;">
            <div onclick="setLowerMaxOpt()" class="barbuttontexta hoverablez" style="margin-right: auto; margin-left: 0vw; width: 2vw; border-radius: 4px; padding: 3px; background-color: #FFFFFF10;">⟨</div>
            <div class="barbuttontexta" id="maxSelectable">${rows[lastRow].maxSelectable}</div>
            <div onclick="setHigherMaxOpt()" class="barbuttontexta hoverablez" style="margin-left: auto; margin-right: 0vw; width: 2vw; border-radius: 4px; padding: 3px; background-color: #FFFFFF10;">⟩</div>
            </div>
            </div> 
            </div>
            </div>

    <div style="width: 0.3vw; height: 37vh; margin-top: 1vh; background-color: #FFFFFF20;"></div>

    <div style="width: 45%; height: 20vh; margin-left: auto; margin-right: 2.5%;">
    <div class="flexbox" style="margin-bottom: 1vh;">
    <div class="barbuttontexta textToLeft" style="text-align: left; align-text: left; margin-left: 1vw;">Options</div>
    <div style="width: 5vh; height: 5vh; margin-bottom: 1vh; border-radius: 1000px; margin-left: auto;" class="flexbox hoverablex" onclick="newRowOption()">
    <div class="barbuttontext"><b>+</b></div>
    </div>
    </div>
    <div style="width: 100%; height: 30vh; overflow-y: auto; border-radius: 6px; background-color: #FFFFFF15; overflow: auto;" id="actionRowEditor">

    </div>    </div>

        </div>
        <div class="flexbox bordertop" id="actionMenuOption" style="margin: auto; margin-top: 0.5vh; background-color: #FFFFFF07; width: calc(93vw - 24px) ; height: 30vh; padding: 12px; border-radius: 12px;">
        <div class="barbuttontexta">Select or create a custom row to start the fun!</div>
        </div>
        `
        showMenuOptions()

    }, 350)

    }

    /* 
    
        <div class="barbuttontexta">Select Menu Options</div>
        <div style="background-color: #FFFFFF10; margin-bottom: 1.5vh; height: 15vh; overflow-y: auto; padding: 12px; border-radius: 7px;">
            <div class="zaction lessbrithb" id="customType" onclick="selectStringType('custom')"><div class="barbuttontexta">Custom</div></div>
            <div class="zaction lessbrithb" id="channelType" onclick="selectStringType('channel')"><div class="barbuttontexta">Channel</div></div>
            <div class="zaction lessbrithb" id="userType" onclick="selectStringType('user')"><div class="barbuttontexta">User</div></div>
            <div class="zaction lessbrithb" id="roleType" onclick="selectStringType('role')"><div class="barbuttontexta">Role</div></div>
            <div class="zaction lessbrithb" id="mentionableType" onclick="selectStringType('mentionable')"><div class="barbuttontexta">Mentionable</div></div>
            </div> 
                    let lastRowType = botData.commands[lastObj].actions[lastAct].data.actionRows[lastRow].customType
        document.getElementById(lastRowType + 'Type').style.backgroundColor = '#FFFFFF20';
            */
           function editMenuOption(option) {
            if (lastMenuOption != undefined) {
                try{
                document.getElementById(lastMenuOption + 'MenuOption').parentNode.style.backgroundColor = '#FFFFFF10'
            } catch (err) {
                null
            }
        
        }
            document.getElementById(option + 'MenuOption').parentNode.style.backgroundColor = '#FFFFFF20'

            lastMenuOption = option

            let view = document.getElementById('actionMenuOption')

            view.innerHTML = `
            <div class="borderright flexbox" style="width: 47%; background-color: #FFFFFF08; padding: 12px; border-radius: 7px;">
            <div style="margin: auto; width: 100%;">
            <div class="borderbottom" style="width: 100%; height: auto; background-color: #00000020; padding-top: 0.75vh; padding-bottom: 0.75vh; margin-bottom: 0.50vh;">

            <div class="barbuttontexta">Option Label</div>
            
            <div class="input" contenteditable="true" onblur="elementContentChecker(this, {maxLength: 32, fromBlur: true}); botData.commands[lastObj].actions[lastAct].data.actionRows[${lastRow}].options[${option}].label = this.innerText; wast(); document.getElementById('${option}MenuOption').innerText = this.innerText" onkeyup="elementContentChecker(this, {maxLength: 32}); botData.commands[lastObj].actions[lastAct].data.actionRows[${lastRow}].options[${option}].label = this.innerText; wast(); document.getElementById('${option}MenuOption').innerText = this.innerText">
            ${botData.commands[lastObj].actions[lastAct].data.actionRows[lastRow].options[option].label}
            </div>
            </div>
            <div class="bordercenter" style="width: 100%; height: auto; background-color: #00000020; padding-top: 0.75vh; padding-bottom: 0.75vh;">

            <div class="barbuttontexta">Option Description</div>
            <input class="input" style="margin-bottom: 0px;" onkeydown=" /* return event.key !== ' ';  */ if (event.key != 'Backspace') return this.value.split('').length < 32;" oninput="botData.commands[lastObj].actions[lastAct].data.actionRows[${lastRow}].options[${option}].description = this.value; wast()" contenteditable="true" value="${botData.commands[lastObj].actions[lastAct].data.actionRows[lastRow].options[option].description}" placeholder="Reccomended">

            </div>
            <div class="bordertop" style="width: 100%; height: auto; background-color: #00000020; padding-bottom: 0.75vh; padding-top: 0.75vh; margin-top: 0.50vh;">

            <div class="barbuttontexta">Option Custom ID (Value)</div>
            <input class="input" style="margin-bottom: 0px;" onkeydown=" /* return event.key !== ' ';  */ if (event.key != 'Backspace') return this.value.split('').length < 32;" oninput="botData.commands[lastObj].actions[lastAct].data.actionRows[${lastRow}].options[${option}].customValue = this.value; wast()" contenteditable="true" value="${botData.commands[lastObj].actions[lastAct].data.actionRows[lastRow].options[option].customValue}" placeholder="Required, cannot be seen by anybody else">
            </div>
            </div>
</div>


            <div class="borderleft flexbox" style="width: 47%; margin-left: 0.3vw; padding: 12px; background-color: #FFFFFF08; border-radius: 7px;">
            <div style="margin: auto; width: 100%;">
            <div class="barbuttontexta">Controls</div>

            <div class="flexbox">
            <div class="barbutton borderright" onclick="deleteRowOption(${lastRow}, ${option})" style="height: 5vh;">
            <div class="barbuttontexta">Delete</div>
            </div>
            <div class="barbuttond bordercenter" style="height: 5vh; width: 3vw;">
            <div class="image actionUp"></div>
            </div>
            <div class="barbuttond borderleft" style="height: 5vh; width: 3vw;">
            <div class="actionDown image"></div>
            </div>
            <div class="hoverablez" onclick="setButtonRun(this, ${option}, ${lastRow}, true)" style="margin-top: 1vh; width: 40vw; margin-right: auto; margin-left: auto; border-radius: 12px; border-bottom-left-radius: 2px; border-bottom-right-radius: 2px; padding: 8px;">
            <div class="barbuttontexta">Once Interacted With, Run Action Group:</div>
            </div>
            <div class="bordertopz" style="background-color: #FFFFFF10; margin-top: 0.3vh;width: 40vw; margin-right: auto; margin-left: auto; border-radius: 12px; border-bottom-left-radius: 2px; border-bottom-right-radius: 2px; padding: 8px;" id="runButtonWhat" onclick="setButtonRun(this, ${option}, ${lastRow}, true)">
            </div>
</div></div>

           </div>
            `
            setRunningElement(botData.commands[lastObj].actions[lastAct].data.actionRows[lastRow].options[option].runs)
           }



function draggedOverRow(event, rowPosition) {
    event.preventDefault()
    lastDraggedRow = rowPosition
}
function handleDraggedRow(event, rowPosition) {
}
function handleRowDrag(event, rowPosition) {
    let datajson1 = JSON.parse(fs.readFileSync(processPath + '\\AppData\\data.json'));
    let datajson0 = datajson1;
    let dragNewElement = datajson0.commands[lastObj].actions[lastAct].data.actionRows[rowPosition];
    // index, 0, item
    
    botData.commands[lastObj].actions[lastAct].data.actionRows = array_move(botData.commands[lastObj].actions[lastAct].data.actionRows, rowPosition, lastDraggedRow)

    wast()
    lastDraggedRow = null;
    controlActionRows(true)
}

const { spawn } = require('child_process');


let botProcess;
var botLog = ``
var botIsOn = false
function toggleBot() {
    fs.writeFileSync(processPath + '\\bot.js', fs.readFileSync(processPath + '\\AppData\\bot.js'))
  if (botProcess && botProcess.connected || botIsOn == true) {
    botProcess.kill();
    botIsOn = false;
    console.log('Bot stopped');
  } else {
    fs.readFileSync(processPath + '\\AppData\\firstTimeSetup.bat')
    botLog = ''
    spawn('node', ['bot.js']);
    botProcess = spawn('node', ['bot.js']);
    console.log('Bot started');
    botIsOn = true;
    botProcess.on('close', () => {
        botIsOn = false;
    })
    botProcess.stdout.on('data', function (data) {botLog = `${botLog} ${data}`});
  }
}

if (botData.commands['1'].customId == undefined) {
    for (let command in botData.commands) {
        botData.commands[command].customId = new Date().getTime()
        wast()
        let r = 0
        while (r < 1550) {
            r++
        }
    }
}


