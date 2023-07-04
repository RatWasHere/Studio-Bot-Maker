const fs = require('fs')
let lastButton;
let menu;
document.onclick = () => {
    if (menu) {
        menu.remove();
        menu = undefined;
    }
}