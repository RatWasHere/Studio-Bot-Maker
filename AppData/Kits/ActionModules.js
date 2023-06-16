function newObject() {
    if (lastType == 1) {
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
        datjson.commands[lastObj].actions[parseFloat(datjson.commands[lastObj].count) + 1] = newAct
        datjson.commands[lastObj].count = datjson.commands[lastObj].count + 1
        lastAct = datjson.commands[lastObj].count
        wast()
        refreshActions()
        editAction(document.getElementById('Action' + datjson.commands[lastObj].count))
        setTimeout(() => {
            selectAction()
            document.getElementById('actionName00').innerHTML = `
            <span class="goofyhovereffect" style="padding: 4px; padding-top: 2px; padding-bottom: 2px; margin-top: -2px; margin-bottom: -2px; border-radius: 5px; background-color: #FFFFFF10; margin-right: 1vw;">New </span> 
            Send Message
            `
        }, 700)
    }
    else {
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
                },
                "customId": new Date().getTime()
        }
        delete require.cache[`./AppData/data.json`];
        datjson.commands[datjson.count + 1] = newAct
        datjson.count = parseFloat(datjson.count) + 1
        lastObj = datjson.count
        wast()
        refreshGroups()
    }


}

function deleteObject(obj) {
    if (obj.parentNode.id.startsWith('Action')) {
        if (datjson.commands[lastObj].count == 1) return
        let keyToRemove = obj.parentNode.id.split('Action')[1];

        let filteredEntries = Object.entries(datjson.commands[lastObj].actions).filter(([key]) => key != keyToRemove);
        let newJson = {};
        for (let i = 0; i < filteredEntries.length; i++) {
          newJson[i + 1] = filteredEntries[i][1];
        }
        datjson.commands[lastObj].actions = newJson;
        document.getElementById(obj.parentNode.id).style.animationName = 'deleteObject';
        document.getElementById(obj.parentNode.id).style.animationDelay = '0s'
    document.getElementById(obj.parentNode.id).style.animationDuration = '0.4s'
        setTimeout (() => {
          document.getElementById(obj.parentNode.id).remove()
          datjson.commands[lastObj].count = datjson.commands[lastObj].count - 1
          wast()
            refreshActions()
    }, 390)
      } else {
        if (datjson.count == 1) return

          let keyToRemove = obj.parentNode.id.split('Group')[1];

          let filteredEntries = Object.entries(datjson.commands).filter(([key]) => key != keyToRemove);
          let newJson = {};
          for (let i = 0; i < filteredEntries.length; i++) {
            newJson[i + 1] = filteredEntries[i][1];
          }

          document.getElementById(obj.parentNode.id).style.animationName = 'deleteObject';
          document.getElementById(obj.parentNode.id).style.animationDelay = '0s'
      document.getElementById(obj.parentNode.id).style.animationDuration = '0.4s'
          setTimeout( () => {
            datjson.count = datjson.count - 1
            datjson.commands = newJson;
            wast()
          document.getElementById(obj.parentNode.id).remove()
            refreshGroups()
            setTimeout(() => {
                highlight(document.getElementById('Group1'))
            }, 100)
  }, 395)
      }


    fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
    checkErrors()
}
var draggedAction;
var draggedOverAction;
function handleActionDrag(action) {
    draggedAction = action.id.split('Action')[1]
}
function actionDragOverHandle(event, action) {
    action.classList.add('goofyhovereffect')
    /*
    placeholderAction = document.createElement('div')
    placeholderAction.style.animationName = 'fade'
    placeholderAction.style.marginTop = '41px'
    placeholderAction.style.marginBottom = '-35px'
    */
    event.preventDefault()
    draggedOverAction = action.id.split('Action')[1]
}
function handleActionDragEnd(action) {
    action.classList.remove('goofyhovereffect')

}
function handleActionDrop(action) {
    let oldPosition = parseFloat(draggedAction)
    let newPosition = parseFloat(draggedOverAction)
    lastType = 1
    console.log('S')
    if (oldPosition <  newPosition) {
        while (newPosition != oldPosition) {
            oldPosition++

            highlight(document.getElementById(`Action${oldPosition}`))
            moveUp()
            refreshActions()

        }
    } else {
        while (newPosition != oldPosition) {
            oldPosition--

            highlight(document.getElementById(`Action${oldPosition}`))
            moveDown()
            refreshActions()

        }
    }
    refreshActions()
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
            actionElement = document.getElementById(`Action${lastAct}`);
            actionElement.id = `Action${parseFloat(lastAct) - 1}`
            actionElement.previousSibling.id = `Action${parseFloat(lastAct)}`
            actionElement.parentNode.insertBefore(actionElement, actionElement.previousSibling);
            lastAct = `${parseFloat(lastAct) - 1}`;
            refreshActions()
        }
    } else {
        let command = datjson.commands[lastObj];
                currentAction = command;
                if (datjson.commands[`${parseFloat(lastObj) - 1}`] != undefined) {
                    tempAction = datjson.commands[`${parseFloat(lastObj) - 1}`];
                    datjson.commands[`${parseFloat(lastObj) - 1}`] = currentAction;
                    datjson.commands[lastObj] = tempAction;
                    actionElement = document.getElementById(`Group${lastObj}`);
                    actionElement.setAttribute('id', `Group${parseFloat(lastObj) - 1}`);
                    actionElement.previousSibling.setAttribute('id', `Group${parseFloat(lastObj)}`);
                    actionElement.parentNode.insertBefore(actionElement, actionElement.previousSibling);
                    lastObj = `${parseFloat(lastObj) - 1}`

                }

        }
    fs.writeFileSync(processPath +'\\AppData\\data.json', JSON.stringify(datjson, null, 2));

}
function moveDown() {
    let actionElement, currentAction, tempAction;
    if (lastType == 1) {
        let actione = datjson.commands[lastObj].actions[lastAct];
        if (datjson.commands[lastObj].actions[`${parseFloat(lastAct) + 1}`] != undefined) {
            currentAction = actione;
            tempAction = datjson.commands[lastObj].actions[`${parseFloat(lastAct) + 1}`];
            datjson.commands[lastObj].actions[`${parseFloat(lastAct) + 1}`] = currentAction;
            datjson.commands[lastObj].actions[lastAct] = tempAction;
            actionElement = document.getElementById(`Action${lastAct}`);
            actionElement.id = `Action${parseFloat(lastAct) + 1}`
            actionElement.nextSibling.id = `Action${parseFloat(lastAct)}`
            actionElement.parentNode.insertBefore(actionElement, actionElement.nextSibling.nextSibling);
            lastAct = `${parseFloat(lastAct) + 1}`;
            refreshActions()
        }
    } else {
        let command = datjson.commands[lastObj];
        currentAction = command;
        if (datjson.commands[`${parseFloat(lastObj) + 1}`] != undefined) {
            tempAction = datjson.commands[`${parseFloat(lastObj) + 1}`];
            datjson.commands[`${parseFloat(lastObj) + 1}`] = currentAction;
            datjson.commands[lastObj] = tempAction;
            actionElement = document.getElementById(`Group${lastObj}`);
            actionElement.setAttribute('id', `Group${parseFloat(lastObj) + 1}`);
            actionElement.nextSibling.id = `Group${parseFloat(lastObj)}`
            actionElement.parentNode.insertBefore(actionElement, actionElement.nextSibling.nextSibling);
            lastObj = `${parseFloat(lastObj) + 1}`

        }

    }
    fs.writeFileSync(processPath +'\\AppData\\data.json', JSON.stringify(datjson, null, 2));

}

function cmdOpen(cmdpending) {
    lastObj = cmdpending
    document.getElementById('name').innerHTML = datjson.commands[cmdpending].name
    switchObjs()
}  

function controlActionRows(tf) {
    if (tf != true) {
        let editorOptions = document.getElementById('edutor')
        let commandDisplay = document.getElementById('animationArea').parentElement;
        commandDisplay.style.animationName = 'moveToTheRight'
        commandDisplay.style.animationDuration = '0.35s'
        editorOptions.style.animationName = 'moveToTheLeft'
        editorOptions.style.animationDuration = '0.35s'
    }

        if (tf != true) {

        } else {
                    document.getElementById('actElmsig').style.animationName = 'marginbounce'
                    document.getElementById('actElmsig').style.animationDuration = '0.4s'
                    document.getElementById('actElmsig').style.opacity = '0%'

            setTimeout(() => {
                document.getElementById('actElmsig').style.opacity = '100%'
    
                document.getElementById('actElmsig').style.animationName = ''
                document.getElementById('actElmsig').style.animationDuration = ''
            }, 500)

    


    }



    setTimeout(() => {
        if (!document.getElementById('actElmsig')) {
            let editorOptions = document.getElementById('edutor')
            let commandDisplay = document.getElementById('animationArea').parentElement;
            editorOptions.style.display = 'none'
            commandDisplay.style.display = 'none'
            document.body.innerHTML += `
            <div id="actElmsig" style="width: 100%; margin-top: -98vh; transition: opacity 0.1s ease;">
            </div>
            `
        }

        document.getElementById('actElmsig').innerHTML = `
        <div class="flexbox" style="margin-top: 2.5vh; margin-bottom: 2vh;">

        <div class="barbuttond center borderrightz" onclick="restoreActionEditorView()" style="margin-left: auto; height: 30px; width: 30px;">
        <div class="image backArrow">
        
        </div>
        </div>
        <div class="barbuttond center borderleftz" onclick="restoreActionEditorView()" style="width: 70px; height: 30px; margin-right: 1vw; margin-left: 0.3vw;">
        <div class="barbuttontexta">
        Back
        </div>
        </div>
        <div class="barbuttond" onclick="newButtonBar()" style="margin-left: 0.5vw; position: sticky; top: 11; bottom: 1; border-radius: 1000px; width: auto; height: 30px; backdrop-filter: blur(12px);">
        
        <div class="barbuttontexta">New Button Row</div>
        </div> 
        <div class="barbuttond" onclick="newActionRow()" style="margin-left: 0.5vw; position: sticky; top: 11; bottom: 1; border-radius: 1000px; width: auto; height: 30px; backdrop-filter: blur(12px);">
        
        <div class="barbuttontexta">New Select Menu</div>
        </div> 
        </div>

        <div id="ActionRows" style="width: 109%; height: auto; margin: auto;"></div>`

        for (let barId in datjson.commands[lastObj].actions[lastAct].data.actionRows) {
            let bar = datjson.commands[lastObj].actions[lastAct].data.actionRows[barId]
            var buttonColors = ''
            if (bar.type == 'ButtonRow') {
            for (let component of bar.components) {
                    switch (component.style) {
                        case 'Default': 
                        buttonColors = `${buttonColors}<div style="width: 4vw; opacity: 50%; height: 3vh; margin-right: 0.3vw; background-color: #695dfb; border-radius: 7px;"></div>`
                        break
                        case 'Success': 
                        buttonColors = `${buttonColors}<div style="width: 4vw; opacity: 50%; height: 3vh; margin-right: 0.3vw; background-color: #5fb77a; border-radius: 7px;"></div>`
                        break
                        case 'Danger': 
                        buttonColors = `${buttonColors}<div style="width: 4vw; opacity: 50%; height: 3vh; margin-right: 0.3vw; background-color: #de4447; border-radius: 7px;"></div>`
                        break
                        case 'Neutral': 
                        buttonColors = `${buttonColors}<div style="width: 4vw; opacity: 50%; height: 3vh; margin-right: 0.3vw; background-color: #50545d; border-radius: 7px;"></div>`
                        break
                        case 'Link': 
                        buttonColors = `${buttonColors}<div style="width: 4vw; opacity: 50%; height: 3vh; margin-right: 0.3vw; background-color: #FFFFFF90; border-radius: 7px;"></div>`
                        break
                    }
                }
                document.getElementById('ActionRows').innerHTML += `
                <div class="flexbox" style="width: 100%; height: auto; margin: auto; margin-bottom: 9px;" draggable="true" ondragover="draggedOverRow(event, ${barId})" ondragstart="handleDraggedRow(event, ${barId})" ondragend="handleRowDrag(event, ${barId})">
                <div class="flexbox" style="width: 20%; border-radius: 12px; border-bottom-right-radius: 0px; border-top-right-radius: 0px; background-color: #FFFFFF10;">
                  <div class="barbuttontext">
                    #${parseFloat(barId)+1}
                  </div>
                </div>
                <div class="flexbox" style="width: 70%; margin-right: auto; border-radius: 16px; border-bottom-left-radius: 0px; border-top-left-radius: 0px; padding: 12px; background-color: #FFFFFF15;">
                <div class="flexbox" style="width: 35%; align-items: center; justify-content: center; height: 70%; margin: auto; background-color: #FFFFFF10; border-radius: 12px; padding: 6px;">
                ${buttonColors}
                </div>
                  <div class="barbuttontexta" style="width: 25%;">
                    ${bar.name}
                  </div>
                    <div class="flexbox hoverablez" style="padding: 6px; height: 70%; width: 20%; border-radius: 12px; margin-left: auto;" onclick="editButtons('${barId}')">
                      <div class="barbuttontexta">Modify</div>
                    </div>
                  </div>
              </div>
                `
        } else {
            let row = barId
            let rows = datjson.commands[lastObj].actions[lastAct].data.actionRows
                document.getElementById('ActionRows').innerHTML += `
                <div class="flexbox" style="width: 100%; margin: auto; height: auto; margin-bottom: 9px;" draggable="true" ondragover="draggedOverRow(event, ${barId})" ondragstart="handleDraggedRow(event, ${barId})" ondragend="handleRowDrag(event, ${barId})">

                <div class="flexbox" style="width: 20%; border-radius: 12px; border-bottom-right-radius: 0px; border-top-right-radius: 0px; background-color: #FFFFFF10;"><div class="barbuttontext">#${parseFloat(barId)+1}</div></div>

                <div class="flexbox" style="width: 70%; margin-right: auto; border-radius: 16px; border-bottom-left-radius: 0px; border-top-left-radius: 0px; padding: 12px; background-color: #FFFFFF15;">
                
                <div class="flexbox" style="width: 35%; align-items: center; justify-content: center; height: 70%; margin: auto; background-color: #FFFFFF10; border-radius: 12px; padding: 6px;">
                <div class="barbuttontexta">${rows[row].placeholder}</div>
                </div>
                <div class="barbuttontexta" style="width: 25%;">${rows[row].name}</div>
                <div class="flexbox hoverablez" onclick="showReow(${row})" style="padding: 6px; height: 70%; width: 20%; border-radius: 12px; margin-left: auto;">
                <div class="barbuttontexta">Modify</div>
                </div>
                
                
                </div>
                
                </div>
                `

        }
        }
    }, 200)
}
function editButtons(bar) {
    let ba = datjson.commands[lastObj].actions[lastAct].data.actionRows[bar]
    let view = document.getElementById('actElmsig')
    document.getElementById('actElmsig').style.animationName = 'marginbounce'
    document.getElementById('actElmsig').style.animationDuration = '0.3s'
    document.getElementById('actElmsig').style.transition = 'opacity 0.3s ease'

    document.getElementById('actElmsig').style.opacity = '0%'
    setTimeout(() => {
        document.getElementById('actElmsig').style.opacity = '100%'

        document.getElementById('actElmsig').style.animationName = ''
        document.getElementById('actElmsig').style.animationDuration = ''


    view.innerHTML = `
    <div class="barbuttontext center textToLeft flexbox" style="margin-top: 2vh; margin-right: auto; margin-left: 12px;">Editing <div style="margin-left: 10px;"></div> <span style="opacity: 50%;">${ba.name}</span>
    <div class="flexbox" style="margin-left: auto; margin-right: 12px;">
        <div class="barbuttond center" onclick="controlActionRows(true)" style="width: 30px;">
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
                <div class="flexbox" style="width: 95%; margin-left: auto; margin-right: auto; min-height: 9vh; height: 9vh; background-color: #FFFFFF15; border-radius: 12px; padding: 10px;">
    <div style="align-items: center; justify-content: center; margin: auto;">
    <div class="barbuttontexta">Name</div>
    <div class="input" style="width: 35vw;" contenteditable="true" onkeyup="storeName(${bar}, this)">${datjson.commands[lastObj].actions[lastAct].data.actionRows[bar].name}</div>
    </div>
    <div class="fade" style="width: 3px; height: 90%; margin: auto; background-color: #FFFFFF30;"></div><br>

    <div style="align-items: center; justify-content: center; margin: auto;">
                <div class="barbuttontexta">Stop Waiting After (Leave Blank For 60seconds)</div>
                <input id="customLinked" class="input" style="width: 35vw; margin-bottom: 0px;" onkeydown="return event.key !== ' '; if (event.key != 'Backspace') return this.value.split('').length < 32" oninput="storeBarAs(this, ${bar});" contenteditable="true" value="${datjson.commands[lastObj].actions[lastAct].data.actionRows[bar].stopWaitingAfter}" placeholder="60 Seconds">


    </div>
    </div>


    `
    view.innerHTML += `
<br>
<div class="barbuttond" onclick="createButton(${bar})" style="width: 5vh; height: 5vh; margin-left: auto; margin-right: 4.5vw; border-radius: 1000px; margin-bottom: -2.5vh; backdrop-filter: blur(72px); background-color: ${datjson.color};">
    <div class="barbuttontext"><b>+</b></div>
    </div> 
    <div class="flexbox borderbottomz" style="width: calc(95% - 30px); margin-left: auto; margin-right: auto; min-height: 6vh; height: 6vh; background-color: #FFFFFF15; border-radius: 12px; padding: 15px; margin-bottom: 0.5vh;" id="buttonsDisplay"></div>
    <div class="flexbox bordertopz" style="width: calc(95% - 20px); margin-left: auto; margin-right: auto; min-height: 33vh; height: 33vh; background-color: #FFFFFF12; border-radius: 12px; padding: 10px; justify-content: center; align-items: center;" id="buttonsEditor">
    <div class="barbuttontexta center">Select A Button!</div>
    </div>

    `
    for (let button in ba.components) {

        let endProduct = 'bordercenter'
        if (ba.components[parseFloat(button) - 1] == undefined) {
            endProduct = 'borderright'
        }
        if (ba.components[parseFloat(button) + 1] == undefined) {
            endProduct = 'borderleft'
        }
        document.getElementById('buttonsDisplay').innerHTML += `
        <div class="barbuttond ${endProduct}" onclick="buttonIfy(${button}, ${bar}, this)" draggable="true" ondragover="buttonDragOver(event, ${button})" ondragstart="buttonDragStart(event, ${button})" ondragend="ButtonDrop(${button}, ${bar})" style="width: 17%;">
        <div class="barbuttontexta" id="${bar}${button}BUT">${ba.components[button].name}</div>
        </div> 
        `
    }
}, 300)
}


function newButtonBar() {
    if (datjson.commands[lastObj].actions[lastAct].data.actionRows.length >= 5) return
    let tme = new Date().getTime()
    let newBar = {
     name: "Bar",
     storeAs:"ButtonBar",
     customId: `${tme}`,
     type: "ButtonRow",
     components: [],
     run: '',
     stopWaitingAfter: ""
    }

datjson.commands[lastObj].actions[lastAct].data.actionRows.push(newBar)

wast();
controlActionRows(true)

}


function buttonIfy(button, bar, what) {
    let buttonEditor = document.getElementById('buttonsEditor')
    let ba = datjson.commands[lastObj].actions[lastAct].data.actionRows[bar]

    if (lastButt != null || lastButt != undefined) {
        lastButt.style.backgroundColor = ''
    }
    what.style.backgroundColor = '#FFFFFF25'

    lastButt = what;
    buttonEditor.innerHTML = `
    <div>
    <div class="borderbottomz" style="padding: 6px; border-radius: 12px; background-color: #FFFFFF09; margin-bottom: 0.65vh;">
    <div class="barbuttontexta fade">Button Label</div>
    <input class="input" style="width: 35vw; margin-bottom: 0px;" onkeydown=" if (event.key != 'Backspace') return this.value.split('').length < 32" oninput="buttonren(${button}, this, ${bar})" type="text" value="${ba.components[button].name}" placeholder="Text On The Button, Required">

    </div>
    <div class="bordertopz" style="padding: 6px; border-radius: 12px; background-color: #FFFFFF09;">
    <div class="barbuttontexta fade">Custom ID</div>
    <input class="input" style="width: 35vw; margin-bottom: 0px;" onkeydown="return event.key !== ' '; if (event.key != 'Backspace') return this.value.split('').length < 32" oninput="buttonID(${button}, this, ${bar})" contenteditable="true" value="${ba.components[button].customId}" placeholder="Required">
    </div>
    <div class="hoverablez" onclick="setButtonRun(this, ${button}, ${bar})" style="margin-top: 1vh; width: 40vw; margin-right: auto; margin-left: auto; border-radius: 12px; border-bottom-left-radius: 2px; border-bottom-right-radius: 2px; padding: 8px;">
    <div class="barbuttontexta">Once Interacted With, Run Action Group:</div>
    </div>
    <div class="bordertopz" style="background-color: #FFFFFF10; margin-top: 0.3vh;width: 40vw; margin-right: auto; margin-left: auto; border-radius: 12px; border-bottom-left-radius: 2px; border-bottom-right-radius: 2px; padding: 8px;" id="runButtonWhat" onclick="setButtonRun(this, ${button}, ${bar})">
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
        setRunningElement(ba.components[button].runs)

        if (ba.components[button].disabled == true) {
            document.getElementById('disabledbutton').style.backgroundColor = ''
            document.getElementById('enabledbutton').style.backgroundColor = '#FFFFFF25'
        } else {
            document.getElementById('disabledbutton').style.backgroundColor = '#FFFFFF25'
            document.getElementById('enabledbutton').style.backgroundColor = ''
        }
        switch (ba.components[button].style) {
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
function styledButton(what, bar, button) {
    document.getElementById(datjson.commands[lastObj].actions[lastAct].data.actionRows[bar].components[button].style + 'Style').style.backgroundColor = ''

    document.getElementById(`${what.innerText}Style`).style.backgroundColor = '#FFFFFF25'
    datjson.commands[lastObj].actions[lastAct].data.actionRows[bar].components[button].style = `${what.innerText}`
    if (datjson.commands[lastObj].actions[lastAct].data.actionRows[bar].components[button].style == 'Link') {
        setLinked(true, bar, button)
    } else {
        setLinked(false, bar, button)
    }
    fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));

}
function setRunningElement(runs) {
    let runningElement = document.getElementById('runButtonWhat')
    let endResult = 'Nothing'
        for (let command in datjson.commands) {
            if (datjson.commands[command].customId == runs) {
                endResult = datjson.commands[command].name
            }
        }
        runningElement.innerHTML = `<div class="barbuttontexta">${endResult}</div>`
}
function setButtonRun(atElm, button, bar, actionRow) {
    let actRow = false;
    if (actionRow) {
        actRow = true;
    }
    let x = getOffset(atElm).left
    let y = getOffset(atElm).top

    if (!document.getElementById('componentRunnerSelector')) {
        commandSelector = document.createElement('div')
        commandSelector.style.width = '21vw'
        commandSelector.style.height = '23vh'
        commandSelector.style.backgroundColor = '#00000060'
        commandSelector.style.borderRadius = '12px'
        commandSelector.style.backdropFilter = 'blur(12px)'
        commandSelector.style.position = 'fixed'
        commandSelector.style.top = y + 'px'
        commandSelector.style.left = x + 'px'
        commandSelector.style.overflowY = 'auto'
        commandSelector.id = 'componentRunnerSelector'
        commandSelector.style.padding = '1vh'
        commandSelector.onclick = () => {
            commandSelector.remove()
        }
        commandSelector.innerHTML = `
        <div class="barbuttontexta">Groups</div>
        `
        document.body.appendChild(commandSelector)
        for (let command in datjson.commands) {
            commandSelector.innerHTML += `<div onclick="setComponentRun(${datjson.commands[command].customId}, ${button}, ${bar}, ${actRow})" class="action">
            <div class="barbuttontexta">${datjson.commands[command].name}</div>
            </div>`
        }
        commandSelector.onmouseleave = () => {
            commandSelector.remove()
        }
    } 
}
function setComponentRun(cID, btn, bar, actionRow) {
    if (!actionRow) {
        datjson.commands[lastObj].actions[lastAct].data.actionRows[bar].components[btn].runs = cID
    } else {
        datjson.commands[lastObj].actions[lastAct].data.actionRows[bar].options[btn].runs = cID
    }
    wast()
    setRunningElement(cID)
} 
function restoreActionEditorView() {

    document.getElementById('actElmsig').style.opacity = '100%'
    document.getElementById('actElmsig').style.transition = 'opacity 0.35s ease'
    document.getElementById('actElmsig').style.opacity = '0%'

    let editorOptions = document.getElementById('edutor')
    editorOptions.style.animationName = 'comeToTheLeft1'
    editorOptions.style.animationDuration = '0.35s'
    
    let commandDisplay = document.getElementById('animationArea').parentElement

    commandDisplay.style.animationName = 'comeToTheRight1'
    commandDisplay.style.animationDuration = '0.35s'
    editorOptions.style.display = ''
    commandDisplay.style.display = ''
    setTimeout(() => {
        document.getElementById('actElmsig').remove()
        commandDisplay.style.animationName = ''
        commandDisplay.style.animationDuration = ''
        editorOptions.style.animationName = ''
        editorOptions.style.animationDuration = ''
    }, 340)
    document.getElementById('cndcl').onclick = () => {restoreTo(customHTMLdfs, customHTMLreturn)}
    let viewActionRowElements = document.getElementById('actionElements');
    viewActionRowElements.onclick = () => {
        controlActionRows()
    }   
}