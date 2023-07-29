const runCmd = require('node-run-cmd');
const customFs = require('fs')

const filePath = './bot.js';
function consoleLog(log) {
  document.getElementById('console').innerHTML += `<div class="fade" style="margin: auto; margin-top: 6px;">${ansiToHtml(log)}</div>`
}

let downloadedoceanic = false;
let downloadedapitypes = false;
let ranbot = false;

const fs = require('fs');
const { exec } = require('child_process');
const os = require('os');
fs.writeFileSync('./package.json', `
{
    "name": "Studio-Bot-Maker",
    "main": "bot.js",
    "author": "Studio Bot Maker, Rat#1111",
    "description": "A discord bot created via Studio Bot Maker!",
    "dependencies": {
        "discord-api-types": "^0.37.34",
        "@oceanicjs/builders": "^1.1.9",
        "oceanic.js": "^1.7.1",
        "fs": "^0.0.1-security",
        "fs-extra": "^11.1.1",
        "fse": "^4.0.1",
        "oceanic-collectors": "^1.0.7",
        "node-fetch": "^3.3.1",
        "request": "^2.88.2"
    },
    "version": "69420"
}
`)
exec('node -v', (error, stdout, stderr) => {
  
  if (error) {
    consoleLog('Node.js is not installed. Downloading now... (This will take a while..)');
    const platform = os.platform();

    if (platform === 'win32') {
      exec('winget install  --accept-package-agreements nodeJS', (error, stdout, stderr) => {
        if (error) {
          consoleLog(`Error occured whilst downloading Node.JS, please visit the support guild or download Node.JS manually`);
          return;
        }
        consoleLog(`Finished downloading Node.js! Studio Bot Maker will close in order to comply with the new changes. Please reopen it afterwards!`);

        setTimeout(() => {
          require('electron').ipcRenderer.send('restart', true)
        }, 7500);
      });
    } else {
      consoleLog('winget is only available on Windows. Please download it manually');
    }
  } else {
    consoleLog(`Node.JS is already installed, jumping directly to Startup.`);
if (require('./package.json').dependencies["oceanic.js"] != '^1.7.1') {
  consoleLog(`Checking NPM modules..`);

  exec('npm i', (error, stdout, stderr) => {
    if (error) {
      consoleLog(`Error occured whilst Updating NPM packages. One moment whilst we try again. (Additionally, visit the support guild)`);
      setTimeout(() => {
      location.reload()
      return;
      }, 5050);
    }
    consoleLog(`Successfully Updated NPM packages!`);
    runBot()
  });  
}

  }
});

async function runBot() {
  if (ranbot == true) return;
  ranbot = true;
  customFs.writeFileSync('bot.js', customFs.readFileSync('./AppData/bot.js', 'utf8'))
  runCmd.run(`node ${filePath}`, { onData: consoleLog, onError: consoleLog })
    .catch((error) => {
      consoleLog(`Error executing bot.js: ${error}`);
    })
}