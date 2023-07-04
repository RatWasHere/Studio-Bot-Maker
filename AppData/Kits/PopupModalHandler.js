let restorableData = undefined;
let lastSmartButton;
const modalActionSelector = () => {
    let actions = lastTempActions;
    tempActions = lastTempActions;
    let actionEditor = document.createElement('div')
    actionEditor.style.backdropFilter = 'blur(12px)'
    actionEditor.style.backgroundColor = '#FFFFFF10'
    actionEditor.style.borderRadius = '12px'
    actionEditor.style.padding = '8px'
    actionEditor.style.zIndex = '25000'
    actionEditor.style.margin = 'auto'
    actionEditor.style.width = '90vw'
    actionEditor.style.height = '80vh'
    actionEditor.style.marginTop = '-67vh'
    actionEditor.id = 'actionbar'
    document.body.appendChild(actionEditor)
    actionEditor.innerHTML = `
    <div class="barbuttone" onclick="lastType = 1; newTempAction();" style="width: 2.7vw; height: 3.5vh; margin-left: auto; margin-right: 0.12vw;"><div class="image add"></div></div>
    <div id="actionSelector" style="height: 35vh; border-radius: 12px; overflow: auto; overflow-y: auto; padding: 9px; margin-top: 1vh; margin-bottom: 1vh; background-color: #00000060;"></div>
    <div class="flexbox">
    <div id="actionUI" style="height: 35vh; width: 80%; overflow: auto; overflow-y: auto; margin-right: 6px; transition: all 0.3s ease; border-radius: 12px; padding: 9px; background-color: #00000060;"></div>
    <div id="tempControls" style="height: 35vh; width: calc(20% - 42px); transition: all 0.3s ease; border-radius: 12px; padding: 9px; background-color: #00000060;">
    <div class="hoverablez dimension" style="height: calc(17vh - 18px); cursor: pointer; padding: 9px; border-radius: 9px; margin-bottom: 0.5vh;">
    <div class="image save" style="width: 90% !important; height: 80% !important; margin: auto;"></div>
    <div class="barbuttontexta">Save</div>
    </div>
    <div class="hoverablez dimension" style="height: calc(17.5vh - 18px); padding: 9px; cursor: pointer; border-radius: 9px;">
    <div class="barbuttontexta">Change Action</div>
    </div>

    </div>
    </div>
    `
    let delaye = 0;
    for (let action in actions) {
        let count = 0;
        let dts = '';
        let quickie = '';
        delaye++;
        let quickdata;
        let dataquick;
        try {
        quickdata = require(`./AppData/Actions/${actions[action].file}`).UI;
        dataquick = actions[action].data[quickdata.preview].split('');
            for (let vda in dataquick) {
                if (count != 23) {
                  quickie = `${quickie}${dataquick[vda]}`;
                  count++;
                } else {
                  dts = '..';
                }
            }
        } catch (err) {
            quickie = `Error`
        }
        let extrf;
        if (actions[parseFloat(action) - 1] == undefined) {
          extrf = 'borderbottom';
        } else if (actions[parseFloat(action) + 1] == undefined) {
          extrf = 'bordertop';
        } else {
          extrf = 'bordercentere';
        }
    }
    refreshModalActions()
}
function closeControls() {
  let controls = document.getElementById('tempControls')
  controls.style.width = '0%'
  controls.style.padding = '0px'
  document.getElementById('actionUI').innerHTML = ` `
  controls.style.opacity = '0%'
}
function openControls() {
  let controls = document.getElementById('tempControls')
  controls.style.width = 'calc(20% - 42px)'
  controls.style.padding = '9px'
  controls.style.opacity = '100%'
}
function newTempAction() {
    let newAct = {
        "name": "Send Message",
        "file": "sendmessage.js",
        "data": {
            
        }
    }
    delete require.cache[`./AppData/data.json`];
    lastTempActions[Object.keys(lastTempActions).length + 1] = newAct
    refreshModalActions()
}
function refreshModalActions() {
    let actions = lastTempActions;
    let delaye = 0;
    let delay = 0;
    document.getElementById('actionSelector').innerHTML = ''
    for (let action in actions) {
        let count = 0;
        let dts = '';
        let quickie = '';
        delay++;
        let quickdata;
        let dataquick;
        try {
        quickdata = require(`./AppData/Actions/${actions[action].file}`).UI;
        dataquick = actions[action].data[quickdata.preview].split('');
            for (let vda in dataquick) {
                if (count != 23) {
                  quickie = `${quickie}${dataquick[vda]}`;
                  count++;
                } else {
                  dts = '..';
                }
            }
        } catch (err) {
            quickie = `Error`
        }
        let extrf;
        if (actions[parseFloat(action) - 1] == undefined) {
          extrf = 'borderbottom';
        } else if (actions[parseFloat(action) + 1] == undefined) {
          extrf = 'bordertop';
        } else {
          extrf = 'bordercentere';
        }
        document.getElementById('actionSelector').innerHTML +=
        `<div id="Action${action}" 
        onmouseenter="lastHovered = this"
        draggable="true" ondragleave="handleActionDragEnd(this)" ondragend="handleActionDrop()"
        ondragover="actionDragOverHandle(event, this)" ondragstart="handleActionDrag(this)" 
        onmouseleave="lastHovered = null;" class="action textToLeft ${extrf}" 
        style="animation-delay: ${delay * 3}0ms" ondblclick="editAction(this)"
        onclick="handlePopupHighlight(this)">
        ${actions[action].name}
             <div style="opacity: 50%; margin-left: 7px;">
              ${`  ${quickdata.previewName}`}: ${quickie}${dts}</div>
             <div class="deleteActionButton" onclick="deleteTempAction(this)">✕</div>`
    }
    closeControls()
}
function handlePopupHighlight(action) {
      try {
        document.getElementById('edutor').innerHTML = ''
        if (restorableData == undefined) {restorableData = document.getElementById('edutor').innerHTML}
      } catch (err) {}

    let actionID = action.id.split('ion')[1]
    try {
        document.getElementById('Action' + tempLastAct).style.backgroundColor = ''
    } catch (err) {}
    action.style.backgroundColor = '#FFFFFF20'
    commandAction = lastTempActions[actionID];
    commandActions = lastTempActions;
    tempLastAct = actionID
    for (let dataElement in require('./AppData/Actions/' + commandAction.file).data) {
        if (commandAction.data[dataElement] == undefined) {
            commandAction.data[dataElement] = require('./AppData/Actions/' + commandAction.file).data[dataElement]
        }
    }
    wast()
    document.getElementById('actionUI').innerHTML = SmartUI(require('./AppData/Actions/' + commandAction.file).UI)
    openControls()
  }
