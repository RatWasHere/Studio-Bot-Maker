let version = 3
const { app, ipcRenderer } = require('electron');
let isUpdating = false;
let lastHovered;
function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}   

let errorPending = false;

const { ApplicationCommandPermissionType } = require('discord.js');
const fs = require('fs');
const processPath = require('process').cwd();
const path = require('path')


var datjson = JSON.parse(fs.readFileSync(processPath +'/AppData/data.json'))
let lastType = 0 // 0 = Command; 1 = Actions;
let lastObj = "1"
let lastAct = "1"
let lastParam;
let lastHighlighted;
let newc = datjson.color
document.body.style.background = `linear-gradient(45deg, ${newc} 0%, #121212 170%)`
document.onkeydown = function(event) {
    handleKeybind(event)
  };
  document.documentElement.style.setProperty('--highlight-color', datjson.color);

  if (datjson.reset == true) {
    try {
  if (fs.readFileSync('C:\\ProgramData\\studiodata.json')) {
    datjson = JSON.parse(fs.readFileSync('C:\\ProgramData\\studiodata.json'))
    datjson.reset = false;
    fs.writeFileSync('C:\\ProgramData\\studiodata.json', JSON.stringify(datjson, null, 2))
    fs.writeFileSync(processPath +'/AppData/data.json', JSON.stringify(datjson, null, 2));

  } else {
    datjson.reset = false;
    fs.writeFileSync('C:\\ProgramData\\studiodata.json', JSON.stringify(datjson, null, 2))
  }
} catch (err) {
    datjson.reset = false;
    fs.writeFileSync('C:\\ProgramData\\studiodata.json', JSON.stringify(datjson, null, 2))
}
}
    function refreshActions() {
        var delay = 0;
        document.getElementById('actionbar').innerHTML = ''
        for (let action in datjson.commands[lastObj].actions) {
            let count = 0;
            let dts = '';
            let quickie = '';
            delay++;
            let quickdata;
            let dataquick;
            try {
            quickdata = require(`./AppData/Actions/${datjson.commands[lastObj].actions[action].file}`).UI;
            dataquick = datjson.commands[lastObj].actions[action].data[quickdata.preview].split('');
                for (let vda in dataquick) {
                    if (count != 23) {
                      quickie = `${quickie}${dataquick[vda]}`;
                      count++;
                    } else {
                      dts = '..';
                    }
                  }
            } catch (err) {
                quickie = `Error`
            }
        

            let extrf;
            if (datjson.commands[lastObj].actions[parseFloat(action) - 1] == undefined) {
              extrf = 'borderbottom';
            } else if (datjson.commands[lastObj].actions[parseFloat(action) + 1] == undefined) {
              extrf = 'bordertop';
            } else {
              extrf = 'bordercentere';
            }
        
            document.getElementById('actionbar').innerHTML += `
            
            <div id="Action${action}" onmouseenter="lastHovered = this" draggable="true" ondragleave="handleActionDragEnd(this)" ondragend="handleActionDrop()" ondragover="actionDragOverHandle(event, this)" ondragstart="handleActionDrag(this)" onmouseleave="lastHovered = null;" class="action textToLeft ${extrf}" style="animation-delay: ${delay * 3}0ms" ondblclick="editAction(this)" onclick="highlight(this)">
            ${datjson.commands[lastObj].actions[action].name}
             <div style="opacity: 50%; margin-left: 7px;">
              ${`  ${quickdata.previewName}`}: ${quickie}${dts}</div>
             <div class="deleteActionButton" onclick="deleteObject(this)">✕</div>`;
        
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
        for (let cmd in datjson.commands) {
            delay++
            document.getElementById('commandbar').innerHTML += `<div class="action textToLeft" onmouseenter="lastHovered = this" onmouseleave="lastHovered = null;" id="Group${parseFloat(cmd)}" style="animation-delay: ${delay * 3}5ms" ondblclick="cmdOpen('${cmd}')" onclick="highlight(this)"><div id="name">${datjson.commands[cmd].name}</div> <div style="opacity: 50%; margin-left: 7px;"> | ${Object.keys(datjson.commands[cmd].actions).length} Actions </div> <div class="deleteActionButton forceRounded" style="border-radius: 124px;" onclick="deleteObject(this)">✕</div> `
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
            document.getElementById('Command_Name').innerHTML = element.innerText.split('|')[0];
            document.getElementById('actionsOf').innerHTML = `Actions Of ${element.innerText.split('|')[0]}`
            lastObj = element.id.split('Group')[1]
            refreshActions();
            
            if (datjson.commands[lastObj].type == 'action') {
                console.log(datjson.commands[lastObj])
                    switch(datjson.commands[lastObj].trigger) {
                case 'slashCommand':
                    ddaf = 'Slash Command'
                    break
                case 'textCommand':
                    ddaf = 'Text Command'
                break
                case 'messageContent':
                    ddaf = 'Message'
            }
    
            document.getElementById('commandActions').innerHTML = `Type: ${ddaf} • ${datjson.commands[lastObj].count} Actions Used`  
            } else {
                document.getElementById('commandActions').innerHTML = `Event • ${datjson.commands[lastObj].count} Actions Used`
            }
            checkErrors()
            closeCommand()
            let lastCheckedAction = null;
            for (let action in datjson.commands[lastObj].actions) {
                lastCheckedAction = action;
            }
            if (datjson.commands[lastObj].count != datjson.commands[lastObj].actions.length || datjson.commands[lastObj].count != lastCheckedAction) {
                console.log('fix, error')
                let filteredEntries = Object.entries(datjson.commands[lastObj].actions);
                let newJson = {};
                let newCount = 0;
                for (let i = 0; i < filteredEntries.length; i++) {
                    newCount++
                  newJson[i + 1] = filteredEntries[i][1];
                }
                datjson.commands[lastObj].count = newCount
                datjson.commands[lastObj].actions = newJson;
                refreshActions()
                wast()

            }
        } else {
            try {
            document.getElementById(`Action${lastAct}`).style.backgroundColor = '#FFFFFF15';
            } catch(err) {}
            element.style.backgroundColor = '#FFFFFF25';
            lastAct = element.id.split('Action')[1]
        }
    }



function switchObjs() {
    try {
    var delaye = 0;
    ActionTile.innerHTML = ''
    document.getElementById('actionbar').innerHTML = ''
    for (let action in datjson.commands[lastObj].actions) {
        let count = 0;
        let dts = '';
        let quickie = '';
        delaye++;
        let quickdata;
        let dataquick;
        try {
        quickdata = require(`./AppData/Actions/${datjson.commands[lastObj].actions[action].file}`).UI;
        dataquick = datjson.commands[lastObj].actions[action].data[quickdata.preview].split('');
            for (let vda in dataquick) {
                if (count != 23) {
                  quickie = `${quickie}${dataquick[vda]}`;
                  count++;
                } else {
                  dts = '..';
                }
              }
        } catch (err) {
            quickie = `Error`
        }
    

        let extrf;
        if (datjson.commands[lastObj].actions[parseFloat(action) - 1] == undefined) {
          extrf = 'borderbottom';
        } else if (datjson.commands[lastObj].actions[parseFloat(action) + 1] == undefined) {
          extrf = 'bordertop';
        } else {
          extrf = 'bordercentere';
        }
    
        document.getElementById('actionbar').innerHTML += `<div id="Action${action}" onmouseenter="lastHovered = this" onmouseleave="lastHovered = null;" class="action textToLeft ${extrf}" style="animation-delay: ${delaye * 3}0ms" ondblclick="editAction(this)" onclick="highlight(this)">${datjson.commands[lastObj].actions[action].name} <div style="opacity: 50%; margin-left: 7px;"> ${`  ${quickdata.previewName}`}: ${quickie}${dts}</div> <div class="deleteActionButton" onclick="deleteObject(this)">✕</div>`;
    
        if (action === lastAct) {
          setTimeout(() => {
            highlight(document.getElementById('Action' + action));
          }, 50);
        }

      }
          var delay = 0;
            delete require.cache[`./AppData/data.json`];
            for (let cmd in datjson.commands) {
                delay++
                ActionTile.innerHTML += `<div class="action textToLeft" onmouseenter="lastHovered = this" onmouseleave="lastHovered = null;" id="Group${parseFloat(cmd)}" style="animation-delay: ${delay * 3}5ms" ondblclick="cmdOpen('${cmd}')" onclick="highlight(this)"><div id="name">${datjson.commands[cmd].name}</div> <div style="opacity: 50%; margin-left: 7px;"> | ${Object.keys(datjson.commands[cmd].actions).length} Actions </div> <div class="deleteActionButton forceRounded" style="border-radius: 124px;" onclick="deleteObject(this)">✕</div> `
                if (cmd == lastObj) {
                    setTimeout(() => {
                        highlight(document.getElementById(`Group${cmd}`), true, true)
                    }, 50)
                }
            }
            lastType = 0
        closeCommand()

    } catch (err) {
        null
    }
    }
function ridButton(atIndex) {
    datjson.commands[lastObj].actions[lastAct].data.actionRowElements.splice(atIndex, 1)
    fs.writeFileSync(processPath +'\\AppData\\data.json', JSON.stringify(datjson, null, 2));
    showAvailableSlots(document.getElementById('actionElements'))
}
function getActionRow(bar, atIndex) {
    let elm = document.getElementById('actionElements')
    elm.innerHTML = `<div class="barbuttontexta" style="margin: 5px; margin-bottom: -5px;">Select An Action Row </div> <div class="sepbars"></div>
    <div class="flexbox" style="align-items: center; width: 95%; justify-content: center; margin: auto; margin-bottom: 2vh;">
    <div class="barbuttone" onclick="showActRows(${atIndex})" style="width: 45%;"><div class="barbuttontexta">Buttons</div></div>
    <div class="barbuttone" onclick="showMenuBars(${atIndex})" style="width: 45%;"><div class="barbuttontexta">Select Menus</div></div>
    </div>
    `
    elm.style.overflowY = 'auto'
    let fdr = datjson.commands[lastObj].actions[lastAct].data.actionRowElements
    for (let bar in datjson.buttons.bars) {
        var buttonColors = ''
        for (let button in datjson.buttons.bars[bar].buttons) {
            switch (datjson.buttons.bars[bar].buttons[button].style) {
                case 'Default': 
                buttonColors = `${buttonColors}<div style="width: 12px; opacity: 50%; height: 12px; margin-right: 3px; background-color: #695dfb; border-radius: 100px;"></div>`
                break
                case 'Success': 
                buttonColors = `${buttonColors}<div style="width: 12px; opacity: 50%; height: 12px; margin-right: 3px; background-color: #5fb77a; border-radius: 100px;"></div>`
                break
                case 'Danger': 
                buttonColors = `${buttonColors}<div style="width: 12px; opacity: 50%; height: 12px; margin-right: 3px; background-color: #de4447; border-radius: 100px;"></div>`
                break
                case 'Neutral': 
                buttonColors = `${buttonColors}<div style="width: 12px; opacity: 50%; height: 12px; margin-right: 3px; background-color: #50545d; border-radius: 100px;"></div>`
                break
                case 'Link': 
                buttonColors = `${buttonColors}<div style="width: 12px; opacity: 50%; height: 12px; margin-right: 3px; background-color: #FFFFFF90; border-radius: 100px;"></div>`
                break
            }
        }
        elm.innerHTML += `
        <div class="issue flexbox" onclick="setButtoenBar(${bar}, ${atIndex})" style="height: auto; border-bottom: none; box-shadow: none; background-color: #ffffff15; height: 4vh; align-content: center; justify-items: center;" onclick="selectbar(${bar}, ${atIndex})">${datjson.buttons.bars[bar].name} - ${datjson.buttons.bars[bar].buttons.length} Buttons <div style="margin-left: 12px; align-items: center; justify-content: center;" class="flexbox">${buttonColors}</div></div>
        `
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
        if (!iftr) {
        bottombar.onclick = () => {
            unmodify()
        }
    }
        setTimeout( () => {
            bottombar.style.animationName = ''
            bottombar.style.animationDuration = ''
}, 500);
    
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
        bottombar.onclick = () => {
            unmodify()
        }
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
        bottombar.onclick = () => {
            modifyBar()
        }
        setTimeout(() => {
            bottombar.innerHTML = '•••'
            bottombar.style.animationName = ''
            bottombar.style.animationDuration = ''
        }, 400)

    }

    function restoreTo(to, fo) {
        currentlyEditing = false;            
        let editorOptions = document.getElementById('edutor')
        editorOptions.style.animationName = 'moveToTheLeft'
        editorOptions.style.animationDuration = '0.35s'
        
        let commandDisplay = document.getElementById('animationArea')

        commandDisplay.style.animationName = 'moveToTheRight'
        commandDisplay.style.animationDuration = '0.35s'

            setTimeout (() => {
                document.getElementById('edutor').className = 'fullsize'
                document.getElementById('animationArea').innerHTML = to
                editorOptions.innerHTML = fo;

                refreshActions()
                refreshGroups()
                editorOptions.style.animationName = 'comeToTheLeft1'
                editorOptions.style.animationDuration = '0.35s'
                commandDisplay.style.animationName = 'comeToTheRight1'
                commandDisplay.style.animationDuration = '0.35s'
            }, 350)
            setTimeout (() => {
                edutor.style.animationDuration = ''
            edutor.style.animationName = ''
            ActionTile.style.animationDuration = ''
            ActionTile.style.animationName = ''
            document.getElementById('animationEditor').style.animationName = ''
            setTimeout(() => {
                var btbr = document.createElement('div')
                btbr.className = 'bottombar'
                btbr.onclick = () => {modifyBar()}
                btbr.id = 'bottombar'
                btbr.innerHTML = '•••'
                commandDisplay.style.animationName = ''
                commandDisplay.style.animationDuration = ''
                editorOptions.style.animationName = ''
                editorOptions.style.animationDuration = ''
                document.body.appendChild(btbr)
                btbr.style.animationName = 'appearfadenmt'
                btbr.style.animationDuration = '0.5s'
            }, 100)
            }, 690)

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
                if (datjson.commands[lastObj].type == 'action') {
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
            if (datjson.commands[lastObj].type == 'action') {
                switch (datjson.commands[lastObj].trigger) {
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
        datjson.commands[lastObj].trigger = 'textCommand'
        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
        checkErrors()

    }
    function tSlsh() {
        datjson.commands[lastObj].trigger = 'slashCommand'
        fs.writeFileSync(processPath +'\\AppData\\data.json', JSON.stringify(datjson, null, 2));
        checkErrors()

    }
    function sltMsg() {
        datjson.commands[lastObj].trigger = 'messageContent'
        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
        checkErrors()

    }
    function modcolor() {
        setTimeout(() => {
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
            bottombar.style.overflowY = 'auto'
            bottombar.onclick = () => {
                document.getElementById('wedf').onclick = () => {switchGroups()}
                unmodify()
            }
            bottombar.overflowY = 'auto'
            bottombar.innerHTML += `
            <div class="text" style="margin-left: 20px;">Select Color</div>

            <div class="flexbox" style="height: 20%; margin-left: 20px; justify-content: center;">
            <div class="barbutton" onclick="setColor(this)"style="background-color: #170000;"><div class="barbuttontexta">Bloodshot Pink</div></div>
            <div class="barbutton" onclick="setColor(this)"style="background-color: #0b0014;"><div class="barbuttontexta">Ultraviolet</div></div>
            <div class="barbutton" onclick="setColor(this)"style="background-color: #000814;"><div class="barbuttontexta">Navy Blue</div></div>
</div><div class="sepbar"></div>            
<div class="flexbox" style="height: 20%; margin-left: 20px; justify-content: center;">

            <div class="barbutton" onclick="setColor(this)"style="background-color: #071314;"><div class="barbuttontexta">Forest Green</div></div>
            <div class="barbutton" onclick="setColor(this)"style="background-color: #170701;"><div class="barbuttontexta">Wood</div></div>
            <div class="barbutton" onclick="setColor(this)"style="background-color: #141414;"><div class="barbuttontexta">Gray</div></div>
            </div><div class="sepbar"></div>            
            </div>
            <div class="flexbox" style="height: 20%; margin-left: 20px; justify-content: center;">

            <div class="barbutton" onclick="setColor(this)"style="background-color: #001417;"><div class="barbuttontexta">Aquamarine</div></div>
            <div class="barbutton" onclick="setColor(this)"style="background-color: #000f17;"><div class="barbuttontexta">Moody Blue</div></div>
            <div class="barbutton" onclick="setColor(this)"style="background-color: #000000;"><div class="barbuttontexta">Focused Night</div></div>

            </div>
            </div><div class="sepbar"></div>            
            <div class="flexbox" style="height: 20%; margin-left: 20px; justify-content: center;">

            <div class="barbutton" onclick="setColor(this)"style="background-color: #170011;"><div class="barbuttontexta">Soothing Cherry</div></div>
            <div class="barbutton" onclick="setColor(this)"style="background-color: #170f00;"><div class="barbuttontexta">Golden Apple</div></div>
            <div class="barbutton" onclick="setColor(this)"style="background-color: #170006;"><div class="barbuttontexta">Strawberry</div></div>

            </div>
            <div class="sepbar"></div>            
            <div class="barbuttontexta">Light Themes</div>

            <div class="flexbox" style="height: 20%; margin-left: 20px; justify-content: center;">
            <div class="barbutton" onclick="setColor(this)"style="background-color: #262626;"><div class="barbuttontexta">Light Smoke</div></div>
            <div class="barbutton" onclick="setColor(this)"style="background-color: #361d1d;"><div class="barbuttontexta">Salmon</div></div>
            <div class="barbutton" onclick="setColor(this)"style="background-color: #12241e;"><div class="barbuttontexta">Mint</div></div>
            <div style="margin-bottom: 12px; width: 95%;"></div>
            <div class="barbutton" onclick="setColor(this)"style="background-color: #24121d;"><div class="barbuttontexta">Lilac</div></div>
            <div class="barbutton" onclick="setColor(this)"style="background-color: #241212;"><div class="barbuttontexta">Anger</div></div>
            <div class="barbutton" onclick="setColor(this)"style="background-color: #122324;"><div class="barbuttontexta">Shiny Forest</div></div>
            </div>
            `
        }, 600)

    }
    function settoken() {
        setTimeout(() => {
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
            bottombar.style.display = 'block'; 
            bottombar.onclick = () => {null}
            bottombar.overflowY = 'auto'
            bottombar.innerHTML += `
            <div class="flexbox" style="height: 30%; justify-content: center;">
            
            <div class="text">Prefix</div>
            <div class="input" onkeyup="storeprefix(this.innerText)" contenteditable="true" onclick="console.log('token setting...')">${datjson.prefix}</div>
            <br>

            <div class="text">Token</div>
            <div class="input" style="overflow-y: auto; overflow-x: hidden;" onkeyup="storetoken(this.innerText)" contenteditable="true" onclick="console.log('token setting...')">${datjson.btk}</div>
            <br>

            <div class="text">Client ID</div>
            <div class="input" onkeyup="storeclientid(this.innerText)" contenteditable="true" onclick="console.log('token setting...')">${datjson.clientID}</div>
<br>            <br>
            <div class="barbutton" onclick="brd()" style="height: 40%; margin-top: 10vh; backdrop-filter: blur(5px); background-color: ${datjson.color}; opacity: 80%;"><div class="barbuttontexta">Close</div></div>
</div>
            `
        }, 600)

   }
   function brd() {
    let bottombar = document.getElementById('bottombar')

    bottombar.onclick = () => {
        document.getElementById('wedf').onclick = () => {switchGroups()}
        unmodify()
    }
   }
    function storetoken(what) {
        datjson.btk = what
        fs.writeFileSync(processPath +'\\AppData\\data.json', JSON.stringify(datjson, null, 2));
    }
    function storeprefix(what) {
        datjson.prefix = what
        fs.writeFileSync(processPath +'\\AppData\\data.json', JSON.stringify(datjson, null, 2));
    }
    function storeclientid(what) {
        datjson.clientID = what
        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
    }
    function setColor(color) {
        let newc = color.style.backgroundColor
        document.body.style.backgroundImage = `linear-gradient(45deg, ${newc} 0%, #121212 170%)`
        datjson.color = newc
        fs.writeFileSync(processPath +'\\AppData\\data.json', JSON.stringify(datjson, null, 2));
    }
    function duplicate() {
        var datjon = JSON.parse(fs.readFileSync(processPath +'/AppData/data.json'))
        datjson.commands[parseFloat(datjson.count) + 1] = {
            ...datjon.commands[lastObj],
            duplicated: true
        }
        let count = parseFloat(datjson.count) + 1
        datjson.count = count
        if (lastType == 0) {
                   ActionTile.innerHTML += `<div onclick="highlight(this, true, true)" class="action textToLeft" id="Group${datjson.count}" ondblclick="cmdOpen('${datjson.count}')"><div id="name">${datjson.commands[lastObj].name}</div> <div style="opacity: 50%; margin-left: 7px;"> | ${datjson.commands[lastObj].count} Actions </div> <div class="deleteActionButton" onclick="highlight(this.parentNode, true, true); deleteObject(this);">✕</div> `
        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
        setTimeout(() => {
            delete require.cache[`./AppData/data.json`];

        highlight("Group" + document.getElementById(count), true, true)
        delete datjon
            switchObjs()
            switchObjs()
        }, 100) 
        }
    }
    function setCmd() {
            datjson.commands[lastObj].type = 'action'
            if (datjson.commands[lastObj].eventFile) {
                delete datjson.commands[lastObj].eventFile
            }
        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
        checkErrors()
    }
    function setEvt() {
        datjson.commands[lastObj].type = 'event'
        datjson.commands[lastObj] = {
            ...datjson.commands[lastObj],
            eventFile: 'update_message.js',
            event: 'Message Update'
        }
        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
        checkErrors()
    }
    var intervalCheck = 210;
    setInterval(() => {
        const time = new Date().getTime()
        delete datjson

        var datjson = JSON.parse(JSON.stringify(JSON.parse(fs.readFileSync(processPath + '\\AppData\\data.json'))));
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
        if (datjson.commands[lastObj].type == 'action') {
            if (datjson.commands[lastObj].trigger == 'textCommand' || datjson.commands[lastObj].trigger == 'messageContent') {
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
    function searchFor(elemnt) {
        let miss = 0;
        let kindOf;
        if (datjson.commands[lastObj].type == 'action') {
            if (datjson.commands[lastObj].trigger == 'textCommand' || datjson.commands[lastObj].trigger == 'messageContent') {
                kindOf = 'Text'
            } else {
                kindOf = 'Slash'
            }
        } else {
            kindOf = 'Event'
        }
        let actons = fs.readdirSync(processPath + '\\AppData\\Actions')
        let actionButton = document.getElementById('actarraypick')
        const input = document.getElementById('searchbar');
        if (input.innerHTML == ' ' || input.innerHTML == '' || input.innerHTML == '   ') {
            input.blur()
            input.innerHTML = ''
            input.focus()
        }
        actionButton.innerHTML = ''

        input.addEventListener('keydown', (e) => {
          if (e.key === 13) e.preventDefault();
        });
        if (acte == '') {
            actionBut.innerHTML += `<div class="action" id="misss"></div>`

            for (var acte in actons) {
                let acten = actons[acte]
                let afile = require(`./AppData/Actions/${acten}`)
                actionButton.innerHTML += `<div class="action fade" style="width: 45%; z-index: 3; background-color: #FFFFFF10 !important;" onclick="openAction('${acten}');" id="${acten}">${afile.data.name}</div>`
                lastType = 1
        }
        const inpet = document.getElementById('searchbar');

        } 
        actionButton.innerHTML = ''
        actionButton.innerHTML += `<div class="action" id="misss"></div>`

        for (let acte in actons) {
            let actionFile = require(`./AppData/Actions/${actons[acte]}`);
            let name = actionFile.data.name.toLowerCase();
            let name2 = elemnt.innerText.toLowerCase();
            let included = true;
            
            for (let i = 0; i < name2.length; i++) {
              if (!name.includes(name2[i])) {
                included = false;
                break;
              }
            }
            
            if (included) {
              if (actionFile.UI.compatibleWith.includes(kindOf) || actionFile.UI.compatibleWith.includes("Any")) {
                let acten = actons[acte];
                let afile = require(`./AppData/Actions/${acten}`);
          
                actionButton.innerHTML += `<div style="width: 45%;" class="action fade flexbox" style="z-index: 3; background-color: #FFFFFF10 !important;" onclick="openAction('${acten}');" id="${acten}">${afile.data.name}</div>`;
              } else {
                miss++
            }
        document.getElementById('misss').innerHTML = miss + ' Actions Hidden (Incompatible)'
            }
          }
    
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

        function openAction(file) {
            delete require.cache[`${processPath}\\AppData\\Actions\\${file}`]
            delete require.cache[require.resolve(`${processPath}\\AppData\\Actions\\${file}`)]
            var filedata = require(`${processPath}\\AppData\\Actions\\${file}`)
            delete filedata
            var filedata = null;
            delete require.cache[`${processPath}\\AppData\\Actions\\${file}`]
            filedata = require(`${processPath}\\AppData\\Actions\\${file}`)
            console.log(filedata)
            console.log(filedata, 'filedata')
            datjson.commands[lastObj].actions[lastAct].file = file
            datjson.commands[lastObj].actions[lastAct].data = filedata.data
            datjson.commands[lastObj].actions[lastAct].name = filedata.data.name
            document.getElementById('actionName00').innerHTML = filedata.data.name
            fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
            var edutor = document.getElementById('edutor');
            let htmle = "<br>"
            var UIdata = null
            UIdata = JSON.parse(JSON.stringify(require(`${processPath}\\AppData\\Actions\\${file}`).UI))
            let action = {
                "id": lastAct
            }
            for (let e in UIdata) {
                console.log(UIdata[e], datjson.commands[lastObj].actions[lastAct].data)

                let ems = e
                if (ems == 'largeInput') {
                    htmle = `${htmle} <div class="largeInput" contentEditable="true" id="${UIdata[e]}"></div>`
                }
                if (ems.startsWith('input')) {
                    if (ems.endsWith('_actionGroup') || ems.endsWith('_actionGroup*')) {
                        let cmd = 'None'
                        for (let command in datjson.commands) {
                            if (datjson.commands[command].customId == datjson.commands[lastObj].actions[lastAct].data[UIdata[e]]) {
                                cmd = datjson.commands[command].name
                            }
                        }
                        htmle = `${htmle} <div class="input borderbottomz" onblur="updateFoundActionGroup(this)" onchange="updateFoundActionGroup(this)" contentEditable="true" id="${UIdata[e]}">${datjson.commands[lastObj].actions[lastAct].data[UIdata[e]]}</div>
                        <div class="actionGroupSelector bordertopz" onclick="document.getElementById('${UIdata[e]}').focus(); setTimeout( () => {showCustomMenu(getOffset(document.getElementById('${UIdata[e]}')).left + 10, getOffset(document.getElementById('${UIdata[e]}')).top + 50)}, 300)">
                            <div class="barbuttontexta">Selected: ${cmd}</div>
                        </div>
                        `
                    } else {
                        htmle = `${htmle} <div class="input" contentEditable="true" id="${UIdata[e]}">${datjson.commands[lastObj].actions[lastAct].data[UIdata[e]]}</div>`
                    }
           }


                if (ems == 'ButtonBar') { 
                    let ButtonBar = "";
                    let HighlightedButton;
                    let extraElements = ''
                    let lastLastid = undefined;
                    for (let scl in UIdata[ems].buttons) {
                        let button = UIdata[ems].buttons[scl];
                        extraOptions = ''
                            if (UIdata[ems].buttons[parseFloat(scl) + 1] == undefined) {
                                console.log(scl)
                                console.log()
                                extraOptions = 'border-top-right-radius: 12px; border-bottom-right-radius: 12px;'
                            } else {
                                null
                            }

                            if (UIdata[ems].buttons[scl - 1] == undefined || UIdata[ems].buttons[scl - 1] == null) {
                                extraOptions = 'border-top-left-radius: 12px; border-bottom-left-radius: 12px;'
                            } else {
                                null
                            }
                        if (datjson.commands[lastObj].actions[lastAct].data.button == button) {
                            
                            ButtonBar = `${ButtonBar}<div onclick="Bselect(this, '${lastAct}')" class="switchableButton" style="width: 23%; background-color: #FFFFFF20; ${extraOptions}" id="${button}"><div class="barbuttontexta" style="margin: auto;">${button}</div></div>`
                            lastButton = button
                            if (button.endsWith('*')) {
                                extraElements = `${extraElements} <div class="inputB" id="ExtraData" contenteditable="true">${datjson.commands[lastObj].actions[lastAct].data.ExtraData}</div>`
                            }
                        } else {
                            ButtonBar = `${ButtonBar}<div onclick="Bselect(this, '${lastAct}')" class="switchableButton" style="${extraOptions}" id="${button}"><div class="barbuttontexta" style="margin: auto;">${button}</div></div>`
                        }
                    }
                    htmle = `${htmle}<div class="flexbox" style="margin-left: auto; width: 100%;  margin-right: auto; align-content: center; justify-content: center;">${ButtonBar} ${extraElements}</div> <br>`
                }

                if (ems.startsWith('menuBar')) {
                    MenuBar = ''
                    for (let option in UIdata[ems].choices) {
                        if (datjson.commands[lastObj].actions[lastAct].data[UIdata[ems].storeAs] == UIdata[ems].choices[option]) {
                           let thenm = undefined
                           if (UIdata[ems].extraField) {
                            thenm = UIdata[ems].extraField
                           }
                           console.log(thenm, "thenm")
                            htmle = `${htmle}<div class="baction" id="${lastAct}" style="animation-name: appearfadenmt; width: 90% !important; text-align: left; border-radius: 12px; border-bottom-left-radius: 0px; border-bottom: solid 2px #FFFFFF40; padding-bottom: 0px; border-bottom-right-radius: 0px; padding-left: 0px; padding-right: 0px; margin-bottom: 6px; padding-left: 24px !important; " onclick="openChoices('${UIdata[ems].storeAs}', this, '${thenm}', '${ems}')">${UIdata[ems].choices[option]}</div>`
                            if (UIdata[ems].choices[option].endsWith('*')) {

                                if (UIdata.variableSettings[UIdata[ems].extraField][UIdata[ems].choices[option]] == 'actionGroup') {
                                    htmle = `${htmle} <div class="selectBar" style="border-radius: 0px;" onblur="saveField('${UIdata[ems].extraField}', '${UIdata[ems].storeAs}'); updateFoundActionGroup(this)" onkeyup="saveField('${UIdata[ems].extraField}', '${UIdata[ems].storeAs}')" id="${thenm}" contenteditable="true">${datjson.commands[lastObj].actions[lastAct].data[UIdata[ems].extraField]}</div>
                                    
                                    `

                                    let cmd = 'None'
                                    for (let command in datjson.commands) {
                                        if (datjson.commands[command].customId == datjson.commands[lastObj].actions[lastAct].data[UIdata[e]]) {
                                            cmd = datjson.commands[command].name
                                        }
                                    }
                                    htmle = `${htmle}
                                    <div class="actionGroupSelectorB bordertopz" id="${thenm}Selector" onclick="document.getElementById('${thenm}').focus(); setTimeout( () => {showCustomMenu(getOffset(document.getElementById('${thenm}')).left + 10, getOffset(document.getElementById('${thenm}')).top + 50)}, 300)">
                                        <div class="barbuttontexta">Selected: ${cmd}</div>
                                    </div>
                                    `



                                } else {

                                    htmle = `${htmle} <div class="selectBar" onblur="saveField('${UIdata[ems].extraField}', '${UIdata[ems].storeAs}')" onkeyup="saveField('${UIdata[ems].extraField}', '${UIdata[ems].storeAs}')" id="${thenm}" contenteditable="true">${datjson.commands[lastObj].actions[lastAct].data[UIdata[ems].extraField]}</div>`
                                }
                            
                            }
                        }
                    }
                }
                if (ems.startsWith('text')) {
                    htmle = `${htmle} <div class="text">${UIdata[e]}</div>`
                }
                if (ems.startsWith('btext')) {
                    htmle = `${htmle} <div class="textse">${UIdata[e]}</div>`
                }
                if (ems.startsWith('sepbar')) {
                    htmle = `${htmle} <div class="sepbars"></div>`
                }
                if (ems.startsWith('invisible')) {
                    htmle = `${htmle} <div class="none"></div>`
                }
            }

            edutor.innerHTML = htmle
            delete UIdata
            delete filedata
            delete htmle 
            if (datjson.commands[lastObj].actions[lastAct].data.actionRowElements != undefined) {
                let viewActionRowElements = document.getElementById('actionElements');
                viewActionRowElements.onclick = () => {
                    showAvailableSlots(viewActionRowElements)
                }
                viewActionRowElements.className = 'zaction noanim'
                viewActionRowElements.style.width = '45%'
                viewActionRowElements.style.marginRight = 'auto'
    viewActionRowElements.style.marginLeft = 'auto'
    viewActionRowElements.style.marginTop = 'auto'
                viewActionRowElements.innerHTML = '<div class="barbuttontexta fade">Action Rows</div>'
            } else {
                let viewActionRowElements = document.getElementById('actionElements');
                viewActionRowElements.innerHTML = ''
                viewActionRowElements.className = ''
                viewActionRowElements.style.width = ''

                viewActionRowElements.onclick = () => {
                    null
                }
            }
                }
                
        function saveField(fieldId, sa) {
            let field = document.getElementById(fieldId) 
            datjson.commands[lastObj].actions[lastAct].data[fieldId] = field.innerText;
            fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2))
        }

        Element.prototype.appendBefore = function (element) {
            element.parentNode.insertBefore(this, element);
          },false;
          Element.prototype.appendAfter = function (element) {
            element.parentNode.insertBefore(this, element.nextSibling);
          },false;







          function mbSelect(elm, storeAs, menuElement, elecf) {
            console.log(elm, storeAs, menuElement, elecf)
            let action = require('./AppData/Actions/' + datjson.commands[lastObj].actions[lastAct].file) 
            let pending = ``
            let variableInsertion = false;
            if (action.UI.variableSettings != undefined && action.UI.variableSettings[menuElement] && action.UI.variableSettings[menuElement][elm.innerText] == 'actionGroup') {
                variableInsertion = true;
            }
            console.log(variableInsertion)
            if (document.getElementById(menuElement)) {
                if (elm.innerText.endsWith('*')) {  

                } else {
                    document.getElementById(menuElement).style.animationName = 'selectbarnmt2'
                    document.getElementById(menuElement).style.animationDuration = '0.5s'
                    setTimeout(() => {
                        document.getElementById(menuElement).remove()
                    }, 495)
                }

            } else {

                    if (elm.innerText.endsWith('*') ) {

                        pending = document.createElement('div')
                        pending.className = 'selectBar'
                        pending.id = menuElement
                        pending.contentEditable = 'true'
                        pending.innerHTML = datjson.commands[lastObj].actions[lastAct].data[menuElement]
                        pending.onblur = () => {
                            saveField(menuElement, storeAs)}
                        pending.onkeyup = () => {
                            saveField(menuElement, storeAs)
                        }
                        pending.onContentUpdate = () => {
                            saveField(menuElement, storeAs)
                        }
                        pending.oninput = (event) => {
                            validateInput(event)
                        }

     }
            }
            let eldpn1 = elm.parentNode
            let eldpn2 = eldpn1
            let elminht1 = elm.innerHTML;
            let elminht2 = elminht1;
            let lastElm = eldpn2; 
            var innerHeight = eldpn2.clientHeight;
            lastElm.style.animationName = ''
            lastElm.style.animationDuration = ''
            lastElm.style.setProperty('--inner-height', innerHeight + 'px');
            lastElm.style.animationName = 'shrink'
            lastElm.style.animationDuration = '300ms'
            setTimeout (() => {
                elm.parentNode.innerHTML = elm.innerHTML
                if (pending != '' && eldpn2.nextSibling.className != 'selectBar') {
                    pending.appendAfter(eldpn2)
                    if (variableInsertion == true) {
                        pending.onblur  = () => {
                            saveField(menuElement, storeAs)
                            updateFoundActionGroup(pending)
                        }
                        pending.oncontentupdate = () => {
                            saveField(menuElement, storeAs)
                            updateFoundActionGroup(pending)
                        }
                    }
                }

                if (document.getElementById(menuElement)) {
                    if (variableInsertion == false && document.getElementById(menuElement + 'Selector')) {

                        document.getElementById(menuElement + 'Selector').style.animationName = 'deleteActionGroupSelectors'
                        document.getElementById(menuElement + 'Selector').style.animationDuration = '0.3s'
    
                        setTimeout(() => {
                            document.getElementById(menuElement + 'Selector').remove()
                        }, 295)

                        if (document.getElementById(menuElement)) {
                                document.getElementById(menuElement).style.borderRadius = ''
                        }
                    }
                    if (variableInsertion == true && document.getElementById(menuElement + 'Selector') == undefined){
                        let variableInsertor = document.createElement('div')
                        variableInsertor.id = menuElement + 'Selector'
                        variableInsertor.onclick = () => {
                            document.getElementById(menuElement).focus();
                             setTimeout( () => {
                                showCustomMenu(getOffset(document.getElementById(menuElement)).left + 10, 
                                getOffset(document.getElementById(menuElement)).top + 50)
                            }, 300)
                        }

                        variableInsertor.className = 'actionGroupSelectorB bordertopz'
                        let cmd = 'None'
                        for (let command in datjson.commands) {
                            if (datjson.commands[command].customId == datjson.commands[lastObj].actions[lastAct].data[menuElement]) {
                                cmd = datjson.commands[command].name
                            }
                        }
                        variableInsertor.innerHTML = `<div class="barbuttontexta">Selected: ${cmd}</div>`
                        variableInsertor.appendAfter(document.getElementById(menuElement))
                        document.getElementById(menuElement).style.borderRadius = '0px'
                    }
                }

            }, 100)
            setTimeout(() => {
                eldpn2.onclick = () => {openChoices(storeAs, eldpn2, menuElement, elecf)}
                
            }, 50)
            setTimeout(() => {
                lastElm.style.animationName = ''
                lastElm.style.animationDuration = ''
                if (variableInsertion == false && document.getElementById(menuElement + 'Selector')) {
                    document.getElementById(menuElement + 'Selector').style.animationName = 'deleteActionGroupSelectors'
                    document.getElementById(menuElement + 'Selector').style.animationDuration = '0.3s'
                }
            }, 400)
            datjson.commands[lastObj].actions[lastAct].data[storeAs] = elminht2
            fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2))
            if (variableInsertion == false) {
                try {
                    document.getElementById(menuElement).style.borderRadius = ''
                } catch(err) {

                }
            }
        }
        
        function closeMenu(elmett, nht, storesAs) {
            elmett.innerHTML = nht
            elmett.innerHTML = nht
            elmett.innerHTML = nht
            elmett.onclick = () => {openChoices(storesAs, elmett)}
        }
        function openChoices(storesAs, pElm, dElement, elementStores) {
            const elmdf = pElm.innerHTML
            const elmd = elmdf
            const plmdf1 = pElm.innerHTML
            const plmdf = plmdf1 
            let chk = require(`./AppData/Actions/${datjson.commands[lastObj].actions[lastAct].file}`).UI[elementStores].choices;
            for (let option in require(`./AppData/Actions/${datjson.commands[lastObj].actions[lastAct].file}`).UI[elementStores].choices) {
                if (chk[option] != plmdf) {
                    pElm.onclick = () => {}
                    let emnf = document.createElement('div')
                    emnf.className = 'menuBar'
                    emnf.innerHTML = chk[option]
                    emnf.onclick = () => {mbSelect(emnf, storesAs, dElement, elementStores)}
                    pElm.appendChild(emnf)
                    emnf.style.animationName = 'inittl'
                    emnf.style.animationDuration = '0.5s'
                }
            }
        }

        function checkErrors() {
            let foundIssues = false;
            let issues = document.getElementById('issues');
            let status = document.getElementById('status');
            let sp = document.getElementById('tld')
            if (errorPending == false) {
            sp.style.animationName = 'degb'
            sp.style.animationDuration = '0.5s'
        }
            setTimeout ( () => {
                issues.innerHTML = ' '
            
            for (let action in datjson.commands[lastObj].actions) {
                let UId = require(`./AppData/Actions/${datjson.commands[lastObj].actions[action].file}`).data
                
                let UIdata = require(`./AppData/Actions/${datjson.commands[lastObj].actions[action].file}`).UI
                let kindOf;
                for (let element in UIdata) {
                    if (element.endsWith('*') && datjson.commands[lastObj].actions[action].data[UIdata[element]] == '') {
                        issues.innerHTML += `
                        <div class="issue">
                        <div class="flexbox">
                        <div class="barbuttontexta">${datjson.commands[lastObj].actions[action].name} has an incomplete field</div>
                        <div class="barbuttond noanims" style="height: 30px;margin: auto; margin-right: 0px;" onclick="console.log('test123'); if(lastType == 0) {switchObjs()}; document.getElementById('Action${action}').style.backgroundColor = '#FFFFFF50'; editAction(document.getElementById('Action${action}')); setTimeout(() => { document.getElementById('${UIdata[element]}').style.animationName = 'glowTwice'; document.getElementById('${UIdata[element]}').style.animationDuration = '0.8s'; document.getElementById('${UIdata[element]}').focus();}, 1050)"><div class="image focuds"></div></div>
                        </div></div>
                        `
                        foundIssues = true
                    }
                    
                    if (element.startsWith('menuBar')) {
                        if (UIdata[element].extraField) {
                            if (datjson.commands[lastObj].actions[action].data[UIdata[element].storeAs].endsWith('*')) {
                                if (datjson.commands[lastObj].actions[action].data[UIdata[element].extraField] == '') {
                                    issues.innerHTML += `
                                    <div class="issue">
                                    <div class="flexbox">
                                    <div class="barbuttontexta">${datjson.commands[lastObj].actions[action].name} has an empty input field</div>
                                    <div class="barbuttond noanims" style="height: 30px; margin: auto; margin-right: 0px;" onclick="document.getElementById('Action${action}').style.backgroundColor = '#FFFFFF50'; editAction(document.getElementById('Action${action}')); setTimeout(() => {document.getElementById('${UIdata[element].extraField}').style.animationName = 'glowTwice'; document.getElementById('${UIdata[element].extraField}').style.animationDuration = '1s'; document.getElementById('${UIdata[element].extraField}').focus()}, 1050)"><div class="image focuds"></div></div>
                                    </div></div>
                                    `
                                    foundIssues = true
                                }
                            }
                        }
                    }
                }
                if (datjson.commands[lastObj].type == 'action') {
                    if (datjson.commands[lastObj].trigger == 'textCommand' || datjson.commands[lastObj].trigger == 'messageContent') {
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
                            <div class="barbuttontexta">${datjson.commands[lastObj].actions[action].name} is not compatible</div>
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
                            <div class="barbuttontexta">${datjson.commands[lastObj].actions[action].name} is not compatible</div>
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
                            <div class="barbuttontexta">${datjson.commands[lastObj].actions[action].name} is not compatible</div>
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
        sp.style.animationName = ''
        sp.style.animationDuration = ''
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
              datjson = JSON.parse(di)
              document.getElementById('opentext').innerHTML = `Opening Project <span style="color: #FFFFFF50">${JSON.parse(di).name}</span> <br> <div style="color: #FFFFFF50">Contains ${JSON.parse(di).count} action groups</div>`
              setTimeout (() => {
                              fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2))
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
            <div class="input" id="projectName" style="width: 85%;" contenteditable="true">${datjson.name}</div>
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
                datjson.name = document.getElementById('projectName').innerText
                datjson.prjSrc = exportFolder
                fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2))

                elm.parentNode.parentNode.innerHTML = `
                <div class="barbuttontexta" style="margin: auto; margin-top: 25%; text-align: center;" id="exprjt">Exporting Project!</div>
                `

                fs.writeFileSync(exportFolder + '\\bot.js', fs.readFileSync(processPath + '\\AppData\\bot.js'))
                try {
                fs.mkdirSync(exportFolder + '\\AppData')
                } catch (err) {
                    null
                }
                fs.writeFileSync(exportFolder + '\\AppData\\data.json', JSON.stringify(datjson))

                fs.writeFileSync(exportFolder + '\\package.json', `
                {
                    "name": "Studio Bot!",
                    "main": "bot.js",
                    "author": "Studio Bot Maker, Rat#1111",
                    "description": "A discord bot created via Studio Bot Maker!",
                    "dependencies": {
                        "discord-api-types": "^0.37.34",
                        "discord.js": "^14.11.0",
                        "fs": "^0.0.1-security",
                        "fs-extra": "^11.1.1",
                        "fse": "^4.0.1",
                        "node-fetch": "^3.3.1",
                        "request": "^2.88.2",
                        "git-clone": "0.2.0"
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
                    for (let acf in datjson.commands) {
                        acrnum = parseFloat(acrnum) + parseFloat(datjson.commands[acf].count)
                    }

                for (let action in actions) {
                    counnt++
                        await fs.writeFileSync(exportFolder + '\\AppData\\Actions\\' + actions[action], fs.readFileSync(processPath + '\\AppData\\Actions\\' + actions[action]))
                    document.getElementById('exprjt').innerHTML = '<div class="ring"></div> <br> Project Exported! <br>' + counnt + ' Actions Exported To  <span style="opacity:50%"> ' + datjson.name + '</span><br>' + `
                    <div class="sepbar"></div>
                    <div class="barbuttontexta">Project Summary</div>
                    <br>
                    <span style="opacity:50%">${datjson.count}</span> Action Groups In Total
                    <div></div>
                    <span style="opacity:50%">${acrnum}</span> Actions Used In Total
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
            if (datjson.prjSrc != '') {
                fs.writeFileSync(datjson.prjSrc + '\\AppData\\data.json', JSON.stringify(datjson, null, 2))
                fs.writeFileSync('C:\\ProgramData\\studiodata.json', JSON.stringify(datjson, null, 2));
            } else {
                fs.writeFileSync('C:\\ProgramData\\studiodata.json', JSON.stringify(datjson, null, 2));
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
        function commandOptions() {
            let commandOptions = document.getElementById('commandActions')
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
                if (datjson.commands[lastObj].type != 'event') {
            switch(datjson.commands[lastObj].trigger) {
                case 'slashCommand':
                    let hm = ''
                    hm = datjson.commands[lastObj].description
    
                    if (hm == undefined || hm == null ) {
                        hm = ''
                    } else {
                    }
                commandOptions.innerHTML = `
                <div class="btext">Command Description</div>
                <input class="input" style="padding: 12.5px;"
                onkeydown="if (event.key != 'Backspace') return this.value.split('').length < 32;" oninput="setDescription(this)" value="${hm}">


                <div id="sepfx" class="flexbox" style="margin-left: calc(auto + 2.5px); margin-right: auto; width: 100%; height: 100%;">
                <div></div>
                    <div style="width: 40%; margin-left: auto; margin-right: 1%;">
                <div style="border-radius: 12px; border-bottom-left-radius: 2px; border-bottom-right-radius: 2px; margin-bottom: 1%; width: calc(100% - 12px); padding: 6px; padding-top: 1.5px; padding-bottom: 1.5px; background-color: #FFFFFF10;">                
                <div class="btext">Parameters</div>
                </div>
                <div class="bordertopz" id="parameterTile" style="border-top-left-radius: 12px; border-bottom-right-radius: 2px !important; overflow-y: auto; border-bottom-left-radius: 12px; background-color: #00000030; padding: 12px; margin-left: auto; width: calc(100% - 24px); justify-content: center; align-items: center; height: calc(25vh - 24px - 1% - 26px);">
                
                </div>
            </div>

                <div id="plTile" class="flexbox" style="border-top-right-radius: 12px; border-top-left-radius: 12px; border-bottom-right-radius: 12px;background-color: #00000030;padding: 12px;margin-right: auto;width: calc(55% - 24px);height: 100%;align-items: center;overflow-y: auto; height: calc(25vh - 24px);">
                    <div class="barbuttontexta flexbox" style="margin: auto;">⟨  <span style="margin-left: 6vw"></span> Select A Parameter!</div>
                </div>

                <div class="flexbox" style="width: 100%; align-items: center; justify-content: center; margin-top: 0.5%;">
                <div id="plusMinusParams" class="flexbox" style="height: 70%;  margin-left: 5.5px; width: 40%; background-color: #00000060; padding: 12px; border-radius: 13px; align-items: center; justify-content: center; margin-left: auto; margin-right: auto; margin-top: auto;">
                
                
                <div class="switchableButton" onclick="newParam()" style="width: 28%; border-top-left-radius: 12px; border-bottom-left-radius: 12px; margin: auto; height: auto; padding: 4px; height: 90%;"><div class="barbuttontext" style="margin: auto"><b>+</b></div></div>
                <div class="switchableButton" onclick="deleteParam()" style="width: 28%; margin: auto; height: auto; padding: 4px; height: 90%;"><div class="barbuttontext" style="margin: auto"><b>-</b></div></div>
                <div class="switchableButton" onclick="closeCommand()" style="width: 28%; border-top-right-radius: 12px; border-bottom-right-radius: 12px; margin: auto; height: auto; padding: 4px; height: 90%;"><div class="barbuttontexta" style="margin: auto"><b>✕</b></div></div>
                
                
                </div>



                <div class="flexbox" id="storeParamAs" style="margin-top: auto; background-color: #00000060; padding: 0px; border-radius: 13px; height: 100%; align-items: center; justify-content: center; margin-left: auto; margin-right: auto; width: 50%;">
                </div>
                </div>
                `

                    let parameters = datjson.commands[lastObj].parameters
                    let params = ''
                    if (parameters != undefined) {
                        let cont = 0
                        for (let parameter in parameters) {
                            cont++
                            params = `${params}
                            <div class="barbuttone lessMarginBT" id="${parameters[parameter].paramPos}Param" onclick="parameterIfy(this)" style="width: 14vw; height: auto; animation-name: appearfadenmt; font-size: 18px; overflow-x: auto; overflow-y: auto; margin-left: auto; margin-right: auto;  border-left: solid 0.5vw #FFFFFF15; padding-left: 0.5vw; padding-right: 0vw;">${datjson.commands[lastObj].parameters[parameter].name}</div>`
                        }
                        document.getElementById('parameterTile').innerHTML = params
                    } else {
                        datjson.commands[lastObj].parameters = []
                        fs.writeFileSync(processPath +'/AppData/data.json', JSON.stringify(datjson, null, 2));
                    }
                break

                case 'textCommand':
                    commandOptions.innerHTML = `
                    <div class="barbuttontexta flexbox" margin: auto;>Nothing Available Yet For Text Commands</div>
                    <div class="barbuttone flexbox" onclick="closeCommand()"><div class="barbuttontexta">✕</div></div>
                    `
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
            <div class="barbuttontexta">Type: ${datjson.commands[lastObj].event}</div>
</div>
            <div id="aevts" style="background-color: #00000030; border-radius: 12px; width: 49%; padding-top: 5px; height: calc(100% - 5px); max-height: calc(100% - 5px); overflow: auto;">
            </div></div>`

                if (datjson.commands[lastObj].eventData == undefined) {
                    datjson.commands[lastObj] = {
                        ...datjson.commands[lastObj],
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
            epane(datjson.commands[lastObj].eventFile)
        }
        }, 100)

        
        setTimeout(() => {
            commandOptions.style.animationName = ' '
            commandOptions.style.animationDuration = ' '

        }, 510)
        }    

        function epane(file) {
            let efile = require(`./AppData/Events/${file}`)
            let evtpane = document.getElementById('evtpane')
            datjson.commands[lastObj].eventFile = file
            fs.writeFileSync(processPath +'/AppData/data.json', JSON.stringify(datjson, null, 2));

            if (efile.inputSchemes > 1) {
                try {
                evtpane.innerHTML = `
                <div style="margin-top: 10px;"></div>
                <div class="btext">On ${efile.name}</div>
                <div class="sepbars"></div>
                    <div class="barbuttontexta">${efile.nameSchemes[0]}</div>
                    <div class="input" id="0EV" onblur="storeevfield(this)" style="height: 26px; text-align: left;" contenteditable="true">${datjson.commands[lastObj].eventData[0]}</div>
                
                    <div class="sepbars"></div>
                    <div class="barbuttontexta">${efile.nameSchemes[1]}</div>
                    <div class="input" id="1EV" onblur="storeevfield(this)" style="height: 26px; text-align: left;" contenteditable="true">${datjson.commands[lastObj].eventData[1]}</div>
                    
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
                    <div class="input" id="0EV" onblur="storeevfield(this)" style="height: 26px; text-align: left;" contenteditable="true">${datjson.commands[lastObj].eventData[0]}</div>
                    <div class="sepbars"></div>

                    <div class="barbutton" onclick="closeCommand()" style="height: auto; margin: auto;"><div class="barbuttontexta">Close</div></div>  
                    `
            } catch(err) {null}
        }
        }
        function storeevfield(fr) {
            let id = fr.id.split('EV')[0]
            let nht = fr.innerHTML 

            datjson.commands[lastObj].eventData[id] = nht
            wast()
        }

        function newParam() {
            let paramParent = document.getElementById('parameterTile')
            let f = 0;
            for (let parm in datjson.commands[lastObj].parameters) {
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

            datjson.commands[lastObj].parameters.push(newParam)
            fs.writeFileSync(processPath +'/AppData/data.json', JSON.stringify(datjson, null, 2));

            paramParent.innerHTML += `
            <div class="barbuttone lessMarginBT" id="${datjson.commands[lastObj].parameters[f].paramPos}Param" onclick="parameterIfy(this)" style="width: 14vw; height: auto; animation-name: appearfadenmt; font-size: 18px; overflow-x: auto; overflow-y: auto; margin-left: auto; margin-right: auto;  border-left: solid 0.5vw #FFFFFF15; padding-left: 0.5vw; padding-right: 0vw;">${datjson.commands[lastObj].parameters[f].name}</div>`
        }
        function deleteParam() {
            let paramPosition = lastParam.split('Param')[0]
            console.log(paramPosition)
            datjson.commands[lastObj].parameters.splice(paramPosition, 1)
            let cont = 0
            let params = ''
            let vafr = 0;
            for (let parame in datjson.commands[lastObj].parameters) {
                let prms = datjson.commands[lastObj].parameters

                    datjson.commands[lastObj].parameters[parame].paramPos = vafr
                    vafr++
            }

            const parent = document.getElementById('parameterTile');
            for (let i = 0; i < parent.children.length; i++) {
              const child = parent.children[i];
              child.id = `${i}Param`
            }
            for (let parameter in datjson.commands[lastObj].parameters) {
                cont++
                params = `${params}
                <div class="barbuttone lessMarginBT" id="${datjson.commands[lastObj].parameters[parameter].paramPos}Param" onclick="parameterIfy(this)" style="width: 14vw; height: auto; animation-name: appearfadenmt; font-size: 18px; overflow-x: auto; overflow-y: auto; margin-left: auto; margin-right: auto;  border-left: solid 0.5vw #FFFFFF15; padding-left: 0.5vw; padding-right: 0vw;">${datjson.commands[lastObj].parameters[parameter].name}</div>`
            }
            document.getElementById('parameterTile').innerHTML = params
            fs.writeFileSync(processPath +'/AppData/data.json', JSON.stringify(datjson, null, 2));
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

            <input class="input textLeft" oninput="storeParamName(this)" onkeydown="return event.key !== ' '; if (event.key != 'Backspace') return this.value.split('').length < 32" style="margin: 0.5vw; margin-top: 0vw;" onkeyup="elementContentChecker(this, {maxLength: 15})" contenteditable="true" value="${datjson.commands[lastObj].parameters[spl].name}">
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

            <div class="input textLeft" onblur="elementContentChecker(this, {fromBlur: true, noSpaces: true, maxLength: 16}); storeParamStored(this);" style="margin: 0.5vw; margin-top: 0vw;" contenteditable="true">${datjson.commands[lastObj].parameters[spl].storeAs}</div>
            </div>
            `
            let spas = document.getElementById('storeParamAs')
            spas.innerHTML = `
            <div class="barbuttontexta">Parameter Description</div>
            <div class="input " onkeyup="if (this.innerText.split('').length > 31) {let fk = this.innerText.split(''); let count = 0; this.innerHTML = ''; this.blur(); for (let i in fk) { count++; if (count < 31) {this.innerHTML += fk[i]; this.focus();}else {this.blur()} }}; storeParamDesc(this)" contenteditable="true" style="margin: 2px; margin-top: -15px; padding-left: 2px; padding-right: 2px; padding-top: 2px; padding-bottom: -25px; overflow-y: none; overflow-x: auto; height: 25px;">${datjson.commands[lastObj].parameters[lastParam.split('Param')[0]].description}</div>
            `
            switch (datjson.commands[lastObj].parameters[spl].type) {
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
            
            if (datjson.commands[lastObj].parameters[lastParam.split('Param')[0]].required == true) {
                document.getElementById('rff').style.backgroundColor = '#FFFFFF25'

            } else {
                document.getElementById('rft').style.backgroundColor = '#FFFFFF25'
            }
        }

        function storeParamStored(wh) {
            datjson.commands[lastObj].parameters[lastParam.split('Param')[0]].storeAs = wh.innerText
            wast()
        }
        function storeParamName(wh) {
            document.getElementById(lastParam).innerHTML = wh.value
            datjson.commands[lastObj].parameters[lastParam.split('Param')[0]].name = wh.innerText
            wast()
        }
        function storeParamDesc(wh) {
            datjson.commands[lastObj].parameters[lastParam.split('Param')[0]].description = wh.innerText
            wast()
        }

        function setPrm(wut) {
            switch (datjson.commands[lastObj].parameters[parseFloat(lastParam.split('Param')[0])].type) {
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

            datjson.commands[lastObj].parameters[lastParam.split('Param')[0]].type = wut.innerHTML
            wast()
            wut.style.backgroundColor = '#FFFFFF20'
        }
        function paramify(what) {
            let paramPosition = what.id.split('Param')[0]
            datjson.commands[lastObj].parameters[parseFloat(paramPosition)].name = what.innerText
            if (what.innerText == '') {
                what.innerText = ' '
                datjson.commands[lastObj].parameters[parseFloat(paramPosition)].name = ' '
            }
            wast()
        }
        function setReq(bln, what) {
            let paramPosition = lastParam.split('Param')[0]
            console.log(paramPosition)
        datjson.commands[lastObj].parameters[lastParam.split('Param')[0]].required = bln
            if (bln == true) {
                document.getElementById('rff').style.backgroundColor = ''
                document.getElementById('rft').style.backgroundColor = '#FFFFFF25'
                datjson.commands[lastObj].parameters[parseFloat(paramPosition)].required = false
            } else {
                document.getElementById('rft').style.backgroundColor = ''
                document.getElementById('rff').style.backgroundColor = '#FFFFFF25'
                datjson.commands[lastObj].parameters[parseFloat(paramPosition)].required = true
            }
            wast()
        }

        function setDescription(e) {
            if (datjson.commands[lastObj].description) {
                datjson.commands[lastObj].description = e.value
            } else {
                datjson.commands[lastObj] = {
                    ...datjson.commands[lastObj],
                    description: e.value
                }
            }
            wast()
        }

        function closeCommand() {
            let commandOptions = document.getElementById('commandActions')
            commandOptions.style.animationName = 'actionUnexpand'
            commandOptions.style.animationDuration = '0.5s'
            commandOptions.style.height = ''
            commandOptions.style.width = '90%'
            setTimeout (() => {
                let ddaf;
                if (datjson.commands[lastObj].type == 'action') {
                    console.log(datjson.commands[lastObj])
                        switch(datjson.commands[lastObj].trigger) {
                    case 'slashCommand':
                        ddaf = 'Slash Command'
                        break
                    case 'textCommand':
                        ddaf = 'Text Command'
                    break
                    case 'messageContent':
                        ddaf = 'Message'
                }
        
                document.getElementById('commandActions').innerHTML = `Type: ${ddaf} • ${datjson.commands[lastObj].count} Actions Used`  
                } else {
                    document.getElementById('commandActions').innerHTML = `Event • ${datjson.commands[lastObj].count} Actions Used`
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

            <div class="input" contenteditable="true" onkeyup="setProjectName(this)">${datjson.name}</div>
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
            You're currently rocking Studio Bot Maker version 2.5.1!
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

            <div class="input" contenteditable="true" onkeyup="setProjectName(this)">${datjson.name}</div>
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
            datjson.serverID = elm.innerText
            fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
        }
        function storeHostingToken(elm) {
            datjson.serverToken = elm.innerText
            fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
        }

        function showHosting() {
            const axios = require('axios');

            if (!datjson.serverToken) {
                showPhantomUnset()
            }
        const apiKey = datjson.serverToken;


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
        <div class="input" contenteditable="true" onkeyup="storeHostingToken(this)">${datjson.serverToken}</div>
        <div class="barbuttontexta">Phantom Server ID</div>
        <div class="input" contenteditable="true" onkeyup="storeHostingServerID(this)">${datjson.serverID}</div>
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
        if (!datjson.serverToken) {
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
            if (datjson.serverToken == undefined || datjson.serverID == undefined) return
            let url1 = `https://game.phantom-hosting.net/api/client/servers/${datjson.serverID}/files/write?file=%2FAppData/data.json`
           
            const headers1 = {
                "Accept": "application/text",
                "Content-Type": "application/text",
                "Authorization": `Bearer ${datjson.serverToken}` // Users FULL API key
              };

            console.log(JSON.stringify(datjson))
            axios.post(url1, datjson, { headers1 })


            const filePath = path.join(processPath, 'AppData', 'bot.js');
            const fileContent = fs.readFileSync(filePath, 'utf8')
            
            const url = `https://game.phantom-hosting.net/api/client/servers/${datjson.serverID}/files/write?file=%2Fbot.js`;
            const headers = {
              "Accept": "application/text",
              "Content-Type": "application/text",
              "Authorization": `Bearer ${datjson.serverToken}` // Users FULL API key
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
    url: `https://game.phantom-hosting.net/api/client/servers/${datjson.serverID}/startup/variable`,
    headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${datjson.serverToken}` // Users FULL API key
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
    url: `https://game.phantom-hosting.net/api/client/servers/${datjson.serverID}/startup/variable`,
    headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${datjson.serverToken}` // Users FULL API key
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
    url: `https://game.phantom-hosting.net/api/client/servers/${datjson.serverID}/startup/variable`,
    headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${datjson.serverToken}` // Users FULL API key
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
            url: `https://game.phantom-hosting.net/api/client/servers/${datjson.serverID}/startup/variable`,
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${datjson.serverToken}` // Users FULL API key
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
            url: `https://game.phantom-hosting.net/api/client/servers/${datjson.serverID}/startup/variable`,
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${datjson.serverToken}` // Users FULL API key
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
            url: `https://game.phantom-hosting.net/api/client/servers/${datjson.serverID}/startup/variable`,
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${datjson.serverToken}` // Users FULL API key
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
            if (datjson.commands[lastObj].type == 'action') {
                console.log(datjson.commands[lastObj])
                    switch(datjson.commands[lastObj].trigger) {
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
    datjson.name = welm.innerText
    wast()
}
        function createButton(bar) {
            if (datjson.commands[lastObj].actions[lastAct].data.actionRows[bar].components.length >= 5) return;
            let ba = datjson.commands[lastObj].actions[lastAct].data.actionRows[bar]
            if (lastButt) {
                lastButt.style.backgroundColor = ''
            }
            let newBtn = {
                name: "Button" + parseFloat(ba.components.length + 1),
                style: "Default",
                customId: "Button" + parseFloat(ba.components.length + 1),
                disabled: false,
                field: "",
                runs: ""
            }

            document.getElementById('buttonsDisplay').innerHTML = ''
            for (let button in ba.components) {

                let endProduct = 'bordercenter'
                if (ba.components[parseFloat(button) - 1] == undefined) {
                    endProduct = 'borderright'
                }
                if (ba.components[parseFloat(button) + 1] == undefined) {
                    endProduct = 'borderleft'
                }
                document.getElementById('buttonsDisplay').innerHTML += `
                <div class="barbuttond noanims ${endProduct}" onclick="buttonIfy(${button}, ${bar}, this)" draggable="true" ondragover="buttonDragOver(event, ${button})" ondragstart="buttonDragStart(event, ${button})" ondragend="ButtonDrop(${button}, ${bar})" style="width: 17%;">
                <div class="barbuttontexta" id="${bar}${button}BUT">${ba.components[button].name}</div>
                </div> 
                `
            }
            datjson.commands[lastObj].actions[lastAct].data.actionRows[bar].components.push(newBtn)
            wast()
            document.getElementById('buttonsDisplay').innerHTML += `
            <div class="barbuttond startWidening borderleft" style="width: 17%;">
            <div class="barbuttontexta" >${newBtn.name}</div>
            </div> 
            `
            fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
            setTimeout(() => {
                document.getElementById('buttonsDisplay').innerHTML = ''
                for (let button in ba.components) {
                    
                    let endProduct = 'bordercenter'
                    if (ba.components[parseFloat(button) + 1] == undefined) {
                        endProduct = 'borderleft'
                    }
                    if (ba.components[parseFloat(button) - 1] == undefined) {
                        endProduct = 'borderright'
                    }
    

                    document.getElementById('buttonsDisplay').innerHTML += `
                    <div class="barbuttond noanims ${endProduct}" onclick="buttonIfy(${button}, ${bar}, this)" draggable="true" ondragover="buttonDragOver(event, ${button})" ondragstart="buttonDragStart(event, ${button})" ondragend="ButtonDrop(${button}, ${bar})" style="width: 17%;">
                    <div class="barbuttontexta" id="${bar}${button}BUT">${ba.components[button].name}</div>
                    </div> 
                    `
                }
            }, 350)

            let buttonEditor = document.getElementById('buttonsEditor')
            buttonEditor.innerHTML = `
            <div class="barbuttontexta center">Select A Button!</div>`
        }

        let lastButt;

        function deleteBtnBar(buttone, bar) {
            let ba = datjson.commands[lastObj].actions[lastAct].data.actionRows[bar]
            datjson.commands[lastObj].actions[lastAct].data.actionRows[bar].components.splice(buttone, 1)
            fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
            document.getElementById(`${bar}${buttone}BUT`).parentNode.classList.add('startShrinking')

            setTimeout(() => {
                document.getElementById('buttonsDisplay').innerHTML = ''
                for (let button in ba.components) {
                    
                    let endProduct = 'bordercenter'
                    if (ba.components[parseFloat(button) - 1] == undefined) {
                        endProduct = 'borderright'
                    }
    
                    if (ba.components[parseFloat(button) + 1] == undefined) {
                        endProduct = 'borderleft'
                    }
                    document.getElementById('buttonsDisplay').innerHTML += `
                    <div class="barbuttond noanims ${endProduct}" onclick="buttonIfy(${button}, ${bar}, this)" style="width: 17%;">
                    <div class="barbuttontexta" id="${bar}${button}BUT">${ba.components[button].name}</div>
                    </div> 
                    `
                }
                let buttonEditor = document.getElementById('buttonsEditor')
                buttonEditor.innerHTML = `
                <div class="barbuttontexta center">Select A Button!</div>
                `
            }, 350)

        }

    let menu = null;

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
    let rows = datjson.commands[lastObj].actions[lastAct].data.actionRows
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
        <div class="input" contenteditable="true" style="height: 24px; margin-top: 0px;" onkeyup="elementContentChecker(this, {maxLength: 32}); datjson.commands[lastObj].actions[lastAct].data.actionRows[${rowPosition}].name = this.innerText; wast();">${datjson.commands[lastObj].actions[lastAct].data.actionRows[rowPosition].name}</div>
        </div>
        <div class="bordercenter" style="width: 100%; background-color: #FFFFFF09; padding: 4px; margin-top: 0.5vh; margin-bottom: 0.5vh;">

        <div class="barbuttontexta">
        Row Placeholder
        </div>
        <div class="input" contenteditable="true" style="height: 24px; margin-top: 0px;" onkeyup="elementContentChecker(this, {maxLength: 32}); datjson.commands[lastObj].actions[lastAct].data.actionRows[${rowPosition}].placeholder = this.innerText; wast();">${datjson.commands[lastObj].actions[lastAct].data.actionRows[rowPosition].placeholder}</div>
        </div>
        <div class="bordertopz" style="width: 100%; background-color: #FFFFFF09; padding: 4px;">

        <div class="barbuttontexta">
        Row Custom ID
        </div>
        <div class="input" contenteditable="true" style="height: 24px; margin-top: 0px;" onkeyup="elementContentChecker(this, {maxLength: 32}); datjson.commands[lastObj].actions[lastAct].data.actionRows[${rowPosition}].customId = this.innerText; wast();">${datjson.commands[lastObj].actions[lastAct].data.actionRows[rowPosition].customId}</div>
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

    let lastMenuOption;
    /* 
    
        <div class="barbuttontexta">Select Menu Options</div>
        <div style="background-color: #FFFFFF10; margin-bottom: 1.5vh; height: 15vh; overflow-y: auto; padding: 12px; border-radius: 7px;">
            <div class="zaction lessbrithb" id="customType" onclick="selectStringType('custom')"><div class="barbuttontexta">Custom</div></div>
            <div class="zaction lessbrithb" id="channelType" onclick="selectStringType('channel')"><div class="barbuttontexta">Channel</div></div>
            <div class="zaction lessbrithb" id="userType" onclick="selectStringType('user')"><div class="barbuttontexta">User</div></div>
            <div class="zaction lessbrithb" id="roleType" onclick="selectStringType('role')"><div class="barbuttontexta">Role</div></div>
            <div class="zaction lessbrithb" id="mentionableType" onclick="selectStringType('mentionable')"><div class="barbuttontexta">Mentionable</div></div>
            </div> 
                    let lastRowType = datjson.commands[lastObj].actions[lastAct].data.actionRows[lastRow].customType
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
            
            <div class="input" contenteditable="true" onblur="elementContentChecker(this, {maxLength: 32, fromBlur: true}); datjson.commands[lastObj].actions[lastAct].data.actionRows[${lastRow}].options[${option}].label = this.innerText; wast(); document.getElementById('${option}MenuOption').innerText = this.innerText" onkeyup="elementContentChecker(this, {maxLength: 32}); datjson.commands[lastObj].actions[lastAct].data.actionRows[${lastRow}].options[${option}].label = this.innerText; wast(); document.getElementById('${option}MenuOption').innerText = this.innerText">
            ${datjson.commands[lastObj].actions[lastAct].data.actionRows[lastRow].options[option].label}
            </div>
            </div>
            <div class="bordercenter" style="width: 100%; height: auto; background-color: #00000020; padding-top: 0.75vh; padding-bottom: 0.75vh;">

            <div class="barbuttontexta">Option Description</div>
            <input class="input" style="margin-bottom: 0px;" onkeydown=" /* return event.key !== ' ';  */ if (event.key != 'Backspace') return this.value.split('').length < 32;" oninput="datjson.commands[lastObj].actions[lastAct].data.actionRows[${lastRow}].options[${option}].description = this.value; wast()" contenteditable="true" value="${datjson.commands[lastObj].actions[lastAct].data.actionRows[lastRow].options[option].description}" placeholder="Reccomended">

            </div>
            <div class="bordertop" style="width: 100%; height: auto; background-color: #00000020; padding-bottom: 0.75vh; padding-top: 0.75vh; margin-top: 0.50vh;">

            <div class="barbuttontexta">Option Custom ID (Value)</div>
            <input class="input" style="margin-bottom: 0px;" onkeydown=" /* return event.key !== ' ';  */ if (event.key != 'Backspace') return this.value.split('').length < 32;" oninput="datjson.commands[lastObj].actions[lastAct].data.actionRows[${lastRow}].options[${option}].customValue = this.value; wast()" contenteditable="true" value="${datjson.commands[lastObj].actions[lastAct].data.actionRows[lastRow].options[option].customValue}" placeholder="Required, cannot be seen by anybody else">
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
            setRunningElement(datjson.commands[lastObj].actions[lastAct].data.actionRows[lastRow].options[option].runs)
           }


let lastDraggedRow;

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
    
    datjson.commands[lastObj].actions[lastAct].data.actionRows = array_move(datjson.commands[lastObj].actions[lastAct].data.actionRows, rowPosition, lastDraggedRow)

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

if (datjson.commands['1'].customId == undefined) {
    for (let command in datjson.commands) {
        datjson.commands[command].customId = new Date().getTime()
        wast()
        let r = 0
        while (r < 1550) {
            r++
        }
    }
}


let customHTMLdfs;
let customHTMLreturn;