function newObject() {
  if (lastType == 1) {
    let name = "Send Message"
    let actionFile = "sendmessage.js";

    if (selectedGroupType == "event") {
      actionFile = "sendmessage_event.js";
    }
    if (selectedGroupType == "slash") {
      name = "Reply To Interaction"
      actionFile = "interactionReply.js"
    }
    let newAct = {
      name: name,
      file: actionFile,
      data: {
        "name": "Send Message",
        "messageContent": "Hello World!",
        "storeAs": "",
        "sendTo": "Command Channel",
        "to": "",
        "actionRows": [],
        "ExtraData": "",
        "embeds": []
      },
    };
    botData.commands[lastObj].actions.push(newAct);
    botData.commands[lastObj].actions.filter(
      (e) => e != undefined || e != null,
    );
    lastAct = botData.commands[lastObj].actions.length;
    wast();
    refreshActions();
    document.getElementById(`${lastObj}Groupcount`).innerHTML =
      botData.commands[lastObj].actions.length;
    // editAction(document.getElementById('Action' + botData.commands[lastObj].count))
  } else {
    let type = "action";
    let trigger;
    let extra = {};
    if (selectedGroupType == "text") {
      trigger = "textCommand";
      extra = { boundary: { worksIn: "guild", limits: [] } };
    }
    if (selectedGroupType == "slash") {
      extra = { parameters: [], description: "" };
      trigger = "slashCommand";
    }
    if (selectedGroupType == "event") {
      extra = { eventFile: "message_create.js", eventData: ["", ""] };

      type = "event";
      trigger = "event";
    }

    let newGroup = {
      name: "",
      type: type,
      trigger: trigger,
      actions: [],
      customId: new Date().getTime(),
      ...extra
    };

    botData.commands.push(newGroup);
    lastObj = botData.commands.length;
    wast();
    refreshGroups();
  }
}
function deleteObject(obj) {
  if (obj.parentNode.id.startsWith("Action")) {
    let position = obj.parentNode.id.split("Action")[1];

    botData.commands[lastObj].actions.splice(position, 1);
    wast();
    refreshActions();
  } else {
    let position = obj.parentNode.id.split("Group")[1];
    try {
      botData.commands.splice(position, 1);
      wast();
      refreshGroups();
    } catch (err) {}

    if (selectedGroupType == 'slash') {
      setHighlightedGroup(2)
    } else if (selectedGroupType == 'text') {
      setHighlightedGroup(1)
    } else if (selectedGroupType == 'event') {
      setHighlightedGroup(3)
    }
  }
}

let timing;

var draggedGroup;
var draggedOverGroup;
function handleGroupDrag(group) {
  timing = new Date().getTime();
  draggedGroup = group.id.split("Group")[1];
}
function groupDragOverHandle(event, group) {
  group.classList.add("goofyhovereffectlite");
  /*
    placeholderGroup = document.createElement('div')
    placeholderGroup.style.animationName = 'fade'
    placeholderGroup.style.marginTop = '41px'
    placeholderGroup.style.marginBottom = '-35px'
    */
  event.preventDefault();
  draggedOverGroup = group.id.split("Group")[1];
  group.style.animationName = "";
  group.style.animationDuration = "";
  group.style.animationDelay = "";
}
function handleGroupDragEnd(group) {
  group.classList.remove("goofyhovereffectlite");
}
function handleGroupDrop(group) {
  refreshGroups();
  if (new Date().getTime() - timing < 100) return;
  let oldPosition = parseFloat(draggedGroup);
  let newPosition = parseFloat(draggedOverGroup);
  lastType = 0;

  botData.commands = moveArrayElement(
    botData.commands,
    oldPosition,
    newPosition,
  );
  wast();
  refreshGroups();
}

var draggedAction;
var draggedOverAction;
function handleActionDrag(action) {
  timing = new Date().getTime();
  draggedAction = action.id.split("Action")[1];
}
function actionDragOverHandle(event, action) {
  action.classList.add("flash");
  action.style.animationName = "";
  action.style.animationDuration = "";
  action.style.animationDuration = '0.6s';
  action.style.animationDelay = "";
  event.preventDefault();
  draggedOverAction = action.id.split("Action")[1];
}
function handleActionDragEnd(action) {
  action.classList.remove("flash");
}
function moveArrayElement(arr, old_index, new_index) {
  const element = arr[old_index];
  arr.splice(old_index, 1);
  arr.splice(new_index, 0, element);

  return arr;
}
function handleActionDrop(action) {
  refreshActions();
  if (new Date().getTime() - timing < 100) return;

  let oldPosition = parseFloat(draggedAction);
  let newPosition = parseFloat(draggedOverAction);
  lastType = 1;

  botData.commands[lastObj].actions = moveArrayElement(
    botData.commands[lastObj].actions,
    oldPosition,
    newPosition,
  );
  wast();
  refreshActions();
}

function setHighlightedGroup(type) {
  let animationArea = document.getElementById("animationArea");
  let oldGroupType;
  if (selectedGroupType == "text") {
    oldGroupType = 1;
  }
  if (selectedGroupType == "slash") {
    oldGroupType = 2;
  }
  if (selectedGroupType == "event") {
    oldGroupType = 3;
  }

  animationArea.style.transition = "all 0.2s ease";
  animationArea.parentElement.style.overflowX = "none";

  if (oldGroupType > type) {
    animationArea.style.scale = "0";
    animationArea.style.filter = "blur(12px)";
    animationArea.style.marginLeft = "-250vw";
    setTimeout(() => {
      animationArea.style.transition = "all 0s ease";
      animationArea.style.marginRight = "-250vw";
      animationArea.style.marginLeft = "";

      setTimeout(() => {
        animationArea.style.transition = "all 0.2s ease";
      }, 30);

      setTimeout(() => {
        setTimeout(() => {
          animationArea.style.scale = "";
        }, 50);
        animationArea.style.filter = "";
        animationArea.style.marginRight = "";
      }, 300);
    }, 300);
  } else if (oldGroupType < type) {
    animationArea.style.filter = "blur(12px)";
    animationArea.style.scale = "0";
    animationArea.style.marginRight = "-250vw";
    setTimeout(() => {
      animationArea.style.transition = "all 0s ease";
      animationArea.style.marginLeft = "-250vw";
      animationArea.style.marginRight = "";

      setTimeout(() => {
        animationArea.style.transition = "all 0.2s ease";
      }, 30);

      setTimeout(() => {
        setTimeout(() => {
          animationArea.style.scale = "";
        }, 50);
        animationArea.style.filter = "";
        animationArea.style.marginLeft = "";
      }, 300);
    }, 300);
  }

  document.getElementById("highlightedGroup1").style.backgroundColor = "";
  document.getElementById("highlightedGroup2").style.backgroundColor = "";
  document.getElementById("highlightedGroup3").style.backgroundColor = "";

  if (type == 1) {
    selectedGroupType = "text";
    prioritizeCommandOptions();
    document.getElementById('groupTypes').innerText = `Commands`
  }
  if (type == 2) {
    selectedGroupType = "slash";
    resetElements();
    document.getElementById('groupTypes').innerText = `Slash Commands`
  }
  if (type == 3) {
    prioritizeEvents();
    selectedGroupType = "event";
    document.getElementById('groupTypes').innerText = `Events`
  }

  setTimeout(() => {
    refreshGroups();
    document.getElementById("actionbar").innerHTML = ``;
    document.getElementById("highlightedGroup" + type).style.backgroundColor =
      "#FFFFFF20";
    setTimeout(() => {
      animationArea.parentElement.style.overflowX = "none";
    }, 400);
    setTimeout(() => {
      let cmd = botData.commands[lastObj] || {type: "", trigger: ""}
    let _groupType = cmd.type;
    let groupTrigger = cmd.trigger;
    let groupContainer = document.getElementById("groupActionsContainer")
    let endType;
    if (_groupType == "action") {
      if (groupTrigger == "textCommand" || groupTrigger == "messageContent") {
        endType = "text";
      }
      if (groupTrigger == "slashCommand") {
        endType = "slash";
      }
    } else {
      endType = "event";
    }
    if (!botData.commands[lastObj] || endType != selectedGroupType) {
      console.log(selectedGroupType, endType)
      document.getElementById('Command_Name').contentEditable = "false"
      document.getElementById('Command_Name').innerText = '-'
      document.getElementById('botData.commands[lastObj].actions').innerHTML = 'No Limits • No Events • Just Free'
      groupContainer.style.height = '0px'
      groupContainer.style.overflow = 'auto'
    } else {
      document.getElementById('Command_Name').contentEditable = "true"
      groupContainer.style.height = '33px'
    }
  }, 200);
  }, 300);
}

if (!Array.isArray(botData.commands)) {
  transferProject();

  location.reload();
}
function transferProject() {
  botData.commands = Object.values(botData.commands);
  wast();
  for (let command in botData.commands) {
    botData.commands[command].actions = Object.values(
      botData.commands[command].actions,
    );
    console.log(botData.commands[command].actions);
    wast();
    for (let action of botData.commands[command].actions) {
      try {
        let actionBase = require(`${processPath}/AppData/Actions/${action.file}`);
        for (let UIelement in actionBase.UI) {
          if (UIelement.startsWith("actions")) {
            action.data[actionBase.UI[UIelement]] = Object.values(
              action.data[actionBase.UI[UIelement]],
            );
            wast();
          }
        }
      } catch (err) {}
    }
  }
}

function storeCaretPosition(element) {
  let selection = window.getSelection();
  if (selection.rangeCount > 0) {
    let range = selection.getRangeAt(0);
    let preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(element);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    let caretOffset = preSelectionRange.toString().length;

    element.dataset.caretOffset = caretOffset;
  }
}

function restoreCaretPosition(element) {
  let caretOffset = parseInt(element.dataset.caretOffset) || 0;
  let textNode = element.firstChild;

  if (textNode && textNode.nodeType === Node.TEXT_NODE) {
    let range = document.createRange();
    range.setStart(textNode, Math.min(caretOffset, textNode.length));
    range.setEnd(textNode, Math.min(caretOffset, textNode.length));

    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

function validateInputSpaces(div) {
  storeCaretPosition(div);

  var sanitizedText = div.innerText.trim().split(" ").join("");
  sanitizedText = sanitizedText.substr(0, 32);
  console.log(sanitizedText);

  div.innerHTML = sanitizedText.toLowerCase();
  restoreCaretPosition(div);
}
