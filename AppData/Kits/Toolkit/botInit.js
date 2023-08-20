const runCmd = require("node-run-cmd");
const customFs = require("fs");

const filePath = "./bot.js";
function consoleLog(log) {
  document.getElementById(
    "console",
  ).innerHTML += `<div class="fade" style="margin: auto; margin-top: 6px;">${ansiToHtml(
    log,
  )}</div>`;
}

let ranbot = false;

const fs = require("fs");
const { exec } = require("child_process");
const os = require("os");

exec("node -v", (error, stdout, stderr) => {
  if (error) {
    consoleLog(
      "Node.js is not installed. Downloading now... (This will take a while..)",
    );
    const platform = os.platform();

    if (platform === "win32") {
      exec(
        "winget install --accept-source-agreements --accept-package-agreements nodeJS",
        (error, stdout, stderr) => {
          if (error) {
            consoleLog(
              `Error occured whilst downloading Node.JS, please visit the support guild or download Node.JS manually`,
            );
            return;
          }
          consoleLog(
            `Finished downloading Node.js! Studio Bot Maker will close in order to comply with the new changes. Please reopen it afterwards!`,
          );

          setTimeout(() => {
            require("electron").ipcRenderer.send("restart", true);
          }, 7500);
        },
      );
    } else {
      consoleLog(
        "winget is only available on Windows. Please download it manually",
      );
    }
  } else {
    consoleLog(`Node.JS ${stdout} is already installed, jumping directly to Startup.`);
      consoleLog(`Checking NPM modules.. This might take a bit`);

      exec("npm i oceanic.js@1.8.0", (err) => {
        runBot()
      });
      exec("npm i @oceanicjs/builders");
      exec("npm i discord-api-types");
  }
});

async function runBot() {
  if (ranbot == true) return;
  ranbot = true;
  customFs.writeFileSync(
    "bot.js",
    customFs.readFileSync("./AppData/bot.js", "utf8"),
  );
  runCmd
    .run(`node ${filePath}`, { onData: consoleLog, onError: consoleLog, oncancel: cancelWindow })
    .catch((error) => {
      consoleLog(`Error executing bot.js: ${error}`);
    });
}

let cancelWindow = () => {
  ipcRenderer.send('')
}