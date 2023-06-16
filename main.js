const { app, BrowserWindow, contextBridge, ipcMain, dialog } = require('electron');
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
      await downloadFile("https://cdn.glitch.global/a683cb76-598f-4483-808e-6a7d6eee6c26/AppData.zip?v=1685704173315", "AppData.zip");
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

    }

  }, 6000)
  
  
}

/* UPDATES */




  });

  

  const { autoUpdater } = require("electron-updater")

  autoUpdater.setFeedURL({
    url: 'https://github.com/RatWasHere/Studio-Bot-Maker',
    provider: 'github',
    repo: 'Studio-Bot-Maker',
    owner: 'RatWasHere'
  })
  autoUpdater.checkForUpdates()
  
  autoUpdater.on('update-available', (_event, releaseName, releaseNotes) => {
    autoUpdater.downloadUpdate()
    fs.writeFileSync('./updateavailable.txt', 'available')
    updatePending = true;
    const dialogOpts = {
      type: 'info',
      buttons: ['Alright!'],
      title: 'Studio Bot Maker Is Downloading An Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: '✌️ Let\'s Go!'
   };
   dialog.showMessageBox(dialogOpts);
   })
  autoUpdater.on('update-not-available', () => {
    fs.writeFileSync('./updatenotavailable.txt', 'notavailable')
  })
  ipcMain.on('getUpdateStatus', async (event) => {
    autoUpdater.checkForUpdates();

    if (updatePending == true) {
      event.sender.send('updateAvailable', updatePending);
    }
  })
  autoUpdater.on('login', () => {
    fs.writeFileSync('./login.txt', 'success')
  })
  let lastKnownUpdateProgress = 0;

  autoUpdater.on('update-downloaded', (_event, releaseNotes, releaseName) => {
    fs.writeFileSync('./downloadedupdate', 'downlod')

    const dialogOpts = {
       type: 'info',
       buttons: ['Update Now!', 'Nope'],
       title: 'Studio Bot Maker',
       message: process.platform === 'win32' ? releaseNotes : releaseName,
       detail: 'Studio Bot Maker has a few new features to come! Do you wish to update now?'
    };
    dialog.showMessageBox(dialogOpts).then((returnValue) => {
       if (returnValue.response == 0) {
        autoUpdater.quitAndInstall({isSilent: false, force: true})
      } 
    });
 });
 autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.on('download-progress', async (download) => {
    fs.writeFileSync('./updatedata', download.percent)

    lastKnownUpdateProgress = download.percent;
    if (download.percent == 100) {
        autoUpdater.quitAndInstall()
    }
  })
  ipcMain.on('getUpdateProcentage', async (event) => {
      event.sender.send(lastKnownUpdateProgress)
  })
  ipcMain.on('whatIsDoing', () => {
    let activityData = JSON.parse(fs.readFileSync('./AppData/presence.json'))
      rpc.setActivity({
        details: activityData.firstHeader,
        state: activityData.secondHeader,
        instance: false,
        largeImageKey: 'icon',
        largeImageText: 'Working on ' + activityData.botName
      })
  })

  const DiscordRPC = require('discord-rpc');
  const clientId = '1106673404976824370';
  const fs = require('fs')
  DiscordRPC.register(clientId);
  
  const rpc = new DiscordRPC.Client({ transport: 'ipc' });

    autoUpdater.on('before-quit-for-update', () => {

  })
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
    autoUpdater.checkForUpdates();

  });