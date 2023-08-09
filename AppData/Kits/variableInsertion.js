window.oncontextmenu = function (event) {
  showCustomMenu(event.clientX, event.clientY);
  return false;
};
function showCustomMenu(x, y) {
  if (!menu) {
    menu = document.createElement("div");
    document.body.appendChild(menu);
    menu.style.width = "35vw";
    menu.style.height = "37vh";
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
  let variableType = 2;
  menu.innerHTML = `
          <div class="barbuttontexta" style="background-color: #FFFFFF07; border-top-left-radius: 12px; border-top-right-radius: 12px; border-bottom: solid 2px #FFFFFF30; padding: 2px;">Insert Variable</div>`;
  if (document.activeElement.isContentEditable) {
    console.log("contenteditable");
    if (document.activeElement.className == "selectBar") {
      /* ---- For Menu Input Fields ---- */
      let fieldOptions = actionUI.variableSettings;
      let options;
      if (fieldOptions == undefined) {
        variableType = 2;
      } else {
        for (let field in fieldOptions) {
          if (field == document.activeElement.id) {
            options = fieldOptions[field];
          }
        }
        let elementStoredAs;
        for (let UIelement in actionUI) {
          if (UIelement.startsWith("menuBar")) {
            if (actionUI[UIelement].extraField == document.activeElement.id) {
              elementStoredAs = actionUI[UIelement].storeAs;
            }
          }
        }
        let elementInsertionType = options[action.data[elementStoredAs]];
        if (elementInsertionType == "novars") {
          variableType = 1;
          menu.innerHTML = `
                <div class="barbuttontexta" style="background-color: #FFFFFF15; border-top-left-radius: 12px; border-top-right-radius: 12px; border-bottom: solid 2px #FFFFFF30; padding: 2px;">Variables Incompatible</div>`;
        }
        if (elementInsertionType == "direct") {
          variableType = 0;
        }
      }
    } else {
      if (document.activeElement.className == "inputB") {
        try {
          if (actionUI.ButtonBarChoices[action.data.button] == "direct") {
            variableType = 0;
          }
          if (actionUI.ButtonBarChoices[action.data.button] == "novars") {
            variableType = 1;
          }
        } catch (err) {}
      } else {
        var field = "";
        for (let element in actionUI) {
          if (
            actionUI[element] == document.activeElement.id &&
            element != "preview"
          ) {
            field = element;
          }
        }
        if (field.endsWith("_direct*")) {
          variableType = 0;
        }
        if (field.endsWith("_direct")) {
          variableType = 0;
        }
        if (
          field.endsWith("_novars") ||
          field.endsWith("_novars*") ||
          field.endsWith("_novars*!") ||
          field.endsWith("_novars!")
        ) {
          variableType = 1;
          menu.innerHTML = `<div class="barbuttontexta" style="background-color: #FFFFFF15; border-top-left-radius: 12px; border-top-right-radius: 12px; border-bottom: solid 2px #FFFFFF30; padding: 2px;">Variables Incompatible</div>`;
          return;
        }
      }
    }
    for (let variable in variables) {
      /* Skip blank ones */
      try {
        if (variables[variable].trim() != "") {
          menu.innerHTML += `
                <div class="dimension hoverablez" onclick="setVariableIn(${variableType}, '${variables[
                  variable
                ].replaceAll("'", "\\'")}', '${
                  document.activeElement.id
                }')" style="width: 95%; padding-top: 4px; padding-bottom: 4px; margin: auto; margin-bottom: 4px; margin-top: 4px; border-radius: 6px;"><div class="barbuttontexta textToLeft" style="margin-left: 1vw;">${
                  variables[variable]
                }</div></div>
                `;
        }
      } catch (err) {}
    }
  } else {
    menu.innerHTML = `
        <div class="sepbars noanims"></div>
        `;
    if (isActionMenu == false) {
      menu.innerHTML = `
            <div class="flexbox" style="width: 100%; margin-bottom: 1vh;">
            <div class="dimension" style="width: 27%; padding: 4px;height: 5vh; border-radius: 12px; background-color: #FFFFFF15; margin-right: 2%;" onclick="save()"><div class="image save noanims"></div></div>
            <div class="dimension" style="width: 27%; padding: 4px;height: 5vh; border-radius: 12px; background-color: #FFFFFF15; margin-right: 2%;"><div class="image save noanims"></div></div>
            </div>
            `;
    }
    if (lastHovered != undefined) {
      menu.innerHTML += `
            <div class="dimension hoverablez" style="width: 95%; padding-top: 4px; padding-bottom: 4px; margin: auto; margin-bottom: 4px; margin-top: 4px; border-radius: 6px;"><div class="barbuttontexta textToLeft" style="margin-left: 1vw;">Edit Data</div></div>
            <div class="dimension hoverablez" onmousedown="copyAction(${lastHovered}, '${lastActionContainer}')" style="width: 95%; padding-top: 4px; padding-bottom: 4px; margin: auto; margin-bottom: 4px; margin-top: 4px; border-radius: 6px;"><div class="barbuttontexta textToLeft" style="margin-left: 1vw;">Copy</div></div>
            `;
    }
    if (lastActionContainer && copiedAction) {
      menu.innerHTML += `
            <div class="dimension hoverablez" onmousedown="pasteCopiedIn('${lastActionContainer}', ${lastHovered})" style="width: 95%; padding-top: 4px; padding-bottom: 4px; margin: auto; margin-bottom: 4px; margin-top: 4px; border-radius: 6px;"><div class="barbuttontexta textToLeft" style="margin-left: 1vw;">Paste</div></div>
            `;
    }
  }
}

function copyAction(id, container) {
  copiedAction = action.data[container][id];
}
