function addObjectToMenu(element, option) {
    if (actionUI[element].max > action.data[actionUI[element].storeAs].length) {
        action.data[actionUI[element].storeAs].push({
            type: option,
            data: actionUI[element].UItypes[option].data
        });
    }
    refreshMenuItems(element);
    document.getElementById(`${element}AddButton`).style.transform = 'rotate(360deg)'
    document.getElementById(`${element}AddButton`).onclick = `refreshMenuItems('${element}')`
}

function openPopupOption(object, element) {
    let localVariables = []
    for (let UIelement in actionUI) {
        if (UIelement.startsWith('input')) {
            if (UIelement.endsWith(`!*`) || UIelement.endsWith('!')) {
                localVariables.push(document.getElementById(actionUI[UIelement]).innerText)
            }
        }
    }
    ipcRenderer.send(`${time}`, {
        event: 'openCustom',
        data: action.data[actionUI[element].storeAs][object].data,
        UI: actionUI[element].UItypes[action.data[actionUI[element].storeAs][object].type].UI,
        name: actionUI[element].UItypes[action.data[actionUI[element].storeAs][object].type].name,
        variables: [...localVariables, ...variables],
        actionType: actionType
    })
    ipcRenderer.once('menuData', (event, data) => {
        action.data[actionUI[element].storeAs][object].data = data;
    })
}
function editAction(at, actionNumber) {
    let localVariables = []
    for (let UIelement in actionUI) {
        if (UIelement.startsWith('input')) {
            if (UIelement.endsWith(`!*`) || UIelement.endsWith('!')) {
                localVariables.push(document.getElementById(actionUI[UIelement]).innerText)
            }
        }
    }

    for (let Action in action.data[at]) {
        for (let UIelement in require(`./AppData/Actions/${action.data[at][Action].file}`).UI) {
            if (UIelement.startsWith('input')) {
                if (UIelement.endsWith(`!*`) || UIelement.endsWith('!')) {
                    localVariables.push(action.data[at][Action].data[require(`./AppData/Actions/${action.data[at][Action].file}`).UI[UIelement]])
                }
            }
        }
    }
    let customId = new Date().getTime()
    ipcRenderer.send('editAction', {
        event: 'openAction',
        actions: action.data[at],
        action: actionNumber,
        variables: [...localVariables, ...variables],
        actionType: actionType,
        customId: `${customId}`
    })
    function storeActionData() {
        ipcRenderer.once(`childSave${customId}`, (event, data) => {
            console.log(data, actionNumber)
            action.data[at][actionNumber] = data;
            storeActionData()
            refreshActions(at)
        });
    }
    storeActionData();
}

function refreshMenuItems(menu) {
    let menuObject = actionUI[menu]
    let menuElement = document.getElementById(menuObject.storeAs)
    let endOptions = ``;
    menuElement.style.height = '44vh'
    menuElement.style.filter = 'blur(22px)'
    let menuMax = actionUI[menu].max 

    for (let object in action.data[menuObject.storeAs]) {
        let option = action.data[menuObject.storeAs][object];
        console.log(option, actionUI[menu])
            let typeName = actionUI[menu].UItypes[option.type].name
            console.log(typeName)
            endOptions = `${endOptions}
            <div class="dimension flexbox" style="background-color: #00000060; border-radius: 9px; width: 99%; margin: auto; margin-left: auto; margin-right: auto; margin-bottom: 1vh; padding: 3px; padding-top: 6px; padding-bottom: 6px;">
            <div class="barbuttontexta dimension" style="padding: 9px; min-width: 7vw; background-color: #FFFFFF15; border-radius: 8px; margin-left: 0.7vw; margin-right: 0.5vw;">#${object}</div>
            <div class="barbuttontexta" style="margin-left: 1vw;">${typeName}</div>
            <div class="barbuttonshift" onclick="openPopupOption('${object}', '${menu}')" style="margin-left: auto; border-radius: 9px; padding: 9px;">
            <div class="barbuttontexta">Edit</div>
            </div>
            <div class="barbuttonshift appear" onclick="deleteMenuOption('${object}', '${menu}')" style="margin: auto; width: auto !important; border-radius: 9px; padding: 9px; margin-right: 1vw; margin-left: 1vw; height: 21px !important;">
            <div class="appearabletext">Delete</div>
            <div class="image trash" style="width: 21px; height: 21px;"></div>
            </div>
            </div>
            `
    }
    setTimeout(() => {
        menuElement.style.filter = 'blur(0px)'

        setTimeout(() => {
            menuElement.style.filter = ''
        }, 200)
        menuElement.innerHTML = `<div class="flexbox" style="align-items: center; justify-content: center;">${endOptions}</div>`;
    }, 100)
    document.getElementById(`${menu}AddButton`).style.transform = 'rotate(0deg)'

    setTimeout(() => {
        document.getElementById(`${menu}AddButton`).style.transition = ''
        document.getElementById(`${menu}AddButton`).style.transition = 'all 0.3s ease'
        document.getElementById(`${menu}AddButton`).onclick = () => {addObjectToCustomMenu(menu)}
    }, 50)
}

function createAction(at, UIat) {
    action.data[at][`${Object.keys(action.data[at]).length + 1}`] = {
        name: "Send Message",
        file: "sendmessage.js",
        data: {name: "Send Message", messageContent: "Hello World!", button: "Command Channel"}
    }
    refreshActions(at)
}
let lastHovered;
function refreshActions(at) {
    let delay = 0;
    let endActions = ``
    for (let actionNumber in action.data[at]) {
        let innerAction = action.data[at][actionNumber]
        let count = 0;
        let quickie = '';
        delay++;
        let quickdata;
        let actionPreviewCharacters;
        try {
            let actionFile = require(`./AppData/Actions/${innerAction.file}`)
        try {
        quickdata = actionFile.UI;
        actionPreviewCharacters = innerAction.data[quickdata.preview].split('');
        // Not taking PRs on this one. Period.
            for (let character in actionPreviewCharacters) {
                if (count != 23) {
                    const opacity = 100 - (count - 15) * 10;
                    quickie = `${quickie}<span style="opacity: ${opacity}%;">${actionPreviewCharacters[character]}</span>`;
                    count++;
                }
            }
        } catch (err) {
            quickie = `Error`
        }
        let extrf;

        if (action.data[at][parseFloat(actionNumber) - 1] == undefined) {
            extrf = 'borderbottom';
        } else if (action.data[at][parseFloat(actionNumber) + 1] == undefined) {
            extrf = 'bordertop';
        } else {
            extrf = 'bordercentere';
        }
    
        endActions = `${endActions}
        <div onmouseenter="lastHovered = this" draggable="true" ondragleave="handleActionDragEnd('${at}', '${actionNumber}')" ondragend="handleActionDrop('${at}', '${actionNumber}')" ondragover="actionDragOverHandle(event, '${at}', '${actionNumber}')" ondragstart="handleActionDrag('${at}', '${actionNumber}')" onmouseleave="lastHovered = null;" class="action textToLeft ${extrf}" style="animation-delay: ${delay * 3}0ms" ondblclick="editAction('${at}', '${actionNumber}')">
        ${innerAction.name}
            <div style="opacity: 50%; margin-left: 7px;">
            ${quickdata.previewName}: ${quickie}</div>
            <div class="deleteActionButton" onclick="deleteAction('${at}', '${actionNumber}')">✕</div>
        </div>`;
    } catch (err) {
        document.getElementById('actionbar').innerHTML += `
        <div id="Action${action}" onmouseenter="lastHovered = this" draggable="true" ondragleave="handleActionDragEnd(this)" ondragend="handleActionDrop()" ondragover="actionDragOverHandle(event, this)" ondragstart="handleActionDrag(this)" onmouseleave="lastHovered = null;" class="action textToLeft ${extrf}" style="animation-delay: ${delay * 3}0ms" ondblclick="editAction(this)" onclick="highlight(this)">
        Error
        <div style="opacity: 50%; margin-left: 7px;"> - Action Missing</div>
        <div class="deleteActionButton" onclick="deleteObject(this)">✕</div>`;
    }
        document.getElementById(at).innerHTML = endActions
    }
}

function deleteAction(at, number) {
    let keyToRemove = number

    let filteredEntries = Object.entries(action.data[at]).filter(([key]) => key != keyToRemove);
    let newJson = {};
    for (let i = 0; i < filteredEntries.length; i++) {
      newJson[i + 1] = filteredEntries[i][1];
    }
    action.data[at] = newJson;
    refreshActions(at)
}
var actionParent;
var draggedAction;
var draggedOverAction;
function handleActionDrag(at, actionNumber) {
    draggedAction = actionNumber;
    actionParent = at;
}
function actionDragOverHandle(event, at, actionNumber) {
    if (at != actionParent) return;
    event.preventDefault()
    draggedOverAction = actionNumber
}

function handleActionDragEnd() {}

function moveUp(at, actionNumber) {
    let actionMove = action.data[at][actionNumber];
    if (action.data[at][`${parseFloat(actionNumber)-1}`] != undefined) {
        var currentAction = actionMove;
        var tempAction = action.data[at][`${parseFloat(actionNumber) - 1}`];
        action.data[at][`${parseFloat(actionNumber) - 1}`] = currentAction;
        action.data[at][actionNumber] = tempAction;
        refreshActions(at)
    }
}
function moveDown(at, actionNumber) {
    let actionMove = action.data[at][actionNumber];
    if (action.data[at][`${parseFloat(actionNumber) + 1}`] != undefined) {
        currentAction = actionMove;
        tempAction = action.data[at][`${parseFloat(actionNumber) + 1}`];
        action.data[at][`${parseFloat(actionNumber) + 1}`] = currentAction;
        action.data[at][actionNumber] = tempAction;
        refreshActions(at)
    }
}
function handleActionDrop(at, action) {
    let oldPosition = parseFloat(draggedAction)
    let newPosition = parseFloat(draggedOverAction)
    lastType = 1
    if (oldPosition <  newPosition) {
        while (newPosition != oldPosition) {
            oldPosition++
            moveUp(at, oldPosition)
            refreshActions(at)
        }
    } else {
        while (newPosition != oldPosition) {
            oldPosition--
            moveDown(at, oldPosition)
            refreshActions(at)
        }
    }
    refreshActions(at)
}