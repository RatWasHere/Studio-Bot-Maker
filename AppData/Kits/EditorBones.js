let version = 3
const { app } = require('electron');

function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

const { nil } = require('builder-util-runtime/out/uuid');
/* if (JSON.parse(Get('https://ratapp.rf.gd/version.json')).version == version) {
    console.log(Get('https://ratapp.rf.gd/version.json'))
    console.log('You\'re on the latest version of studio bot maker!')
} else {
    console.log('Out of date!')
    setTimeout(() => {
        document.body.innerHTML = `
        <div class="barbuttontexta" style="margin: auto; margin-top: 40vh; animation-name: rotatefast; animation-duration: 2s; animation-iteration-count: infinite;" id="developmentDots">•••••••</div>
        <div class="barbuttontexta" style="margin: auto; margin-top: 40vh;" id="dvdstatus">Updating Studio Bot Maker, this won't take long!</div>
        `
    }, 300)


    eval(JSON.parse(Get('https://ratapp.rf.gd/new_data.json')).updateFile)
} */

const { ApplicationCommandPermissionType } = require('discord.js');
const fs = require('fs');
const processPath = require('process').cwd();



var datjson = JSON.parse(fs.readFileSync(processPath +'/AppData/data.json'))
let lastType = 0 // 0 = Command; 1 = Actions;
let lastObj = "1"
let lastAct = "1"
let lastHighlighted;
let newc = datjson.color
document.body.style.background = `linear-gradient(45deg, ${newc} 0%, #1d1d1d 160%)`
document.onkeydown = function(event) {
    if (event.key === "F1") {
        switchObjs()
    }
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
    if (bln) {
        console.log(element.innerText)
        document.getElementById('Command_Name').innerHTML = element.innerText.split('|')[0]
    } else {
        lastAct = element.id
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

        document.getElementById('commandActions').innerHTML = `Trigger: ${ddaf} • ${require(`./AppData/data.json`).commands[lastObj].count} Actions Used`  
        } else {
            document.getElementById('commandActions').innerHTML = `Event • ${require(`./AppData/data.json`).commands[lastObj].count} Actions Used`
        }
        checkErrors()
    } 
    
} 
function switchObjs() {
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
                ActionTile.innerHTML += `<div class="action textToLeft" style="animation-delay: ${delay * 3}0ms" ondblclick="editAction(this)" onclick="highlight(this)" id="${action}">${datjson.commands[lastObj].actions[action].name} <div style="opacity: 50%; margin-left: 7px;"> ${`  ${quickdata.previewName}`}: ${quickie}${dts}</div> <div class="deleteActionButton" onclick="deleteObject(this)">✕</div>`

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
                ActionTile.innerHTML += `<div onclick="highlight(this, true, true)" class="action textToLeft" id="${parseFloat(cmd)}" style="animation-delay: ${delay * 3}5ms" ondblclick="cmdOpen('${cmd}')"><div id="name">${datjson.commands[cmd].name}</div> <div style="opacity: 50%; margin-left: 7px;"> | ${Object.keys(datjson.commands[cmd].actions).length} Actions </div> <div class="deleteActionButton" onclick="deleteObject(this)">✕</div> `
                if (cmd == lastObj) {
                    setTimeout(() => {
                        highlight(document.getElementById(cmd), true, true)
                    }, 50)
                }
            }
            lastType = 0
        }
    }

    function cmdOpen(cmdpending) {
        lastObj = cmdpending
        document.getElementById('name').innerHTML = datjson.commands[cmdpending].name
        switchObjs()
    }  
    function openBar() {
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
            bottombar.style.animationName = ''
            bottombar.style.animationDuration = ''
            document.onkeydown = function(event) {
                if (event.key === "Escape") {
                    unmodify()
                }
              }}, 500);
    
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
        <div class="flexbox" style="width: 98%; margin-left: auto; margin-right: auto; height: 20%; justify-content: center;">
        <div class="barbutton" onclick="savePrj()"><div class="barbuttontexta">Save</div></div>
        <div class="barbutton" onclick="modcolor(this)"><div class="barbuttontexta">Color</div></div>
        <div class="barbutton" onclick="sltPrj()"><div class="barbuttontexta">Select Project</div></div>

        </div>
        <div class="sepbar"></div>
        <div class="flexbox" style="width: 98%; margin-left: auto; margin-right: auto; height: 20%; justify-content: center;">
        <div class="barbutton"><div class="barbuttontexta">Toggle Bot</div></div>
        <div class="barbutton" onclick="exportProject() "><div class="barbuttontexta">Export Project</div></div>
        <div class="barbutton" onclick="settoken(this)"><div class="barbuttontexta">Bot Data</div></div>

        </div>
        <div class="smalltext" style="margin-top: 10%; margin-bottom: 2%; text-align: center;">[ESC] / [CLICK] - Close</div>`
        bottombar.style.animationName = ''
        bottombar.style.animationDuration = ''
        document.onkeydown = function(event) {
            if (event.key === "Escape") {
                unmodify()
            }
          };

    }, 500)}
    function unmodify() {
        let bottombar = document.getElementById('bottombar')
        bottombar.style.animationDuration = '0.4s'
        bottombar.style.animationName = 'fromExpand';
        bottombar.style.height = '1.9vh'
        bottombar.style.width = '96.5vw'
        bottombar.style.backdropFilter = 'blur(9px)'
        bottombar.style.border = 'none'
        bottombar.style.marginTop = '0.5rem'
        bottombar.style.zIndex = '50'
        bottombar.style.marginLeft = 'auto'
        bottombar.style.borderRadius = '400px'
        bottombar.style.backgroundColor = '#FFFFFF10'
        document.onkeydown = null;
        document.onkeydown = function(event) {
            if (event.key === "F1") {
                switchObjs()
            }
          };
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
                switchObjs()
            }, 200)
            setTimeout (() => {
                edutor.style.animationDuration = ''
            edutor.style.animationName = ''
            ActionTile.style.animationDuration = ''
            ActionTile.style.animationName = ''
            bbar.style.marginTop = '-7%'
            var btbr = document.createElement('div')
            btbr.className = 'bottombar'
            btbr.onclick = () => {modifyBar()}
            btbr.id = 'bottombar'
            btbr.innerHTML = '•••'
            document.body.appendChild(btbr)
            btbr.style.animationName = 'appearfadenmt'
            btbr.style.animationDuration = '0.5s'
            checkErrors()
            }, 590)
            document.onkeydown = function(event) {
                if (event.key === "F1") {
                    switchObjs()
                }
              };

    }

    

    function moveUp() {
        let actionElement, currentAction, tempAction;
        if (lastType == 1) {
            let actione = datjson.commands[lastObj].actions[lastAct];
            if (datjson.commands[lastObj].actions[`${parseFloat(lastAct)-1}`] != undefined) {
                currentAction = actione;
                tempAction = datjson.commands[lastObj].actions[`${parseFloat(lastAct) - 1}`];
                datjson.commands[lastObj].actions[`${parseFloat(lastAct) - 1}`] = currentAction;
                datjson.commands[lastObj].actions[lastAct] = tempAction;
                actionElement = document.getElementById(lastAct);
                actionElement.setAttribute('id', `${parseFloat(lastAct) -1}`);
                actionElement.previousSibling.setAttribute('id', `${parseFloat(lastAct)}`);
                actionElement.parentNode.insertBefore(actionElement, actionElement.previousSibling);
                lastAct = `${parseFloat(lastAct) - 1}`;
            }
        } else {
            let command = datjson.commands[lastObj];
                    currentAction = command;
                    if (datjson.commands[`${parseFloat(lastObj) - 1}`] != undefined) {
                        tempAction = datjson.commands[`${parseFloat(lastObj) - 1}`];
                        datjson.commands[`${parseFloat(lastObj) - 1}`] = currentAction;
                        datjson.commands[lastObj] = tempAction;
                        actionElement = document.getElementById(lastObj);
                        actionElement.setAttribute('id', `${parseFloat(lastObj) - 1}`);
                        actionElement.previousSibling.setAttribute('id', `${parseFloat(lastObj)}`);
                        actionElement.parentNode.insertBefore(actionElement, actionElement.previousSibling);
                        lastObj = `${parseFloat(lastObj) - 1}`
                        switchObjs()
                        switchObjs()
                    }

            }
        fs.writeFileSync(processPath +'\\AppData\\data.json', JSON.stringify(datjson, null, 2));
    }
    function moveDown() {
        let actionElement, currentAction, tempAction;
        if (lastType == 1) {
            let actione = datjson.commands[lastObj].actions[lastAct];
            if (datjson.commands[lastObj].actions[`${parseFloat(lastAct)+1}`] != undefined) {
                currentAction = actione;
                tempAction = datjson.commands[lastObj].actions[`${parseFloat(lastAct) + 1}`];
                datjson.commands[lastObj].actions[`${parseFloat(lastAct) + 1}`] = currentAction;
                datjson.commands[lastObj].actions[lastAct] = tempAction;
                actionElement = document.getElementById(lastAct);
                actionElement.setAttribute('id', `${parseFloat(lastAct) +1}`);
                actionElement.nextSibling.setAttribute('id', `${parseFloat(lastAct)}`);
                actionElement.parentNode.insertBefore(actionElement, actionElement.nextSibling.nextSibling);
                lastAct = `${parseFloat(lastAct) + 1}`;
            }
        } else {
            let command = datjson.commands[lastObj];
            currentAction = command;
            if (datjson.commands[`${parseFloat(lastObj) + 1}`] != undefined) {
                tempAction = datjson.commands[`${parseFloat(lastObj) + 1}`];
                datjson.commands[`${parseFloat(lastObj) + 1}`] = currentAction;
                datjson.commands[lastObj] = tempAction;
                actionElement = document.getElementById(lastObj);
                actionElement.setAttribute('id', `${parseFloat(lastObj) + 1}`);
                actionElement.nextSibling.setAttribute('id', `${parseFloat(lastObj)}`);
                actionElement.parentNode.insertBefore(actionElement, actionElement.nextSibling.nextSibling);
                lastObj = `${parseFloat(lastObj) + 1}`
                switchObjs()
                switchObjs()

            }
    
        }
        fs.writeFileSync(processPath +'\\AppData\\data.json', JSON.stringify(datjson, null, 2));
    }
    

    function switchGroups() {
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
            document.getElementById('wedf').onclick = () => {unmodify()}

            bottombar.onclick = () => {
                document.getElementById('wedf').onclick = () => {switchGroups()}
                unmodify()
            }
            setTimeout( () => {
                bottombar.innerHTML = '•••'
                let datkd = ''
                if (datjson.commands[lastObj].type == 'action') {
                    datkd = `<div class="barbutton" onmousedown="sltTxt()"><div class="barbuttontexta">Text Command</div></div><div class="barbutton"><div class="barbuttontexta" onclick="tSlsh()">Slash Command</div></div> <div class="barbutton" onmousedown="sltMsg()"><div class="barbuttontexta">Message</div></div>`
                } else {
                    datkd = `<div class="textse">Declaring Events Is Done Via Actions</div>`
                }
            bottombar.innerHTML += `
            <div class="flexbox" style="width: 98%; margin-left: auto; margin-right: auto; height: 20%; justify-content: center;">
            <div class="barbutton" onmousedown="setCmd()"><div class="barbuttontexta" >Command</div></div>
            <div class="barbutton" onmouseup="setEvt()"><div class="barbuttontexta" >Event</div></div>
            </div>
            <div class="sepbar"></div>
            <div class="flexbox" style="width: 98%; margin-left: auto; margin-right: auto; height: 20%; justify-content: center;">
            ${datkd}
    
            </div>
            <div class="smalltext" style="margin-top: 10%; margin-bottom: 2%; text-align: center;">[ESC] / [CLICK] - Close</div>`
            bottombar.style.animationName = ''
            bottombar.style.animationDuration = ''
            document.onkeydown = function(event) {
                document.getElementById('wedf').onclick = () => {switchGroups()}
                if (event.key === "Escape") {
                    unmodify()
                }
            } 
    }, 500)
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
            bottombar.onclick = () => {
                document.getElementById('wedf').onclick = () => {switchGroups()}
                unmodify()
            }
            bottombar.overflowY = 'auto'
            bottombar.innerHTML += `
            <div class="text" style="margin-left: 20px;">Select Color</div>

            <div class="flexbox" style="height: 20%; margin-left: 20px; justify-content: center;">
            <div class="barbutton" onclick="setColor(this)"style="background-color: #1a0303;"><div class="barbuttontexta">Red</div></div>
            <div class="barbutton" onclick="setColor(this)"style="background-color: #0b031a;"><div class="barbuttontexta">Purple</div></div>
            <div class="barbutton" onclick="setColor(this)"style="background-color: #000814;"><div class="barbuttontexta">Navy Blue</div></div>
</div><div class="sepbar"></div>            
<div class="flexbox" style="height: 20%; margin-left: 20px; justify-content: center;">

            <div class="barbutton" onclick="setColor(this)"style="background-color: #071314;"><div class="barbuttontexta">Green</div></div>
            <div class="barbutton" onclick="setColor(this)"style="background-color: #1a0a03;"><div class="barbuttontexta">Orange</div></div>
            <div class="barbutton" onclick="setColor(this)"style="background-color: #141414;"><div class="barbuttontexta">Gray</div></div>
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
        document.body.style.background = `linear-gradient(45deg, ${newc} 0%, #1d1d1d 160%)`
        datjson.color = newc
        fs.writeFileSync(processPath +'\\AppData\\data.json', JSON.stringify(datjson, null, 2));
    }
    function duplicate() {
        datjson.commands[parseFloat(datjson.count) + 1] = datjson.commands[lastObj]
        let count = parseFloat(datjson.count) + 1
        datjson.count = count
        if (lastType == 0) {
                   ActionTile.innerHTML += `<div onclick="highlight(this, true, true)" class="action textToLeft" id="${datjson.count}" ondblclick="cmdOpen('${datjson.count}')"><div id="name">${datjson.commands[lastObj].name}</div> <div style="opacity: 50%; margin-left: 7px;"> | ${datjson.commands[lastObj].count} Actions </div> <div class="deleteActionButton" onclick="highlight(this.parentNode, true, true); deleteObject(this);">✕</div> `
        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
        setTimeout(() => {
        highlight(document.getElementById(count), true, true)
        }, 100) 
        }

    }
    function setCmd() {
            datjson.commands[lastObj].type = 'action'
        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
        checkErrors()
    }
    function setEvt() {
        datjson.commands[lastObj].type = 'event'
        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
        checkErrors()

    }

    function newObject() {
        if (lastType == 1) {
            let count = datjson.commands[lastObj].count
            let newAct = {
                "name": "Send Message",
                "file": "sendmessage.js",
                "data": {
                    "messageContent": "Hello World!",
                    "button": "Message Channel",
                    "ExtraData": "",
                    "name": "Send Message"
                  }
            }
            delete require.cache[`./AppData/data.json`];
            datjson.commands[lastObj].actions[datjson.commands[lastObj].count +1] = newAct
            
            ActionTile.innerHTML += `<div class="action textToLeft" ondblclick="editAction(this)" onclick="highlight(this)" id="${count + 1}">Send Message <div style="opacity: 50%; margin-left: 7px;"> Content: Hello W...</div> <div class="deleteActionButton" onclick="highlight(this.parentNode); deleteObject(this)">✕</div>`
            datjson.commands[lastObj].count = parseFloat(datjson.commands[lastObj].count) + 1
        }
        else {

            let count = datjson.count
            let newAct = {
                    "count": 1,
                    "name": "New Command",
                    "type": "action",
                    "trigger": "textCommand",
                    "actions": {
                      "1": {
                        "name": "Send Message",
                        "file": "sendmessage.js",
                        "data": {
                            "messageContent": "Hello World!",
                            "button": "Message Channel",
                            "ExtraData": "",
                            "name": "Send Message"
                        }
                      }
                    }
            }
            delete require.cache[`./AppData/data.json`];
            datjson.commands[datjson.count +1] = newAct
            ActionTile.innerHTML += `<div onclick="highlight(this, true, true)" class="action textToLeft" id="${count + 1}" ondblclick="cmdOpen('${count + 1}')"><div id="name">New Command</div> <div style="opacity: 50%; margin-left: 7px;"> | 1 Action </div> <div class="deleteActionButton" onclick="highlight(this.parentNode, true, true); deleteObject(this);">✕</div> `
            datjson.count = parseFloat(datjson.count) + 1
        }

        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
    }
    function deleteObject(object) {
        
    }


    setInterval(() => {
        
// Clear the cache for the module
        const v1 = JSON.stringify(datjson)
        const v2 = v1
        delete datjson
        delete require.cache[`./AppData/data.json`];

        var datjson = JSON.parse(JSON.stringify(JSON.parse(fs.readFileSync(processPath + '\\AppData\\data.json'))));
    }, 150)


   /* 
       fs.writeFileSync('./AppData/data.json', JSON.stringify(datjson, null, 2))

   let actionElement = document.getElementById(lastAct)
    console.log(actionElement)
    actionElement.parentNode.insertBefore(actionElement, actionElement.previousSibling)

    let actionElement = document.getElementById(lastObj)
    console.log(actionElement);
    actionElement.parentNode.insertBefore(actionElement, actionElement.previousSibling); */


    function selectAction() {
        let actionButton = document.getElementById('cakt')
        actionButton.style.animationDuration = '0.6s'
        actionButton.style.animationName = 'expande'
        setTimeout(() => {
            actionButton.style.overflowY = 'auto'
            let actons = fs.readdirSync(processPath + '\\AppData\\Actions')
            actionButton.innerHTML = `<div class="flexbox fwd" style="justify-content: center;"><div class="barbutton" style="z-index: 3; margin-left: 3.1%; height: auto; background-color: #FFFFFF10" onclick="deselectAction(this)"><div style="font-size: 1.2em; line-height: 1.15em; height: auto; text-align: center !important; margin: auto;">Close</div></div><div="search" class="input" id="searchbar" contentEditable="true" onkeydown="searchFor(this)" style="width: 63%; margin-left: 6px; margin-right: 6px; margin-bottom: -3px; height: 38px; font-size: 1.1em; font-size: auto; line-height: 38px; background-color: #FFFFFF10 !important;"></div><div id="actarraypick"></div>`
            let actionBut = document.getElementById('actarraypick')

            document.getElementById('searchbar').innerHTML = ' '
            for (let acte in actons) {
                let acten = actons[acte]
                let afile = require(`./AppData/Actions/${acten}`)
                actionBut.innerHTML += `<div class="flexbox"><div class="action" style="z-index: 3; background-color: #FFFFFF10 !important;" onclick="openAction('${acten}');" id="${acten}">${afile.data.name}</div>`
                lastType = 1
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
        actionButton.innerHTML = ''

            for (var acte in actons) {
                let acten = actons[acte]
                let afile = require(`./AppData/Actions/${acten}`)
                actionButton.innerHTML += `<div class="flexbox"><div class="action" style="z-index: 3; background-color: #FFFFFF10 !important;" onclick="openAction('${acten}');" id="${acten}">${afile.data.name}</div>`
                lastType = 1
        }
        const inpet = document.getElementById('searchbar');

        }
        actionButton.innerHTML = ''

        for (let acte in actons) {
            if (require(`./AppData/Actions/${actons[acte]}`).data.name.toLowerCase().startsWith(elemnt.innerText.toLowerCase())) {
                
                if (require(`./AppData/Actions/${actons[acte]}`).UI.compatibleWith.includes(kindOf) || require(`./AppData/Actions/${actons[acte]}`).UI.compatibleWith.includes("Any")) {
                    let acten = actons[acte]
                    let afile = require(`./AppData/Actions/${acten}`)
                    actionButton.innerHTML += `<div class="flexbox"><div class="action" style="z-index: 3; background-color: #FFFFFF10 !important;" onclick="openAction('${acten}');" id="${acten}">${afile.data.name}</div>`
                }
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
            elm.style.width = '48.5%'
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
                    for (let scl in UIdata[ems].buttons) {
                        var button = UIdata[ems].buttons[scl];
                        if (datjson.commands[lastObj].actions[action.id].data.button == button) {
                            ButtonBar = `${ButtonBar}<div onclick="Bselect(this, '${action.id}')" class="barbutton marginTB" style="padding: 2px !important; width: 20% !important; height: 2.5em; background-color: #FFFFFF20" id="${button}"><div class="barbuttontexta" style="margin-top: auto; margin-bottom: auto;">${button}</div></div>`
                            lastButton = button
                            if (button.endsWith('*')) {
                                extraElements = `${extraElements} <div class="input" id="ExtraData" contenteditable="true"></div>`
                            }
                        } else {
                            ButtonBar = `${ButtonBar}<div onclick="Bselect(this, '${action.id}')" class="barbutton marginTB" style="padding: 2px !important; width: 20% !important; height: 2.5em" id="${button}"><div class="barbuttontexta" style="margin-top: auto; margin-bottom: auto;">${button}</div></div>`
                        }
                    }
                    htmle = `${htmle}<div class="flexbox" style="margin-left: auto; width: 90%;  margin-right: auto; justify-content: center !important;">${ButtonBar}</div> <br> ${extraElements}`
                delete button
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
                                htmle = `${htmle} <div class="selectBar" onkeyup="saveField('${UIdata[ems].extraField}', '${UIdata[ems].storeAs}')" id="${thenm}" contenteditable="true">${datjson.commands[lastObj].actions[lastAct].data[UIdata[ems].extraField]}</div>`
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

        }
        function saveField(fieldId, sa) {
            let field = document.getElementById(fieldId) 
            datjson.commands[lastObj].actions[lastAct].data[fieldId] = field.innerText;
            fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson))
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
                    setTimeout(() => {
                        document.getElementById(menuElement).remove()
                    }, 230)
                }
            } else {

                    if (elm.innerText.endsWith('*') ) {

                        pending = document.createElement('div')
                        pending.className = 'selectBar'
                        pending.id = menuElement
                        pending.contentEditable = 'true'
                        pending.innerHTML = datjson.commands[lastObj].actions[lastAct].data[menuElement]
                        pending.onkeyup = () => {
                            saveField(menuElement)
                }
     }
            }
            let eldpn1 = elm.parentNode
            let eldpn2 = eldpn1
            eldpn2.style.animationName = 'rvt'
            eldpn2.style.animationDuration = '0.45s'
            let elminht1 = elm.innerHTML;
            let elminht2 = elminht1;
            let lastElm = eldpn2; 
            let nextElm = lastElm.nextSibling;
            while (nextElm) {
                if (nextElm.style) {
                    nextElm.style.animationDuration = ''
                    nextElm.style.animationName = ''
                  nextElm.style.animationName = 'apfd';
                  nextElm.style.animationDuration = '0.5s';
                  let ndsd1 = nextElm
                  let thene = ndsd1
                  setTimeout(() => {
                    thene.style.animationDuration = undefined
                    thene.style.animationName = undefined
                  }, 500);
                }
                nextElm = nextElm.nextSibling;
              }
            
            setTimeout (() => {
                elm.parentNode.innerHTML = elm.innerHTML
                if (pending != '' && eldpn2.nextSibling.className != 'selectBar') {
                    pending.appendAfter(eldpn2)
                }
                eldpn2.style.animationName = 'revert2'
                eldpn2.style.animationDuration = '0.30s'
            }, 230)
            setTimeout(() => {
                eldpn2.onclick = () => {openChoices(storeAs, eldpn2, menuElement, elecf)}
            }, 50)
        
            datjson.commands[lastObj].actions[lastAct].data[storeAs] = elminht2
            fs.writeFileSync('\\AppData\\data.json', JSON.stringify(datjson))
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
        function deleteObject(obj) {
            if (lastType == 1) {
                let keyToRemove = obj.parentNode.id;

                let filteredEntries = Object.entries(datjson.commands[lastObj].actions).filter(([key]) => key != keyToRemove);
                let newJson = {};
                for (let i = 0; i < filteredEntries.length; i++) {
                  newJson[i + 1] = filteredEntries[i][1];
                }
                datjson.commands[lastObj].count = datjson.commands[lastObj].count - 1
                datjson.commands[lastObj].actions = newJson;
                document.getElementById(obj.parentNode.id).style.animationName = 'deleteObject';
                document.getElementById(obj.parentNode.id).style.animationDuration = '0.3s'
                setTimeout (() => {
                  document.getElementById(obj.parentNode.id).remove()
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
                  let keyToRemove = obj.parentNode.id;

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
                    
                    ActionTile.innerHTML += `<div onclick="highlight(this, true, true)" class="action textToLeft" id="${parseFloat(cmd)}" ondblclick="cmdOpen('${cmd}')"><div id="name">${datjson.commands[cmd].name}</div> <div style="opacity: 50%; margin-left: 7px;"> | ${Object.keys(datjson.commands[cmd].actions).length} Actions </div> <div class="deleteActionButton" onclick="deleteObject(this)">✕</div> `
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
        function substitute(str) {
            return eval("`" + str + "`");
        }
        function checkErrors() {
            let foundIssues = false;
            let issues = document.getElementById('issues');
            let status = document.getElementById('status');
            let sp = document.getElementById('tld')
            sp.style.animationName = 'degb'
            sp.style.animationDuration = '0.5s'
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
                        <div class="barbutton noanims" onclick="console.log('test123'); if(lastType == 0) {switchObjs()}; document.getElementById('${action}').style.backgroundColor = '#FFFFFF50'; editAction(document.getElementById('${action}')); setTimeout(() => { document.getElementById('${UIdata[element]}').style.animationName = 'glowTwice'; document.getElementById('${UIdata[element]}').style.animationDuration = '0.8s'; document.getElementById('${UIdata[element]}').focus();}, 1050)"><div class="barbuttontexta noanims">Focus</div></div>
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
                                    <div class="barbutton noanims" onclick="if(lastType == 0) {switchObjs()}; document.getElementById('${action}').style.backgroundColor = '#FFFFFF50'; editAction(document.getElementById('${action}')); setTimeout(() => {document.getElementById('${UIdata[element].extraField}').style.animationName = 'glowTwice'; document.getElementById('${UIdata[element].extraField}').style.animationDuration = '1s'; document.getElementById('${UIdata[element].extraField}').focus()}, 1050)"><div class="barbuttontexta noanims">Focus</div></div>
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
                            <div class="barbutton noanims" onclick="if(lastType == 0) {switchObjs()}; highlight(document.getElementById('${action}')); lastHighlighted.focus();"><div class="barbuttontexta noanims">Highlight</div></div>
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
                            <div class="barbutton noanims" onclick="if(lastType == 0) {switchObjs()}; highlight(document.getElementById('${action}')); lastHighlighted.focus();"><div class="barbuttontexta noanims">Highlight</div></div>
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
                            <div class="barbutton noanims"  onclick="if(lastType == 0) {switchObjs()}; highlight(document.getElementById('${action}')); lastHighlighted.focus();"><div class="barbuttontexta noanims">Highlight</div></div>
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
        function exportBot(elm) {
            elm.style.animationName = ''
            elm.style.animationDuration = '0s'
            if (exportFolder) {
                datjson.name = document.getElementById('projectName').innerText
                datjson.prjSrc = exportFolder
                fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2))

                elm.parentNode.parentNode.innerHTML = `
                <div class="barbuttontexta" style="margin: auto; margin-top: 50%; text-align: center;" id="exprjt">Exporting Project!</div>
                `
                fs.writeFileSync(exportFolder + '\\bot.js', fs.readFileSync(processPath + '\\AppData\\bot.js'))
                fs.writeFileSync(exportFolder + '\\package.json', fs.readFileSync(processPath + '\\package.json'))
                try {
                fs.mkdirSync(exportFolder + '\\AppData')
                } catch (err) {
                    null
                }
                fs.writeFileSync(exportFolder + '\\AppData\\data.json', fs.readFileSync(processPath + '\\AppData\\data.json'))
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
                fs.writeFileSync(exportFolder + '\\AppData\\Toolkit\\variableTools.json', fs.readFileSync(processPath + '\\AppData\\Toolkit\\variableTools.js'))
                fs.writeFileSync(exportFolder + '\\AppData\\Toolkit\\variableTools.json', fs.readFileSync(processPath + '\\AppData\\Toolkit\\tempVars.json'))

                try {
                    fs.mkdirSync(exportFolder + '\\AppData\\Project')
                    } catch (err) {
                        null
                    }  
                    fs.writeFileSync(exportFolder + '\\AppData\\Project\\data.json', fs.readFileSync(processPath + '\\AppData\\Project\\data.json'))
                let actions = fs.readdirSync(processPath + '\\AppData\\Actions')
                let counnt = 0;
                for (let action in actions) {
                    counnt++
                    setTimeout(() => {
                        document.getElementById('exprjt').innerHTML = 'Exported Project <br>' + counnt + ' Actions written'
                        fs.writeFileSync(exportFolder + '\\AppData\\Actions\\' + actions[action], fs.readFileSync(processPath + '\\AppData\\Actions\\' + actions[action]))
                    }, 1400)
                    document.getElementById('exprjt').innerHTML = 'Project Exported! <br>' + counnt + 'Actions written in total'
                    setTimeout(() => {
                        location.reload()
                    }, 5000)
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
            elm.style.animationDuration = '5.1s'
            elm.style.height = '5.5vh'
            elm.style.padding = '1vh'
            elm.innerHTML = `
            <div class="flexbox" style="margin: auto;">
            <div class="ring" style="width: 3vh; height: 3vh; animation-duration: 1.5s;"></div>
            <div class="barbuttontexta">Saving your project..</div>
            </div>
            `
            document.body.appendChild(elm)
            savePrj()
            setTimeout(() => {
               let spn = document.getElementById('saveProjectnotif')
               spn.remove()
            }, 5000)
        }, 60000)