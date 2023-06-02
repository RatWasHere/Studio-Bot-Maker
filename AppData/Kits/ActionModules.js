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
            actionElement.setAttribute('id', `Action${parseFloat(lastAct)- 1}`);
            actionElement.previousSibling.setAttribute('id', `${parseFloat(lastAct)}`);
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
        if (datjson.commands[lastObj].actions[`${parseFloat(lastAct)+1}`] != undefined) {
            currentAction = actione;
            tempAction = datjson.commands[lastObj].actions[`${parseFloat(lastAct) + 1}`];
            datjson.commands[lastObj].actions[`${parseFloat(lastAct) + 1}`] = currentAction;
            datjson.commands[lastObj].actions[lastAct] = tempAction;
            actionElement = document.getElementById(`Action${lastAct}`);
            actionElement.setAttribute('id', `Action${parseFloat(lastAct) +1}`);
            actionElement.nextSibling.setAttribute('id', `Action${parseFloat(lastAct)}`);
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
            actionElement.nextSibling.setAttribute('id', `Group${parseFloat(lastObj)}`);
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