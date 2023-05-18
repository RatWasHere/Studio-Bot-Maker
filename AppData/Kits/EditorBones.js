let version = 3
const { app, ipcRenderer } = require('electron');
function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}
ipcRenderer.send('checkForUpdates')

ipcRenderer.on('checkedForUpdates', (event, arg) => {

    console.log('arg-chck', arg)
    if (arg == true) {
        bottombar.onclick = () => {

        }
        openBar(true)
        setTimeout(() => {
            let bar = document.getElementById('bottombar')
            bar.innerHTML = `
            •••
            <div class="barbuttontext">Update Available!</div>
            <div class="flexbox" style="height: 5vh">
            <div class="sepbars"></div>
            <div class="barbutton" onclick="update(); unmodify()">
            <div class="barbuttontexta">Update!</div>
            </div>
            <div class="barbutton" onclick="unmodify()">
            <div class="barbuttontexta">Maybe Later!</div>
            </div>
            </div>
            `
        }, 500)
    }   
  });
  function update() {
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
        bottombar.innerHTML = `
        <div class="barbuttontexta" style="margin-top: 40%;">Download Progress</div>
        <div style="background-color: #00000060; height: 1vh; width: 70vh; margin: auto;  border-radius: 100000px;">
        <div id="progressBar" style="background-color: #FFFFFF20; height: 1vh; width 0%; border-radius: 10000000px; margin-right: auto;"></div>
        </div> 
        ` 
        ipcRenderer.send('downloadUpdate')
        let progressBar = document.getElementById('progressBar')
        progressBar.style.transition = 'width 04s. ease-out';
        setInterval(() => {
            ipcRenderer.send('checkProgress')
            ipcRenderer.on('checkedProgress', function (event, reply) {
                console.log('reply')
                progressBar.style.width = reply + '%'
                if (parseFloat(reply) == 100) {
                    ipcRenderer.send('quitAndInstall')
                }
            })
        }, 50)
  }, 600)

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
  function highlight(element, bln, blne) {
    if (lastHighlighted) {
    lastHighlighted.style.backgroundColor = '#FFFFFF15'
    }
    lastHighlighted = element;
    element.style.backgroundColor = '#FFFFFF25'
    if (lastType == 0) {
    if (bln) {
        console.log(element.innerText)
        document.getElementById('Command_Name').innerHTML = element.innerText.split('|')[0]
    }
    if (blne) {
        checkErrors()
        let ddaf;
        lastObj = element.id
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

        document.getElementById('commandActions').innerHTML = `Trigger: ${ddaf} • ${datjson.commands[lastObj].count} Actions Used`  
        } else {
            document.getElementById('commandActions').innerHTML = `Event • ${datjson.commands[lastObj].count} Actions Used`
        }
        checkErrors()
        closeCommand()

    } } else {
        lastAct = element.id
    }

}
function closeSlots() {
    elm = document.getElementById('actionElements')
    elm.style.animationName = 'showBarsButton'
    elm.style.width = '45%'
    elm.style.height = ''
    elm.style.borderRadius = '6px'
    elm.style.marginBottom = '0px'
    elm.style.animationDuration = '0.6s'
    elm.innerHTML = '<div class="barbuttontexta">Action Rows</div>'
    elm.style.backgroundColor = '#FFFFFF15'
    setTimeout(() => {
        elm.onclick = () => {
            showAvailableSlots(elm)
        }
    })
} 
function showAvailableSlots(elm) {
    let arrfd = []
    let fdr = datjson.commands[lastObj].actions[lastAct].data.actionRowElements
    let i = 0
    elm.onclick = () => {}
    let newPush = ``
    elm.style.animationName = 'showButtonBars'
    elm.innerHTML = 'Action Rows'
    elm.style.width = '90%'
    elm.style.height = '45%'
    elm.style.borderRadius = '20px'
    elm.style.marginBottom = '5px'
    elm.style.animationDuration = '0.5s'
    elm.style.backgroundColor = '#00000060'
    setTimeout(() => {
        document.getElementById('actionElements').innerHTML = `

        <div class="barbuttone noanims"  style="width: 95%; margin-top: 10px; margin-bottom: 10px;" onclick="closeSlots()"><div class="barbuttontexta">Close</div></div>

        `
    }, 220)
    setTimeout(() => {
        let toCompensateFor = 0;

        for (let elm in fdr) {
            let FoundMatch = false
            for (let bar in datjson.buttons.bars) {

                if (datjson.buttons.bars[bar].customId == fdr[elm]){
                    FoundMatch = true
                    console.log(datjson.buttons.bars[bar].customId, fdr[elm], datjson.buttons.bars[bar].customId == fdr[elm])
                    document.getElementById('actionElements').innerHTML += `
                    <div class="issue noanims flexbox textToLeft" onclick="getActionRow(${bar}, ${toCompensateFor})" style="background-color: #FFFFFF15">
                    <div class="barbuttontexta textToLeft" style="margin-left: 12px; margin-right: auto;">${datjson.buttons.bars[bar].name}</div>
                    <div class="barbuttond" onclick="ridButton(${toCompensateFor - 1})" style="margin-left: auto; margin-right: 0px; margin-top: auto; margin-bottom: auto; height: 30px; width: 30px; border-radius: 8px;"><div class="barbuttontexta">✕</div></div>
                    </div>
                    `
                }
            }   
            if (FoundMatch == false) {
                datjson.commands[lastObj].actions[lastAct].data.actionRowElements.splice(elm, 1)
            } else {
                toCompensateFor++
            }
        }
        while (toCompensateFor < 5) {
            document.getElementById('actionElements').innerHTML += `
            <div class="issue fade flexbox" onclick="getActionRow(null, null)" style="background-color: #FFFFFF15; border: 2px dashed #FFFFFF20;">
            <div class="barbuttontexta">Empty Slot</div>
            </div>
            `           
             toCompensateFor++

        }
        document.getElementById('actionElements').innerHTML += "<br>"
        
    }, 280)
    elm.innerHTML = `
    <div style="background-color: #FFFFFF15; border-radius: 12px; padding: 7px;">
    <div class="barbuttontexta"></div>
    </div>
    `
}
function ridButton(atIndex) {
    datjson.commands[lastObj].actions[lastAct].data.actionRowElements.splice(atIndex, 1)
    fs.writeFileSync(processPath +'\\AppData\\data.json', JSON.stringify(datjson, null, 2));
    showAvailableSlots(document.getElementById('actionElements'))

}
function getActionRow(bar, atIndex) {
    let trv = true
    if (bar == null) {
        trv = false
    }

    let elm = document.getElementById('actionElements')
    elm.innerHTML = '<div class="barbuttontexta" style="margin: 5px; margin-bottom: -5px;">Select An Action Row </div> <div class="sepbars"></div>'
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
        <div class="issue flexbox" onclick="setButtoenBar(${bar}, ${atIndex})" style="background-color: #ffffff15; height: 4vh; align-content: center; justify-items: center;" onclick="selectbar(${bar}, ${atIndex})">${datjson.buttons.bars[bar].name} - ${datjson.buttons.bars[bar].buttons.length} Buttons <div style="margin-left: 12px; align-items: center; justify-content: center;" class="flexbox">${buttonColors}</div></div>
        `
    }
}
function setButtoenBar(bar, atIndex) {
    if (atIndex == null) {
        datjson.commands[lastObj].actions[lastAct].data.actionRowElements.push(datjson.buttons.bars[bar].customId)
    } else {
        datjson.commands[lastObj].actions[lastAct].data.actionRowElements[atIndex - 1] = datjson.buttons.bars[bar].customId
    }
    fs.writeFileSync(processPath +'\\AppData\\data.json', JSON.stringify(datjson, null, 2));

    showAvailableSlots(document.getElementById('actionElements'))
}
function showButtonBars(elm) {
    elm.style.animationName = 'showButtonBars'
    elm.style.width = '90%'
    elm.style.height = '45%'
    elm.style.borderRadius = '20px'
    elm.style.marginBottom = '5px'
    elm.style.animationDuration = '0.4s'
    elm.style.backgroundColor = '#00000060'
    setTimeout(() => {
        elm.innerHTML = ''
    }, 200)
    setTimeout(() => {  
        elm.style.animationName = ''
        elm.className = 'zaction noanims'
    }, 410
    )
    setTimeout(() => {
        for (let bar in datjson.buttons.bars) {
            let endResult = `<div class="fade slower" style="width: 98%; margin-right: auto;  margin-left: auto; background-color: #FFFFFF15; border-radius: 7px; height: auto;"> 
            <div style="background-color: #00000040; border-radius: 7px; padding: 6px;"><div class="barbuttontexta">${datjson.buttons.bars[bar].name}</div></div><div style="margin-top: 4px; margin-bottom: 4px;" class="flexbox">`   
            for (let button in datjson.buttons.bars[bar].buttons) {
                endResult = `${endResult}
                <div class="barbuttond unhoverable flexbox" style="height: auto; padding: 5px; padding-bottom: 5px; width: 17%; margin-left: 1px;"><div class="barbuttontexta">${datjson.buttons.bars[bar].buttons[button].name}</div></div>
                `
            }
            endResult = `${endResult}
            </div></div>
            `
            console.log(endResult)
            elm.innerHTML += `<div style="margin-top: 2%;"></div>${endResult}`
        }
    }, 210)

}
function switchObjs() {
    try {
    var delay = 0;
    ActionTile.innerHTML = ''
    if (lastType == 0) {
        ActionTile.className = 'actBar'
            for (let action in datjson.commands[lastObj].actions) {
                delay++
                delete quickdata;
                delete dataquick;
                delete require.cache[`./AppData/data.json`];
                delete count;
                delete quickie;
                let quickdata = require(`./AppData/Actions/${datjson.commands[lastObj].actions[action].file}`).UI
                let dataquick = datjson.commands[lastObj].actions[action].data[quickdata.preview].split('');
                let count = 0;
                let dts = ''
                let quickie = ''
                for (let vda in dataquick) {
                    if (count != 23) {
                        quickie = `${quickie}${dataquick[vda]}`
                        count++
                    } else {
                        dts = '..'
                    }
                }   
                let extrf; 
                if (datjson.commands[lastObj].actions[parseFloat(action) + 1] == undefined) {
                    extrf = 'bordertop'
                }
                if (datjson.commands[lastObj].actions[parseFloat(action) - 1] == undefined) {
                    extrf = 'borderbottom'
                }
                if (!extrf) {
                    extrf = 'bordercentere'
                }

                ActionTile.innerHTML += `<div class="action textToLeft ${extrf}" style="animation-delay: ${delay * 3}0ms" ondblclick="editAction(this)" onclick="highlight(this)" id="${action}">${datjson.commands[lastObj].actions[action].name} <div style="opacity: 50%; margin-left: 7px;"> ${`  ${quickdata.previewName}`}: ${quickie}${dts}</div> <div class="deleteActionButton" onclick="deleteObject(this)">✕</div>`

                    lastType = 1
                    if (action == lastAct) {
                        setTimeout(() => {
                            highlight(document.getElementById(action))
                        }, 50)                    }
                delete quickdata;
                delete dataquick;
                delete count;
                delete quickie;
                
            }
        } else {
            delete require.cache[`./AppData/data.json`];
            ActionTile.className = 'actBar'
            for (let cmd in datjson.commands) {
                delay++
                ActionTile.innerHTML += `<div onclick="highlight(this, true, true)" class="action textToLeft" id="${parseFloat(cmd)}" style="animation-delay: ${delay * 3}5ms" ondblclick="cmdOpen('${cmd}')"><div id="name">${datjson.commands[cmd].name}</div> <div style="opacity: 50%; margin-left: 7px;"> | ${Object.keys(datjson.commands[cmd].actions).length} Actions </div> <div class="deleteActionButton forceRounded" style="border-radius: 124px;" onclick="deleteObject(this)">✕</div> `
                if (cmd == lastObj) {
                    setTimeout(() => {
                        highlight(document.getElementById(cmd), true, true)
                    }, 50)
                }
            }
            lastType = 0
        }
        closeCommand()

    } catch (err) {
        null
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
        <div class="barbutton borderrighttop" style="animation-duration: 0.6s"><div class="barbuttontexta">Toggle Bot</div></div>
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
        let edutor = document.getElementById('edutor');
        let bbar = document.getElementById('bbar')
        bbar.style.opacity = '100%'
        edutor.style.animationDuration = '0.6s'
            edutor.style.animationName = 'moveFrom'
            ActionTile.style.animationDuration = '0.6s'
            ActionTile.style.animationName = 'moveFrom'
            bbar.style.animationDuration = '0.6s'
            bbar.style.animationName = 'movefrom'
            setTimeout (() => {
                edutor.innerHTML = fo;
                ActionTile.innerHTML = ''
                ActionTile.className = 'actBar'
            }, 50)
            setTimeout(() => {
                switchObjs()
                highlight(document.getElementById(lastObj), true, true)
                switchObjs()
            }, 200)
            setTimeout (() => {
                edutor.style.animationDuration = ''
            edutor.style.animationName = ''
            ActionTile.style.animationDuration = ''
            ActionTile.style.animationName = ''
            var btbr = document.createElement('div')
            btbr.className = 'bottombar'
            btbr.onclick = () => {modifyBar()}
            btbr.id = 'bottombar'
            btbr.innerHTML = '•••'
            document.body.appendChild(btbr)
            btbr.style.animationName = 'appearfadenmt'
            btbr.style.animationDuration = '0.5s'
            }, 590)

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
                   ActionTile.innerHTML += `<div onclick="highlight(this, true, true)" class="action textToLeft" id="${datjson.count}" ondblclick="cmdOpen('${datjson.count}')"><div id="name">${datjson.commands[lastObj].name}</div> <div style="opacity: 50%; margin-left: 7px;"> | ${datjson.commands[lastObj].count} Actions </div> <div class="deleteActionButton" onclick="highlight(this.parentNode, true, true); deleteObject(this);">✕</div> `
        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
        setTimeout(() => {
            delete require.cache[`./AppData/data.json`];

        highlight(document.getElementById(count), true, true)
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




    setInterval(() => {
        
// Clear the cache for the module
        const v1 = JSON.stringify(datjson)
        const v2 = v1
        delete datjson

        var datjson = JSON.parse(JSON.stringify(JSON.parse(fs.readFileSync(processPath + '\\AppData\\data.json'))));
    }, 160)


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
                    htmle = `${htmle} <div class="input" contentEditable="true" id="${UIdata[e]}"></div>`
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
                            htmle = `${htmle}<div class="baction" id="${lastAct}" style="animation-name: appearfadenmt; width: 90% !important; text-align: left; border-radius: 12px; border-bottom-left-radius: 0px; border-bottom: solid 2px #FFFFFF40; padding-bottom: 0px; border-bottom-right-radius: 0px; padding-left: 0px; padding-right: 0px; margin-bottom: 6px; padding-left: 24px !important;" onclick="openChoices('${UIdata[ems].storeAs}', this, '${thenm}', '${ems}')">${UIdata[ems].choices[option]}</div>`
                            if (UIdata[ems].choices[option].endsWith('*')) {
                                htmle = `${htmle} <div class="selectBar" onblur="saveField('${UIdata[ems].extraField}', '${UIdata[ems].storeAs}')" onkeyup="saveField('${UIdata[ems].extraField}', '${UIdata[ems].storeAs}')" id="${thenm}" contenteditable="true">${datjson.commands[lastObj].actions[lastAct].data[UIdata[ems].extraField]}</div>`
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
            let pending = ``
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
                        pending.onBlur= () => {
                            saveField(menuElement, storeAs)}
                        pending.onkeyup = () => {
                            saveField(menuElement, storeAs)
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
                }

            }, 100)
            setTimeout(() => {
                eldpn2.onclick = () => {openChoices(storeAs, eldpn2, menuElement, elecf)}
            }, 50)
            setTimeout(() => {
                lastElm.style.animationName = ''
                lastElm.style.animationDuration = ''
            }, 400)
            datjson.commands[lastObj].actions[lastAct].data[storeAs] = elminht2
            fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2))
            // closeMenu(eldpn2, elminht2, storeAs)
        }
        
        function closeMenu(elmett, nht, storesAs) {
            elmett.innerHTML = nht
            elmett.innerHTML = nht
            elmett.innerHTML = nht
            elmett.onclick = () => {openChoices(storesAs, elmett)}
        }
        function openChoices(storesAs, pElm, dElement, elementStores) {
            // pElm is the parent element
            const elmdf = pElm.innerHTML
            const elmd = elmdf
            const plmdf1 = pElm.innerHTML
            const plmdf = plmdf1 
            // emnf is the child element displaying the remaining other options
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

        function substitute(str) {
            return eval("`" + str + "`");
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
                        <div class="barbuttond noanims" style="height: 30px;margin: auto; margin-right: 0px;" onclick="console.log('test123'); if(lastType == 0) {switchObjs()}; document.getElementById('${action}').style.backgroundColor = '#FFFFFF50'; editAction(document.getElementById('${action}')); setTimeout(() => { document.getElementById('${UIdata[element]}').style.animationName = 'glowTwice'; document.getElementById('${UIdata[element]}').style.animationDuration = '0.8s'; document.getElementById('${UIdata[element]}').focus();}, 1050)"><div class="image focuds"></div></div>
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
                                    <div class="barbuttond noanims" style="height: 30px; margin: auto; margin-right: 0px;" onclick="if(lastType == 0) {switchObjs()}; document.getElementById('${action}').style.backgroundColor = '#FFFFFF50'; editAction(document.getElementById('${action}')); setTimeout(() => {document.getElementById('${UIdata[element].extraField}').style.animationName = 'glowTwice'; document.getElementById('${UIdata[element].extraField}').style.animationDuration = '1s'; document.getElementById('${UIdata[element].extraField}').focus()}, 1050)"><div class="image focuds"></div></div>
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
                            <div class="barbutton noanims" onclick="if(lastType == 0) {switchObjs()}; setTimeout(() => {highlight(document.getElementById('${action}')); lastHighlighted.focus();}, 100);"><div class="barbuttontexta noanims">Highlight</div></div>
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
                            <div class="barbutton noanims" onclick="if(lastType == 0) {switchObjs()}; setTimeout(() => {highlight(document.getElementById('${action}')); lastHighlighted.focus();}, 100); "><div class="barbuttontexta noanims">Highlight</div></div>
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
                            <div class="barbutton noanims"  onclick="if(lastType == 0) {switchObjs()}; setTimeout(() => {highlight(document.getElementById('${action}')); lastHighlighted.focus();}, 100); "><div class="barbuttontexta noanims">Highlight</div></div>
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
        
        function checkForUpdate() {
            openBar()
            setTimeout (() => {
                let bottombar = document.getElementById('bottombar')
                bottombar.innerHTML = `
                <div class="flexbox" style="height: 100%;">
                <div class="ring">
                <div class="ring" style="height: 7vh; width: 7vh; margin-top: 0.25vh;  animation-delay: 0.8s; animation-duration: 1.8s;"></div>
                </div>
                <br>
                <div class="barbuttontexta">Checking For Updates</div>
                </div>
                `
            }, 470)
        }

        /* ipcRenderer.send('selectDirectory');
        
         ipcRenderer.on('selectedDirectory', function (event, dir) {
          console.log(dir);
        }); */

        function sltPrj() {
            const ipcRenderer = require('electron').ipcRenderer;

            ipcRenderer.send('selectDirectory');
            
            ipcRenderer.on('selectedDirectory', function (event, dir) {
                if (dir[0] == undefined) {
                    location.reload()
                    bottombar.style.animationName = ''
                    bottombar.style.animationDuration = ''
                    bbar.style.animationName = ''
                    bbar.style.animationDuration = ''
                    actionTile.style.animationName = ''
                    actionTile.style.animationDuration = ''
                    editor.style.animationName = ''
                    editor.style.animationDuration = ''
                    editor.style.animationDelay = ''
                    editor.style.filter = 'blur(0px)'
                    actionTile.style.filter = 'blur(0px)'
                    actionTile.style.zIndex = '0'
                    actionTile.style.zIndex = '0'
        
                    bbar.style.filter = 'blur(0px)'
                    bottombar.style.filter = 'blur(0px)'
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
            let actionTile = document.getElementById('actionbar')
            let editor = document.getElementById('edutor')
            let bbar = document.getElementById('bbar')
            let bottombar = document.getElementById('bottombar')

            
            bottombar.style.animationName = 'blurify'
            bottombar.style.animationDuration = '0.5s'
            bbar.style.animationName = 'blurify'
            bbar.style.animationDuration = '0.5s'
            actionTile.style.animationName = 'blurify'
            actionTile.style.animationDuration = '0.5s'
            editor.style.animationName = 'blurify'
            editor.style.animationDuration = '0.5s'
            editor.style.animationDelay = '0.25s'
            editor.style.filter = 'blur(30px)'
            actionTile.style.filter = 'blur(30px)'
            actionTile.style.zIndex = '0'
            actionTile.style.zIndex = '0'

            bbar.style.filter = 'blur(30px)'
            bottombar.style.filter = 'blur(30px)'
            document.body.innerHTML += '<div class="barbuttontexta" id="opentext" style="margin-top: -10vh; position: relative; z-index: 50; text-align: center;">The editor will reload after you select your project</div>'
        }
        let exportFolder;
         function exportProject() {
            let actionTile = document.getElementById('actionbar')
            let editor = document.getElementById('edutor')
            let bbar = document.getElementById('bbar')
            let bottombar = document.getElementById('bottombar')

            
            bottombar.style.animationName = 'blurify'
            bottombar.style.animationDuration = '0.5s'
            bbar.style.animationName = 'blurify'
            bbar.style.animationDuration = '0.5s'
            actionTile.style.animationName = 'blurify'
            actionTile.style.animationDuration = '0.5s'
            editor.style.animationName = 'blurify'
            editor.style.animationDuration = '0.5s'
            editor.style.animationDelay = '0.25s'
            editor.style.filter = 'blur(30px)'
            actionTile.style.filter = 'blur(30px)'
            actionTile.style.zIndex = '0'
            actionTile.style.zIndex = '0'

            bbar.style.filter = 'blur(30px)'
            bottombar.style.filter = 'blur(30px)'
            document.body.innerHTML += `
            <div class="actbar" style="margin-top: -95vh; padding: 0px; margin-left: auto; margin-right: auto; position: relative; background-color: #00000040; box-shadow: #00000035 0px 0px 12px;">
            
            <div class="barbuttontext" style="margin-top: 3vh; text-align: center;">Export Project</div>
            <div class="sepbar"></div>

            <br>
            <div class="flexbox" style="height: 8%;">
            <div class="barbuttontexta">Project Name</div>
            <div class="input" id="projectName" style="width: 85%;" contenteditable="true">${datjson.name}</div>
            <div class="sepbars" style="width: 90%;"></div>
            <div class="barbuttontexta">Export Folder</div>
            <div class="action" style="height: auto; width: 85%;" id="pathTo" onclick="selectFolder(this)">None Selected</div>
            <br>
            <div class="sepbar"></div>
            <div class="barbutton" style="margin: auto;" onclick="exportBot(this)"><div class="barbuttontexta">Export</div></div>
            <div class="barbutton" style="margin: auto;" onclick="location.reload()"><div class="barbuttontexta">Cancel</div></div>

            </div>
            `
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
                        "discord.js": "^14.9.0",
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
                            "channels": {}
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
                    setTimeout(() => {
                        location.reload()
                    }, 14000)
                }

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
            <div class="ring" style="animation-duration: 1s; height: 70%; width: 20%;"></div>
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
        <div class="ring" style="animation-duration: 1s; height: 70%; width: 20%;"></div>
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

        function commandOptions() {
            // commandActions

            let commandOptions = document.getElementById('commandActions')
            commandOptions.className = 'baction'
            commandOptions.style.maxHeight = '75vh';
            commandOptions.style.animationName = 'actionExpand'
            commandOptions.style.animationDuration = '0.5s'
            commandOptions.style.height = '45vh';
            commandOptions.style.borderRadius = '15px'
            commandOptions.style.backgroundColor = '#FFFFFF15'
            commandOptions.style.paddingLeft = '5px'
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
                <div class="input" contenteditable="true" onkeyup="elementContentChecker(this, {maxLength: 32}); setDescription(this)" onblur="elementContentChecker(this, {maxLength: 32, fromBlur: true}); setDescription(this)">${hm}</div>
                <div class="btext">Parameters</div>

                <div id="sepfx" class="flexbox" style="margin-bottom: 1vh; margin-left: calc(auto + 2.5px); margin-right: auto; width: 100%;">
                <div></div>
                <div id="parameterTile" style="border-top-left-radius: 12px; border-bottom-left-radius: 12px; background-color: #00000030; padding: 12px;  margin-left: auto; margin-right: 1%; width: calc(40% - 24px); height: 21vh; justify-content: center; align-items: center;">
                
                </div>

                <div id="plTile" class="flexbox" style=" border-top-right-radius: 12px; border-bottom-right-radius: 12px; background-color: #00000030; padding: 12px;  margin-right: auto; width: calc(55% - 24px); height: 21vh; align-items: center; overflow-y: auto;">
                    <div class="barbuttontexta flexbox" style="margin: auto;">⟨  <span style="margin-left: 6vw"></span> Select A Parameter!</div>
                </div>
                
                <div id="plusMinusParams" class="flexbox" style="margin-left: 5.5px; width: 40%; margin-top: 1.3vh; background-color: #00000060; padding: 12px; border-radius: 13px; align-items: center; justify-content: center; margin-left: auto; margin-right: auto;">
                
                
                <div class="switchableButton" onclick="newParam()" style="width: 28%; border-top-left-radius: 12px; border-bottom-left-radius: 12px; margin: auto; height: auto; padding: 4px; height: 5vh;"><div class="barbuttontext" style="margin: auto"><b>+</b></div></div>
                <div class="switchableButton" onclick="deleteParam()" style="width: 28%; margin: auto; height: auto; padding: 4px; height: 5vh;"><div class="barbuttontext" style="margin: auto"><b>-</b></div></div>
                <div class="switchableButton" onclick="closeCommand()" style="width: 28%; border-top-right-radius: 12px; border-bottom-right-radius: 12px; margin: auto; height: auto; padding: 4px; height: 5vh;"><div class="barbuttontexta" style="margin: auto"><b>✕</b></div></div>
                
                
                </div>



                <div class="flexbox" id="storeParamAs" style="margin-top: 1.3vh; background-color: #00000060; padding: 0px; border-radius: 13px; height: 9vh; align-items: center; justify-content: center; margin-left: auto; margin-right: auto; width: 50%;">
                    <div class="ring" style="width: 3vh; height: 3vh;"></div>
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
            <div class="barbuttontexta">Trigger: ${datjson.commands[lastObj].event}</div>
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
                    `
            } else {
                evtpane.innerHTML = `
                <div style="margin-top: 10px;"></div>
                <div class="btext">On ${efile.name}</div>
                <div class="sepbars"></div>
                    <div class="barbuttontexta">${efile.nameSchemes[0]}</div>
                    <div class="input" id="0EV" onblur="storeevfield(this)" style="height: 26px; text-align: left;" contenteditable="true">${datjson.commands[lastObj].eventData[0]}</div>
                    <div class="sepbars"></div>

                    <div class="barbutton" onclick="closeCommand()" style="height: auto; margin: auto;"><div class="barbuttontexta">Close</div></div>  
                    `
            }
            
        }
        function storeevfield(fr) {
            let id = fr.id.split('EV')[0]
            let nht = fr.innerHTML 

            datjson.commands[lastObj].eventData[id] = nht
            fs.writeFileSync(processPath +'/AppData/data.json', JSON.stringify(datjson, null, 2));
        }
        function newParam() {
            let paramParent = document.getElementById('parameterTile')
            let f = 0;
            for (let parm in datjson.commands[lastObj].parameters) {
                f++   
            }
            if (f > 4) return
            while (document.getElementById(f + 'Param')) {
                console.log('exists!!')
                f++ 
            }
            let newParam = {
                "name":"Parameter " + f,
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

            // get the parameter position
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

            <div class="input textLeft" onblur="elementContentChecker(this, {fromBlur: true, maxLength: 15, noSpaces: true, noCaps: true}); storeParamName(this);" style="margin: 0.5vw; margin-top: 0vw;" contenteditable="true">${datjson.commands[lastObj].parameters[spl].name}</div>
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

            <div class="flexbox" style="margin-top: 0.8vh; overflow-y: auto; max-height: 11vh; height: 12vh; width: 100%; margin-left: auto; margin-right: auto;background-color: #00000030; border-radius: 7px; align-items: center; justify-content:center; padding: 3px;">
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
            fs.writeFileSync(processPath +'/AppData/data.json', JSON.stringify(datjson, null, 2));

        }
        function storeParamName(wh) {
            document.getElementById(lastParam).innerHTML = wh.innerText
            datjson.commands[lastObj].parameters[lastParam.split('Param')[0]].name = wh.innerText
            fs.writeFileSync(processPath +'/AppData/data.json', JSON.stringify(datjson, null, 2));

        }
        function storeParamDesc(wh) {
            datjson.commands[lastObj].parameters[lastParam.split('Param')[0]].description = wh.innerText
            fs.writeFileSync(processPath +'/AppData/data.json', JSON.stringify(datjson, null, 2));

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
            fs.writeFileSync(processPath +'/AppData/data.json', JSON.stringify(datjson, null, 2));
            wut.style.backgroundColor = '#FFFFFF20'



        }
        function paramify(what) {
            let paramPosition = what.id.split('Param')[0]
            datjson.commands[lastObj].parameters[parseFloat(paramPosition)].name = what.innerText
            if (what.innerText == '') {
                what.innerText = ' '
                datjson.commands[lastObj].parameters[parseFloat(paramPosition)].name = ' '
            }
            
            
            fs.writeFileSync(processPath +'/AppData/data.json', JSON.stringify(datjson, null, 2));
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
            fs.writeFileSync(processPath +'/AppData/data.json', JSON.stringify(datjson, null, 2));

        }

        function setDescription(e) {
            console.log('settingdescription!')
            if (datjson.commands[lastObj].description) {
                datjson.commands[lastObj].description = e.innerText
            } else {
                datjson.commands[lastObj] = {
                    ...datjson.commands[lastObj],
                    description: e.innerText
                }
            }
            fs.writeFileSync(processPath +'/AppData/data.json', JSON.stringify(datjson, null, 2));
        }

        function closeCommand() {
            let commandOptions = document.getElementById('commandActions')
            commandOptions.style.animationName = 'actionUnexpand'
            commandOptions.style.animationDuration = '0.5s'
            commandOptions.style.height = ''
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
        
                document.getElementById('commandActions').innerHTML = `Trigger: ${ddaf} • ${datjson.commands[lastObj].count} Actions Used`  
                } else {
                    document.getElementById('commandActions').innerHTML = `Event • ${datjson.commands[lastObj].count} Actions Used`
                }
            }, 200)
        }
        // UNFINISHED.
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
            <div class="barbutton" onclick="showActionRows()" style="margin-top: auto; margin-bottom: auto;"><div class="barbuttontexta">Menu Bars (BETA)</div></div>
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
            <div class="barbuttone hoverable borderleftz" onclick="viewJSON()">
            <div class="barbuttontexta">View JSON</div>
            </div>
            </div></div>
            <div style="background-color: #00000060; width: 40vw; height: 35vh; border-radius: 12px; padding: 12px;" class="flexbox">
            <div class="barbuttontexta">
            <b>READ ME!</b>
            You're currently rocking Studio Bot Maker version 2.3.2
            </div>
            <div class="barbuttontexta">
            Documentation & Hosting reccomendations on Github/RatWasHere/Studio-Bot-Maker/docs
            - The current version of SBM is a preview and is not meant for widespread public use. Polish and more coming soon™️
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

// Replace YOUR_API_KEY with your CLIENT API key
        const apiKey = datjson.serverToken;

// Base URL for the Pterodactyl API
        const baseURL = 'https://game.phantom-hosting.net/api/client';

// Create an axios instance with the base URL and the API key in the headers
            const axiosInstance = axios.create({
            baseURL,
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            }
            });

// Function to retrieve the user's account information
        const getAccountInfo = async () => {
        try {
            const response = await axiosInstance.get('/account');
            return response.data;
        } catch (error) {
            console.error(error);
        }
        }

    getAccountInfo().then((data) => {
        console.log(data)
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
    });
        }
        function uploadDataToPhantom() {
            if (datjson.serverToken == undefined || datjson.serverID == undefined) return
            axios({
                method: 'post',
                url: `https://game.phantom-hosting.net/api/client/servers/${datjson.serverID}/files/write?file=%2FAppData/data.json`,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${datjson.serverToken}` // Users FULL API key
                },
                data: {
                    datjson
                }
            }).then((response) => {
                console.log(response.data);
            })
            const filePath = path.join(processPath, 'AppData', 'bot.js');
            const fileContent = fs.readFileSync(filePath, 'utf8');
            
            const url = `https://game.phantom-hosting.net/api/client/servers/${datjson.serverID}/files/write?file=%2Fbot.js`;
            const headers = {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": `Bearer ${datjson.serverToken}` // Users FULL API key
            };
            
            axios.post(url, fileContent, { headers })
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.error(error);
              });
            
//BOT_JS_FILE
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


/* 
        if (element.innerText.split('').length > maxLength) {
            let fk = element.innerText.split(''); 
         let count = 0; element.innerHTML = ''; 
         element.blur(); 
         for (let i in fk) {
             count++;
            if (count < 25) {
                element.innerHTML += fk[i]; element.focus();
            } else { 
                element.blur()
            }
     }} */

function setProjectName(welm) {
    datjson.name = welm.innerText
    fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));

}
        function showButtons() {
            let view = document.getElementById('actElmsig')
            if (datjson.buttons) {
                view.innerHTML = `                <div class="flexbox" style="margin-bottom: 2.5vh;">

                <div class="barbuttond center borderrightz" onclick="switchToHome()" style="margin-left: auto; height: 3vh; width: 30px;">
                <div class="image backArrow">
                
                </div>
                </div>
                <div class="barbuttond center borderleftz" onclick="switchToHome()" style="width: 70px; height: 3vh; margin-right: 1vw; margin-left: 0.3vw;">
                <div class="barbuttontexta">
                Home
                </div>
                </div>
                </div>
                <div class="barbuttond" onclick="newButtonBar()" style="margin-left: auto; position: sticky; top: 11; bottom: 1; border-radius: 1000px; width: 50px; height: 50px; margin-bottom: -10vh;">
                
                <div class="barbuttontext"><b>+</b></div>
                </div> 

                <br>
                <div id="ActionRows" class="flexbox" style="align-items: center; justify-content: center; width: 95%;"></div>
                `
                for (let bar in datjson.buttons.bars) {
                    var buttonColors = ''
                    for (let button in datjson.buttons.bars[bar].buttons) {
                        switch (datjson.buttons.bars[bar].buttons[button].style) {
                            case 'Default': 
                            buttonColors = `${buttonColors}<div style="width: 4vw; opacity: 50%; height: 3vh; margin-right: 0.5vw; background-color: #695dfb; border-radius: 7px;"></div>`
                            break
                            case 'Success': 
                            buttonColors = `${buttonColors}<div style="width: 4vw; opacity: 50%; height: 3vh; margin-right: 0.5vw; background-color: #5fb77a; border-radius: 7px;"></div>`
                            break
                            case 'Danger': 
                            buttonColors = `${buttonColors}<div style="width: 4vw; opacity: 50%; height: 3vh; margin-right: 0.5vw; background-color: #de4447; border-radius: 7px;"></div>`
                            break
                            case 'Neutral': 
                            buttonColors = `${buttonColors}<div style="width: 4vw; opacity: 50%; height: 3vh; margin-right: 0.5vw; background-color: #50545d; border-radius: 7px;"></div>`
                            break
                            case 'Link': 
                            buttonColors = `${buttonColors}<div style="width: 4vw; opacity: 50%; height: 3vh; margin-right: 0.5vw; background-color: #FFFFFF90; border-radius: 7px;"></div>`
                            break
                        }
                    }
                    document.getElementById('ActionRows').innerHTML += `
                    <div class="issue" style="width: 47%; margin-left: 0px; margin-right: auto;">
                        <div class="flexbox" style="padding: 9px; background-color: #FFFFFF10; border-radius: 6px; "><div style="height: 3vh"></div>${buttonColors}</div>    
                    <div class="barbuttontext">
                        ${datjson.buttons.bars[bar].name}
                        </div>
                        <div class="barbuttontexta">
                        Buttons:
                        ${datjson.buttons.bars[bar].buttons.length}
                        </div>
                        <div class="flexbox">
                        <div  class="flexbox hoverablez" style="padding: 9px; width: 100%; border-radius: 6px;" onclick="editButtons('${bar}')">
                        <div class="barbuttontexta">Modify</div>
                        </div>
                        </div>

                    </div>
                    `
                } 
            } else {
                view.innerHTML = `
                <div class="barbuttontexta">No Button Bars Initiated</div>
                <div class="barbutton flexbox" onclick="buildButtons()" style="margin: auto;">
                <div class="barbuttontexta">Build</div>
                </div>
                `
            }
        }




        function newButtonBar() {
            let tme = new Date().getTime()
            let newBar = {name: "Bar",
             storeAs:"ButtonBar",
             customId: `${tme}`,
             type: "buttonBar",
              buttons: []}

        datjson.buttons.bars.push(newBar)

        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
            var br;
            document.getElementById('ActionRows').innerHTML = ''
        for (let bar in datjson.buttons.bars) {

            var buttonColors = ''
            for (let button in datjson.buttons.bars[bar].buttons) {
                switch (datjson.buttons.bars[bar].buttons[button].style) {
                    case 'Default': 
                    buttonColors = `${buttonColors}<div style="width: 4vw; opacity: 50%; height: 3vh; margin-right: 0.5vw; background-color: #695dfb; border-radius: 7px;"></div>`
                    break
                    case 'Success': 
                    buttonColors = `${buttonColors}<div style="width: 4vw; opacity: 50%; height: 3vh; margin-right: 0.5vw; background-color: #5fb77a; border-radius: 7px;"></div>`
                    break
                    case 'Danger': 
                    buttonColors = `${buttonColors}<div style="width: 4vw; opacity: 50%; height: 3vh; margin-right: 0.5vw; background-color: #de4447; border-radius: 7px;"></div>`
                    break
                    case 'Neutral': 
                    buttonColors = `${buttonColors}<div style="width: 4vw; opacity: 50%; height: 3vh; margin-right: 0.5vw; background-color: #50545d; border-radius: 7px;"></div>`
                    break
                    case 'Link': 
                    buttonColors = `${buttonColors}<div style="width: 4vw; opacity: 50%; height: 3vh; margin-right: 0.5vw; background-color: #FFFFFF90; border-radius: 7px;"></div>`
                    break
                }
            }
            if (datjson.buttons.bars[bar].customId == newBar.customId) {
                document.getElementById('ActionRows').innerHTML += `
                <div class="issue animatedBar" style="width: 47%; margin-left: 0px; margin-right: auto;">
                    <div class="flexbox" style="padding: 9px; background-color: #FFFFFF10; border-radius: 6px; "><div style="height: 3vh"></div>${buttonColors}</div>    
                <div class="barbuttontext">
                    ${datjson.buttons.bars[bar].name}
                    </div>
                    <div class="barbuttontexta">
                    Buttons:
                    ${datjson.buttons.bars[bar].buttons.length}
                    </div>
                    <div  class="flexbox hoverablez" style="padding: 9px; border-radius: 6px;" onclick="editButtons('${bar}')">
                    <div class="barbuttontexta">Modify</div>
                    </div>
                </div>
                `
            } else {

            document.getElementById('ActionRows').innerHTML += `
            <div class="issue noanims" style="width: 47%; margin-left: 0px; margin-right: auto;">
                <div class="flexbox" style="padding: 9px; background-color: #FFFFFF10; border-radius: 6px; "><div style="height: 3vh"></div>${buttonColors}</div>    
            <div class="barbuttontext">
                ${datjson.buttons.bars[bar].name}
                </div>
                <div class="barbuttontexta">
                Buttons:
                ${datjson.buttons.bars[bar].buttons.length}
                </div>
                <div  class="flexbox hoverablez" style="padding: 9px; border-radius: 6px;" onclick="editButtons('${bar}')">
                <div class="barbuttontexta">Modify</div>
                </div>
            </div>
            `
        }}
        let view = document.getElementById('actElmsig')
        // animatedBar
        /* document.getElementById('ActionRows').innerHTML += `
                    <div class="issue" style="width: 47%; margin-left: 0px; margin-right: auto; border-bottom: 3px solid #FFFFFF20; box-shadow: unset;">
                        <div class="flexbox" style="padding: 9px; background-color: #FFFFFF10; border-radius: 6px; "><div style="height: 3vh"></div></div>    
                    <div class="barbuttontext">
                        ${newBar.name}
                        </div>
                        <div class="barbuttontexta">
                        Buttons:
                        0
                        </div>
                        <div  class="flexbox hoverablez" style="padding: 9px; border-radius: 6px;" onclick="editButtons('${br}')">
                        <div class="barbuttontexta">Modify</div>
                        </div>
                    </div>
        ` */ 
        }
        function createButton(bar) {
            if (datjson.buttons.bars[bar].buttons.length >= 5) return;
            let ba = datjson.buttons.bars[bar]
            if (lastButt) {
                lastButt.style.backgroundColor = ''
            }
            let newBtn = {
                name: "Button" + parseFloat(datjson.buttons.bars[bar].buttons.length + 1),
                style: "Default",
                customId: "Button" + parseFloat(datjson.buttons.bars[bar].buttons.length + 1),
                disabled: false,
                field: ""
            }

            document.getElementById('buttonsDisplay').innerHTML = ''
            for (let button in ba.buttons) {
                    
                let endProduct = 'bordercenter'
                if (ba.buttons[parseFloat(button) + 1] == undefined) {
                    endProduct = 'bordercenter'
                }
                if (ba.buttons[parseFloat(button) - 1] == undefined) {
                    endProduct = 'borderright'
                }

                document.getElementById('buttonsDisplay').innerHTML += `
                <div class="barbuttond noanims ${endProduct}" onclick="buttonIfy(${button}, ${bar}, this)" style="width: 17%;">
                <div class="barbuttontexta" id="${bar}${button}BUT">${ba.buttons[button].name}</div>
                </div> 
                `
            }
            document.getElementById('buttonsDisplay').innerHTML += `
            <div class="barbuttond startWidening borderleft" style="width: 17%;">
            <div class="barbuttontexta" >${newBtn.name}</div>
            </div> 
            `
            datjson.buttons.bars[bar].buttons.push(newBtn)
            fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
            setTimeout(() => {
                document.getElementById('buttonsDisplay').innerHTML = ''
                for (let button in ba.buttons) {
                    
                    let endProduct = 'bordercenter'
                    if (ba.buttons[parseFloat(button) + 1] == undefined) {
                        endProduct = 'borderleft'
                    }
                    if (ba.buttons[parseFloat(button) - 1] == undefined) {
                        endProduct = 'borderright'
                    }
    

                    document.getElementById('buttonsDisplay').innerHTML += `
                    <div class="barbuttond noanims ${endProduct}" onclick="buttonIfy(${button}, ${bar}, this)" style="width: 17%;">
                    <div class="barbuttontexta" id="${bar}${button}BUT">${ba.buttons[button].name}</div>
                    </div> 
                    `
                }
            }, 350)

            let buttonEditor = document.getElementById('buttonsEditor')
            buttonEditor.innerHTML = `
            <div class="barbuttontexta center">Select A Button!</div>`
        }

        function deleteButton(bar) {
            
        }
        let lastButt;
        function editButtons(bar) {
            let ba = datjson.buttons.bars[bar]
            let view = document.getElementById('actElmsig')

                let storedVi = view.innerHTML;
                let storedView = storedVi;

            view.innerHTML = `
            <div class="barbuttontext center textToLeft flexbox" style="margin-top: -3.5vh; margin-right: auto; margin-left: 12px;">Editing <div style="margin-left: 10px;"></div> <span style="opacity: 50%;">${ba.name}</span>
            <div class="flexbox" style="margin-left: auto; margin-right: 12px;">
<div class="barbuttond center" onclick="showButtons(${bar})" style="width: 30px;">
<div class="barbuttontexta">
⟨
</div>
</div>
            <div class="barbuttond center" style="width: 70px;" onclick="deleteBtBar(${bar})">
            <div class="barbuttontexta">
            Delete
            </div>
            </div>
</div>
            </div><br>
                        <div class="flexbox" style="width: 95%; margin-left: auto; margin-right: auto; min-height: 9vh; height: 9vh; background-color: #00000060; border-radius: 12px; padding: 10px;">
            <div style="align-items: center; justify-content: center; margin: auto;">
            <div class="barbuttontexta">Button Bar Name</div>
            <div class="input" style="width: 35vw;" contenteditable="true" onkeyup="storeName(${bar}, this)">${datjson.buttons.bars[bar].name}</div>
            </div>
            <div class="fade" style="width: 3px; height: 90%; margin: auto; background-color: #FFFFFF30;"></div><br>

            <div style="align-items: center; justify-content: center; margin: auto;">
                        <div class="barbuttontexta">Store Bar As</div>
            <div class="input" style="width: 35vw;" contenteditable="true" onkeyup="storeBarAs(${bar}, this)">${datjson.buttons.bars[bar].storeAs}</div>

            </div>
            </div>


            `
            view.innerHTML += `
<br>
       <div class="barbuttond" onclick="createButton(${bar})" style="width: 50px; height: 50px; margin-left: auto; margin-right: 4.5vw; border-radius: 1000px; margin-bottom: -5vh; backdrop-filter: blur(72px); background-color: ${datjson.color};">
            <div class="barbuttontext"><b>+</b></div>
            </div> 
            <div class="flexbox borderbottomz" style="width: calc(95% - 30px); margin-left: auto; margin-right: auto; min-height: 6vh; height: 6vh; background-color: #00000060; border-radius: 12px; padding: 15px; margin-bottom: 0.5vh;" id="buttonsDisplay"></div>
            <div class="flexbox bordertopz" style="width: calc(95% - 20px); margin-left: auto; margin-right: auto; min-height: 33vh; height: 33vh; background-color: #00000060; border-radius: 12px; padding: 10px; justify-content: center; align-items: center;" id="buttonsEditor">
            <div class="barbuttontexta center">Select A Button!</div>
            </div>

            `
            for (let button in ba.buttons) {

                let endProduct = 'bordercenter'
                if (ba.buttons[parseFloat(button) - 1] == undefined) {
                    endProduct = 'borderright'
                }
                if (ba.buttons[parseFloat(button) + 1] == undefined) {
                    endProduct = 'borderleft'
                }
                document.getElementById('buttonsDisplay').innerHTML += `
                <div class="barbuttond ${endProduct}" onclick="buttonIfy(${button}, ${bar}, this)" style="width: 17%;">
                <div class="barbuttontexta" id="${bar}${button}BUT">${ba.buttons[button].name}</div>
                </div> 
                `
            }
        }
        function deleteBtnBar(buttone, bar) {
            let ba = datjson.buttons.bars[bar]
            datjson.buttons.bars[bar].buttons.splice(buttone, 1)
            fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
            document.getElementById(`${bar}${buttone}BUT`).parentNode.classList.add('startShrinking')

            setTimeout(() => {
                document.getElementById('buttonsDisplay').innerHTML = ''
                for (let button in ba.buttons) {
                    
                    let endProduct = 'bordercenter'
                    if (ba.buttons[parseFloat(button) - 1] == undefined) {
                        endProduct = 'borderright'
                    }
    
                    if (ba.buttons[parseFloat(button) + 1] == undefined) {
                        endProduct = 'borderleft'
                    }
                    document.getElementById('buttonsDisplay').innerHTML += `
                    <div class="barbuttond noanims ${endProduct}" onclick="buttonIfy(${button}, ${bar}, this)" style="width: 17%;">
                    <div class="barbuttontexta" id="${bar}${button}BUT">${ba.buttons[button].name}</div>
                    </div> 
                    `
                }
                let buttonEditor = document.getElementById('buttonsEditor')
                buttonEditor.innerHTML = `
                <div class="barbuttontexta center">Select A Button!</div>
                `
            }, 350)

        }
        function deleteBtBar(bar) {
            let ba = datjson.buttons.bars[bar]
            datjson.buttons.bars.splice(bar, 1)
            fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
            document.getElementById('buttonsDisplay').innerHTML = ''
            showButtons()
        }
        function storeBarAs(bar, meh) {
            datjson.buttons.bars[bar].storeAs = meh.innerText
            fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
        }
        function buttonIfy(button, bar, what) {
            let buttonEditor = document.getElementById('buttonsEditor')
            let ba = datjson.buttons.bars[bar]

            if (lastButt != null || lastButt != undefined) {
                lastButt.style.backgroundColor = ''
            }
            what.style.backgroundColor = '#FFFFFF25'

            lastButt = what;
            buttonEditor.innerHTML = `
            <div>
            <div class="borderbottomz" style="padding: 6px; border-radius: 12px; background-color: #FFFFFF09; margin-bottom: 0.65vh;">
            <div class="barbuttontexta fade">Button Label</div>
            <div class="input" style="width: 35vw; margin-bottom: 0px;" contenteditable="true" onblur="elementContentChecker(this, {maxLength: 32})" onkeyup="elementContentChecker(this, {maxLength: 32}); buttonren(${button}, this, ${bar})">${ba.buttons[button].name}</div>
            </div>
            <div class="bordertopz" style="padding: 6px; border-radius: 12px; background-color: #FFFFFF09;">
            <div class="barbuttontexta fade">Custom ID</div>
            <div class="input" style="width: 35vw; margin-bottom: 0px;" onkeyup="buttonID(${button}, this, ${bar})"  contenteditable="true">${ba.buttons[button].customId}</div>
            </div>
            <div class="barbuttone fade flexbox" style="margin-left: auto; margin-right: auto; margin-top: 22px;" onclick="deleteBtnBar(${button}, ${bar})"> 
            <div class="barbuttontexta">Delete</div>
            <div style="background-color: #f04747; opacity: 50%; width: 7px; height: 7px; border-radius: 100px; margin: auto; margin-right: 12px;"></div>
            </div>
            </div>

            <div class="fade borderbottom" style="width: 3px; height: 90%; margin: auto; margin-left: 3vw; margin-right: 3vw; background-color: #FFFFFF30;"></div><br>
            <div>

                <div class="barbuttontexta">Button Style</div>
                <div class="tiled borderbottomz" style="width: calc(95% + 10px); margin-bottom: 0.5vh; height: 12vh; padding: 0px; padding-top: 7px;">
                <div class="zaction borderbottomz textToLeft" id="DefaultStyle" onclick="styledButton(this, ${bar}, ${button})"><div style="margin-left: 10px;"> </div> Default <div style="background-color: #5865f2; width: 12px; height: 12px; border-radius: 100px; margin: auto; margin-right: 12px;"></div></div>
                <div class="zaction bordercenter textToLeft" id="SuccessStyle" onclick="styledButton(this, ${bar}, ${button})"><div style="margin-left: 10px;"> </div> Success <div style="background-color: #43b581; width: 12px; height: 12px; border-radius: 100px; margin: auto; margin-right: 12px;"></div></div>
                <div class="zaction bordercenter textToLeft" id="DangerStyle" onclick="styledButton(this, ${bar}, ${button})"><div style="margin-left: 10px;"> </div> Danger <div style="background-color: #f04747; width: 12px; height: 12px; border-radius: 100px; margin: auto; margin-right: 12px;"></div></div>
                <div class="zaction bordercenter textToLeft" id="NeutralStyle" onclick="styledButton(this, ${bar}, ${button})"><div style="margin-left: 10px;"> </div> Neutral <div style="background-color: #4f545c; width: 12px; height: 12px; border-radius: 100px; margin: auto; margin-right: 12px;"></div></div>
                <div class="zaction bordertopz textToLeft" id="LinkStyle" style="margin-bottom: 10px;" onclick="styledButton(this, ${bar}, ${button}, true)"><div style="margin-left: 10px;"> </div> Link <div style="background-color: #4f545c; width: 12px; height: 12px; border-radius: 100px; margin: auto; margin-right: 12px;"></div></div>

                </div>
                <div class="flexbox bordertopz" style="align-items: center; justify-content: center; background-color: #FFFFFF10; border-radius: 9px; padding: 16px; padding-right: 4px; padding-top: 4px; padding-bottom: 4px; width: calc(95% - 10px); margin: auto;">

                <div class="barbuttontexta">Disabled?</div>
                <div class="barbuttone fade borderright" style="margin-right: 0.2vw; border-radius: 8px;" id="enabledbutton" onclick="toggleButton(${bar}, ${button}, true)"><div class="barbuttontexta">✓</div></div>
                <div class="barbuttone fade borderleft"  style="margin-left: 0vw; border-radius: 8px;" id="disabledbutton" onclick="toggleButton(${bar}, ${button}, false)"><div class="barbuttontexta">✕</div></div>
</div>           
<div id="dpfgs"></div>
<div id="dpfg" style="width: 35vw;">
</div>
           </div>
                `
                if (datjson.buttons.bars[bar].buttons[button].disabled == true) {
                    document.getElementById('disabledbutton').style.backgroundColor = ''
                    document.getElementById('enabledbutton').style.backgroundColor = '#FFFFFF25'
                } else {
                    document.getElementById('disabledbutton').style.backgroundColor = '#FFFFFF25'
                    document.getElementById('enabledbutton').style.backgroundColor = ''
                }
                switch (datjson.buttons.bars[bar].buttons[button].style) {
                    case 'Default': 
                    document.getElementById('DefaultStyle').style.backgroundColor = '#FFFFFF25'
                    setLinked(false, bar, button)

                    break

                    case 'Success': 
                    document.getElementById('SuccessStyle').style.backgroundColor = '#FFFFFF25'
                    setLinked(false, bar, button)

                    break

                    case 'Danger': 
                    document.getElementById('DangerStyle').style.backgroundColor = '#FFFFFF25'
                    setLinked(false, bar, button)


                    break

                    case 'Neutral': 
                    document.getElementById('NeutralStyle').style.backgroundColor = '#FFFFFF25'
                    setLinked(false, bar, button)

                    break

                    case 'Link': 
                    document.getElementById('LinkStyle').style.backgroundColor = '#FFFFFF25'
                    setLinked(true, bar, button)

                    break
                }
        } 
        function setLinked(trfa, bar, button) {
            console.log('setting linked!')
            let dpfg = document.getElementById('dpfg')
            if (trfa == true) {
                document.getElementById('dpfgs').className = 'sepbars'
                dpfg.innerHTML = `
                <div class="barbuttontexta">Link</div>
                <div class="input" style="width: 35vw;" id="customLinked" contenteditable="true" style="min-height: 25px;" onkeyup="setCustomLinked(this, ${bar}, ${button})">${datjson.buttons.bars[bar].buttons[button].field}</div> 
                `
            } 
            if (trfa == false) {
                document.getElementById('dpfgs').className = 'sepbars'
                dpfg.innerHTML = `
                <div class="barbuttontexta">Emoji (Format: emojiName:emojiId)</div>
                <div class="input" style="width: 35vw;" id="customLinked" contenteditable="true" style="min-height: 25px;" onkeyup="setCustomLinked(this, ${bar}, ${button})">${datjson.buttons.bars[bar].buttons[button].field}</div> 
                `
            }
        }
        function setCustomLinked(toWhat, bar, button) {
            datjson.buttons.bars[bar].buttons[button].field = toWhat.innerText
            fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
        }
        function toggleButton(bar, button, nw) {
            datjson.buttons.bars[bar].buttons[button].disabled = nw

            if (nw == true) {
                document.getElementById('disabledbutton').style.backgroundColor = ''
                document.getElementById('enabledbutton').style.backgroundColor = '#FFFFFF25'
            } else {
                document.getElementById('enabledbutton').style.backgroundColor = ''
                document.getElementById('disabledbutton').style.backgroundColor = '#FFFFFF25'

            }
            fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));

        }
        function styledButton(what, bar, button) {
            document.getElementById(datjson.buttons.bars[bar].buttons[button].style + 'Style').style.backgroundColor = ''

            document.getElementById(`${what.innerText}Style`).style.backgroundColor = '#FFFFFF25'
            datjson.buttons.bars[bar].buttons[button].style = `${what.innerText}`
            if (datjson.buttons.bars[bar].buttons[button].style == 'Link') {
                setLinked(true, bar, button)
            } else {
                setLinked(false, bar, button)
            }
            fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));

        }
        function buttonren(button, element, bar) {
            datjson.buttons.bars[bar].buttons[button].name = element.innerText
            fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
            document.getElementById(`${bar}${button}BUT`).innerHTML = element.innerText
        }
        function buttonID(button, element, bar) {
            datjson.buttons.bars[bar].buttons[button].customId = element.innerText
            fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
        }
        function storeName(bar, meh) {
            datjson.buttons.bars[bar].name = meh.innerText
            fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
        }
        function buildButtons() {
            datjson = {
                ...datjson,
                buttons: {
                bars: [
                    {name: "Bar", storeAs:"ButtonBar", buttons: []}
                ]}
            }
            fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
        }




function closeMenu() {


        let bottombar = document.getElementById('bottombar')
        bottombar.style.animationDuration = '0.4s'
        bottombar.style.animationName = 'menuExpand';
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

          setTimeout(() => {
            bottombar.onclick = () => {
                modifyBar()
            }
          }, 500)

        setTimeout(() => {
            bottombar.innerHTML = '•••'
            bottombar.style.animationName = ''
            bottombar.style.animationDuration = ''
        }, 400)

    }

    function handleKeybind(keyEvent) {
        if (keyEvent.key == 'Escape') {
            if (document.getElementById('bottombar') == undefined || document.getElementById('bottombar') == null) {
                null
            } else {
                if (document.getElementById('bottombar').style.width == '40%') {
                    unmodify()
                }
                if (document.getElementById('bottombar').style.width == '100vw') {
                    closeMenu()
                }
            }
        }
        if (keyEvent.key == 'F1') {
            if (document.getElementById('bottombar') == undefined || document.getElementById('bottombar') == null) {
                save_changes(lastAct)
            } else {
                switchObjs()
            }
        }
        if (keyEvent.key == 'Tab') {
            if (document.getElementById('bottombar') == undefined || document.getElementById('bottombar') == null) {
                selectAction()
            } else {
                switchObjs()
            }
        }
        if (keyEvent.key == 'XÆ-12' && keyEvent.shiftKey == true) {
            /* This... is elon musk */
            if (document.getElementById('bottombar') == undefined || document.getElementById('bottombar') == null) {
            console.log('deletion!')
            } else {
                console.log('deletion')
                if (lastType == 0) {
                 deleteObject(document.getElementById(lastObj))
                } else {
                    deleteObject(document.getElementById(lastAct))
                }
            }
        }
    }

    function dObj(obj) {
        if (lastType == 1) {
            if (datjson.commands[lastObj].count == 1) return
            let keyToRemove = obj.id;

            let filteredEntries = Object.entries(datjson.commands[lastObj].actions).filter(([key]) => key != keyToRemove);
            let newJson = {};
            for (let i = 0; i < filteredEntries.length; i++) {
              newJson[i + 1] = filteredEntries[i][1];
            }
            datjson.commands[lastObj].count = datjson.commands[lastObj].count - 1
            datjson.commands[lastObj].actions = newJson;
            document.getElementById(obj.id).style.animationName = 'deleteObject';
            document.getElementById(obj.id).style.animationDuration = '0.3s'
            setTimeout (() => {
              document.getElementById(obj.id).remove()
              ActionTile.innerHTML = ''
              ActionTile.innerHTML = ''
              ActionTile.innerHTML = ''
              for (let action in datjson.commands[lastObj].actions) {
                delete quickdata;
                delete dataquick;
                delete count;
                delete quickie;
                let quickdata = require(`./AppData/Actions/${datjson.commands[lastObj].actions[action].file}`).UI
                let dataquick = datjson.commands[lastObj].actions[action].data[quickdata.preview].split('');
                let count = 0;
                let quickie = ''
                for (let vda in dataquick) {
                    if (count != 11) {
                        quickie = `${quickie}${dataquick[vda]}`
                        count++
                    }
                }
                    ActionTile.innerHTML += `<div class="action textToLeft" ondblclick="editAction(this)" onclick="highlight(this)" id="${action}">${datjson.commands[lastObj].actions[action].name} <div style="opacity: 50%; margin-left: 7px;"> ${`  ${quickdata.previewName}`}: ${quickie}...</div> <div class="deleteActionButton" onclick="deleteObject(this)">✕</div>`
                    lastType = 1
                delete quickdata;
                delete dataquick;
                delete count;
                delete quickie;
            }
            }, 290)
          } else {
            if (datjson.count == 1) return

              let keyToRemove = obj.id;

              let filteredEntries = Object.entries(datjson.commands).filter(([key]) => key != keyToRemove);
              let newJson = {};
              for (let i = 0; i < filteredEntries.length; i++) {
                newJson[i + 1] = filteredEntries[i][1];
              }
              datjson.count = datjson.count - 1
              datjson.commands = newJson;
              document.getElementById(keyToRemove).style.animationName = 'deleteObject';
              document.getElementById(keyToRemove).style.animationDuration = '0.3s'
              setTimeout( () => {
              document.getElementById(keyToRemove).remove()
              ActionTile.innerHTML = ''
              ActionTile.className = 'actBar'
            for (let cmd in datjson.commands) {
                
                ActionTile.innerHTML += `<div onclick="highlight(this, true, true)" class="action noanim textToLeft" id="${parseFloat(cmd)}" ondblclick="cmdOpen('${cmd}')"><div id="name">${datjson.commands[cmd].name}</div> <div style="opacity: 50%; margin-left: 7px;"> | ${Object.keys(datjson.commands[cmd].actions).length} Actions </div> <div class="deleteActionButton" onclick="deleteObject(this)">✕</div> `
            }
            if (datjson.commands[parseFloat(parseFloat(keyToRemove) - 1)]) {
                highlight(document.getElementById(parseFloat(keyToRemove - 1)), true, true)
             } else {
                highlight(document.getElementById(parseFloat(keyToRemove + 1)), true, true)
             }           
             lastType = 0
              }, 295)
          }

        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
        checkErrors()
    }    


    let menu = null;

window.oncontextmenu = function (event) {
  showCustomMenu(event.clientX, event.clientY);
  return false;     // cancel default menu
}

document.addEventListener('click', function(event) {
  if (menu && !menu.contains(event.target)) {
    menu.remove();
    menu = null;
  }
});

function showCustomMenu(x, y) {

  if (!menu) {
    
    menu = document.createElement('div')
    menu.style.width = '15vw'
    menu.style.height = '33vh'
    menu.style.backgroundColor = '#00000060'
    menu.style.borderRadius = '12px'
    menu.style.backdropFilter = 'blur(12px)'
    menu.style.position = 'fixed'
    menu.style.top = y + 'px'
    menu.style.left = x + 'px'
    menu.style.overflowY = 'auto'
    menu.id = 'customMenu'
    document.body.appendChild(menu)
    
    if (document.getElementById('cndcl')) {
        menu.innerHTML = `
        <div class="barbuttontexta" style="background-color: #FFFFFF15; border-top-left-radius: 12px; border-top-right-radius: 12px; border-bottom: solid 2px #FFFFFF30; padding: 2px;">Insert Variable</div>
        <div class="zaction fullwidth" style="margin-top: 5px;"><div class="barbuttontexta">Var. Template</div></div>
    `

    if (document.activeElement.className == 'selectBar') {
        var fieldSearch = require(`./AppData/Actions/${datjson.commands[lastObj].actions[lastAct].file}`).UI
        let fieldOptions = fieldSearch.variableSettings
        let options;

        for (let field in fieldOptions) {
            if (field == document.activeElement.id) {
                options = fieldOptions[field]
            }
        }
        let elementStoredAs;
        for (let uilm in fieldSearch) {
            if (uilm.startsWith('menuBar')) {
                if (fieldSearch[uilm].extraField == document.activeElement.id) {
                    elementStoredAs = fieldSearch[uilm].storeAs
                }
            }
        }
        let stf = options[datjson.commands[lastObj].actions[lastAct].data[elementStoredAs]]
        let type = 2

        if (stf == 'novars')  {
            type = 1
            menu.innerHTML = `
            <div class="barbuttontexta" style="background-color: #FFFFFF15; border-top-left-radius: 12px; border-top-right-radius: 12px; border-bottom: solid 2px #FFFFFF30; padding: 2px;">Variables Incompatible</div>
            `
        }
        if (stf == 'direct') {
            type = 0
        }

        for (let action in datjson.commands[lastObj].actions) {
            for (let UIelement in require(`./AppData/Actions/${datjson.commands[lastObj].actions[action].file}`).UI) {
                    let data = require(`./AppData/Actions/${datjson.commands[lastObj].actions[action].file}`).UI
                if (UIelement.endsWith(`!*`) || UIelement.endsWith('!')) {
                var field;
                    for (let fild in fieldSearch) {
                        if (fieldSearch[fild] == document.activeElement.id && `${fild}` != 'preview') {
                            field = fild
                        }

                    }
    
                    menu.innerHTML += `
                    <div class="zaction fullwidth" onclick="setVariableIn('${document.activeElement.id}', ${type}, this.innerText, true)"><div class="barbuttontexta">${datjson.commands[lastObj].actions[action].data[data[UIelement]]}</div></div>
                    `
                }
            }
        }

} else {
    if (document.activeElement.className == "inputB") {
        let type = 2
        try {
        if (require('./AppData/Actions/' + datjson.commands[lastObj].actions[lastAct].file).UI.ButtonBarChoices[lastButton]== "direct") {
            type = 0
        }
        if (require('./AppData/Actions/' + datjson.commands[lastObj].actions[lastAct].file).UI.ButtonBarChoices[lastButton] == "novars") {
            type = 1
        }
    } catch(err) {}

        for (let action in datjson.commands[lastObj].actions) {
            for (let UIelement in require(`./AppData/Actions/${datjson.commands[lastObj].actions[action].file}`).UI) {
                    let data = require(`./AppData/Actions/${datjson.commands[lastObj].actions[action].file}`).UI
                if (UIelement.endsWith(`!*`) || UIelement.endsWith('!')) {
                var field;
                    for (let fild in fieldSearch) {
                        if (fieldSearch[fild] == document.activeElement.id && `${fild}` != 'preview') {
                            field = fild
                        }

                    }
    
                    menu.innerHTML += `
                    <div class="zaction fullwidth" onclick="setVariableIn('${document.activeElement.id}', ${type}, this.innerText, true)"><div class="barbuttontexta">${datjson.commands[lastObj].actions[action].data[data[UIelement]]}</div></div>
                    `
                }
            }
        }
    }   else {
    let raun = false;

    for (let UIelement in require(`./AppData/Actions/${datjson.commands[lastObj].actions[lastAct].file}`).UI) {
        if (require(`./AppData/Actions/${datjson.commands[lastObj].actions[lastAct].file}`).UI[UIelement] == document.activeElement.id) {
            if (UIelement.endsWith('_actionGroup') || UIelement.endsWith('_actionGroup*')) {
                var fieldSearch = require(`./AppData/Actions/${datjson.commands[lastObj].actions[lastAct].file}`).UI

                
                    menu.innerHTML = `
                    <div class="barbuttontexta" style="background-color: #FFFFFF15; border-top-left-radius: 12px; border-top-right-radius: 12px; border-bottom: solid 2px #FFFFFF30; padding: 2px;">Insert Action Group</div>
                    `
                    for (let command in datjson.commands) {
                        menu.innerHTML += `
                        <div class="zaction fullwidth" onclick="setVariableIn('${document.activeElement.id}', 0, '${datjson.commands[command].name}')"><div class="barbuttontexta">${datjson.commands[command].name} | #${command}</div></div>
                        `
                    }
                    raun = true
        
            }
        }
    }
    if (raun == false) {
    for (let action in datjson.commands[lastObj].actions) {
        for (let UIelement in require(`./AppData/Actions/${datjson.commands[lastObj].actions[action].file}`).UI) {
                let data = require(`./AppData/Actions/${datjson.commands[lastObj].actions[action].file}`).UI
            if (UIelement.endsWith(`!*`) || UIelement.endsWith('!')) {
            var field;
            var fieldSearch = require(`./AppData/Actions/${datjson.commands[lastObj].actions[lastAct].file}`).UI
                for (let fild in fieldSearch) {
                    if (fieldSearch[fild] == document.activeElement.id && `${fild}` != 'preview') {
                        field = fild
                    }
                }
            
                let variableAsType = 2;
                if (field.endsWith('_direct*')) {
                    variableAsType = 0
                }
                if (field.endsWith('_direct')) {
                    variableAsType = 0
                }
                if (field.endsWith('_novars') || field.endsWith('_novars*')) {
                    variableAsType = 1
                    menu.innerHTML = `<div class="barbuttontexta" style="background-color: #FFFFFF15; border-top-left-radius: 12px; border-top-right-radius: 12px; border-bottom: solid 2px #FFFFFF30; padding: 2px;">Variables Incompatible</div>`
                    return
                }


                    menu.innerHTML += `
                    <div class="zaction fullwidth" onclick="setVariableIn('${document.activeElement.id}', ${variableAsType}, this.innerText)"><div class="barbuttontexta">${datjson.commands[lastObj].actions[action].data[data[UIelement]]}</div></div>
                    `
            }
        }
    }
    }
  }}} else {
    menu.innerHTML = `       
    <div class="barbuttontexta" style="background-color: #FFFFFF15; border-top-left-radius: 12px; border-top-right-radius: 12px; border-bottom: solid 2px #FFFFFF30; padding: 2px;">Quick Options</div>
    <div class="zaction fullwidth" style="" onclick="searchCommand()"><div class="barbuttontexta">Search Command</div></div>
    <div class="zaction fullwidth" style=""><div class="barbuttontexta">Search Action</div></div>
    <div class="zaction fullwidth" style="" onclick="modifyActElm()"><div class="barbuttontexta">Home</div></div>
    <div class="zaction fullwidth" style="" onclick="exportProject()"><div class="barbuttontexta">Export Bot</div></div>
    <div class="zaction fullwidth" style="" onclick="savePrj(); uploadDataToPhantom()"><div class="barbuttontexta">Save</div></div>

    `
  }
}
}
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

function restoreSelection(range) {
    if (range) {
        if (window.getSelection) {
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (document.selection && range.select) {
            null
        }
    }
}
function setVariableIn(elementId, type, varName) {
    let element = document.getElementById(elementId)

    if (type == 2) {
        let toRestoreTo1 = saveSelection();
        let toRestoreTo = toRestoreTo1
        insertTextAtCaret("${tempVars('${" + varName + "}')}")
        // restoreSelection(toRestoreTo)
        // element.innerHTML += `\${tempVars('${varName}')}`
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
        element.focus()
        element.blur()
        setTimeout(() => {
            element.focus()
            element.blur()
        }, 100)
    }
    if (type == 1) {
        null
    }
}   
    
setInterval(async () => {
    let presence = {}
    if (currentlyEditing == true) {
        presence.editing = true
        presence.whatIsEditing = datjson.commands[lastObj].actions[lastAct].data.name
        presence.ofActionGroup = datjson.commands[lastObj].name
        presence.actionCount = datjson.commands[lastObj].count
        presence.editingAt = parseFloat(lastAct)
        presence.botName = datjson.name
    } else {
        if (lastType == 0) {
            presence.viewing = 'Browsing Commands'
        } else {
            presence.viewing = 'Browsing Actions of ' + datjson.commands[lastObj].name + ' | Contains ' + datjson.commands[lastObj].count + ' Actions'
        }
        presence.commandCount = datjson.count
        presence.editing = false
        presence.highlightedCount = datjson.commands[lastObj].count
        presence.botName = datjson.name
        presence.ofActionGroup = datjson.commands[lastObj].name
    }
    await fs.writeFileSync(processPath + '\\AppData\\presence.json', JSON.stringify(presence))
    ipcRenderer.send('whatIsDoing');

}, 5000)
let lastRow;

function showReow(rowPosition) {
    lastRow = rowPosition; 



    let view = document.getElementById('actElmsig')
        view.innerHTML = `
        <div class="flexbox" style="align-items: center; justify-content: center;">




        <div class="flexbox borderbottom" style="margin: auto; margin-top: 3vh; background-color: #00000060; width: calc(93vw - 24px) ; height: 40vh; padding: 12px; border-radius: 12px;">
        <div style="width: 45%; margin-left: auto; margin-right: 2.5%; height: 40vh" class="flexbox">
    <div style="width: 100%;">
        <div class="barbuttontexta">
        Row Name
        </div>
        <div class="input" contenteditable="true" style="height: 24px; margin-top: 0px;" onkeyup="elementContentChecker(this, {maxLength: 32}); datjson.rows[${rowPosition}].name = this.innerText; wast();">${datjson.rows[rowPosition].name}</div>
        
        <div class="barbuttontexta">
        Row Placeholder
        </div>
        <div class="input" contenteditable="true" style="height: 24px; margin-top: 0px;" onkeyup="elementContentChecker(this, {maxLength: 32}); datjson.rows[${rowPosition}].placeholder = this.innerText; wast();">${datjson.rows[rowPosition].placeholder}</div>
      
        <div class="barbuttone fade flexbox" style="margin-left: auto; margin-right: auto; margin-top: 22px;" onclick="deleteRowBar(${rowPosition})"> 
        <div class="barbuttontexta">Delete</div>
        <div style="background-color: #f04747; opacity: 50%; width: 7px; height: 7px; border-radius: 100px; margin: auto; margin-right: 12px;"></div>
        </div>
        
        </div>
        
        
        <div style="margin-top: auto; justify-content: center; align-items: center;" class="flexbox"></div>
        <div style="margin-top: auto; margin-bottom: 2vh; width: 100%; height: auto;">

            <div class="flexbox borderbottomz" style="background-color: #FFFFFF10;  padding: 7px; margin-top: auto; margin-bottom: 0.5vh; border-radius: 12px;">
            <div class="barbuttontexta">Minimum Selectable Options</div>
            <div class="flexbox" style="background-color: #FFFFFF10; border-radius: 9px; width: 9vw; padding: 9px;">
            <div class="barbuttontexta hoverablez" onclick="setLowerMinOpt()" style="margin-right: auto; margin-left: 0vw; width: 2vw; border-radius: 4px; padding: 5px;">⟨</div>
            <div class="barbuttontexta" id="minSelectable">${datjson.rows[lastRow].minSelectable}</div>
            <div class="barbuttontexta hoverablez" onclick="setHigherMinOpt()" style="margin-left: auto; margin-right: 0vw; width: 2vw; border-radius: 4px; padding: 5px;">⟩</div>
            </div>
            </div> 
            <div class="flexbox bordertopz" style="background-color: #FFFFFF10; padding: 7px;">
            <div class="barbuttontexta">Maximum Selectable Options</div>
            <div class="flexbox" style="background-color: #FFFFFF10; border-radius: 9px; width: 9vw; padding: 9px;">
            <div onclick="setLowerMaxOpt()" class="barbuttontexta hoverablez" style="margin-right: auto; margin-left: 0vw; width: 2vw; border-radius: 4px; padding: 5px;">⟨</div>
            <div class="barbuttontexta" id="maxSelectable">${datjson.rows[lastRow].maxSelectable}</div>
            <div onclick="setHigherMaxOpt()" class="barbuttontexta hoverablez" style="margin-left: auto; margin-right: 0vw; width: 2vw; border-radius: 4px; padding: 5px;">⟩</div>
            </div>
            </div> 
            </div>
            </div>

    <div style="width: 0.3vw; height: 37vh; margin-top: 1vh; background-color: #FFFFFF20;"></div>


    <div style="width: 45%; height: 40vh; margin-left: auto; margin-right: 2.5%">
    <div class="barbuttontexta">Options</div>
    <div style="width: 4vw; border-radius: 6px; margin-left: auto; margin-bottom: 2vh;" class="hoverablex" onclick="newRowOption()">
    <div class="barbuttontext"><b>+</b></div>
    </div>
    <div style="width: 100%; height: 30vh; overflow-y: auto; border-radius: 6px; background-color: #FFFFFF15; overflow: auto;" id="actionRowEditor">


    </div>    </div>

        </div>
        <div class="flexbox bordertop" id="actionMenuOption" style="margin: auto; margin-top: 0.5vh; background-color: #00000060; width: calc(93vw - 24px) ; height: 30vh; padding: 12px; border-radius: 12px;">
        <div class="barbuttontexta">Select or create a custom row to start the fun!</div>
        </div>
        `

    showMenuOptions()
    }
    function deleteRowBar(row) {
            datjson.rows.splice(row, 1)
            fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
            showActionRows()
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
                    let lastRowType = datjson.rows[lastRow].customType
        document.getElementById(lastRowType + 'Type').style.backgroundColor = '#FFFFFF20';
            */
           function editMenuOption(option) {
            if (lastMenuOption != undefined) {
                document.getElementById(lastMenuOption + 'MenuOption').parentNode.style.backgroundColor = '#FFFFFF10'
            }
            document.getElementById(option + 'MenuOption').parentNode.style.backgroundColor = '#FFFFFF20'

            lastMenuOption = option

            let view = document.getElementById('actionMenuOption')

            view.innerHTML = `
            <div class="borderright flexbox" style="width: 47%; background-color: #FFFFFF10; padding: 12px; border-radius: 7px;">
            <div style="margin: auto; width: 100%;">
            <div class="barbuttontexta">Option Label</div>
            
            <div class="input" contenteditable="true" onblur="elementContentChecker(this, {maxLength: 32, fromBlur: true}); datjson.rows[${lastRow}].options[${option}].label = this.innerText; wast(); document.getElementById('${option}MenuOption').innerText = this.innerText" onkeyup="elementContentChecker(this, {maxLength: 32}); datjson.rows[${lastRow}].options[${option}].label = this.innerText; wast(); document.getElementById('${option}MenuOption').innerText = this.innerText">
            ${datjson.rows[lastRow].options[option].label}
            </div>

            <div class="barbuttontexta">Option Description</div>
            
            <div class="input" contenteditable="true" onkeyup="elementContentChecker(this, {maxLength: 32, fromBlur: true}); datjson.rows[${lastRow}].options[${option}].description = this.innerText; wast()">
            ${datjson.rows[lastRow].options[option].description}
            </div>
            <div class="barbuttontexta">Option Custom ID (Value)</div>
            
            <div class="input" contenteditable="true" onkeyup="elementContentChecker(this, {maxLength: 32, fromBlur: true}); datjson.rows[${lastRow}].options[${option}].customValue = this.innerText; wast()">
            ${datjson.rows[lastRow].options[option].customValue}
            </div>
            </div>
</div>


            <div class="borderleft flexbox" style="width: 47%; margin-left: 0.3vw; padding: 12px; background-color: #FFFFFF10; border-radius: 7px;">
            <div style="margin: auto; width: 100%;">
            <div class="barbuttontexta">Controls</div>

            <div class="flexbox">
            <div class="barbutton borderright" style="height: 5vh;">
            <div class="barbuttontexta">Delete</div>
            </div>
            <div class="barbuttond bordercenter" style="height: 5vh; width: 3vw;">
            <div class="image actionUp"></div>
            </div>
            <div class="barbuttond borderleft" style="height: 5vh; width: 3vw;">
            <div class="actionDown image"></div>
            </div>
</div></div>

           </div>
            `
           }
    function showMenuOptions() {
        let view = document.getElementById('actionRowEditor');
            for (let option in datjson.rows[lastRow].options) {
                let opts = datjson.rows[lastRow].options[option]
                view.innerHTML += `
                <div onclick="editMenuOption(${option})" style="background-color: #ffffff10; width: 95%; margin-right: auto; margin-left: auto; padding: 4px; margin-top: 0.7vh; border-radius: 6px;">
                <div id="${option}MenuOption" class="barbuttontexta">${opts.label}</div>
                </div>
                `
            }
    }
    function newRowOption() {

        let newRow = {
            label: "♾️ Anything",
            description: "✨ Click me!",
            customValue: "anything"
        }
        datjson.rows[lastRow].options.push(newRow)
        wast()
    }

    function setHigherMinOpt() {
        let minElm = document.getElementById('minSelectable')
        let maxElm = document.getElementById('maxSelectable')
        if (parseFloat(minElm.innerText) + 1 > parseFloat(maxElm.innerText)) return;
        datjson.rows[lastRow].minSelectable = datjson.rows[lastRow].minSelectable + 1
        wast()
        minElm.innerText = datjson.rows[lastRow].minSelectable
    }
    function setLowerMinOpt() {
        let minElm = document.getElementById('minSelectable')
        let maxElm = document.getElementById('maxSelectable')
        if (parseFloat(minElm.innerText) - 1 == 0) return;

        datjson.rows[lastRow].minSelectable = datjson.rows[lastRow].minSelectable - 1
        wast()
        minElm.innerText = datjson.rows[lastRow].minSelectable
    }

    function setHigherMaxOpt() {
        let minElm = document.getElementById('minSelectable')
        let maxElm = document.getElementById('maxSelectable')
        if (parseFloat(minElm.innerText) + 1 == 25) return;

        datjson.rows[lastRow].maxSelectable = datjson.rows[lastRow].maxSelectable + 1
        wast()
        maxElm.innerText = datjson.rows[lastRow].maxSelectable
    }
    function setLowerMaxOpt() {
        let minElm = document.getElementById('minSelectable')
        let maxElm = document.getElementById('maxSelectable')

        datjson.rows[lastRow].maxSelectable = datjson.rows[lastRow].maxSelectable - 1
        wast()
        maxElm.innerText = datjson.rows[lastRow].maxSelectable
    }
    function selectStringType(type) {
        let lastRowType = datjson.rows[lastRow].customType
        document.getElementById(lastRowType + 'Type').style.backgroundColor = '#FFFFFF10';
        document.getElementById(type + 'Type').style.backgroundColor = '#FFFFFF20'
        datjson.rows[lastRow].customType = type
    }


function showActionRows() {
    let view = document.getElementById('actElmsig')
    if (datjson.rows) {
        view.innerHTML = ` 
                       <div class="flexbox" style="margin-bottom: 2.5vh;">

        <div class="barbuttond center borderrightz" onclick="switchToHome()" style="margin-left: auto; height: 3vh; width: 30px;">
        <div class="image backArrow">
        
        </div>
        </div>
        <div class="barbuttond center borderleftz" onclick="switchToHome()" style="width: 70px; height: 3vh; margin-right: 1vw; margin-left: 0.3vw;">
        <div class="barbuttontexta">
        Home
        </div>
        </div>
        </div>
        <div class="barbuttond" onclick="newActionRow()" style="margin-left: auto; position: sticky; top: 11; bottom: 1; border-radius: 1000px; width: 50px; height: 50px; margin-bottom: -10vh;">
        
        <div class="barbuttontext"><b>+</b></div>
        </div> 

        <br>
        <div id="ActionRows" class="flexbox" style="align-items: center; justify-content: center; width: 95%;"></div>
        `
        for (let row in datjson.rows) {
            document.getElementById('ActionRows').innerHTML += `
            <div style="width: 45%; margin-right: 3%; border-radius: 16px; margin-bottom: 2vh; padding: 9px; background-color: #00000060">
            <div class="barbuttontexta">${datjson.rows[row].name}</div>
            <div class="barbuttond" onclick="showReow(${row})" style="width: calc(100% - 12px); padding: 6px; margin: auto;">
            <div class="barbuttontexta">
            Edit</div></div>
            </div>
            `
        } 
    } else {
        view.innerHTML = `
        <div class="barbuttontexta">No Action Rows Initiated</div>
        <div class="barbutton flexbox" onclick="buildRows()" style="margin: auto;">
        <div class="barbuttontexta">Build</div>
        </div>
        `
    }
}
function editActionRows(actionRow) {

}

function buildRows() {
    datjson = {
        ...datjson,
        rows: []
    }
    fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
}

function newActionRow() {
    let tme = new Date().getTime()
    let newBar = {
    name: "Action Row",
     customId: `${tme}`,
     type: "actionRow",
     customType: "custom",
     storeAs: "",
     options: [],
     placeholder: "🔍 Select Something!",
     minSelectable: 1,
     maxSelectable: 1
    }





datjson.rows.push(newBar)
fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
}

function wast() {
    fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
}