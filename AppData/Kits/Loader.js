const fs = require('fs')
let lastButton;
let menu;
document.onclick = () => {
    if (menu) {
        menu.style.scale = '0'
        setTimeout(() => {
            menu.remove();
            menu = undefined;
        }, 200)
    }
}