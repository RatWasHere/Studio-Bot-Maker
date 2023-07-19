function newObject() {
    if (lastType == 1) {
        let newAct = {
            "name": "Send Message",
            "file": "sendmessage.js",
            "data": {
                "messageContent": "Hello World!",
                "button": "Command Channel",
                "ExtraData": "",
                "name": "Send Message"
              }
        }
        delete require.cache[`./AppData/data.json`];
        botData.commands[lastObj].actions[parseFloat(botData.commands[lastObj].count) + 1] = newAct
        botData.commands[lastObj].count = botData.commands[lastObj].count + 1
        lastAct = botData.commands[lastObj].count
        wast()
        refreshActions()
        editAction(document.getElementById('Action' + botData.commands[lastObj].count))
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
        botData.commands[botData.count + 1] = newAct
        botData.count = parseFloat(botData.count) + 1
        lastObj = botData.count
        wast()
        refreshGroups()
    }


}
function deleteObject(obj) {
    if (obj.parentNode.id.startsWith('Action')) {
        if (botData.commands[lastObj].count == 1) return
        let keyToRemove = obj.parentNode.id.split('Action')[1];

        let filteredEntries = Object.entries(botData.commands[lastObj].actions).filter(([key]) => key != keyToRemove);
        let newJson = {};
        for (let i = 0; i < filteredEntries.length; i++) {
          newJson[i + 1] = filteredEntries[i][1];
        }
        botData.commands[lastObj].actions = newJson;
        botData.commands[lastObj].count = botData.commands[lastObj].count - 1;
        wast()

        document.getElementById(obj.parentNode.id).style.animationName = 'deleteObject';
        document.getElementById(obj.parentNode.id).style.animationDelay = '0s'
        document.getElementById(obj.parentNode.id).style.animationDuration = '0.4s'
        setTimeout (() => {
          document.getElementById(obj.parentNode.id).remove()

            refreshActions()
            refreshGroups()
    }, 390)
      } else {
        if (botData.count == 1) return

          let keyToRemove = obj.parentNode.id.split('Group')[1];

          let filteredEntries = Object.entries(botData.commands).filter(([key]) => key != keyToRemove);
          let newJson = {};
          for (let i = 0; i < filteredEntries.length; i++) {
            newJson[i + 1] = filteredEntries[i][1];
          }

          document.getElementById(obj.parentNode.id).style.animationName = 'deleteObject';
          document.getElementById(obj.parentNode.id).style.animationDelay = '0s'
      document.getElementById(obj.parentNode.id).style.animationDuration = '0.4s'
          setTimeout( () => {
            botData.count = botData.count - 1
            botData.commands = newJson;
            wast()
          document.getElementById(obj.parentNode.id).remove()
            refreshGroups()
            setTimeout(() => {
                highlight(document.getElementById('Group1'))
                refreshActions()
            }, 100)
  }, 395)
      }


    fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(botData, null, 2));
    checkErrors()
}

let timing;

var draggedGroup;
var draggedOverGroup;
function handleGroupDrag(group) {
    timing = new Date().getTime()
    draggedGroup = group.id.split('Group')[1]
}
function groupDragOverHandle(event, group) {
    group.classList.add('goofyhovereffectlite')
    /*
    placeholderGroup = document.createElement('div')
    placeholderGroup.style.animationName = 'fade'
    placeholderGroup.style.marginTop = '41px'
    placeholderGroup.style.marginBottom = '-35px'
    */
    event.preventDefault()
    draggedOverGroup = group.id.split('Group')[1]
}
function handleGroupDragEnd(group) {
    group.classList.remove('goofyhovereffectlite')
}
function handleGroupDrop(group) {
    refreshGroups()
    if (new Date().getTime() - timing < 100) return
    let oldPosition = parseFloat(draggedGroup)
    let newPosition = parseFloat(draggedOverGroup)
    lastType = 0
    if (oldPosition <  newPosition) {
        while (newPosition != oldPosition) {
            oldPosition++
            highlight(document.getElementById(`Group${oldPosition}`))
            moveUp()
            refreshGroups()
        }
    } else {
        while (newPosition != oldPosition) {
            oldPosition--
            highlight(document.getElementById(`Group${oldPosition}`))
            moveDown()
            refreshGroups()
        }
    }
    refreshGroups()
}

var draggedAction;
var draggedOverAction;
function handleActionDrag(action) {
    timing = new Date().getTime()
    draggedAction = action.id.split('Action')[1]
}
function actionDragOverHandle(event, action) {
    action.classList.add('goofyhovereffectlite')
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
    action.classList.remove('goofyhovereffectlite')

}
function handleActionDrop(action) {
    refreshActions()
    if (new Date().getTime() - timing < 100) return

    let oldPosition = parseFloat(draggedAction)
    let newPosition = parseFloat(draggedOverAction)
    lastType = 1
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
        let actione = botData.commands[lastObj].actions[lastAct];
        if (botData.commands[lastObj].actions[`${parseFloat(lastAct)-1}`] != undefined) {
            currentAction = actione;
            tempAction = botData.commands[lastObj].actions[`${parseFloat(lastAct) - 1}`];
            botData.commands[lastObj].actions[`${parseFloat(lastAct) - 1}`] = currentAction;
            botData.commands[lastObj].actions[lastAct] = tempAction;
            lastAct = `${parseFloat(lastAct) - 1}`;
            refreshActions()
        }
    } else {
        let command = botData.commands[lastObj];
            currentAction = command;
            if (botData.commands[`${parseFloat(lastObj) - 1}`] != undefined) {
                tempAction = botData.commands[`${parseFloat(lastObj) - 1}`];
                botData.commands[`${parseFloat(lastObj) - 1}`] = currentAction;
                botData.commands[lastObj] = tempAction;
                lastObj = `${parseFloat(lastObj) - 1}`
                refreshGroups()
            }
        }
    fs.writeFileSync(processPath +'\\AppData\\data.json', JSON.stringify(botData, null, 2));
}
function moveDown() {
    let actionElement, currentAction, tempAction;
    if (lastType == 1) {
        let actione = botData.commands[lastObj].actions[lastAct];
        if (botData.commands[lastObj].actions[`${parseFloat(lastAct) + 1}`] != undefined) {
            currentAction = actione;
            tempAction = botData.commands[lastObj].actions[`${parseFloat(lastAct) + 1}`];
            botData.commands[lastObj].actions[`${parseFloat(lastAct) + 1}`] = currentAction;
            botData.commands[lastObj].actions[lastAct] = tempAction;
            lastAct = `${parseFloat(lastAct) + 1}`;
            refreshActions()
        }
    } else {
        let command = botData.commands[lastObj];
        currentAction = command;
        if (botData.commands[`${parseFloat(lastObj) + 1}`] != undefined) {
            tempAction = botData.commands[`${parseFloat(lastObj) + 1}`];
            botData.commands[`${parseFloat(lastObj) + 1}`] = currentAction;
            botData.commands[lastObj] = tempAction;
            lastObj = `${parseFloat(lastObj) + 1}`
            refreshGroups()
        }
    }
    fs.writeFileSync(processPath +'\\AppData\\data.json', JSON.stringify(botData, null, 2));
}



function buttonIfy(button, bar, what) {
    let buttonEditor = document.getElementById('buttonsEditor')
    let ba = botData.commands[lastObj].actions[lastAct].data.actionRows[bar]

    if (lastButt != null || lastButt != undefined) {
        lastButt.style.backgroundColor = ''
    }
    what.style.backgroundColor = '#FFFFFF25'
    lastTempActions = ba.components[button].actions
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
    <div class="hoverablez" onclick="modalActionSelector()" style="margin-top: 1vh; width: 40vw; margin-right: auto; margin-left: auto; border-radius: 12px; border-bottom-left-radius: 2px; border-bottom-right-radius: 2px; padding: 8px;">
    <div class="barbuttontexta">Linked Actions</div>
    </div>
    <div class="bordertopz" style="background-color: #FFFFFF10; margin-top: 0.3vh;width: 40vw; margin-right: auto; margin-left: auto; border-radius: 12px; border-bottom-left-radius: 2px; border-bottom-right-radius: 2px; padding: 8px;" id="runButtonWhat" onclick="modalActionSelector()">
    <div class="barbuttontexta">Edit</div>
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
    document.getElementById(botData.commands[lastObj].actions[lastAct].data.actionRows[bar].components[button].style + 'Style').style.backgroundColor = ''
    document.getElementById(`${what.innerText}Style`).style.backgroundColor = '#FFFFFF25'
    botData.commands[lastObj].actions[lastAct].data.actionRows[bar].components[button].style = `${what.innerText}`
    if (botData.commands[lastObj].actions[lastAct].data.actionRows[bar].components[button].style == 'Link') {
        setLinked(true, bar, button)
    } else {
        setLinked(false, bar, button)
    }
    fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(botData, null, 2));
}
function setRunningElement(runs) {
    let runningElement = document.getElementById('runButtonWhat')
        runningElement.innerHTML = `<div class="barbuttontexta">${botData.commands[lastObj].actions[lastAct].data.actionRows[bar].components[button].runs.length}</div>`
}

function setHighlightedGroup(type) {
    let animationArea = document.getElementById('animationArea')
    let oldGroupType;
    if (selectedGroupType == 'text') {
        oldGroupType = 1
    }
    if (selectedGroupType == 'slash') {
        oldGroupType = 2
    }
    if (selectedGroupType == 'event') {
        oldGroupType = 3
    }

    animationArea.style.transition = 'all 0.2s ease'
    animationArea.parentElement.style.overflowX = 'none'

    if (oldGroupType > type) {
        animationArea.style.scale = '0.3'
        animationArea.style.filter = 'blur(12px)'
        animationArea.style.marginLeft = '-110vw'
        setTimeout(() => {
            animationArea.style.transition = 'all 0s ease'
            animationArea.style.marginRight = '-110vw'
            animationArea.style.marginLeft = ''

            setTimeout(() => {
                animationArea.style.transition = 'all 0.2s ease'
            }, 30);

            setTimeout(() => {
                animationArea.style.scale = ''
                animationArea.style.filter = ''
                animationArea.style.marginRight = ''
            }, 300)
        }, 300)
    } else if (oldGroupType < type) {
        animationArea.style.filter = 'blur(12px)'
        animationArea.style.scale = '0.3'
        animationArea.style.marginRight = '-110vw'
        setTimeout(() => {
            animationArea.style.transition = 'all 0s ease'
            animationArea.style.marginLeft = '-110vw'
            animationArea.style.marginRight = ''

            setTimeout(() => {
            animationArea.style.transition = 'all 0.2s ease'
            }, 30);

            setTimeout(() => {
                animationArea.style.scale = ''
                animationArea.style.filter = ''
                animationArea.style.marginLeft = ''
            }, 300)
        }, 300)
    }

    document.getElementById('highlightedGroup1').style.backgroundColor = ''
    document.getElementById('highlightedGroup2').style.backgroundColor = ''
    document.getElementById('highlightedGroup3').style.backgroundColor = ''

    if (type == 1) {
        selectedGroupType = 'text'
    }
    if (type == 2) {
        selectedGroupType = 'slash'
    }
    if (type == 3) {
        selectedGroupType = 'event'
    }

    setTimeout(() => {
        refreshGroups()
    document.getElementById('actionbar').innerHTML = ``
    document.getElementById('highlightedGroup' + type).style.backgroundColor = '#FFFFFF20'
    setTimeout(() => {
        animationArea.parentElement.style.overflowX = 'none'
    }, 400);
    }, 300);
}