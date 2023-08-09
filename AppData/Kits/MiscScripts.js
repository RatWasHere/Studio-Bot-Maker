let areSettingsOpen;
function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
}

function wast() {
  fs.writeFileSync(
    processPath + "\\AppData\\data.json",
    JSON.stringify(botData, null, 2),
  );
}

setInterval(async () => {
  let presence = {};
  if (currentlyEditing == true) {
    presence.firstHeader = `Modifying Action #${lastAct} - ${botData.commands[lastObj].actions[lastAct].data.name}`;
    presence.secondHeader = `Under ${botData.commands[lastObj].name}`;
    presence.botName = botData.name;
  } else {
    presence.firstHeader = `Viewing Commands - ${botData.commands.length} Commands in total`;
    presence.secondHeader = `Highlighted: ${botData.commands[lastObj].name} - ${botData.commands[lastObj].actions.length} actions`;
    presence.botName = botData.name;
  }
  await fs.writeFileSync(
    processPath + "\\AppData\\presence.json",
    JSON.stringify(presence),
  );
  ipcRenderer.send("whatIsDoing");
}, 5000);
let lastRow;
let lastDraggedComponent;

window.oncontextmenu = function (event) {
  showCustomMenu(event.clientX, event.clientY);
  return false;
};

function copyAction(id) {
  console.log(id);
  copiedAction = botData.commands[lastObj].actions[id];
}

function showCustomMenu(x, y) {
  if (!menu) {
    menu = document.createElement("div");
    document.body.appendChild(menu);
    menu.style.width = "20vw";
    menu.style.height = "27vh";
    menu.style.backgroundColor = "#00000060";
    menu.style.borderRadius = "12px";
    menu.style.backdropFilter = "blur(12px)";
    menu.style.position = "fixed";
    menu.className = "dimension";
    menu.id = "customMenu";
    menu.style.transition = "all 0.2s ease, top 0.30s cubic-bezier(0.175, 0.885, 0.32, 1.275), left 0.30s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    menu.style.overflowY = "auto";
    menu.style.scale = "0";
  }

  // Calculate the maximum allowed coordinates based on window dimensions
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const menuWidth = menu.offsetWidth;
  const menuHeight = menu.offsetHeight;
  const maxX = windowWidth - menuWidth;
  const maxY = windowHeight - menuHeight;
  let adjustedScale = 1;
  // Adjust the menu position if it exceeds the window boundaries
  let adjustedX = x;
  let adjustedY = y;
  if (x > maxX) {
    adjustedX = maxX;
    adjustedScale = adjustedScale - 0.1;
  }
  if (y > maxY) {
    adjustedY = maxY - 48;
    adjustedScale = adjustedScale - 0.1;
  }

  menu.style.top = adjustedY + "px";
  menu.style.left = adjustedX + "px";
  menu.style.scale = `${adjustedScale}`;
  menu.innerHTML = `
            <div class="sepbars noanims"></div>
            `;
  if (lastHovered) {
    if (lastHovered.id.startsWith("Group")) {
      menu.innerHTML += `
            <div class="dimension hoverablez" onclick="editRawData('${lastHovered.id.split('Group')[1]}')" style="width: 95%; padding-top: 4px; padding-bottom: 4px; margin: auto; margin-bottom: 4px; margin-top: 4px; border-radius: 4px;"><div class="barbuttontexta textToLeft" style="margin-left: 1vw;">Edit Data</div></div>
            <div class="dimension hoverablez" style="width: 95%; padding-top: 4px; padding-bottom: 4px; margin: auto; margin-bottom: 4px; margin-top: 4px; border-radius: 4px;"><div class="barbuttontexta textToLeft" style="margin-left: 1vw;">Duplicate</div></div>
            `;
    }
    if (lastHovered.id.startsWith("Action")) {
      menu.innerHTML += `
            <div class="dimension hoverablez" style="width: 95%; padding-top: 4px; padding-bottom: 4px; margin: auto; margin-bottom: 4px; margin-top: 4px; border-radius: 4px;"><div class="barbuttontexta textToLeft" style="margin-left: 1vw;">Edit Data</div></div>
            <div class="dimension hoverablez" onmousedown="copyAction(${
              lastHovered.id.split("Action")[1]
            })" style="width: 95%; padding-top: 4px; padding-bottom: 4px; margin: auto; margin-bottom: 4px; margin-top: 4px; border-radius: 4px;"><div class="barbuttontexta textToLeft" style="margin-left: 1vw;">Copy</div></div>
            <div class="dimension hoverablez" onmousedown="pasteActionTo(${
              lastHovered.id.split("Action")[1]
            })" style="width: 95%; padding-top: 4px; padding-bottom: 4px; margin: auto; margin-bottom: 4px; margin-top: 4px; border-radius: 4px;"><div class="barbuttontexta textToLeft" style="margin-left: 1vw;">Paste</div></div>
            `;
    }
  }
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
  let range;
  let offset = caretPos;
  let found = false;

  if (document.createRange) {
    range = document.createRange();
    for (const node of element.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (offset <= node.textContent.length) {
          range.setStart(node, offset);
          found = true;
          break;
        } else {
          offset -= node.textContent.length;
        }
      }
    }

    if (!found) {
      range.setStart(element, element.childNodes.length);
    }

    range.collapse(true);

    const sel = window.getSelection();
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

function editRawData(group) {
  menu.remove()
  document.body.innerHTML += `
  
  <div class="flexbox" style="z-index: 1000; margin-left: auto; margin-right: auto; width: 98vw; height: 90vh; backdrop-filter: blur(22px); margin-top: -96vh; border-radius: 12px; background-color: #00000060">
    <textarea contenteditable="true" id="rawdata" class="noanims" style="font-family: Consolas, 'Courier New', monospace; height: 80vh; margin: auto; margin-top: 1vh; width: 98%;">
    ${JSON.stringify(botData.commands[group], null, 2)}
    </textarea>
    <div class="barbuttonshift" onclick="this.parentElement.remove()"><btext>Exit</btext></div>
    <div class="barbuttonshift" onclick="botData.commands[${group}] = JSON.parse(document.getElementById('rawdata').value); refreshGroups()"><btext>Upload</btext></div>
  </div>
  `
}

function pasteActionTo(index) {
  botData.commands[lastObj].actions.push(copiedAction);
  botData.commands[lastObj].actions = moveArrayElement(
    botData.commands[lastObj].actions,
    botData.commands[lastObj].actions.length - 1,
    parseFloat(index) + 1,
  );
  wast();
  refreshActions();
}

window.oncontextmenu = function (event) {
  showCustomMenu(event.clientX, event.clientY);
  return false;
};
window.addEventListener("mousedown", function (event) {
  // Check if middle button (button number 2) is clicked
  if (event.button === 1) {
    event.preventDefault(); // Prevent default middle-click scroll behavior
  }
});
window.addEventListener("click", function (event) {
  if (menu) {
    menu.style.scale = "0";
    setTimeout(() => {
      menu.remove();
    }, 250);
    menu = null;
  }
});
function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}
function handleKeybind(keyEvent) {
  if (keyEvent.key == "Escape") {
    if (
      document.getElementById("bottombar") == undefined ||
      document.getElementById("bottombar") == null
    ) {
      null;
    } else {
      if (document.getElementById("bottombar").style.width == "40%") {
        unmodify();
      }
      if (document.getElementById("bottombar").style.width == "100vw") {
        closeMenu();
      }
    }
  }
  if (keyEvent.key.toLowerCase() == "s" && keyEvent.ctrlKey == true) {
      var saveIcon = document.createElement("div");
      saveIcon.className = "image savenm goofyhovereffect";
      saveIcon.style.backgroundImage = "url(./AppData/save.gif)";
      saveIcon.style.marginTop = "-80vh";
      saveIcon.style.zIndex = "2147483647";

      saveIcon.style.width = "0vw";
      saveIcon.style.height = "8vh";
      saveIcon.style.transition = "width 0.3s ease";

      saveIcon.style.width = "0vw";

      setTimeout(() => {
        saveIcon.style.width = "8vw";

        try {
          savePrj();
        } catch (err) {
          saveIcon.remove();
        }
        document.body.appendChild(saveIcon);
        setTimeout(() => {
          saveIcon.style.width = "0vw";
          setTimeout(() => {
            saveIcon.remove();
          }, 300);
        }, 200);
      }, 300);
    }
}
function closeMenu() {
  let bottombar = document.getElementById("bottombar");
  bottombar.style.animationDuration = "0.4s";
  bottombar.style.animationName = "menuExpand";
  bottombar.style.height = "";
  bottombar.style.width = "";
  bottombar.style.backdropFilter = "";
  bottombar.style.marginTop = "";
  bottombar.style.border = "";
  bottombar.style.marginLeft = "";
  bottombar.style.borderRadius = "";
  bottombar.style.backgroundColor = "";
  bottombar.style.padding = "";
  bottombar.style.paddingTop = "";
  bottombar.style.paddingBottom = "";

  setTimeout(() => {
    bottombar.onclick = () => {
      modifyBar();
    };
  }, 500);

  setTimeout(() => {
    bottombar.innerHTML = "•••";
    bottombar.style.animationName = "";
    bottombar.style.animationDuration = "";
  }, 400);
}


function initSetup() {
  if (areSettingsOpen) return;
  areSettingsOpen = true;
  let commandDisplay = document.getElementById("animationArea");
  commandDisplay.style.marginLeft = "-200vw";

  let editorOptions = document.getElementById("edutor");
  editorOptions.style.marginRight = "-200vw";

  document.body.innerHTML += `
            <div class="settingspane">
            <div class="flexbox">
            <div class="barbuttonshift flexbox" onclick="location.reload()" style="margin-left: 1vw; margin-top: 2vh; width: 10vw;">
            <btext>Exit</btext>
            </div>
            <div class="image" style="background-image: url(./icon.png); height: 5vh; width: 5vh; margin: auto; margin-right: 1vw !important;"></div>
            <div class="barbuttontext" style="margin: auto; margin-right: 1vw; margin-left: 0px; opacity: 50%;">Studio Bot Maker</div>
           </div>


            <div  class="flexbox" style="padding: 12px; margin: auto;">

            <btext style="width: 100%;">Bot Data</btext>
            <div style="margin-bottom: 0.5vh; background-color: #FFFFFF09; width: 70vw; border-radius: 12px; display: block;">
            <br>
            <div class="barbuttontexta textToLeft" style="margin-left: 3vw; margin-top: 1.5vh;">Bot Prefix</div>
            <input class="input" oninput="botData.prefix = this.value; wast()" value="${botData.prefix}">
            <div class="barbuttontexta textToLeft" style="margin-left: 3vw; margin-top: 1.5vh;">Bot Token</div>
            <input class="input" type="password" style="overflow-y: auto; overflow-x: hidden;" oninput="botData.btk = this.value; wast()" value="${botData.btk}">
            <div class="barbuttontexta textToLeft" style="margin-left: 3vw; margin-top: 1.5vh;">Client ID</div>
            <input class="input" type="number" oninput="botData.clientID = this.value; wast()" value="${botData.clientID}">
            <br>
            </div>
            <br>
            <div class="sepbarz"></div>


            <btext style="width: 100%;">Editor</btext>
            <div id="actionPreviews"></div>
            <div id="actionPreviewPosition"></div>
            <div id="actionPreviewSeparator"></div>
            <div id="actionSearch"></div>
            <text style="width: 100%; text-align: center;">Action Preview Position can overwrite Action Separator Position</text>

            <div class="sepbarz"></div>
            <btext style="width: 100%;">Visuals</btext>
            <div id="prefferedActionPane"></div>
            <div id="anag"></div>
            <div id="coloringsmoothness"></div>
            <br>
            <btext style="width: 100%;">Color</btext>
            <div class="flexbox" style="width: calc(75% - 24px); padding: 12px; border-radius: 12px; background-color: #FFFFFF10;">
            <div class="colorTile" onmouseenter="setTimeout(() => {this.firstChild.className = 'colorTileText breatheWidth'}, 200)" onmouseleave="this.firstChild.className = 'colorTileText'; this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.classList.remove('breatheWidth'); this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.style.width = '';}, 150)}, 200);" onclick="setColor(this)" style="background-color: #000000;"><div class="colorTileText">Lights Off</div></div>
            <div class="colorTile" onmouseenter="setTimeout(() => {this.firstChild.className = 'colorTileText breatheWidth'}, 200)" onmouseleave="this.firstChild.className = 'colorTileText'; this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.classList.remove('breatheWidth'); this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.style.width = '';}, 150)}, 200);" onclick="setColor(this)" style="background-color: #0b0014;"><div class="colorTileText">Ultraviolet</div></div>
            <div class="colorTile" onmouseenter="setTimeout(() => {this.firstChild.className = 'colorTileText breatheWidth'}, 200)" onmouseleave="this.firstChild.className = 'colorTileText'; this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.classList.remove('breatheWidth'); this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.style.width = '';}, 150)}, 200);" onclick="setColor(this)" style="background-color: #170011;"><div class="colorTileText">Soothing Cherry</div></div>
            <div class="colorTile" onmouseenter="setTimeout(() => {this.firstChild.className = 'colorTileText breatheWidth'}, 200)" onmouseleave="this.firstChild.className = 'colorTileText'; this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.classList.remove('breatheWidth'); this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.style.width = '';}, 150)}, 200);" onclick="setColor(this)" style="background-color: #170006;"><div class="colorTileText">Strawberry</div></div>
            <div class="colorTile" onmouseenter="setTimeout(() => {this.firstChild.className = 'colorTileText breatheWidth'}, 200)" onmouseleave="this.firstChild.className = 'colorTileText'; this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.classList.remove('breatheWidth'); this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.style.width = '';}, 150)}, 200);" onclick="setColor(this)" style="background-color: #170000;"><div class="colorTileText">Bloodshot Pink</div></div>
            <div class="colorTile" onmouseenter="setTimeout(() => {this.firstChild.className = 'colorTileText breatheWidth'}, 200)" onmouseleave="this.firstChild.className = 'colorTileText'; this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.classList.remove('breatheWidth'); this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.style.width = '';}, 150)}, 200);" onclick="setColor(this)" style="background-color: #170701;"><div class="colorTileText">Wood</div></div>
            <div class="colorTile" onmouseenter="setTimeout(() => {this.firstChild.className = 'colorTileText breatheWidth'}, 200)" onmouseleave="this.firstChild.className = 'colorTileText'; this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.classList.remove('breatheWidth'); this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.style.width = '';}, 150)}, 200);" onclick="setColor(this)" style="background-color: #170f00;"><div class="colorTileText">Golden Apple</div></div>
            <div class="colorTile" onmouseenter="setTimeout(() => {this.firstChild.className = 'colorTileText breatheWidth'}, 200)" onmouseleave="this.firstChild.className = 'colorTileText'; this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.classList.remove('breatheWidth'); this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.style.width = '';}, 150)}, 200);" onclick="setColor(this)" style="background-color: #241212;"><div class="colorTileText">Anger</div></div>
            <div class="colorTile" onmouseenter="setTimeout(() => {this.firstChild.className = 'colorTileText breatheWidth'}, 200)" onmouseleave="this.firstChild.className = 'colorTileText'; this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.classList.remove('breatheWidth'); this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.style.width = '';}, 150)}, 200);" onclick="setColor(this)" style="background-color: #361d1d;"><div class="colorTileText">Salmon</div></div>
            <div class="colorTile" onmouseenter="setTimeout(() => {this.firstChild.className = 'colorTileText breatheWidth'}, 200)" onmouseleave="this.firstChild.className = 'colorTileText'; this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.classList.remove('breatheWidth'); this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.style.width = '';}, 150)}, 200);" onclick="setColor(this)" style="background-color: #24121d;"><div class="colorTileText">Lilac</div></div>
            <div class="colorTile" onmouseenter="setTimeout(() => {this.firstChild.className = 'colorTileText breatheWidth'}, 200)" onmouseleave="this.firstChild.className = 'colorTileText'; this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.classList.remove('breatheWidth'); this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.style.width = '';}, 150)}, 200);" onclick="setColor(this)" style="background-color: #262626;"><div class="colorTileText">Smoke</div></div>
            <div class="colorTile" onmouseenter="setTimeout(() => {this.firstChild.className = 'colorTileText breatheWidth'}, 200)" onmouseleave="this.firstChild.className = 'colorTileText'; this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.classList.remove('breatheWidth'); this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.style.width = '';}, 150)}, 200);" onclick="setColor(this)" style="background-color: #141414;"><div class="colorTileText">Gray</div></div>
            <div class="colorTile" onmouseenter="setTimeout(() => {this.firstChild.className = 'colorTileText breatheWidth'}, 200)" onmouseleave="this.firstChild.className = 'colorTileText'; this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.classList.remove('breatheWidth'); this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.style.width = '';}, 150)}, 200);" onclick="setColor(this)" style="background-color: #261300;"><div class="colorTileText">Garfield</div></div>
            <div class="colorTile" onmouseenter="setTimeout(() => {this.firstChild.className = 'colorTileText breatheWidth'}, 200)" onmouseleave="this.firstChild.className = 'colorTileText'; this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.classList.remove('breatheWidth'); this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.style.width = '';}, 150)}, 200);" onclick="setColor(this)" style="background-color: #122324;"><div class="colorTileText">Shiny Forest</div></div>
            <div class="colorTile" onmouseenter="setTimeout(() => {this.firstChild.className = 'colorTileText breatheWidth'}, 200)" onmouseleave="this.firstChild.className = 'colorTileText'; this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.classList.remove('breatheWidth'); this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.style.width = '';}, 150)}, 200);" onclick="setColor(this)" style="background-color: #000814;"><div class="colorTileText">Navy Blue</div></div>
            <div class="colorTile" onmouseenter="setTimeout(() => {this.firstChild.className = 'colorTileText breatheWidth'}, 200)" onmouseleave="this.firstChild.className = 'colorTileText'; this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.classList.remove('breatheWidth'); this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.style.width = '';}, 150)}, 200);" onclick="setColor(this)" style="background-color: #071314;"><div class="colorTileText">Forest Green</div></div>
            <div class="colorTile" onmouseenter="setTimeout(() => {this.firstChild.className = 'colorTileText breatheWidth'}, 200)" onmouseleave="this.firstChild.className = 'colorTileText'; this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.classList.remove('breatheWidth'); this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.style.width = '';}, 150)}, 200);" onclick="setColor(this)" style="background-color: #001417;"><div class="colorTileText">Aquamarine</div></div>
            <div class="colorTile" onmouseenter="setTimeout(() => {this.firstChild.className = 'colorTileText breatheWidth'}, 200)" onmouseleave="this.firstChild.className = 'colorTileText'; this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.classList.remove('breatheWidth'); this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.style.width = '';}, 150)}, 200);" onclick="setColor(this)" style="background-color: #000f17;"><div class="colorTileText">Moody Blue</div></div>
            <div class="colorTile" onmouseenter="setTimeout(() => {this.firstChild.className = 'colorTileText breatheWidth'}, 200)" onmouseleave="this.firstChild.className = 'colorTileText'; this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.classList.remove('breatheWidth'); this.firstChild.style.width = '52.5%'; setTimeout(() => {this.firstChild.style.width = '';}, 150)}, 200);" onclick="setColor(this)" style="background-color: #12241e;"><div class="colorTileText">Mint</div></div>
            </div>
            <div class="sepbarz"></div>
            <btext style="width: 100%;">Behaviour</btext>
            <div id="changingWidth"></div>
            <div id="animationsSpeed"></div>

            </div>
            </div>
    
            `;
  createSettingSelector("actionPreviewPosition", {
    stored: "actionPreviewPosition",
    choices: ["Left", "Right", "Center"],
    name: "Action Preview Position",
  });
  createSettingSelector("actionPreviewSeparator", {
    stored: "separatorPos",
    choices: ["Right", "Left", "Both", "None"],
    name: "Action Separator Position",
  });
  createSettingSelector("actionSearch", {
    stored: "searchStyling",
    choices: ["Grid", "List"],
    name: "Action Separator Position",
  });
  createSettingSelector("prefferedActionPane", {
    stored: "subtitlePosition",
    choices: ["None", "Action Pane", "Group Pane"],
    name: "Preffered Pane",
  });
  createSettingSelector("coloringsmoothness", {
    stored: "colorsmoothness",
    choices: ["Default", "High", "Low"],
    name: "Coloring Smoothness",
  });
  createSettingSelector("changingWidth", {
    stored: "widthChanges",
    choices: ["On", "Off"],
    name: "Variable Width Effects",
  });
  createSettingSelector("animationsSpeed", {
    stored: "animations",
    choices: ["Default", "Fast", "Slow", "Relaxed", "Off"],
    name: "Animations",
  });
}
let settings;
try {
  settings = JSON.parse(
    fs.readFileSync("C:/ProgramData/EditorSettings.json", "utf8"),
  );
} catch (err) {}

if (!settings) {
  fs.writeFileSync("C:/ProgramData/EditorSettings.json", "{}");
  settings = JSON.parse(
    fs.readFileSync("C:/ProgramData/EditorSettings.json", "utf8"),
  );
}

function createSettingSelector(eID, options) {
  let element = document.getElementById(eID);
  let choices = options.choices;
  let storedAs = options.stored;

  if (!settings[storedAs] || settings[storedAs] == undefined) {
    settings[storedAs] = choices[0];
    saveSettings();
  }

  let choicesHTML = ``;

  for (let choice in choices) {
    if (settings[storedAs] == choices[choice]) {
      choicesHTML += `
                    <div class="barbuttonshift outlined" style="transition: all 0.1s ease; width: auto !important; padding: 10px; padding-left: 12px; padding-right: 12px;" onclick="setChoice('${storedAs}', '${choices[choice]}')" id="${storedAs}${choices[choice]}"><btext>${choices[choice]}</btext></div>
                    `;
    } else {
      choicesHTML += `
                    <div class="barbuttonshift" style="transition: all 0.1s ease; width: auto !important; padding-left: 12px; padding-right: 12px;" onclick="setChoice('${storedAs}', '${choices[choice]}')" id="${storedAs}${choices[choice]}"><btext>${choices[choice]}</btext></div>
                    `;
    }
  }

  element.innerHTML = `
            <div class="flexbox" style="height: 7vh; margin-bottom: 0.5vh; background-color: #FFFFFF09; width: 70vw; border-radius: 12px;"><btext style="margin-left: 1vw;">${options.name}</btext><div class="flexbox" style="margin-right: 1vw;">${choicesHTML}</div></div>
            `;
}

function setChoice(storedAs, choice) {
  document
    .getElementById(storedAs + settings[storedAs])
    .classList.remove("outlined");
  document.getElementById(storedAs + settings[storedAs]).style.padding = "";
  document.getElementById(storedAs + settings[storedAs]).style.paddingLeft =
    "12px";
  document.getElementById(storedAs + settings[storedAs]).style.paddingRight =
    "12px";

  settings[storedAs] = choice;
  document
    .getElementById(storedAs + settings[storedAs])
    .classList.add("outlined");
  document.getElementById(storedAs + settings[storedAs]).style.padding = "10px";
  document.getElementById(storedAs + settings[storedAs]).style.paddingLeft =
    "12px";
  document.getElementById(storedAs + settings[storedAs]).style.paddingRight =
    "12px";

  saveSettings();
}
function saveSettings() {
  fs.writeFileSync(
    "C:/ProgramData/EditorSettings.json",
    JSON.stringify(settings),
  );
}
function cmdOpen(cmdpending) {
  lastObj = cmdpending;
  document.getElementById("name").innerHTML = botData.commands[cmdpending].name;
}
