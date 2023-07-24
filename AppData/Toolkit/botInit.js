const runCmd = require('node-run-cmd');
const customFs = require('fs')

const filePath = './bot.js';
function consoleLog(log) {
  document.getElementById('console').innerHTML += `<div class="fade" style="margin: auto; margin-top: 6px;">${ansiToHtml(log)}</div>`
}

let downloadedoceanic = false;
let downloadedapitypes = false;
let ranbot = false;

runCmd.run(`npm i @oceanicjs/builders`, { onData: consoleLog, onError: consoleLog, onDone: downloadOceanic })

function downloadOceanic() {
  if (downloadedoceanic == true) return
  downloadedoceanic = true;
  runCmd.run(`npm i oceanic.js`, { onData: consoleLog, onError: consoleLog, onDone: downloadApiTypes })
  consoleLog('Downloading Oceanic.JS')
}
function downloadApiTypes() {
  if (downloadedapitypes == true) return
  downloadedapitypes = true;
  consoleLog('Downloading Discord-Api-Types')
  document.getElementById('console').innerHTML = `
  <div class="barbuttontexta">Downloaded Required Modules</div>
  `
  runCmd.run(`npm i @oceanicjs/builders`, { onData: consoleLog, onError: consoleLog, onDone: runBot })
}

function runBot() {
  if (ranbot == true) return;
  ranbot = true;
  customFs.writeFileSync('bot.js', customFs.readFileSync('./AppData/bot.js', 'utf8'))
  runCmd.run(`node ${filePath}`, { onData: consoleLog, onError: consoleLog })
    .catch((error) => {
      consoleLog(`Error executing bot.js: ${error}`);
    })
}