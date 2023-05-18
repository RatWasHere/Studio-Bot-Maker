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
    switchObjs()
    switchObjs()
}

function deleteObject(obj) {
    if (lastType == 1) {
        if (datjson.commands[lastObj].count == 1) return
        let keyToRemove = obj.parentNode.id;

        let filteredEntries = Object.entries(datjson.commands[lastObj].actions).filter(([key]) => key != keyToRemove);
        let newJson = {};
        for (let i = 0; i < filteredEntries.length; i++) {
          newJson[i + 1] = filteredEntries[i][1];
        }
        datjson.commands[lastObj].count = datjson.commands[lastObj].count - 1
        datjson.commands[lastObj].actions = newJson;
        document.getElementById(obj.parentNode.id).style.animationName = 'deleteObject';
        document.getElementById(keyToRemove).style.animationDelay = '0s'
    document.getElementById(obj.parentNode.id).style.animationDuration = '0.4s'
        setTimeout (() => {
          document.getElementById(obj.parentNode.id).remove()
            switchObjs()
            switchObjs()
    }, 390)
      } else {
        if (datjson.count == 1) return

          let keyToRemove = obj.parentNode.id;

          let filteredEntries = Object.entries(datjson.commands).filter(([key]) => key != keyToRemove);
          let newJson = {};
          for (let i = 0; i < filteredEntries.length; i++) {
            newJson[i + 1] = filteredEntries[i][1];
          }
          datjson.count = datjson.count - 1
          datjson.commands = newJson;
          document.getElementById(keyToRemove).style.animationName = 'deleteObject';
          document.getElementById(keyToRemove).style.animationDelay = '0s'
      document.getElementById(keyToRemove).style.animationDuration = '0.4s'
          setTimeout( () => {
          document.getElementById(keyToRemove).remove()
          ActionTile.innerHTML = ''
          ActionTile.className = 'actBar'
            lastObj = '1'

            ActionTile.innerHTML = ''
            switchObjs()
            switchObjs()
  }, 395)
      }


    fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2));
    checkErrors()
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

                }

        }
    fs.writeFileSync(processPath +'\\AppData\\data.json', JSON.stringify(datjson, null, 2));
    switchObjs()
    switchObjs()
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
    switchObjs()
    switchObjs()
}

function cmdOpen(cmdpending) {
    lastObj = cmdpending
    document.getElementById('name').innerHTML = datjson.commands[cmdpending].name
    switchObjs()
}  