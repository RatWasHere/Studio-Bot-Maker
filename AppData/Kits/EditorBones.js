let version = 3;
const { app, ipcRenderer } = require("electron");
let selectedGroupType = "text";
let copiedAction;

const { Worker } = require('worker_threads');

function runInWorker(method) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(`
      const { parentPort } = require('worker_threads');
      parentPort.on('message', (method) => {
        try {
          method();
          parentPort.postMessage('Code execution completed.');
        } catch (error) {
          parentPort.postMessage({ error: error.message });
        }
      });
    `);

    worker.on('message', (message) => {
      if (typeof message === 'string') {
        resolve(message);
      } else {
        reject(new Error(message.error));
      }
      worker.terminate();
    });

    worker.postMessage(method.toString());
  });
}

function editAction() {
  let variables = [];
  let actionType = "text";
  if (botData.commands[lastObj].type == "event") {
    actionType = "event";
    try {
      if (
        require(processPath +"/AppData/Events/" + botData.commands[lastObj].eventFile)
          .inputSchemes == 2
      ) {
        variables.push(botData.commands[lastObj].eventData[0]);
        variables.push(botData.commands[lastObj].eventData[1]);
      } else {
        variables.push(botData.commands[lastObj].eventData[0]);
      }
    } catch (err) {
      null;
    }
  } else {
    if (botData.commands[lastObj].trigger == "slashCommand") {
      actionType = "slash";
      if (botData.commands[lastObj].parameters) {
        for (let parameter of botData.commands[lastObj].parameters) {
          variables.push(parameter.storeAs);
        }
      }
    }
  }

  for (let action in botData.commands[lastObj].actions) {
    try {
      let actionUI =
        require(`${processPath}/AppData/Actions/${botData.commands[lastObj].actions[action].file}`).UI;
      for (let UIelement in actionUI) {
        if (UIelement.startsWith("input")) {
          if (UIelement.endsWith(`!*`) || UIelement.endsWith("!")) {
            variables.push(
              botData.commands[lastObj].actions[action].data[
                actionUI[UIelement]
              ],
            );
          }
        }
      }
    } catch (err) {}
  }
  // document.body.style.opacity = '80%'

  ipcRenderer.send("editAction", {
    action: lastAct,
    actions: botData.commands[lastObj].actions,
    variables: variables,
    actionType: actionType,
    copiedAction: copiedAction,
  });
}
ipcRenderer.on("childSave", (event, data, copied) => {
  console.log(data);
  botData.commands[lastObj].actions[lastAct] = data;
  wast();
  refreshActions();
  copiedAction = copied;
});

ipcRenderer.on("childClose", () => {
  document.body.style.opacity = "100%";
});

let lastMenuOption;
let lastHovered;
let customHTMLdfs;
let customHTMLreturn;
let lastDraggedRow;
let menu = null;
let errorPending = false;
const fs = require("fs");
const processPath = require("process").cwd();
const path = require("path");
var botData = JSON.parse(fs.readFileSync(processPath + "/AppData/data.json"));
let lastType = 0; // 0 = Command; 1 = Actions;
let lastObj = "1";
let lastAct = "1";
let lastHighlighted;
let themeColor = botData.color;
if (require('process').platform == 'win32') {
  
}
let AppDataFolder;
document.body.style.background = `linear-gradient(45deg, ${themeColor} 0%, #121212 170%)`;
document.onkeydown = function (event) {
  handleKeybind(event);
};
document.documentElement.style.setProperty("--highlight-color", botData.color);

let homeFolder = require('path').join(require('os').homedir());
if (!fs.existsSync(homeFolder)) {

}
if (botData.reset == true) {
  try {
    if (fs.readFileSync("C:\\ProgramData\\studiodata.json")) {
      botData = JSON.parse(fs.readFileSync("C:\\ProgramData\\studiodata.json"));
      botData.reset = false;
      fs.writeFileSync(
        "C:\\ProgramData\\studiodata.json",
        JSON.stringify(botData, null, 2),
      );
      fs.writeFileSync(
        processPath + "/AppData/data.json",
        JSON.stringify(botData, null, 2),
      );
    } else {
      botData.reset = false;
      fs.writeFileSync(
        "C:\\ProgramData\\studiodata.json",
        JSON.stringify(botData, null, 2),
      );
    }
  } catch (err) {
    botData.reset = false;
    fs.writeFileSync(
      "C:\\ProgramData\\studiodata.json",
      JSON.stringify(botData, null, 2),
    );
  }
}

function refreshActions() {
  var delay = 0;
  document.getElementById("actionbar").innerHTML = "";
  let endHTML = ``;
  if (
    botData.commands[lastObj].actions.includes(undefined) ||
    botData.commands[lastObj].actions.includes(null)
  ) {
    botData.commands[lastObj].actions = botData.commands[
      lastObj
    ].actions.filter((e) => e != undefined || e != null);
    wast();
  }
  for (let action in botData.commands[lastObj].actions) {
    let quickie = "";
    delay++;
    let actionUI;
    let previewCharacters;
    let borderType;
    if (
      botData.commands[lastObj].actions[parseFloat(action) - 1] == undefined
    ) {
      borderType = "borderbottom";
    } else if (
      botData.commands[lastObj].actions[parseFloat(action) + 1] == undefined
    ) {
      borderType = "bordertop";
    } else {
      borderType = "bordercentere";
    }
    let actionFile;
    try {
      actionFile = require(`${processPath}/AppData/Actions/${botData.commands[lastObj].actions[action].file}`);
      let previewName = "";
      if (!actionFile.subtitle) {
        previewName = actionFile.UI.previewName + ":";
        try {
          let characterCount = 0;
          actionUI = actionFile.UI;
          previewCharacters =
            botData.commands[lastObj].actions[action].data[
              actionUI.preview
            ].split("");
          if (previewCharacters.length > 50) {
            for (let character in previewCharacters) {
              if (characterCount != 50) {
                const opacity = 100 - (characterCount - 40) * 10;
                quickie = `${quickie}<span style="opacity: ${opacity}%;">${previewCharacters[character]}</span>`;
                characterCount++;
              }
            }
          } else {
            quickie =
              botData.commands[lastObj].actions[action].data[actionUI.preview];
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
            console.log(dataName);
            return botData.commands[lastObj].actions[action].data[dataName];
          },
        );
        let previewCharacters = replacedSubtitle.replaceAll("*", "s").split("");
        let previewText = "";
        let characterCount = 0;

        if (previewCharacters.length > 75) {
          for (let character of previewCharacters) {
            if (characterCount !== 75) {
              const opacity = 100 - (characterCount - 65) * 10;
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
      let deleteButtonStyling = ''

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
      
      endHTML += `
            <div id="Action${action}" onmouseenter="lastHovered = this" draggable="true" ondragleave="handleActionDragEnd(this)" ondragend="handleActionDrop()" ondragover="actionDragOverHandle(event, this)" ondragstart="handleActionDrag(this)" onmouseleave="lastHovered = null;" class="action textToLeft ${borderType}" style="animation-delay: ${
              delay * 3
            }0ms; width: 97.5% !important;" ondblclick="editAction(this)" onclick="highlight(this)">
            <text style="background-color: #00000040; padding: 2px; padding-left: 4px; padding-right: 4px; margin-top: auto; margin-bottom: auto; border-radius: 6px; margin-right: 1vw; margin-left: 0vw;">#${
              parseFloat(action) + 1
            }</text>
            ${botData.commands[lastObj].actions[action].name}
            <div style="flex-grow: 1; display: ${leftSeparatorDisplay}; height: 3px; border-radius: 10px; background-color: #ffffff15; margin: auto; margin-right: 1vw; margin-left: 1vw;"></div>
            <div style="opacity: 50%; margin-left: 7px; ${subtitlePosition}">${previewName} ${quickie}</div>
            <div style="flex-grow: 1; display: ${rightSeparatorDisplay}; height: 3px; border-radius: 10px; background-color: #ffffff15; margin: auto; margin-right: 1vw; margin-left: 1vw;"></div>
            <div class="${
              editorSettings.widthChanges == true
                ? "deleteActionButton"
                : "noWidthDelete"
            }" onclick="deleteObject(this)" style="${deleteButtonStyling}"><span style="font-size: ${
              editorSettings.widthChanges == true
                ? "inherit"
                : "12px !important;"
            }">✕</span></div></div>`;
    } catch (err) {
      if (
        !botData.commands[lastObj].actions[action] ||
        actionFile == undefined
      ) {
        endHTML += `
                <div id="Action${action}" onmouseenter="lastHovered = this" draggable="true" ondragleave="handleActionDragEnd(this)" ondragend="handleActionDrop()" ondragover="actionDragOverHandle(event, this)" ondragstart="handleActionDrag(this)" onmouseleave="lastHovered = null;" class="action textToLeft ${borderType}" style="animation-delay: ${
                  delay * 3
                }0ms; width: 97.5% !important" ondblclick="editAction(this)" onclick="highlight(this)">
                Error
                <div style="opacity: 50%; margin-left: 7px;"> - Action Missing</div>
                <div class="deleteActionButton" onclick="deleteObject(this)">✕</div></div>`;
      }
    }
  }

  document.getElementById("actionbar").innerHTML = endHTML;
}

function refreshGroups() {
  var delay = 0;
  document.getElementById("commandbar").innerHTML = "";
  let wasGroupHighlighted = false;
  let firstCompatibleGroup;
  for (let cmd in botData.commands) {
    try {
      if (
        botData.commands[cmd].actions.includes(undefined) ||
        botData.commands[cmd].actions.includes(null)
      ) {
        botData.commands[cmd].actions = botData.commands[cmd].actions.filter(
          (e) => e != undefined || e != null,
        );
        wast();
      }
    } catch (err) {}

    let groupType = botData.commands[cmd].type;
    let groupTrigger = botData.commands[cmd].trigger;
    let endType;
    if (groupType == "action") {
      if (groupTrigger == "textCommand" || groupTrigger == "messageContent") {
        endType = "text";
      }
      if (groupTrigger == "slashCommand") {
        endType = "slash";
      }
    } else {
      endType = "event";
    }
    if (endType == selectedGroupType) {
      if (!firstCompatibleGroup) firstCompatibleGroup = cmd;
      delay++;
      document.getElementById("commandbar").innerHTML += `<div class="${
        botData.commands[cmd].color != undefined ? "coloredAction" : "action"
      } textToLeft" draggable="true" onmouseenter="lastHovered = this" ondragleave="handleGroupDragEnd(this)" ondragend="handleGroupDrop()" ondragover="groupDragOverHandle(event, this)" ondragstart="handleGroupDrag(this)" onmouseleave="lastHovered = null;" id="Group${parseFloat(
        cmd,
      )}" style="animation-delay: ${
        delay * 3
      }5ms; width: 95% !important; border-radius: 9px;" onclick="highlight(this)"><div id="${cmd}Groupname">${
        botData.commands[cmd].name
      }</div> <div style="opacity: 50%; margin-left: 7px;"> | <span id="${cmd}Groupcount">${
        botData.commands[cmd].actions.length
      }</span> Actions </div> <div class="deleteActionButton" onclick="deleteObject(this)">✕</div> `;
      if (botData.commands[cmd].color != undefined) {
        let groupColor = botData.commands[cmd].color.split(")")[0];
        try {
          if (document.getElementById(`Group${cmd}`) != undefined) {
            setTimeout(() => {
              document
                .getElementById(`Group${cmd}`)
                .addEventListener("mouseover", () => {
                  document.getElementById(`Group${cmd}`).style.backgroundColor =
                    groupColor + `, 0.17)`;
                });

              document
                .getElementById(`Group${cmd}`)
                .addEventListener("mouseout", () => {
                  if (lastObj != cmd) {
                    document.getElementById(
                      `Group${cmd}`,
                    ).style.backgroundColor = groupColor + ", 0.09)";
                  } else {
                    document.getElementById(
                      `Group${cmd}`,
                    ).style.backgroundColor = groupColor + ", 0.15)";
                  }
                });

              document
                .getElementById(`Group${cmd}`)
                .addEventListener("mousedown", () => {
                  document.getElementById(`Group${cmd}`).style.backgroundColor =
                    groupColor + `, 0.18)`;
                });
              document
                .getElementById(`Group${cmd}`)
                .addEventListener("mouseup", () => {
                  if (lastObj != cmd) {
                    document.getElementById(
                      `Group${cmd}`,
                    ).style.backgroundColor = groupColor + ", 0.09)";
                  } else {
                    document.getElementById(
                      `Group${cmd}`,
                    ).style.backgroundColor = groupColor + ", 0.17)";
                  }
                });
            }, 100);
          }
        } catch (err) {}

        document.getElementById(`Group${cmd}`).style.backgroundColor =
          botData.commands[cmd].color.split(")") + " 0.09)";
      }
      if (cmd == lastObj) {
        setTimeout(() => {
          try {
            highlight(document.getElementById(`Group${cmd}`), true, true);
            wasGroupHighlighted = true;
          } catch (err) {}
        }, 50);
      }
    }
  }
  closeCommand();
  if (!wasGroupHighlighted) {
    setTimeout(() => {
      highlight(document.getElementById(`Group${firstCompatibleGroup}`));
    }, 150);
  }
}

let commandParameters = document.getElementById("commandParameters");
let groupOptions = document.getElementById("commandOptions");
let groupEvents = document.getElementById("groupEvents");
function resetElements() {
  groupOptions.style.width = ``;
  groupOptions.style.opacity = ``;
  groupOptions.style.padding = ``;

  groupEvents.style.padding = "0px";
  groupEvents.style.opacity = "0%";
  groupEvents.style.width = "0%";
  groupEvents.innerHTML = ``;

  commandParameters.style.padding = ``;
  commandParameters.style.width = ``;
  commandParameters.style.marginRight = ``;
  commandParameters.style.opacity = ``;
}

function prioritizeCommandOptions() {
  resetElements();
  commandParameters.style.width = `0%`;
  commandParameters.style.padding = `0px`;
  commandParameters.style.opacity = `0%`;
  commandParameters.style.marginRight = "0px";

  groupOptions.style.width = "calc(95% + 4px)";
}

function prioritizeEvents() {
  resetElements();
  groupOptions.style.width = `0%`;
  groupOptions.style.padding = `0px`;
  groupOptions.style.opacity = `0%`;
  commandParameters.style.width = `0%`;
  commandParameters.style.padding = `0px`;
  commandParameters.style.opacity = `0%`;
  commandParameters.style.marginRight = "0%";

  groupEvents.style.padding = "";
  groupEvents.style.width = "calc(95% + 4px)";
  groupEvents.style.opacity = "";
  try {
    groupEvents.innerHTML = `<div style="margin: auto; margin-left: 1vw;">Triggered By: ${
      require(processPath + "/AppData/Events/" + botData.commands[lastObj].eventFile).name
    }</div><div class="image openExternally"></div>`;
  } catch (err) {
    groupEvents.innerHTML = `<div style="margin: auto; margin-left: 1vw;">Triggered By: Nothing</div><div class="image openExternally"></div>`;
  }
}

function returnToNormal() {
  resetElements();
}

function highlight(element) {
  try {
    if (element.id.startsWith("Group") == true) {
      let groupContainer = document.getElementById('groupActionsContainer')
      let _groupType = botData.commands[element.id.split("Group")[1]].type;
      let groupTrigger = botData.commands[element.id.split("Group")[1]].trigger;
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
      if (!botData.commands[element.id.split("Group")[1]] || endType != selectedGroupType) {
        console.log(selectedGroupType, endType)
        document.getElementById('Command_Name').contentEditable = "false"
        groupContainer.style.height = '0px'
        groupContainer.style.overflow = 'auto'
      } else {
        document.getElementById('Command_Name').contentEditable = "true"
        groupContainer.style.height = '33px'
      }
      try {
        if (botData.commands[lastObj].color != undefined) {
          document.getElementById(`Group${lastObj}`).style.backgroundColor =
            botData.commands[lastObj].color.split(")") + " 0.09)";
        } else {
          document.getElementById(`Group${lastObj}`).style.backgroundColor =
            "#FFFFFF15";
        }
      } catch (err) {
        console.log(err);
      }

      element.style.backgroundColor = "#FFFFFF25";
      lastObj = element.id.split("Group")[1];

      document.getElementById("Command_Name").innerText =
        botData.commands[lastObj].name;

      document.getElementById("actionsOf").innerHTML = `Actions Of ${
        element.innerText.split("|")[0]
      }`;

      if (botData.commands[lastObj].color != undefined) {
        document.getElementById("colorToggler").style.backgroundColor =
          botData.commands[lastObj].color.split(")") + " 0.15)";
        element.style.backgroundColor =
          botData.commands[lastObj].color.split(")") + " 0.15)";
      } else {
        document.getElementById("colorToggler").style.backgroundColor = "";
      }

      refreshActions();
      let groupType, extraGroupInformation;
      if (botData.commands[lastObj].type == "action") {
        let group = botData.commands[lastObj];
        switch (botData.commands[lastObj].trigger) {
          case "slashCommand":
            var permissions = "";
            groupType = "Slash Command";
            let endParameters = "No";
            if (group.parameters && group.parameters.length > 0) {
              endParameters = Object.keys(group.parameters).length;
            }
            if (group.boundary) {
              if (group.boundary.worksIn == "guild") {
                permissions = "• Guild Only";
              } else if (group.boundary.worksIn == "dm") {
                permissions = "• DMs Only";
              } else {
                permissions = "• Works Anywhere";
              }
            } else {
              permissions = "• Guild Only";
            }
            extraGroupInformation = `${endParameters} Parameters ${permissions}`;
            resetElements();
            break;
          case "textCommand":
            groupType = "Text Command";
            var permissions = "None";
            if (
              group.boundary != undefined &&
              group.boundary.limits &&
              group.boundary.limits.length != 0
            ) {
              permissions = `${group.boundary.limits.length} Permission Limits `;
            } else if (group.boundary.permissions) {
              if (group.boundary.worksIn == "guild") {
                permissions += "• Guild Only";
              } else if (group.boundary.worksIn == "dm") {
                permissions += "• DMs Only";
              } else {
                permissions += "• Works Anywhere";
              }
            } else {
              permissions = "Guild Only";
            }
            extraGroupInformation = permissions;
            prioritizeCommandOptions();

            break;
          case "messageContent":
            groupType = "Message";
        }

        document.getElementById(
          "botData.commands[lastObj].actions",
        ).innerHTML = `${groupType} • ${extraGroupInformation}`;
      } else {
        prioritizeEvents();
        document.getElementById(
          "botData.commands[lastObj].actions",
        ).innerHTML = `Event`;
      }
      botData.commands[lastObj].actions = botData.commands[lastObj].actions;

      checkErrors();
      let lastCheckedAction = null;
      for (let action in botData.commands[lastObj].actions) {
        lastCheckedAction = action;
      }
      botData.commands[lastObj].actions[lastAct] =
        botData.commands[lastObj].actions[lastAct];
    } else {
      try {
        document.getElementById(`Action${lastAct}`).style.backgroundColor =
          "#FFFFFF15";
      } catch (err) {}
      element.style.backgroundColor = "#FFFFFF25";
      lastAct = element.id.split("Action")[1];
    }
  } catch (err) {console.log(err)}
}

function openBar(iftr) {
  let bottombar = document.getElementById("bottombar");
  bottombar.style.animationDuration = "";
  bottombar.style.animationName = "";
  bottombar.style.animationDuration = "0.5s";
  bottombar.style.animationName = "expandFrom";
  bottombar.style.height = "30%";
  bottombar.style.width = "40%";
  bottombar.style.backdropFilter = "blur(22px)";
  bottombar.style.border = "#00000030 solid 2px";
  bottombar.style.marginTop = "-90vh";
  bottombar.style.zIndex = "50";
  bottombar.style.marginLeft = "30%";
  bottombar.style.borderRadius = "22px";
  bottombar.style.backgroundColor = "#3d3d3d40";
  bottombar.style.boxShadow = "#00000050 0px 0px 12px";
  if (!iftr) {
    bottombar.onclick = () => {
      unmodify();
    };
  }
  setTimeout(() => {
    bottombar.style.animationName = "";
    bottombar.style.animationDuration = "";
  }, 500);
}

function sltTxt() {
  botData.commands[lastObj].trigger = "textCommand";
  fs.writeFileSync(
    processPath + "\\AppData\\data.json",
    JSON.stringify(botData, null, 2),
  );
  checkErrors();
}
function tSlsh() {
  botData.commands[lastObj].trigger = "slashCommand";
  fs.writeFileSync(
    processPath + "\\AppData\\data.json",
    JSON.stringify(botData, null, 2),
  );
  checkErrors();
}
function sltMsg() {
  botData.commands[lastObj].trigger = "messageContent";
  fs.writeFileSync(
    processPath + "\\AppData\\data.json",
    JSON.stringify(botData, null, 2),
  );
  checkErrors();
}

let sidebarcontent = document.getElementById("sidebar").innerHTML;

function modcolor() {
  let sidebar = document.getElementById("sidebar");
  sidebar.style.width = "0vw";
  sidebar.style.overflowY = "auto";
  setTimeout(() => {
    sidebar.style.width = "40vw";
    sidebar.innerHTML = `
            <br>

            `;
    sidebar.onmouseleave = () => {
      sidebar.style.width = "0vw";
      setTimeout(() => {
        sidebar.style.width = "";
        sidebar.innerHTML = sidebarcontent;
        sidebar.style.overflowY = "";
        sidebar.onmouseleave = () => {};
      }, 300);
    };
  }, 300);
}

function brd() {
  let bottombar = document.getElementById("bottombar");

  bottombar.onclick = () => {
    document.getElementById("wedf").onclick = () => {
      switchGroups();
    };
    unmodify();
  };
}
function storetoken(what) {
  botData.btk = what;
  fs.writeFileSync(
    processPath + "\\AppData\\data.json",
    JSON.stringify(botData, null, 2),
  );
}
function storeprefix(what) {
  botData.prefix = what;
  fs.writeFileSync(
    processPath + "\\AppData\\data.json",
    JSON.stringify(botData, null, 2),
  );
}
function storeclientid(what) {
  botData.clientID = what;
  fs.writeFileSync(
    processPath + "\\AppData\\data.json",
    JSON.stringify(botData, null, 2),
  );
}
function setColor(color) {
  let themeColor = color.style.backgroundColor;
  document.body.style.backgroundImage = `linear-gradient(45deg, ${themeColor} 0%, #121212 170%)`;
  botData.color = themeColor;
  fs.writeFileSync(
    processPath + "\\AppData\\data.json",
    JSON.stringify(botData, null, 2),
  );
}
function duplicate() {
  return;
}
function setCmd() {
  botData.commands[lastObj].type = "action";
  if (botData.commands[lastObj].eventFile) {
    delete botData.commands[lastObj].eventFile;
  }
  fs.writeFileSync(
    processPath + "\\AppData\\data.json",
    JSON.stringify(botData, null, 2),
  );
  checkErrors();
}
function setEvt() {
  botData.commands[lastObj].type = "event";
  botData.commands[lastObj] = {
    ...botData.commands[lastObj],
    eventFile: "update_message.js",
    event: "Message Update",
  };
  fs.writeFileSync(
    processPath + "\\AppData\\data.json",
    JSON.stringify(botData, null, 2),
  );
  checkErrors();
}
var intervalCheck = 210;
setInterval(() => {
  const time = new Date().getTime();
  delete botData;

  var botData = JSON.parse(
    JSON.stringify(
      JSON.parse(fs.readFileSync(processPath + "\\AppData\\data.json")),
    ),
  );
  const time1 = new Date().getTime();
  if (time1 - time > 30) {
    intervalCheck = 240;
  }
  if (time1 - time < 30) {
    intervalCheck = 150;
  }
  if (time1 - time > 100) {
    intervalCheck = 350;
  }
}, intervalCheck);

function saveField(fieldId, sa) {
  let field = document.getElementById(fieldId);
  botData.commands[lastObj].actions[lastAct].data[fieldId] = field.innerText;
  fs.writeFileSync(
    processPath + "\\AppData\\data.json",
    JSON.stringify(botData, null, 2),
  );
}

(Element.prototype.appendBefore = function (element) {
  element.parentNode.insertBefore(this, element);
}),
  false;
(Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
}),
  false;

function checkErrors() {
  return;
}

function sltPrj() {
  const ipcRenderer = require("electron").ipcRenderer;

  ipcRenderer.send("selectDirectory");

  ipcRenderer.on("selectedDirectory", function (event, dir) {
    if (dir[0] == undefined) {
      location.reload();
    } else {
      console.log(dir);
      let di = fs.readFileSync(dir[0] + "\\AppData\\data.json");
      console.log("di" + di);
      botData = JSON.parse(di);
      document.getElementById(
        "opentext",
      ).innerHTML = `Opening Project <span style="color: #FFFFFF50">${
        JSON.parse(di).name
      }</span> <br> <div style="color: #FFFFFF50">Contains ${
        JSON.parse(di).count
      } action groups</div>`;
      setTimeout(() => {
        fs.writeFileSync(
          processPath + "\\AppData\\data.json",
          JSON.stringify(botData, null, 2),
        );
        location.reload();
      }, 5000);
    }
  });
  let commandDisplay = document.getElementById("animationArea");
  commandDisplay.style.animationName = "moveToTheRight";
  commandDisplay.style.animationDuration = "0.35s";
  commandDisplay.style.marginLeft = "-100vw";

  let editorOptions = document.getElementById("edutor");
  editorOptions.style.animationName = "moveToTheLeft";
  editorOptions.style.animationDuration = "0.35s";
  editorOptions.style.marginRight = "-100vw";

  document.body.innerHTML +=
    '<div class="barbuttontexta" id="opentext" style="margin-top: -10vh; position: relative; z-index: 50; text-align: center;">The editor will reload after you select your project</div>';
}


function savePrj() {
  if (botData.prjSrc != "") {
    fs.writeFileSync(
      botData.prjSrc + "\\AppData\\data.json",
      JSON.stringify(botData, null, 2),
    );
    fs.writeFileSync(
      "C:\\ProgramData\\studiodata.json",
      JSON.stringify(botData, null, 2),
    );
  } else {
    fs.writeFileSync(
      "C:\\ProgramData\\studiodata.json",
      JSON.stringify(botData, null, 2),
    );
  }
}
setInterval(() => {

  try {
    setTimeout(() => {
      elm.remove();
    }, 3000);
    savePrj();
  } catch (err) {}
}, 95000);

function closeCommand() {
  return;
}

function setProjectName(welm) {
  botData.name = welm.innerText;
  wast();
}
var lastButt;

function saveSelection() {
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      return sel.getRangeAt(0);
    }
  } else if (document.selection && document.selection.createRange) {
    return document.selection.createRange();
  }
  return null;
}

const { spawn } = require("child_process");
const { profileEnd } = require("console");

function openEvent() {
  try {
    ipcRenderer.send("editEvent", {
      name: require(processPath + "/AppData/Events/" + botData.commands[lastObj].eventFile)
        .name,
      event: botData.commands[lastObj].eventFile,
      data: botData.commands[lastObj].eventData,
    });
  } catch (err) {
    ipcRenderer.send("editEvent", {
      name: "Bot Ready",
      event: "bot_ready.js",
      data: [""],
    });
  }
}

ipcRenderer.on("eventSave", (event, eventData) => {
  console.log(eventData);
  botData.commands[lastObj].eventFile = eventData.file;
  botData.commands[lastObj].eventData = eventData.data;
});

function openPermissionEditor() {
  ipcRenderer.send("openPerms", botData.commands[lastObj]);
  ipcRenderer.once("boundaryData", (event, data) => {
    botData.commands[lastObj].boundary = data;
  });
}

function setGroupColor(elm) {
  if (elm == null) {
    botData.commands[lastObj].color = undefined;
    refreshGroups();
    return;
  }
  let color = elm.style.backgroundColor;
  botData.commands[lastObj].color = color;
  refreshGroups();
}

function toggleColorsVisibility(button) {
  if (botData.colorsVisibility == undefined) {
    botData.colorsVisibility = false;
  }
  if (botData.colorsVisibility == true) {
    document.getElementById("colorsSelector").style.width = "0%";
    document.getElementById("colorsSelector").style.padding = "0px";
    document.getElementById("colorsSelector").style.marginLeft = "-5vh";
    setTimeout(() => {
      document.getElementById("colorsSelector").style.marginLeft = "";
    }, 250);
    botData.colorsVisibility = false;
  } else {
    document.getElementById("colorsSelector").style.marginLeft = "";
    document.getElementById("colorsSelector").style.width = "90%";
    document.getElementById("colorsSelector").style.padding = "5px";
    setTimeout(() => {
      document.getElementById("colorsSelector").style.width = "85%";
    }, 250);
    botData.colorsVisibility = true;
  }
  wast();
}

function openParameters() {
  console.log("description", botData.commands[lastObj].description);
  if (!botData.commands[lastObj].description) {
    botData.commands[lastObj].description = "No Description";
  }
  ipcRenderer.send("editParameters", {
    parameters: botData.commands[lastObj].parameters || [],
    name: botData.commands[lastObj].name,
    description: botData.commands[lastObj].description,
  });
}

ipcRenderer.on("parameters", (event, parameters, description) => {
  botData.commands[lastObj].parameters = parameters;
  botData.commands[lastObj].description = description;
  console.log(description, botData.commands[lastObj].description);
  wast();
});

function wast() {
  fs.writeFileSync(
    processPath + "\\AppData\\data.json",
    JSON.stringify(botData, null, 2),
  );
  try {
    savePrj()
  } catch (err) {}
}