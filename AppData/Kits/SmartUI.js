function getUIelements(UIdata) {
    let extraCharacter;
    var endHTML = ``
    var menus = []
    var actions = []
    for (let element in UIdata) {
    if (element.startsWith('customMenu')) {
        if (action.data[UIdata[element].storeAs] == undefined) {
            action.data[UIdata[element].storeAs] = []
        }
        menus.push(element)
        endHTML = `${endHTML}
        <div class="textse" style="margin-bottom: -2.5vh !important;">${UIdata[element].name}</div>
        <div id="${element}AddButton" onclick="addObjectToCustomMenu('${element}')" class="addButton flexbox">
        <div class="image add"></div>
        </div>
        <div id="${UIdata[element].storeAs}" style="background-color: #FFFFFF10; transition: all 0.23s ease; margin: auto; border-radius: 9px; padding: 12px; height: 40vh; overflow: auto; width: calc(95% - 24px);" class="dimension">
            
        </div>`
    }
    if (element.startsWith('actions')) {
        actions.push(UIdata[element])
        if (action.data[UIdata[element]] == undefined) {
            action.data[UIdata[element]] = []
        }
        if (JSON.stringify(action.data[UIdata[element]]).startsWith('{')) {
            action.data[UIdata[element]] = Object.values(action.data[UIdata[element]])
        }
        endHTML = `${endHTML}
        <div onclick="createAction('${UIdata[element]}', '${element}')" class="flexbox addButton">
        <div class="image add"></div>
        </div>
        <div id="${UIdata[element]}" style="background-color: #FFFFFF10; transition: all 0.23s ease; margin: auto; border-radius: 9px; padding: 12px; height: 40vh; overflow: auto; width: calc(95% - 24px);" class="dimension">
        </div>`
    }
    if (element.startsWith('largeInput')) {
        if (action.data[UIdata[element]] == undefined) {
            action.data[UIdata[element]] = ''
        }
        endHTML = `${endHTML} <div class="largeInput" oninput="setTimeout(() => {validateLargeInput(event);}, 30)" contentEditable="true" id="${UIdata[element]}">${action.data[UIdata[element]]}</div>`
    }
    if (element.startsWith('input')) {
        var noModifiers = false;
        if (action.data[UIdata[element]] == undefined) {
            action.data[UIdata[element]] = ''
        }
        if (element.split(' ').includes('custom')) {
            noModifiers = true
            if (element.split(' ').includes('number')) {
                endHTML = `${endHTML}
                <div class="flexbox" style="width: 95vw; margin-left: auto; margin-right: auto;"><div class="flexbox" style="height: 30px; background: linear-gradient(270deg, #FFFFFF10 0%, #FFFFFF07 100%); border-radius: 2px; border-top-left-radius: 7px; border-bottom-left-radius: 7px; width: 15.5%; margin-right: 0.3vw; margin-left: auto;"><div class="barbuttontexta">Number</div></div><input type="number" id="${UIdata[element]}" class="input" style="padding-top: 15px; padding-bottom: 15px; width: 84%; margin-left: 0vw; border-radius: 2px; border-top-right-radius: 7px; border-bottom-right-radius: 7px;" oninput="if (parseFloat(this.value) < ${element.split('<min>')[1].split('</min>')[0]}) {this.value = ${element.split('<min>')[1].split('</min>')[0]}} else if (parseFloat(this.value) > ${element.split('<max>')[1].split('</max>')[0]}) {this.value = ${element.split('<max>')[1].split('</max>')[0]}} " value="${action.data[UIdata[element]]}"></div>
                `
            }
            if (element.split(' ').includes('emoji')) {
                endHTML = `${endHTML} <div contenteditable="true" id="${UIdata[element]}" oninput="setTimeout(() => {validateInput(event)}, 100)" class="input">${action.data[UIdata[element]]}</div>`
            }            
        } 
        if (noModifiers == false) {
            endHTML = `${endHTML} <div class="input" oninput="setTimeout(() => {validateInput(event);}, 30)" contentEditable="true" id="${UIdata[element]}">${action.data[UIdata[element]]}</div>`
        }
    }
    if (element.startsWith('sepbar')) {
        endHTML = `${endHTML} <div class="sepbars"></div>`
    }
    if (element == 'ButtonBar') { 
        if (action.data.button == undefined) {
            action.data.button = UIdata[element].buttons[0];
        }
        let Buttons = "";
        let ButtonConditionalInput = ''
        for (let ButtonPosition in UIdata[element].buttons) {
            let button = UIdata[element].buttons[ButtonPosition];
            extraOptions = ''

            if (UIdata[element].buttons[parseFloat(ButtonPosition) + 1] == undefined) {
                extraOptions = 'border-top-right-radius: 12px; border-bottom-right-radius: 12px;'
            }
            if (UIdata[element].buttons[ButtonPosition - 1] == undefined || UIdata[element].buttons[ButtonPosition - 1] == null) {
                extraOptions = 'border-top-left-radius: 12px; border-bottom-left-radius: 12px;'
            }
            console.log(action.data.button, button, action.data.button == button)
            if (action.data.button == button) {
                Buttons = `${Buttons}<div onclick="Bselect(this)" class="switchableButton" style="width: 23%; background-color: #FFFFFF20 !important; ${extraOptions}" id="${button}"><div class="barbuttontexta" style="margin: auto;">${button}</div></div>`
                if (button.endsWith('*')) {
                    if (action.data.ExtraData == undefined) {
                        action.data.ExtraData = ''
                    }
                    ButtonConditionalInput = `${ButtonConditionalInput} <div class="inputB" oninput="validateInput(event)" style="animation-name: startFrominput; animation-duration: 0.3s;" id="ExtraData" contenteditable="true">${action.data.ExtraData}</div>`
                }
            } else {
                Buttons = `${Buttons}<div onclick="Bselect(this)" class="switchableButton" style="${extraOptions}" id="${button}"><div class="barbuttontexta" style="margin: auto;">${button}</div></div>`
            }
            
        }
        endHTML = `${endHTML}<div class="flexbox" style="margin-left: auto; width: 100%;  margin-right: auto; align-content: center; justify-content: center;">${Buttons} ${ButtonConditionalInput}</div> <br>`
    }
    if (element.startsWith('menuBar')) {
        if (action.data[UIdata[element].storeAs] == undefined) {
            action.data[UIdata[element].storeAs] = UIdata[element].choices[0]
        }
        if (action.data[UIdata[element].extraField] == undefined) {
            action.data[UIdata[element].extraField] = ''
        }
        let foundOption = false;
        const getOption = () => {
            for (let option in UIdata[element].choices) {
                if (action.data[UIdata[element].storeAs] == UIdata[element].choices[option]) {
                    foundOption = true;
                    let MenuConditionalInput = undefined
                   if (UIdata[element].extraField) {
                    MenuConditionalInput = UIdata[element].extraField
                   }
                    endHTML = `${endHTML}<div class="dropdown" onclick="openChoices('${UIdata[element].storeAs}', this, '${MenuConditionalInput}', '${element}')">${UIdata[element].choices[option]}</div>`
                    if (UIdata[element].choices[option].endsWith('*')) {
                        if (UIdata.variableSettings[UIdata[element].extraField][UIdata[element].choices[option]] == 'actionGroup') {
                            endHTML = `${endHTML} <div class="selectBar" style="border-radius: 0px;" onblur="saveField('${UIdata[element].extraField}', '${UIdata[element].storeAs}'); updateFoundActionGroup(this)" onkeyup="saveField('${UIdata[element].extraField}', '${UIdata[element].storeAs}')" id="${MenuConditionalInput}" contenteditable="true">${action.data[UIdata[element].extraField]}</div>`
                            let selectedActionGroup = 'None'
                            for (let command in datjson.commands) {
                                if (action.data[UIdata[element].extraField]) {
                                    selectedActionGroup = datjson.commands[command].name
                                }
                            }
                            endHTML = `${endHTML}
                            <div class="actionGroupSelectorB bordertopz" id="${MenuConditionalInput}Selector" onclick="document.getElementById('${MenuConditionalInput}').focus(); setTimeout( () => {showCustomMenu(getOffset(document.getElementById('${MenuConditionalInput}')).left + 10, getOffset(document.getElementById('${MenuConditionalInput}')).top + 50)}, 300)">
                                <div class="barbuttontexta">Selected: ${selectedActionGroup}</div>
                            </div>
                            `
                        } else {
                            endHTML = `${endHTML} <div class="selectBar" oninput="validateInput(event)" onblur="saveField('${UIdata[element].extraField}', '${UIdata[element].storeAs}')" onkeyup="saveField('${UIdata[element].extraField}', '${UIdata[element].storeAs}')" id="${MenuConditionalInput}" contenteditable="true">${action.data[UIdata[element].extraField]}</div>`
                        }
                    }
                }
            }
        }
        try {
            getOption()
        } catch(err) {}
        if (foundOption == false) {
            let newOption = UIdata[element].choices[0]
            action.data[UIdata[element].storeAs] = newOption;
            getOption()
        }
    }
    if (element.startsWith('text')) {
        endHTML = `${endHTML} <div class="text">${UIdata[element]}</div>`
    }
    if (element.startsWith('btext')) {
        endHTML = `${endHTML} <div class="textse">${UIdata[element]}</div>`
    }
    if (element.startsWith('invisible')) {
        endHTML = `${endHTML} <div class="none"></div>`
    }
}
    try {
        return endHTML + '<br>'
    } finally {
        setTimeout(() => {
            for (let menu in menus) {
                refreshMenuItems(menus[menu])
            }
            for (let action in actions) {
                refreshActions(actions[action])
            }
        }, 50)

    }
}

function containsNonEmojiCharacters(str) {
    const emojiRegex = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}\u{1F3FB}-\u{1F3FF}]/u;
    for (let i = 0; i < str.length; i++) {
      if (!emojiRegex.test(str[i])) {
        return true;
      }
    }
    return false;
  }