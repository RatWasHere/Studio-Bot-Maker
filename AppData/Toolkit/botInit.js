const runCmd = require('node-run-cmd');

const filePath = './AppData/bot.js';
function consoleLog(log) {
  document.getElementById('console').innerHTML += `<div class="fade" style="margin: auto; margin-top: 6px;">${ansiToHtml(log)}</div>`
}
runCmd.run(`node ${filePath}`, { onData: consoleLog, onError: consoleLog })
  .catch((error) => {
    console.error(`Error executing bot.js: ${error}`);
  });
