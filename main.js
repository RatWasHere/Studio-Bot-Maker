const { app, BrowserWindow, contextBridge, ipcMain } = require('electron');
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1170,
    height: 750,
    minHeight: 800,
    minWidth: 1170,
    icon: 'icon.png',
    title: 'Studio Bot Maker',
    center: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  });
  win.setMenuBarVisibility(false);
  win.loadFile('./index.html');
}

app.whenReady().then(createWindow);

ipcMain.on('selectDirectory', async function (event) {
  const dialog = require('electron').dialog
  const result = await dialog.showOpenDialog(win, {
    properties: ['openDirectory']
  });

  event.sender.send('selectedDirectory', result.filePaths);
});

const { autoUpdater } = require('electron-updater');
autoUpdater.setFeedURL({
    provider: 'github',
    owner: 'RatWasHere',
    repo: 'Studio-Bot-Maker'
  });
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = false;
  const { remote } = require('electron') 
  
  
  app.on('ready', () => {

    const fess = require('fs');
const processPathe = require('process').cwd();

try {
if (fess.readdirSync(processPathe + '\\AppData')) {

} else {

}
} catch (err) {
  const request = require('request');
  const fs = require('fs');
  const unzipper = require('unzipper');
  const fse = require('fs-extra');
  const path = require('path')
  
  async function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
      request(url)
        .pipe(fs.createWriteStream(dest))
        .on('close', resolve)
        .on('error', reject);
    });
  }

  
  async function main() {
    try {
      await downloadFile("https://cdn.glitch.global/a683cb76-598f-4483-808e-6a7d6eee6c26/AppData.zip?v=latest", "AppData.zip");
      if (!fs.existsSync("AppData")) {
        fs.mkdirSync("AppData");
      }
      const tempDir = fs.mkdtempSync("temp");
      fs.createReadStream("AppData.zip")
        .pipe(unzipper.Extract({ path: tempDir }))
        .on('close', () => {
          const appdDir = fs.readdirSync(tempDir).find((dir) => dir.toLowerCase() === "appdata");
          const appdPath = fs.realpathSync(path.join(tempDir, appdDir));
          fse.copySync(appdPath, "AppData");
          fse.removeSync(appdPath);
          fs.rmdirSync(tempDir, { recursive: true });
          try {
            fs.rmdirSync("AppData.zip", { recursive: true, force: true });
          } catch(err) {
            null
          }
        });
    } catch (err) {
      console.error(err);
    }

  }
  setTimeout(() => {
    try {
      main();
    } catch (err) {
      console.log(err)
    }

  }, 6000)
  
  
}

/* UPDATES */




  });

  


  // STUDIO BOT MAKER V2.2.1 UPDATE CHECKER

  ipcMain.on('checkForUpdates', async function (event) {
    let answer;
    var vrs = await autoUpdater.checkForUpdates()

        console.log('vrs.updateInfo.tag', vrs.updateInfo.tag)
    event.sender.send('checkedForUpdates', vrs.updateInfo.tag != 'v2.4.1')
  })
  let progress;
  autoUpdater.on('download-progress', (progressObj) => { 
    progress = progressObj.percent;
    console.log(progress, 'progress')
  })

    ipcMain.on('checkProgress', (event) => {
      
      console.log('checking progress', progress)
      event.sender.send('checkedProgress', progress)
    })

    autoUpdater.on('update-downloaded', () => {
      autoUpdater.quitAndInstall()
    })
  ipcMain.on('downloadUpdate', async function event(event) {
    autoUpdater.autoDownload = true;
    autoUpdater.autoInstallOnAppQuit = true;

    autoUpdater.checkForUpdates();
    
    console.log('downloading update!')
    autoUpdater.on('update-downloaded', (info) => {

    fs.rmSync(processPath + `\\AppData`, {
      recursive: true, 
      force: true
    })
    autoUpdater.quitAndInstall({isSilent: true});
  })
  })

  ipcMain.on('quitAndInstall', async function event(event) { 
    autoUpdater.quitAndInstall({isSilent: true});
  })


  ipcMain.on('whatIsDoing', () => {
    let activityData = JSON.parse(fs.readFileSync('./AppData/presence.json'))
    if (activityData.editing == true) {

      rpc.setActivity({
        details: `Editing Action: ${activityData.whatIsEditing} | Action #${activityData.editingAt} out of ${activityData.actionCount - 1} Other Actions`,
        state: 'Part of Command: ' + activityData.ofActionGroup,
        instance: false,
        largeImageKey: 'icon',
        largeImageText: 'Working on ' + activityData.botName
      })
    } else {
      rpc.setActivity({
        details: activityData.viewing,
        state: 'Project Contains ' + activityData.commandCount + ' Commands',
        instance: false,
        largeImageKey: 'icon',
        largeImageText: 'Working on ' + activityData.botName
      })
    }

  })

  const DiscordRPC = require('discord-rpc');
  const clientId = '1106673404976824370';
  const fs = require('fs')
  DiscordRPC.register(clientId);
  
  const rpc = new DiscordRPC.Client({ transport: 'ipc' });
  
  rpc.on('ready', () => {
    console.log('Discord Rich Presence is ready!');
    rpc.setActivity({
      details: 'Loading...',
      state: 'Starting up!',
      startTimestamp: Date.now(),
      instance: false,
      largeImageKey: 'icon',
      largeImageText: 'Hold on'
    });
  });
  /*
        largeImageKey: '',
      largeImageText: 'Large Image Text',
      smallImageKey: 'small_image_key',
      smallImageText: 'Small Image Text', */
  
  
  app.on('ready', () => {
    rpc.login({ clientId }).catch(console.error);
  });