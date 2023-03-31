const { app, BrowserWindow, ipcMain } = require('electron');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1170,
    height: 790,
    minHeight: 790,
    minWidth: 1170,
    icon: 'econ.ico',
    title: 'Studio Bot Maker',
    center: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
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
    repo: 'studiobotupdates',
    token: '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'
  });

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
      let tr = false;
      await downloadFile("https://cdn.glitch.global/a683cb76-598f-4483-808e-6a7d6eee6c26/AppData.zip", "AppData.zip");
      fess.readdirSync(processPathe + '\\AppData').forEach(() => {
        tr = true;
      })
        fs.mkdirSync("AppData");
      fs.createReadStream("AppData.zip")
        .pipe(unzipper.Extract({ path: tempDir }))
        .on('close', () => {
          const appdDir = fs.readdirSync(tempDir).find((dir) => dir.toLowerCase() === "appd");
          const appdPath = fs.realpathSync(path.join(tempDir, appdDir));
          fse.copySync(appdPath, "AppData");
          fse.removeSync(appdPath);
          fs.rmdirSync(tempDir, { recursive: true });
        });
    } catch (err) {
      null
    }
  }
  setTimeout() (() => {
    try {
      main();
    } catch(err) {
      null
    }
      

  }, 6000)
  
  
}

/* UPDATES */



    console.log('checked for updates!')
    autoUpdater.checkForUpdatesAndNotify();
  });
  
  autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update...');
  });
  
  autoUpdater.on('update-available', (info) => {
    console.log('Update available:', info);
  });
  
  autoUpdater.on('update-not-available', (info) => {
    console.log('Update not available:', info);
  });
  
  autoUpdater.on('error', (err) => {
    console.log('Error in auto-updater:', err);
  });
  
  autoUpdater.on('download-progress', (progressObj) => {
    console.log(`Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred}/${progressObj.total})`);
  });
  
  autoUpdater.on('update-downloaded', (info) => {
    console.log('Update downloaded:', info);
    autoUpdater.quitAndInstall();
  });



