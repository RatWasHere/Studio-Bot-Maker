function addObjectToMenu(element, option) {
  if (actionUI[element].max > action.data[actionUI[element].storeAs].length) {
    action.data[actionUI[element].storeAs].push({
      type: option,
      data: actionUI[element].UItypes[option].data,
    });
    document.getElementById(actionUI[element].storeAs).style.filter = 'blur(22px)';
    setTimeout(() => {
      document.getElementById(actionUI[element].storeAs).style.filter = '';
    }, 500);
  }
  refreshMenuItems(element);
  document.getElementById(`${element}AddButton`).style.transition = `all 0.${editorSettings.commonAnimation}s ease`
  document.getElementById(`${element}AddButton`).style.transform = "rotate(360deg)";
  setTimeout(() => {
  document.getElementById(`${element}AddButton`).style.transform = "rotate(0deg)";
  document.getElementById(`${element}AddButton`).style.transition = `all 0.${editorSettings.commonAnimation}s ease`
  }, editorSettings.commonAnimation * 200);
  document.getElementById(
    `${element}AddButton`,
  ).onclick = `refreshMenuItems('${element}')`;
}

function openPopupOption(object, element) {
  let localVariables = [];
  for (let UIelement in actionUI) {
    if (UIelement.startsWith("input")) {
      if (UIelement.endsWith(`!*`) || UIelement.endsWith("!")) {
        localVariables.push(
          document.getElementById(actionUI[UIelement]).innerText,
        );
      }
    }
  }
  ipcRenderer.send(`${time}`, {
    event: "openCustom",
    data: action.data[actionUI[element].storeAs][object].data,
    UI: { ...actionUI[element].UItypes[
      action.data[actionUI[element].storeAs][object].type
    ].UI,
    script: null
  },
    name: actionUI[element].UItypes[
      action.data[actionUI[element].storeAs][object].type
    ].name,
    variables: [...localVariables, ...variables],
    actionType: actionType,
    copiedAction: copiedAction,
  });
  ipcRenderer.once("menuData", (event, data, copied) => {
    action.data[actionUI[element].storeAs][object].data = data;
    copiedAction = copied;
  }, actionUI[element].UItypes[
    action.data[actionUI[element].storeAs][object].type
  ].UI.script );
}
function editAction(at, actionNumber) {
  let localVariables = [];
  for (let UIelement in actionUI) {
    if (UIelement.startsWith("input")) {
      if (UIelement.endsWith(`!*`) || UIelement.endsWith("!")) {
        localVariables.push(
          document.getElementById(actionUI[UIelement]).innerText,
        );
      }
    }
  }

  for (let Action in action.data[at]) {
    for (let UIelement in require(`${require('process').cwd()}/AppData/Actions/${action.data[at][Action].file}`)
      .UI) {
      if (UIelement.startsWith("input")) {
        if (UIelement.endsWith(`!*`) || UIelement.endsWith("!")) {
          localVariables.push(
            action.data[at][Action].data[
              require(`${require('process').cwd()}/AppData/Actions/${action.data[at][Action].file}`).UI[
                UIelement
              ]
            ],
          );
        }
      }
    }
  }
  let customId = new Date().getTime();
  ipcRenderer.send("editAction", {
    event: "openAction",
    actions: action.data[at],
    action: actionNumber,
    variables: [...localVariables, ...variables],
    actionType: actionType,
    customId: `${customId}`,
    copiedAction: copiedAction,
  });
  function storeActionData() {
    ipcRenderer.once(`childSave${customId}`, (event, data, copied) => {
      action.data[at][actionNumber] = data;
      copiedAction = copied;
      storeActionData();
      refreshActions(at);
    });
  }
  storeActionData();
}
let draggedOverMenu, draggedPosition, draggedOverPosition;

function handleOptionDrag(position, menu) {
  draggedPosition = position;
  draggedOverMenu = menu;
}

function dragPositionOver(position, menu, event) {
  if (draggedOverMenu == menu) event.preventDefault()

  draggedOverPosition = position;
}

function handleDragOptionEnd() {
  console.log(actionUI[draggedOverMenu], draggedOverMenu)
  action.data[actionUI[draggedOverMenu].storeAs] = moveArrayElement(action.data[actionUI[draggedOverMenu].storeAs], draggedPosition, draggedOverPosition);
  refreshMenuItems(draggedOverMenu)
  draggedOverMenu = undefined;
}

function refreshMenuItems(menu) {
  let menuObject = actionUI[menu];
  let menuElement = document.getElementById(menuObject.storeAs);
  let endOptions = ``;
  menuElement.style.height = "44vh";

  for (let object in action.data[menuObject.storeAs]) {
    let option = action.data[menuObject.storeAs][object];
    let typeName = actionUI[menu].UItypes[option.type].name;
    endOptions = `${endOptions}
            <div class="dimension flexbox" draggable="true" ondragend="handleDragOptionEnd()" ondragover="dragPositionOver(${object}, '${menu}', event)" ondragstart="handleOptionDrag(${object}, '${menu}')" style="background-color: #00000060; border-radius: 9px; width: 99%; margin: auto; margin-left: auto; margin-right: auto; margin-bottom: 1vh; padding: 3px; padding-top: 6px; padding-bottom: 6px;">
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
            `;
  }
  setTimeout(() => {
    menuElement.style.filter = "blur(0px)";

    setTimeout(() => {
      menuElement.style.filter = "";
    }, 200);
    menuElement.innerHTML = `<div class="flexbox" style="align-items: center; justify-content: center;">${endOptions}</div>`;
  }, 100);
  document.getElementById(`${menu}AddButton`).style.transform = "rotate(0deg)";

  setTimeout(() => {
    document.getElementById(`${menu}AddButton`).style.transition = "";
    document.getElementById(`${menu}AddButton`).style.transition =
      "all 0.3s ease";
    document.getElementById(`${menu}AddButton`).onclick = () => {
      addObjectToCustomMenu(menu);
    };
  }, 50);
}

function createAction(at) {
  action.data[at].push({
    name: "Calculate",
    file: "calculate.js",
    data: { name: "Calculate", operation: "Addition" },
  });
  refreshActions(at);
}

let lastHovered;

function refreshActions(at) {
  let delay = 0;
  let endActions = ''
  for (let actionNumber in action.data[at]) {
    let innerAction = action.data[at][actionNumber];

    let quickie = "";
    delay++;
    let actionUI;
    let previewCharacters;
    let extrf;
    let borderType;
    if (
      action.data[at][parseFloat(actionNumber) - 1] == undefined
    ) {
      borderType = "borderbottom";
    } else if (
      action.data[at][parseFloat(actionNumber) + 1] == undefined
    ) {
      borderType = "bordertop";
    } else {
      borderType = "bordercentere";
    }

    try {
      let actionFile = require(`${require('process').cwd()}/AppData/Actions/${innerAction.file}`);
      let previewName = "";
      if (!actionFile.subtitle) {
        previewName = actionFile.UI.previewName + ":";
        try {
          let characterCount = 0;
          actionUI = actionFile.UI;
          previewCharacters =
            innerAction.data[actionUI.preview].split("");
          if (previewCharacters.length > 40) {
            for (let character in previewCharacters) {
              if (characterCount != 40) {
                const opacity = 100 - (characterCount - 30) * 10;
                quickie = `${quickie}<span style="opacity: ${opacity}%;">${previewCharacters[character]}</span>`;
                characterCount++;
              }
            }
          } else {
            quickie =
              innerAction.data[actionUI.preview];
          }
        } catch (err) {
          quickie = `Error`;
        }

      } else {
        quickie = ``;
        let subtitleActionData;
        let actionSubtitle = actionFile.subtitle;
        const subtitleRegex = /(\$\[.*?\]\$)/g;
        const replacedSubtitle = actionSubtitle.replace(
          subtitleRegex,
          (match, key) => {
            let dataName = key
              .split("$[")[1]
              .split("]$")[0]
              .replaceAll("*", "");
            console.log(innerAction);
            return innerAction.data[dataName];
          },
        );
        let previewCharacters = replacedSubtitle.replaceAll("*", "s").split("");
        let previewText = "";
        let characterCount = 0;

        if (previewCharacters.length > 40) {
          for (let character of previewCharacters) {
            if (characterCount !== 40) {
              const opacity = 100 - (characterCount - 30) * 10;
              previewText += `<span style="opacity: ${opacity}%;">${character}</span>`;
              characterCount++;
            }
          }
        } else {
          previewText = replacedSubtitle;
        }

        previewName = previewText.replaceAll("*", ""); // Add this line to assign the updated value
      }

      let leftSeparatorDisplay, rightSeparatorDisplay, subtitlePosition;

      switch (editorSettings.separatorPosition) {
        case "left":
          leftSeparatorDisplay = "none";
          rightSeparatorDisplay = "inherit";
          break;
        case "right":
          rightSeparatorDisplay = "none";
          leftSeparatorDisplay = "inherit";
          break;
        case "both":
          rightSeparatorDisplay = "inherit";
          leftSeparatorDisplay = "inherit";
          break;
      }

      switch (editorSettings.subtitlePosition) {
        case "left":
          leftSeparatorDisplay = "none";
          rightSeparatorDisplay = "inherit";
          subtitlePosition = "margin-left: 0.7vw; margin-right: auto;";
          break;
        case "right":
          rightSeparatorDisplay = "none";
          leftSeparatorDisplay = "inherit";
          subtitlePosition = "margin-right: 0vw; margin-left: auto;";
          deleteButtonStyling = 'margin-left: 0.7vw;'
          break;
        case "center":
          rightSeparatorDisplay = "inherit";
          leftSeparatorDisplay = "inherit";
          subtitlePosition = "margin-right: 0.5vw; margin-left: 0.5vw;";
          break;
      }
      if (editorSettings.separatorPosition == "none") {
        leftSeparatorDisplay = "none";
        rightSeparatorDisplay = "none";
        if (editorSettings.subtitlePosition == 'center') {
          subtitlePosition = "margin-right: auto; margin-left: auto;"
        }
      }
      
      endActions += `
      <div onmouseenter="lastHovered = ${actionNumber}" draggable="true" ondragleave="handleActionDragEnd('${at}', '${actionNumber}')" ondragend="handleActionDrop('${at}', '${actionNumber}')" ondragover="actionDragOverHandle(event, '${at}', '${actionNumber}')" ondragstart="handleActionDrag('${at}', '${actionNumber}')" onmouseleave="lastHovered = null;" class="action textToLeft ${borderType}" style="animation-delay: ${
        delay * 3
          }0ms; width: 98% !important;" ondblclick="editAction('${at}', '${actionNumber}')">
          <text style="background-color: #00000040; padding: 2px; padding-left: 4px; padding-right: 4px; margin-top: auto; margin-bottom: auto; border-radius: 6px; margin-right: 1vw; margin-left: 0vw;">#${
            parseFloat(actionNumber) + 1
          }</text>
          ${innerAction.name}
          <div style="flex-grow: 1; display: ${leftSeparatorDisplay}; height: 3px; border-radius: 10px; background-color: #ffffff15; margin: auto; margin-right: 0.5vw; margin-left: 0.5vw;"></div>
          <div style="opacity: 50%; margin-left: 7px; ${subtitlePosition}">${previewName} ${quickie}</div>
          <div style="flex-grow: 1; display: ${rightSeparatorDisplay}; height: 3px; border-radius: 10px; background-color: #ffffff15; margin: auto; margin-right: 0.5vw; margin-left: 0.5vw;"></div>
          <div class="${
            editorSettings.widthChanges == true
              ? "deleteActionButton"
              : "noWidthDelete"
          }" onclick="deleteAction('${at}', '${actionNumber}')"><span style="font-size: ${
            editorSettings.widthChanges == true
              ? "inherit"
              : "12px !important;"
          }">✕</span></div></div>`;
    } catch (err) {
      console.error(err)
      endActions = `${endActions}
        <div id="Action${actionNumber}" onmouseenter="lastHovered = this" draggable="true" ondragleave="handleActionDragEnd(this)" ondragend="handleActionDrop()" ondragover="actionDragOverHandle(event, this)" ondragstart="handleActionDrag(this)" onmouseleave="lastHovered = null;" class="action textToLeft ${extrf}" style="animation-delay: ${
          delay * 3
        }0ms; width: 98% !important;" ondblclick="editAction(this)">
        Error
        <div style="opacity: 50%; margin-left: 7px;"> - Action Missing</div>
        <div class="deleteActionButton" onclick="deleteAction('${at}', '${actionNumber}')">✕</div>
        </div>
        `;
    }
  }
  document.getElementById(at).innerHTML = endActions;
}

function deleteAction(at, number) {
  action.data[at].splice(number, 1);
  refreshActions(at);
}
var actionParent;
var draggedAction;
var draggedOverAction;
let timing;
function handleActionDrag(at, actionNumber) {
  draggedAction = actionNumber;
  actionParent = at;
  timing = new Date().getTime();
}
function actionDragOverHandle(event, at, actionNumber) {
  if (at != actionParent) return;
  event.preventDefault();
  draggedOverAction = actionNumber;
}

function handleActionDragEnd() {}

function moveArrayElement(arr, old_index, new_index) {
  const element = arr[old_index];
  arr.splice(old_index, 1);
  arr.splice(new_index, 0, element);

  return arr;
}
function handleActionDrop(at) {
  if (new Date().getTime() - timing < 100) return;

  let oldPosition = parseFloat(draggedAction);
  let newPosition = parseFloat(draggedOverAction);
  lastType = 1;

  let modifiedActions = moveArrayElement(
    action.data[at],
    oldPosition,
    newPosition,
  );

  action.data[at] = modifiedActions;
  refreshActions(at);
}

function getAbsoluteHeight(el) {
  // Get the DOM Node if you pass in a string
  el = (typeof el === 'string') ? document.querySelector(el) : el; 

  var styles = window.getComputedStyle(el);
  var margin = parseFloat(styles['marginTop']) +
               parseFloat(styles['marginBottom']);

  return Math.ceil(el.offsetHeight + margin);
}

var actionAPI = {
  showElement: (eID) => {
    let element = document.getElementById(eID);
    element.style.display = ''
  },
  hideElement: (eID) => {
    let element = document.getElementById(eID);
    element.style.display = 'none'
  },
  getData: () => {
    return action.data;
  },
  getDocument: () => {
    return document;
  },
};

