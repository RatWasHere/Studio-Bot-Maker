function array_move(arr, old_index, new_index) {
if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
        arr.push(undefined);
    }
}
arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
return arr; // for testing
};
function showMenuOptions(ifNew) {
    let view = document.getElementById('actionRowEditor');
        for (let option in botData.commands[lastObj].actions[lastAct].data.actionRows[lastRow].options) {
            let opts = botData.commands[lastObj].actions[lastAct].data.actionRows[lastRow].options[option]

            if (!ifNew) {
                view.innerHTML += `
                <div onclick="editMenuOption(${option})" style="border-left: 7px #FFFFFF20 solid; background-color: #ffffff10; width: 95%; margin-right: auto; margin-left: auto; padding: 4px; margin-top: 0.7vh; border-radius: 6px;">
                <div id="${option}MenuOption" class="barbuttontexta">${opts.label}</div>
                </div>
                `
            } else {
                if (botData.commands[lastObj].actions[lastAct].data.actionRows[lastRow].options[parseFloat(option) + 1] == undefined) {
                    view.innerHTML += `  
                    <div class="animatednewactionanim" onclick="editMenuOption(${option})" style="border-left: 7px #FFFFFF20 solid; background-color: #ffffff10; width: 95%; margin-right: auto; margin-left: auto; padding: 4px; margin-top: 0.7vh; border-radius: 6px;">
                    <div id="${option}MenuOption" class="barbuttontexta">${opts.label}</div>
                    </div>
                    `
                } else {
                    view.innerHTML += `
                    <div onclick="editMenuOption(${option})" style="border-left: 7px #FFFFFF20 solid; background-color: #ffffff10; width: 95%; margin-right: auto; margin-left: auto; padding: 4px; margin-top: 0.7vh; border-radius: 6px;">
                    <div id="${option}MenuOption" class="barbuttontexta">${opts.label}</div>
                    </div>
                    `
                }
            }

        }
}
function wast() {
    fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(botData, null, 2));
}
function deleteRowBar(row) {
    botData.commands[lastObj].actions[lastAct].data.actionRows.splice(row, 1)
        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(botData, null, 2));
        showActionRows()
}
function deleteRowOption(row, option) {
    document.getElementById(option + 'MenuOption')
    botData.commands[lastObj].actions[lastAct].data.actionRows[row].options.splice(option, 1)
    fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(botData, null, 2));
    document.getElementById('actionMenuOption').innerHTML = 
    `
    <div class="barbuttontexta">Select or create a custom row to start the fun!</div>
    `
    document.getElementById('actionRowEditor').innerHTML = ''
    showMenuOptions()
}

    
setInterval(async () => {
    let presence = {}
    if (currentlyEditing == true) {
        presence.firstHeader = `Modifying Action #${lastAct} - ${botData.commands[lastObj].actions[lastAct].data.name}`
        presence.secondHeader = `Under ${botData.commands[lastObj].name}`
        presence.botName = botData.name
    } else {
        presence.firstHeader = `Viewing Commands - ${botData.commands.length} Commands in total`
        presence.secondHeader = `Highlighted: ${botData.commands[lastObj].name} - ${botData.commands[lastObj].actions.length} actions`
        presence.botName = botData.name
    }
    await fs.writeFileSync(processPath + '\\AppData\\presence.json', JSON.stringify(presence))
    ipcRenderer.send('whatIsDoing');

}, 5000)
let lastRow;
let lastDraggedComponent;
function buttonDragOver(event, button) {
    event.preventDefault()
    lastDraggedComponent = button;
}
function buttonDragStart(event, button) {
    lastDraggedComponent = null;
}
function ButtonDrop(button, row) {
    let datajson1 = JSON.parse(fs.readFileSync(processPath + '\\AppData\\data.json'));
    let datajson0 = datajson1;
    // index, 0, item
    
    botData.commands[lastObj].actions[lastAct].data.actionRows[row].components = array_move(botData.commands[lastObj].actions[lastAct].data.actionRows[row].components, button, lastDraggedComponent)

    wast()
    lastDraggedRow = null;
    document.getElementById('buttonsDisplay').innerHTML = ' '

    let ba = botData.commands[lastObj].actions[lastAct].data.actionRows[row]

    for (let button in ba.components) {

        let endProduct = 'bordercenter'
        if (ba.components[parseFloat(button) - 1] == undefined) {
            endProduct = 'borderright'
        }
        if (ba.components[parseFloat(button) + 1] == undefined) {
            endProduct = 'borderleft'
        }
        document.getElementById('buttonsDisplay').innerHTML += `
        <div class="barbuttond ${endProduct}" onclick="buttonIfy(${button}, ${row}, this)" draggable="true" ondragover="buttonDragOver(event, ${button})" ondragstart="buttonDragStart(event, ${button})" ondragend="ButtonDrop(${button}, ${row})" style="width: 17%;">
        <div class="barbuttontexta" id="${row}${button}BUT">${ba.components[button].name}</div>
        </div> 
        `
    }
    let buttonEditor = document.getElementById('buttonsEditor')
    buttonEditor.innerHTML = `
    <div class="barbuttontexta center">Select A Button!</div>
    `
}
function findMentionsOfGroup() {
    let group = botData.commands[lastObj].customId
    let mentions = []
    for (let cmd in botData.commands) {
        let command = botData.commands[cmd]
        for (let act in command.actions) {
        for (let UIelement in require(`./AppData/Actions/${command.actions[act].file}`).UI) {
            let actionUI = require(`./AppData/Actions/${command.actions[act].file}`).UI
            if (UIelement.startsWith('menuBar')) {
                try {
                    if (actionUI[UIelement].extraField) {
                        if (actionUI.variableSettings[actionUI[UIelement].extraField][command.actions[act].data[actionUI[UIelement].storeAs]] == 'actionGroup')  {
                            if (command.actions[act].data[actionUI[UIelement].extraField] == group) {
                                mentions.push(command.customId)
                            }        
                        }
                    }
                } catch (err) {}
            }  
            if (UIelement.startsWith('input')) {
                if (UIelement.endsWith('_actionGroup*') || UIelement.endsWith('_actionGroup') || UIelement.endsWith('_actionGroup!*') || UIelement.endsWith('_actionGroup!')) {
                    if (command.actions[act].data[actionUI[UIelement]] == group) {
                        mentions.push(command.customId)
                    }
                }
            }
        }

    }}
    return mentions
}

window.oncontextmenu = function (event) {
    showCustomMenu(event.clientX, event.clientY);
    return false;
}

function copyAction(id) {
    console.log(id)
    copiedAction = botData.commands[lastObj].actions[id]
}

function showCustomMenu(x, y) {
    if (!menu) {
        menu = document.createElement('div');
        document.body.appendChild(menu);
        menu.style.width = '20vw';
        menu.style.height = '27vh';
        menu.style.backgroundColor = '#00000060';
        menu.style.borderRadius = '12px';
        menu.style.backdropFilter = 'blur(12px)';
        menu.style.position = 'fixed';
        menu.className = 'dimension';
        menu.id = 'customMenu';
        menu.style.transition = 'all 0.2s ease';
        menu.style.overflowY = 'auto';
        menu.style.scale = '0'
      }

     
      
      // Calculate the maximum allowed coordinates based on window dimensions
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const menuWidth = menu.offsetWidth;
      const menuHeight = menu.offsetHeight;
      const maxX = windowWidth - menuWidth;
      const maxY = windowHeight - menuHeight;
      let adjustedScale = 1
      // Adjust the menu position if it exceeds the window boundaries
      let adjustedX = x;
      let adjustedY = y;
      if (x > maxX) {
        adjustedX = maxX;
        adjustedScale = adjustedScale - 0.1
      }
      if (y > maxY) {
        adjustedY = maxY - 48;
        adjustedScale = adjustedScale - 0.1
      }
      
      menu.style.top = adjustedY + 'px';
      menu.style.left = adjustedX + 'px';
      menu.style.scale = `${adjustedScale}`
        let variableType = 2;
        menu.innerHTML = `
        <div class="sepbars noanims"></div>
        `
    if (lastHovered) {
    if (lastHovered.id.startsWith('Group')) {
        menu.innerHTML += `
        <div class="dimension hoverablez" style="width: 95%; padding-top: 4px; padding-bottom: 4px; margin: auto; margin-bottom: 4px; margin-top: 4px; border-radius: 4px;"><div class="barbuttontexta textToLeft" style="margin-left: 1vw;">Edit Data</div></div>
        <div class="dimension hoverablez" style="width: 95%; padding-top: 4px; padding-bottom: 4px; margin: auto; margin-bottom: 4px; margin-top: 4px; border-radius: 4px;"><div class="barbuttontexta textToLeft" style="margin-left: 1vw;">Edit Actions</div></div>
        <div class="dimension hoverablez" style="width: 95%; padding-top: 4px; padding-bottom: 4px; margin: auto; margin-bottom: 4px; margin-top: 4px; border-radius: 4px;"><div class="barbuttontexta textToLeft" style="margin-left: 1vw;">Duplicate</div></div>
        `
    }
    if (lastHovered.id.startsWith('Action')) {
        menu.innerHTML += `
        <div class="dimension hoverablez" style="width: 95%; padding-top: 4px; padding-bottom: 4px; margin: auto; margin-bottom: 4px; margin-top: 4px; border-radius: 4px;"><div class="barbuttontexta textToLeft" style="margin-left: 1vw;">Edit Data</div></div>
        <div class="dimension hoverablez" onmousedown="copyAction(${lastHovered.id.split('Action')[1]})" style="width: 95%; padding-top: 4px; padding-bottom: 4px; margin: auto; margin-bottom: 4px; margin-top: 4px; border-radius: 4px;"><div class="barbuttontexta textToLeft" style="margin-left: 1vw;">Copy</div></div>
        <div class="dimension hoverablez" onmousedown="pasteActionTo(${lastHovered.id.split('Action')[1]})" style="width: 95%; padding-top: 4px; padding-bottom: 4px; margin: auto; margin-bottom: 4px; margin-top: 4px; border-radius: 4px;"><div class="barbuttontexta textToLeft" style="margin-left: 1vw;">Paste</div></div>
        `
    }
    }

}

    function pasteActionTo(index) {
        botData.commands[lastObj].actions.push(copiedAction)
        botData.commands[lastObj].actions = moveArrayElement(botData.commands[lastObj].actions, botData.commands[lastObj].actions.length - 1, parseFloat(index) + 1)
        wast()
        refreshActions()
    }

  window.oncontextmenu = function (event) {
    showCustomMenu(event.clientX, event.clientY);
    return false;
  }
  window.addEventListener('mousedown', function(event) {
    // Check if middle button (button number 2) is clicked
    if (event.button === 1) {
      event.preventDefault(); // Prevent default middle-click scroll behavior
    }
  });
  window.addEventListener('click', function(event) {
    if (menu) {
        menu.style.scale = '0'
        setTimeout(() => {
            menu.remove();
        }, 250)
      menu = null;
    }
  });
  function getOffset(el) {
      const rect = el.getBoundingClientRect();
      return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
      };
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
        if (keyEvent.key.toLowerCase() == 's' && keyEvent.ctrlKey == true) {
            if (document.getElementById('bottombar') == undefined || document.getElementById('bottombar') == null) {
                save_changes(lastAct)
            } else {
                var saveIcon = document.createElement('div');
                saveIcon.className = 'image savenm goofyhovereffect'
                saveIcon.style.backgroundImage = 'url(./AppData/save.gif)'
                saveIcon.style.marginTop = '-80vh'
                saveIcon.style.zIndex = '2147483647'

                saveIcon.style.width = '0vw'
                saveIcon.style.height = '8vh'
                saveIcon.style.transition = 'width 0.3s ease'

                saveIcon.style.width = '0vw'


                setTimeout(() => {

                saveIcon.style.width = '8vw'
                
                try {
                    savePrj()
                } catch(err) {
                    saveIcon.remove()
                }
                document.body.appendChild(saveIcon)
                setTimeout(() => {
                    saveIcon.style.width = '0vw'
                    setTimeout(() => {
                        saveIcon.remove()
                    }, 300)
                }, 200)
            }, 300)

            }
            
        }
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
    function deleteBtBar(bar) {
        botData.commands[lastObj].actions[lastAct].data.actionRows.splice(bar, 1)
        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(botData, null, 2));
        document.getElementById('buttonsDisplay').innerHTML = ''
        controlActionRows(true)
    }
    function storeBarAs(bar, meh) {
        botData.buttons.bars[bar].storeAs = meh.value
        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(botData, null, 2));
    }

    function setLinked(trfa, bar, button) {
        console.log('setting linked!')
        let dpfg = document.getElementById('dpfg')
        if (trfa == true) {
            document.getElementById('dpfgs').className = 'sepbars'
            dpfg.innerHTML = `
            <div class="barbuttontexta">Link</div>
            <input id="customLinked" class="input" style="width: 35vw; margin-bottom: 0px;" onkeydown="return event.key !== ' '; if (event.key != 'Backspace') return this.value.split('').length < 32" oninput="buttonID(${button}, this, ${bar}) setCustomLinked(this, ${bar}, ${button});" contenteditable="true" value="${botData.commands[lastObj].actions[lastAct].data.actionRows[bar].components[button].field}" placeholder="Required">
            `
        } 
        if (trfa == false) {
            document.getElementById('dpfgs').className = 'sepbars'
            dpfg.innerHTML = `
            <div class="barbuttontexta">Emoji (Format: emojiName:emojiId)</div>
            <input id="customLinked" class="input" style="width: 35vw; margin-bottom: 0px;" onkeydown="return event.key !== ' '; if (event.key != 'Backspace') return this.value.split('').length < 32" oninput="buttonID(${button}, this, ${bar}) setCustomLinked(this, ${bar}, ${button});" contenteditable="true" value="${botData.commands[lastObj].actions[lastAct].data.actionRows[bar].components[button].field}" placeholder="Optional">
            `
        }
    }
    function setCustomLinked(toWhat, bar, button) {
        botData.commands[lastObj].actions[lastAct].data.actionRows[bar].components[button].field = toWhat.value
        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(botData, null, 2));
    }
    function toggleButton(bar, button, nw) {
        botData.commands[lastObj].actions[lastAct].data.actionRows[bar].components[button].disabled = nw

        if (nw == true) {
            document.getElementById('disabledbutton').style.backgroundColor = ''
            document.getElementById('enabledbutton').style.backgroundColor = '#FFFFFF25'
        } else {
            document.getElementById('enabledbutton').style.backgroundColor = ''
            document.getElementById('disabledbutton').style.backgroundColor = '#FFFFFF25'

        }
        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(botData, null, 2));

    }

    function buttonren(button, element, bar) {
        botData.commands[lastObj].actions[lastAct].data.actionRows[bar].components[button].name = element.value
        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(botData, null, 2));
        document.getElementById(`${bar}${button}BUT`).innerHTML = element.value
    }
    function buttonID(button, element, bar) {
        botData.commands[lastObj].actions[lastAct].data.actionRows[bar].components[button].customId = element.value
        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(botData, null, 2));
    }
    function storeName(bar, meh) {
        botData.commands[lastObj].actions[lastAct].data.actionRows[bar].name = meh.innerText
        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(botData, null, 2));
    }

    function showActRows(atIndex) {
        let elm = document.getElementById('actionElements')
        elm.innerHTML = `<div class="barbuttontexta" style="margin: 5px; margin-bottom: -5px;">Select An Action Row </div> <div class="sepbars"></div>
        <div class="flexbox" style="align-items: center; width: 95%; justify-content: center; margin: auto; margin-bottom: 2vh;">
        <div class="barbuttone" onclick="showActRows(${atIndex})" style="width: 45%;"><div class="barbuttontexta">Buttons</div></div>
        <div class="barbuttone" onclick="showMenuBars(${atIndex})" style="width: 45%;"><div class="barbuttontexta">Select Menus</div></div>
        </div>
        `
        elm.style.overflowY = 'auto'
        let fdr = botData.commands[lastObj].actions[lastAct].data.actionRowElements
        for (let bar in botData.buttons.bars) {
            var buttonColors = ''
            for (let button in botData.buttons.bars[bar].buttons) {
                switch (botData.buttons.bars[bar].buttons[button].style) {
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
            <div class="issue flexbox" onclick="setButtoenBar(${bar}, ${atIndex})" style="height: auto; border-bottom: none; box-shadow: none; background-color: #ffffff15; height: 4vh; align-content: center; justify-items: center;" onclick="selectbar(${bar}, ${atIndex})">${botData.buttons.bars[bar].name} - ${botData.buttons.bars[bar].buttons.length} Buttons <div style="margin-left: 12px; align-items: center; justify-content: center;" class="flexbox">${buttonColors}</div></div>
            `
        }
    }
    

    function initSetup() {
        let commandDisplay = document.getElementById('animationArea');
        commandDisplay.style.animationName = 'moveToTheRight'
        commandDisplay.style.animationDuration = '0.35s'
        commandDisplay.style.marginLeft = '-100vw'

        let editorOptions = document.getElementById('edutor')
        editorOptions.style.animationName = 'moveToTheLeft'
        editorOptions.style.animationDuration = '0.35s'
        editorOptions.style.marginRight = '-100vw'

        document.body.innerHTML += `
        <div class="settingspane">
        <div style="padding: 12px;">
        <div class="barbuttontext" style="margin-bottom: 2vh;">Settings</div>

        <div class="flexbox">
        <div class="barbuttontexta textToLeft">Misc</div>
            <div class="sepbars" style="width: 90%;"></div>
        <div>

        <br>
        <div class="flexbox textToLeft" style="margin-left: 1vw; justify-content: left; align-items: left;">
        <div class="barbuttontexta pad outlined" style="border-radius: 12px; background-color: #FFFFFF06; margin-right: 10vw;">Autosave Frequency</div>
        <div class="barbuttontexta ml textLeft" id="120s" onclick="setAutosaveInterval(120)">120s</div>
        <div class="barbuttontexta ml textToLeft" id="60s" onclick="setAutosaveInterval(60)">60s</div>
        <div class="barbuttontexta ml textToLeft" id="30s" onclick="setAutosaveInterval(30)">30s</div>
        <div class="barbuttontexta ml textToLeft" id="0s" onclick="setAutosaveInterval(0)">On Every Change</div>
        <div class="barbuttontexta ml textToLeft" id="nulls" onclick="setAutosaveInterval(null)">Off</div>
        </div>

        </div>
        </div>

        `
        let autoSaveInterval = 60
        if (botData.autoSaveInterval) {
            let asi = botData.autoSaveInterval;
            if (asi == 30000) {
                autoSaveInterval = 30
            }
            if (asi == 120000) {
                autoSaveInterval = 60
            }
            if (asi == null) {
                autoSaveInterval = null
            }
            if (asi == 0) {
                autoSaveInterval = 0
            }
        }
        document.getElementById(`${autoSaveInterval}s`).classList.add('outlined')
        document.getElementById(`${autoSaveInterval}s`).classList.add('pad')
        }

    function setAutosaveInterval(seconds) {
        let autoSaveInterval = 60
        if (botData.autoSaveInterval) {
            let asi = botData.autoSaveInterval;
            if (asi == 30000) {
                autoSaveInterval = 30
            }
            if (asi == 60000) {
                autoSaveInterval = 60
            }
            if (asi == 120000) {
                autoSaveInterval = 120
            }
            if (asi == null) {
                autoSaveInterval = null
            }
            if (asi == 0) {
                autoSaveInterval = 0
            }
        }
        if (seconds == null) {
            botData.autoSaveInterval = null
        }
        if (seconds == 30) {
            botData.autoSaveInterval = 30000
        }
        if (seconds == 60) {
            botData.autoSaveInterval = 60000
        }
        if (seconds == 120) {
            botData.autoSaveInterval = 120000
        }
        if (seconds == 0) {
            botData.autoSaveInterval = 0
        }
        document.getElementById(`${autoSaveInterval}s`).classList.remove('outlined')
        document.getElementById(`${autoSaveInterval}s`).classList.remove('pad')
        document.getElementById(`${seconds}s`).classList.add('outlined')
        document.getElementById(`${seconds}s`).classList.add('pad')
    }
    function cmdOpen(cmdpending) {
        lastObj = cmdpending
        document.getElementById('name').innerHTML = botData.commands[cmdpending].name
    }