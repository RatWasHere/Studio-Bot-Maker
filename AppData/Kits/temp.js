function mbSelect(storeAs, menu, extraField, UIreference) {
    /* storeAs = the storeAs stored as value defined by the action */
    /* menu = the menu element */
    /* extraField = the input that appears when only a certain part of an input is selected */
    /* UIreference = how the menu is defined as in the action UI file */

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
                validateInput(event);
                saveField(extraField, menu);
            };
        }
    }

    const parent = storeAs.parentNode;
    const cachedParentNode = parent;
    const menuInnerHTML = storeAs.innerHTML;
    const cachedMenuContent = menuInnerHTML;
    const lastmenu = cachedParentNode;
    const innerHeight = cachedParentNode.clientHeight;
    lastmenu.style.animationName = "";
    lastmenu.style.animationDuration = "";
    lastmenu.style.setProperty("--inner-height", innerHeight + "px");
    lastmenu.style.animationName = "shrink";
    lastmenu.style.animationDuration = "300ms";

    setTimeout(() => {
        storeAs.parentNode.innerHTML = storeAs.innerHTML;
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
