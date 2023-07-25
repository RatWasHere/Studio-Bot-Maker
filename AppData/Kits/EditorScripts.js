let kindOf;
let lastActionContainer;
function changeAction() {
    if (action.type == 'action') {
        if (action.trigger == 'textCommand' | action.trigger == 'messageContent') {
            kindOf = 'Text'
        }
        if (action.trigger == 'slashCommand') {
            kindOf = 'Slash'
        }
    } else {
        kindOf = 'Event'
    }
}
function searchFor(query) {
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
        }
      }
}
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
function setVariableIn(type, varName, elementId) {
    let element = document.getElementById(elementId);
    if (!element.isContentEditable) return
    if (type == 2) {
        insertTextAtCaret("${tempVars('" + varName + "')}")
    }
    if (type == 0) {
        element.innerHTML = `${varName}`
    }
    setTimeout(() => {
        element.focus()
        element.blur()
    }, 100)
}   
function closeWindowMenu() {
    save()
    document.getElementById('everything_container').style.scale = '0'
    document.body.style.transition = 'all 0.2s ease'
    document.body.style.backgroundColor = '#FFFFFF00'
    document.getElementById('everything_container').style.filter = 'blur(40px)'

    setTimeout(() => {
        ipcRenderer.send(`${time}`, {
        event: 'close',
        data: action.data
    });
    }, 500)
}
function mbSelect(storeAs, menu, extraField, UIreference) {
    /* storeAs = the storeAs stored as value defined by the action */
    /* menu = the menu element */
    /* extraField = the input that appears when only a certain part of an input is selected */
    /* UIreference = how the menu is defined as in the action UI file */
    cancelMenu = true;
    action.data[actionUI[UIreference].storeAs] = storeAs.innerText;

    let pending = "";

    if (document.getElementById(extraField)) {
        if (!storeAs.innerText.endsWith("*")) {
            const menuElement = document.getElementById(extraField);
            menuElement.style.animationName = "selectbarnmt2";
            menuElement.style.animationDuration = "0.5s";
            setTimeout(() => {
                menuElement.remove();
            }, 495);
        }
    } else {
        if (storeAs.innerText.endsWith("*")) {
            pending = document.createElement("div");
            pending.className = "selectBar";
            pending.id = extraField;
            pending.contentEditable = "true";
            pending.innerHTML = action.data[extraField];
            pending.oninput = (event) => {
                setTimeout(() => {validateInput(event);}, 10)
                saveField(extraField, menu);
            };
        }
    }

    const parent = storeAs.parentNode;
    const cachedParentNode = parent;
    const menuInnerHTML = storeAs.innerText;
    const cachedMenuContent = menuInnerHTML;
    const lastmenu = cachedParentNode;
    const innerHeight = cachedParentNode.clientHeight;
    lastmenu.style.animationName = "";
    lastmenu.style.animationDuration = "";
    lastmenu.style.setProperty("--inner-height", innerHeight + "px");
    lastmenu.style.animationName = "shrink";
    lastmenu.style.animationDuration = "300ms";

    setTimeout(() => {
        storeAs.parentNode.innerHTML = storeAs.innerText;
        if (pending != "" && cachedParentNode.nextSibling.className !== "selectBar") {
            pending.appendAfter(cachedParentNode);
        }
        if (document.getElementById(extraField)) {
            if (document.getElementById(extraField + "Selector")) {
                const menuChoiceSelector = document.getElementById(extraField + "Selector");
                menuChoiceSelector.style.animationName = "deleteActionGroupSelectors";
                menuChoiceSelector.style.animationDuration = "0.3s";
                setTimeout(() => {
                    menuChoiceSelector.remove();
                }, 295);
                if (document.getElementById(extraField)) {
                    document.getElementById(extraField).style.borderRadius = "";
                }
            }
        }
    }, 100);

    setTimeout(() => {
        cachedParentNode.onclick = () => {
            openChoices(menu, cachedParentNode, extraField, UIreference);
        };
        cancelMenu = false;
    }, 50);

    setTimeout(() => {
        lastmenu.style.animationName = "";
        lastmenu.style.animationDuration = "";
        if (document.getElementById(extraField + "Selector")) {
            document.getElementById(extraField + "Selector").style.animationName = "deleteActionGroupSelectors";
            document.getElementById(extraField + "Selector").style.animationDuration = "0.3s";
        }
    }, 400);
}


function closeMenu(elmett, nht, storesAs) {
    elmett.innerHTML = nht
    elmett.innerHTML = nht
    elmett.innerHTML = nht
    elmett.onclick = () => {openChoices(storesAs, elmett)}
}
let cancelMenu = false;
function openChoices(storesAs, pElm, dElement, elementStores) {
    let choices = actionUI[elementStores].choices;
    for (let option in actionUI[elementStores].choices) {
        if (choices[option] != action.data[storesAs]) {
            pElm.onclick = () => {closeMenu(storesAs, pElm, dElement, elementStores)}
            let menuElement = document.createElement('div')
            menuElement.className = 'menuBar flexbox'
            menuElement.style.textAlign = 'left'
            menuElement.style.justifyContent = 'left'
            menuElement.style.alignItems = 'left'
            menuElement.innerHTML = `<div style="width: 0.3vw; height: 10px; margin-right: 1vw; margin-top: auto; margin-bottom: auto; background-color: #FFFFFF85;"></div> ${choices[option]} `
            menuElement.onclick = () => {mbSelect(menuElement, storesAs, dElement, elementStores)}
            pElm.appendChild(menuElement)
            menuElement.style.animationName = 'inittl'
            menuElement.style.animationDuration = '0.5s'
        }
    }
}
function closeMenu(storesAs, pElm, inputStoredAs, elementStoredAs) {
    if (cancelMenu == true) return;
    pElm.style.animationName = "";
    const innerHeight = pElm.clientHeight;
    pElm.style.animationDuration = "";
    pElm.style.setProperty("--inner-height", innerHeight + "px");
    pElm.style.animationName = "shrink";
    pElm.style.animationDuration = "300ms";
    pElm.onclick = () => {
        openChoices(storesAs, pElm, inputStoredAs, elementStoredAs)
    }
    setTimeout(() => {
        pElm.innerHTML = action.data[storesAs]
        setTimeout(() => {
            pElm.style.animationName = "";
            pElm.style.animationDuration = "";
        }, 200);
    }, 100);
}
Element.prototype.appendBefore = function (element) {
    element.parentNode.insertBefore(this, element);
  },false;
  Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
  },false;

  window.oncontextmenu = function (event) {
    if (menu) {
        menu.style.transition = 'all 0.2s ease'
    }
    showCustomMenu(event.clientX, event.clientY);
    return false;     // cancel default menu
  }
function searchFor(elemnt) {
    let miss = 0;
    let kindOf;
    if (action.parentCommand.type == 'action') {
        if (action.parentCommand.trigger == 'textCommand' || action.parentCommand.trigger == 'messageContent') {
            kindOf = 'Text'
        } else {
            kindOf = 'Slash'
        }
    } else {
        kindOf = 'Event'
    }
    let actionFiles = fs.readdirSync(processPath + '\\AppData\\Actions')
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
    if (actionFile == '') {
        actionBut.innerHTML += `<div class="action" id="misss"></div>`

        for (var actionFile in actionFiles) {
            let acten = actionFiles[actionFile]
            let afile = require(`./AppData/Actions/${acten}`)
            actionButton.innerHTML += `<div class="action fade" style="width: 45%; z-index: 3; background-color: #FFFFFF10 !important;" onclick="openAction('${acten}');" id="${acten}">${afile.data.name}</div>`
            lastType = 1
    }
    const inpet = document.getElementById('searchbar');

    } 
    actionButton.innerHTML = ''
    actionButton.innerHTML += `<div class="action" id="misss"></div>`

    for (let actionFile in actionFiles) {
        let actionFile = require(`./AppData/Actions/${actionFiles[actionFile]}`);
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
            let acten = actionFiles[actionFile];
            let afile = require(`./AppData/Actions/${acten}`);
      
            actionButton.innerHTML += `<div style="width: 45%;" class="action fade flexbox" style="z-index: 3; background-color: #FFFFFF10 !important;" onclick="openAction('${acten}');" id="${acten}">${afile.data.name}</div>`;
          } else {
            miss++
        }
    document.getElementById('misss').innerHTML = miss + ' Actions Hidden (Incompatible)'
        }
      }
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
    action.file = file
    action.data = filedata.data
    action.name = filedata.data.name
    document.getElementById('actionName00').innerHTML = filedata.data.name
    var edutor = document.getElementById('edutor');
    let htmle = "<br>"
    var UIdata = null
    UIdata = JSON.parse(JSON.stringify(require(`${processPath}\\AppData\\Actions\\${file}`).UI))

    htmle = '<br>' + getUIelements(UIdata)

    edutor.innerHTML = htmle
    delete UIdata
    delete filedata
    delete htmle 
    if (action.data.actionRowElements != undefined) {
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
function Bselect(buttonElement) {
    let previousSelectedButton = document.getElementById(action.data.button);
    previousSelectedButton.style.backgroundColor = '';
    previousSelectedButton.style.width = '20%'
    buttonElement.style.width = '23%'
    buttonElement.style.backgroundColor = '#FFFFFF20';
    if (buttonElement.innerText.endsWith('*') && !previousSelectedButton.innerText.endsWith('*')) {
        var conditionalInputField = document.createElement('div')
        conditionalInputField.className = 'inputB'
        conditionalInputField.innerHTML = action.data.ExtraData
        conditionalInputField.contentEditable = 'true'
        conditionalInputField.id = 'ExtraData'
        conditionalInputField.style.animationName = 'startFrominput'
        conditionalInputField.style.animationDuration = '0.3s'
        conditionalInputField.oninput = (event) => {
            validateInput(event)
        }
        buttonElement.parentNode.appendChild(conditionalInputField) 
    }
    if (!buttonElement.innerText.endsWith('*') && previousSelectedButton.innerText.endsWith('*')) {
        document.getElementById('ExtraData').style.animationName = 'goFromInput'
        setTimeout(() => {
            document.getElementById('ExtraData').remove()
        }, 290)
    }
    lastButton = buttonElement.id
    action.data.button = buttonElement.innerText
}

let isEditingActions = false;

function restoreActions() {
    isEditingActions = false;
    for (let UIelement in actionUI) {
        if (UIelement.startsWith('actions')) {
            let targetField = document.getElementById(actionUI[UIelement])
            let targetAdd = document.getElementById(actionUI[UIelement] + 'AddButton')

            targetField.style.filter = 'blur(22px)'
            targetField.style.height = '40vh'

            setTimeout(() => {
                refreshActions(actionUI[UIelement])
            }, 150)
            
            setTimeout(() => {
                targetField.style.filter = ''
                targetAdd.style.scale = '1';
            }, 200)
        }
    }
}

function addObjectToCustomMenu(element) {
    if (actionUI[element].max > action.data[actionUI[element].storeAs].length) {

    let targetField = document.getElementById(actionUI[element].storeAs);
    if (Object.keys(actionUI[element].types).length > 1) {
        document.getElementById(`${element}AddButton`).style.transform = 'rotate(135deg)'
        document.getElementById(`${element}AddButton`).onclick = () => {refreshMenuItems(`${element}`)}
        targetField.style.filter = 'blur(22px)'
        if (Object.keys(actionUI[element].types).length < 5) {
            targetField.style.height = '10vh'
        } else
        if (Object.keys(actionUI[element].types).length > 5 && Object.keys(actionUI[element].types).length < 8) {
            targetField.style.height = '25vh'
        }
        let endHTML = ''
        for (let option in actionUI[element].types) {
            endHTML = `${endHTML}
            <div class="barbuttonshift" onclick="addObjectToMenu('${element}', '${option}')">
            <div class="barbuttontexta">${actionUI[element].types[option]}</div>
            </div>
            `
        }
        setTimeout(() => {
            targetField.style.filter = ''
        }, 200)
        setTimeout(() => {
            targetField.style.filter = 'blur(0px)'
            targetField.innerHTML = `
            <div class="barbuttontexta">${actionUI[element].name} have different types, select one!</div>
            <div class="flexbox" style="align-items: center; justify-content: center;">
            ${endHTML}
            </div>
            `
        }, 150)

    } else {
        addObjectToMenu(`${element}`, Object.keys(actionUI[element].types)[0])
    }
} else {
    document.getElementById(`${element}AddButton`).classList.add('goofyhovereffect')
    setTimeout(() => {
        document.getElementById(`${element}AddButton`).classList.remove('goofyhovereffect')
    }, 600)
}
}

function deleteMenuOption(position, menu) {
    let targetField = document.getElementById(actionUI[menu].storeAs);
    targetField.style.filter = 'blur(22px)'
    targetField.style.height = '10vh'
    action.data[actionUI[menu].storeAs].splice(position, 1)
    setTimeout(() => {
        refreshMenuItems(menu)
    }, 240)
}

function fuzzyMatch(str, pattern, accuracy) {
    pattern = pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    pattern = pattern.split("").reduce((a, b) => a + `.*${b}`, "");
  
    const regex = new RegExp(pattern, "i");
    const matchScore = str.match(regex) ? str.match(regex)[0].length : 0;
    const requiredScore = str.length * accuracy;
    
    return matchScore >= requiredScore;
}

  let cachedActions; // All compatible actions with the current type.

  function viewAllActions() {
    if (!cachedActions) {
        let type = 'Text'
        if (actionType == 'slash') {
            type = 'Slash'
        }
        if (actionType == 'event') {
            type = 'Event'
        }
        if (actionType == 'dm') {
            type = 'DM'
        }
        cachedActions = []
        let actionFiles = fs.readdirSync('./AppData/Actions');

        for (let actionFile in actionFiles) {
            let action = require('./AppData/Actions/' + actionFiles[actionFile])
            if (action.UI.compatibleWith.includes('Any') || action.UI.compatibleWith.includes(type)) {
                cachedActions.push({
                    file: actionFiles[actionFile],
                    name: action.data.name
                })
            } 
        }
    }
    document.getElementById('actionSearchCloseButton').nextElementSibling.value = ''
    document.getElementById('searchActions').innerHTML = ''
    let timeout = 0;
    for (let action in cachedActions) {
        timeout++
        const animationId = Date.now().toString(36) + Math.random().toString(36).substr(2)
        document.getElementById('searchActions').innerHTML += 
        `
        <div class="hoverablez dimension" id="${animationId}" onclick="switchOutAction('${cachedActions[action].file}')" style="border-radius: 40px; width: 29%; overflow: auto; padding: 5px; padding-left: 5px; padding-right: 5px; margin-left: 0.5vw; margin-right: 0.5vw; margin-bottom: 1vh; transition: 0.1s ease; opacity: 0%; scale: 0.7;"><div class="barbuttontexta">${cachedActions[action].name}</div></div>
        `
        setTimeout(() => {
            document.getElementById(animationId).style.opacity = '100%'
            document.getElementById(animationId).style.width = '29%'
            document.getElementById(animationId).style.scale = '1'
        }, timeout * 15)
    } 
  }

let pendingSearchStart = false;
function startSearch() {
    if (pendingSearchStart == true) return
    pendingSearchStart = true
    document.getElementById('actionSearchButton').onclick = (event) => {
        event.preventDefault()
    }
    let searchContainer = document.getElementById('selectorMenu');
    let actionView = document.getElementById('editorContent');

    searchContainer.style.transition = 'all 0.3s ease'
    actionView.style.transition = 'all 0.3s ease'

    setTimeout(() => {
        let buttonsContainer = document.getElementById('buttonsContainer');
        buttonsContainer.style.transition = 'all 0.3s ease'
        buttonsContainer.style.height = '0vh'
        buttonsContainer.style.overflow = 'auto'
        pendingSearchStart = false
    }, 200) 

    searchContainer.style.height = '85vh'

    actionView.style.scale = '0.8'
    actionView.onclick = (event) => {
        event.preventDefault()
    }
    actionView.style.borderRadius = '10px'
    actionView.style.height = '15vh'
    
    searchContainer.innerHTML += `
    <div id="actionSearchCloseButton" onclick="closeSearch()" class="barbuttonshift" style="width: 95% !important; margin: auto; margin-top: 1vh; margin-bottom: 1vh;"><div class="barbuttontexta">Close</div></div>
    <input class="input" oninput="actionSearch(this.value)" placeholder="Search" style="padding: 20px; width: 97%; padding-left: 11px; padding-right: 11px;">
    <div id="searchActions" style="height: 67vh; overflow: auto; margin-top: 2vh; align-items: center;" class="flexbox"></div>
    `
    viewAllActions()
}

function actionSearch(query) {
        if (query == '') {
            viewAllActions()
            return
        }
        document.getElementById('searchActions').innerHTML = ''
        let matchNo = 0;
        for (let action in cachedActions) {
            if (fuzzyMatch(cachedActions[action].name, query, 0.02)) {
                if (matchNo == 0) {
                    document.getElementById('searchActions').innerHTML += 
                    `
                    <div class="dimension fade" style="background-color: #FFFFFF08; padding: 7px; border-radius: 12px; width: calc(95% - 14px); margin-bottom: 2vh;">
                    <div class="barbuttontexta" style="margin-left: 1vw !important; text-align: left;">Best Match</div>
                    <div onclick="switchOutAction('${cachedActions[action].file}')" class="hoverablez dimension" style="border-radius: 40px; width: 95%; margin-left: auto !important; margin-right: auto !important; padding: 5px; padding-left: 5px; padding-right: 5px; margin-left: 0.5vw; margin-right: 0.5vw;"><div class="barbuttontexta">${cachedActions[action].name}</div></div>
                    </div>
                    `
                } else {
                    document.getElementById('searchActions').innerHTML += 
                    `
                    <div onclick="switchOutAction('${cachedActions[action].file}')" class="hoverablez dimension fade" style="border-radius: 40px; width: 29%; padding: 5px; padding-left: 5px; padding-right: 5px; margin-left: 0.5vw; margin-right: 0.5vw; margin-bottom: 1vh;"><div class="barbuttontexta">${cachedActions[action].name}</div></div>
                    `
                }

                matchNo++
            }
        }
        if (matchNo == 0) {
            document.getElementById('searchActions').innerHTML += 
            `
            <div class="dimension fade" style="background-color: #FFFFFF08; padding: 7px; border-radius: 12px; width: calc(95% - 14px); margin-bottom: 2vh;">
            <div class="barbuttontexta" style="margin-left: 1vw !important; text-align: left;">No Actions Found</div>
            <div onclick="viewAllActions()" class="hoverablez dimension" style="border-radius: 40px; width: 95%; margin-left: auto !important; margin-right: auto !important; padding: 5px; padding-left: 5px; padding-right: 5px; margin-left: 0.5vw; margin-right: 0.5vw;"><div class="barbuttontexta">View All Actions</div></div>
            </div>
            `
        }
    }

function closeSearch() {
    let closeButton = document.getElementById('actionSearchCloseButton')
    closeButton.nextElementSibling.style.transition = 'all 0.4s ease'
    closeButton.nextElementSibling.nextElementSibling.style.transition = 'all 0.4s ease'
    closeButton.nextElementSibling.style.height = '0vh'
    closeButton.nextElementSibling.nextElementSibling.style.height = '0vh'
    document.getElementById('actionSearchButton').onclick = () => {
        startSearch()
    }


    let searchContainer = document.getElementById('selectorMenu');
    let actionView = document.getElementById('editorContent');

    searchContainer.style.transition = 'all 0.3s ease'
    actionView.style.transition = 'all 0.3s ease'

    closeButton.nextElementSibling.onclick = (event) => {
        event.preventDefault()
    }

    setTimeout(() => {
        let buttonsContainer = document.getElementById('buttonsContainer');
        buttonsContainer.style.transition = 'all 0.3s ease'
        buttonsContainer.style.height = '10vh'
        buttonsContainer.style.overflow = 'auto'


        setTimeout(() => {
            closeButton.nextElementSibling.remove()
            closeButton.nextElementSibling.remove()
            closeButton.remove()
        }, 300)

    }, 300) 

    searchContainer.style.height = '10vh'

    actionView.style.scale = '1'
    actionView.onclick = (event) => {
        
    }
    actionView.style.borderRadius = '0px'
    actionView.style.height = '90vh'
}

function switchOutAction(actionFile) {
    let newAction = require(`./AppData/Actions/${actionFile}`);
    action.data = newAction.data;
    action.name = newAction.data.name;
    action.file = actionFile;
    actionUI = newAction.UI
    actions[actionNumber].data = action.data;
        document.getElementById('editorContent').innerHTML = ''
        document.getElementById('editorContent').innerHTML = "<br>" + getUIelements(newAction.UI, action)
    
    closeSearch()
}
function replaceDivInnerHTML(divId, newHTML) {
    var div = document.getElementById(divId);
    var caretPosition = getCaretPosition(div);
  
    div.innerHTML = newHTML;
  
    setCaretPosition(div, caretPosition);
  }
  
  function getCaretPosition(element) {
    var caretPos = 0;
    var sel;
    var range;
    var clonedRange;
  
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        clonedRange = range.cloneRange();
        clonedRange.selectNodeContents(element);
        clonedRange.setEnd(range.endContainer, range.endOffset);
        caretPos = clonedRange.toString().length;
      }
    } else if (document.selection && document.selection.type !== "Control") {
      range = document.selection.createRange();
      clonedRange = range.duplicate();
      clonedRange.moveToElementText(element);
      clonedRange.setEndPoint("EndToEnd", range);
      caretPos = clonedRange.text.length;
    }
  
    return caretPos;
  }
  
  function setCaretPosition(element, caretPos) {
    var range;
  
    if (document.createRange) {
      range = document.createRange();
      range.setStart(element.childNodes[0], caretPos);
      range.collapse(true);
  
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (document.selection) {
      range = document.body.createTextRange();
      range.moveToElementText(element);
      range.moveStart("character", caretPos);
      range.collapse(true);
      range.select();
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

  
  function validateLargeInput(event) {
    let offset = 0;
    if (event.key == 'Enter') {
        offset = 1;
    }
    const div = event.target;
    const text = div.innerHTML;
    
    // Remove image tags
    const sanitizedText = text.replace(/<img\b[^>]*>/gi, '');
    if (div.innerHTML == sanitizedText) return;
    replaceDivInnerHTML(div.id, div.innerText)
  }
  
  
  

  
  function saveField(fieldId) {
    let field = document.getElementById(fieldId) 
    action.data[fieldId] = field.innerText;
  }

  window.addEventListener('mousedown', function(event) {
    // Check if middle button (button number 2) is clicked
    if (event.button === 1) {
      event.preventDefault(); // Prevent default middle-click scroll behavior
    }
  });

function pasteCopiedIn(at, index) {
    action.data[at].push(copiedAction)

    if (index != undefined) {
        console.log(index)
        action.data[at] = moveArrayElement(action.data[at], action.data[at].length - 1, index + 1)
    }
    refreshActions(at)
}


function toggleSwitch(storedAs) {
    let toggle = document.getElementById(storedAs);
    toggle.style.height = '3vh'
    toggle.style.marginTop = '0vh'
    if (action.data[storedAs] == false) {
        action.data[storedAs] = true;
        toggle.style.width = '10vh'

        setTimeout(() => {
        toggle.style.marginLeft = '5vh'
        toggle.style.width = '5vh'  
        }, 150);
    } else {
        action.data[storedAs] = false;
        toggle.style.width = '10vh'
        toggle.style.marginLeft = '0vh'

        setTimeout(() => {
        toggle.style.width = '5vh'  
        }, 150);
    }
    setTimeout(() => {
        toggle.style.height = '5vh'
        toggle.style.marginTop = '-1vh'   
    }, 150);
}