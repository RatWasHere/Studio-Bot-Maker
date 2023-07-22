const runCmd = require('node-run-cmd');
const customFs = require('fs')

const filePath = './bot.js';
function consoleLog(log) {
  document.getElementById('console').innerHTML += `<div class="fade" style="margin: auto; margin-top: 6px;">${ansiToHtml(log)}</div>`
}
customFs.writeFileSync('bot.js', customFs.readFileSync('./AppData/bot.js', 'utf8'))
runCmd.run(`node ${filePath}`, { onData: consoleLog, onError: consoleLog })
  .catch((error) => {
    console.error(`Error executing bot.js: ${error}`);
  });
